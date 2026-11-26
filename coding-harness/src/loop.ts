import { exec } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

async function sendMessages(conversation: Message[]) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env["OPENROUTER_API_KEY"]!}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-v4-flash",
      max_tokens: 4000,
      messages: conversation,
    }),
  });
  const data = await response.json()
  return data.choices[0].message.content;
}

const tools: Record<string, (input: any) => Promise<string>> = {
  read: ({ path }) => readFile(path, "utf8"),
  write: async ({ path, content }) => {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content, "utf8");
    return `write: wrote ${content.length} bytes to ${path}`;
  },
  edit: async ({ path, oldText, newText }) => {
    const content = await readFile(path, "utf8");
    await writeFile(path, content.replace(oldText, newText), "utf8");
    return `edit: updated ${path}`;
  },
  bash: ({ command }) => new Promise((resolve) => {
    exec(command, (_error, stdout, stderr) => {
      resolve(`${stdout}${stderr}`.trim() || "(no output)");
    });
  }),
};

function extractToolCall(text: string): (() => Promise<string>) | null {
  for (const line of text.split("\n")) {
    const match = line.trim().match(/^tool:\s*(\w+)\((.*)\)$/);
    if (!match) continue;
    const tool = tools[match[1]!]!;
    const input = JSON.parse(match[2]!);
    return async () => `tool_result(${JSON.stringify(await tool(input))})`;
  }
  return null;
}

const systemPrompt = `You are a coding assistant operating inside a coding agent harness. Help users inspect files, run commands, and modify code.
<tools>
- read: Read a file's contents. Arguments: { "path": string }.
- write: Create or overwrite a file. Arguments: { "path": string, "content": string }.
- edit: Replace exact text in a file. oldText must appear exactly once. Arguments: { "path": string, "oldText": string, "newText": string }.
- bash: Run a shell command. Arguments: { "command": string, "timeout"?: number (ms) }.

When you want to use a tool, reply with exactly one line in the format:
tool: NAME({"arg": "value"})
Use compact single-line JSON with double quotes. After you receive a tool_result(...) message, continue the task. If no tool is needed, just respond normally with your answer.
</tools>

<cwd>
${process.cwd().replace(/\\/g, "/")}
</cwd>
`;

const conversation: Message[] = [{ role: "system", content: systemPrompt }];

async function runLoop(prompt: string): Promise<void> {
  conversation.push({ role: "user", content: prompt });
  while (true) {
    const reply = await sendMessages(conversation);
    conversation.push({ role: "assistant", content: reply });
    console.log(reply)

    const toolCall = extractToolCall(reply);
    if (toolCall === null) break;

    const output = await toolCall();
    conversation.push({ role: "user", content: output });
  }
}

process.stdin.setEncoding("utf8");
process.stdout.write("> ");
for await (const chunk of process.stdin as AsyncIterable<string>) {
  const prompt = chunk.trim();
  if (prompt) await runLoop(prompt);
  process.stdout.write("> ");
}
console.error(JSON.stringify(conversation));
