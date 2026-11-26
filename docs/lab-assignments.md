# Lab 1 assignment: Bootstrap your own harness

The starter in [`coding-harness/src/loop.ts`](../coding-harness/src/loop.ts) is a complete coding agent, and it stops at the first tool call that fails. In this assignment you turn it into a harness that you can work with.

* [Part 1](#part-1-trace-one-turn)
* [Part 2](#part-2-the-minimum)
* [Part 3](#part-3-make-it-yours)

## Goal

The minimum goal has two parts. Your harness shows you everything that happens in a turn. Your harness keeps running when a tool fails, and the model sees the error. A turn is everything from one prompt to the final answer of the model.

You reach the goal when your harness passes the two tests in Part 2. After that, you choose what to build in Part 3.

The goal comes first because the other features depend on it. You cannot improve an agent that you cannot observe. A model can correct a mistake only if the error reaches it.

## Requirements

You need two things:

- The setup from [Before the lab](../README.md#before-the-lab): Node.js, an API key, and a starter that runs.
- A coding agent, for example Claude Code, Codex, or GitHub Copilot.

## Part 1: Trace one turn

In this part you follow one prompt through the starter.

1. From the repository root, start the starter with this command. The starter writes the conversation to the file `conversation.json` when you exit.

```sh
node coding-harness/src/loop.ts 2> conversation.json
```

2. At the `>` prompt, enter `Read coding-harness/README.md and tell me how to exit the agent.`
3. Read the output. Find the tool call and the answer. Note what the agent does not print.
4. Press Ctrl+D to exit. Open `conversation.json`.
5. Find the system prompt, your prompt, the tool call, the tool result, and the answer in the file. Note the `role` of each message.
6. Count the requests that the harness sent to the model for this one prompt. Say what the second request contained that the first request did not.
7. Start the starter again, this time without `2> conversation.json`. Enter `Read docs/does-not-exist.md and tell me what it says.`
8. Read what happens. Say where the conversation is now.

Keep the two prompts. You run them again after each change that you make.

Part 1 shows two problems. You see the tool result and the full conversation only after you exit. A tool call that fails stops the agent, and the conversation is lost. Part 2 removes both problems.

## Part 2: The minimum

### Step 1: Record the session

Add a session log. A session log is a file that holds each message of the conversation. Write each message to the file when it happens: the system prompt, each prompt, each reply, and each tool result. Use one JSON object for each line. This format has the name JSONL. A program can add a line to a JSONL file without reading the file, so the log survives a crash.

Also print each tool result in the terminal. Shorten long results in the terminal, and keep them complete in the log.

### Test 1: Trace

Enter `Read coding-harness/README.md and tell me how to exit the agent.` Do not exit. Open the log file in a second terminal. You pass when the file shows the system prompt, your prompt, the tool call, the tool result, and the answer.

### Step 2: Turn failures into feedback

A tool call that fails must not stop the agent. Catch the error and send its text to the model as the tool result. The model reads the error and tries something else.

Cover three failures:

- A tool that throws an error, for example `read` with a path that does not exist.
- A tool name that the harness does not have.
- Arguments that are not valid JSON.

### Test 2: Recover

Enter `Read docs/does-not-exist.md and tell me what it says.` You pass when these three statements are true:

- The agent still runs and shows the `>` prompt.
- The answer says that the file does not exist. The model can look for the file in other places first.
- The session log shows the error as a tool result.

## Part 3: Make it yours

Your harness passes both tests. Now pick the features that interest you. You do not need to finish the list. The features are in order of size, from small to large. Each feature has a test that tells you when it works.

### Tell the model about its environment

The system prompt of the starter gives the model one fact about your machine: the working directory. Production agents add more facts. Add the date, the operating system, and whether the working directory is a git repository to the system prompt.

You are done when the agent answers `What is the date today, and which operating system do I use?` without a tool call. Find both facts in the system prompt in the session log.

Background: [The system prompt](breakout-sessions.md#4-the-system-prompt).

### Project instructions

At start, read the file `AGENTS.md` from the working directory, if it exists, and add its text to the context. [`AGENTS.md`](https://agents.md) is a file with instructions for coding agents, and most coding agents read it. Decide where the text goes: in the system prompt, or in a first user message. Production harnesses differ on this.

You are done when an instruction in `AGENTS.md`, for example `Answer in Swedish.`, changes the answers of the agent. Find the instruction in the session log.

Background: [Project instructions](breakout-sessions.md#3-project-instructions).

### Use the OpenAI SDK

Replace the `fetch` call in `sendMessages` with the OpenAI SDK. Run `npm install openai` in `coding-harness/`. Create the client with `baseURL: "https://openrouter.ai/api/v1"` and your OpenRouter key. The rest of the file stays the same.

You are done when both tests from Part 2 give the same results as before. Then start the harness with a wrong API key and enter a prompt. The error names the cause, for example the status 401.

Background: [Native tool calling](breakout-sessions.md#1-native-tool-calling).

### Native tool calling

Do [Use the OpenAI SDK](#use-the-openai-sdk) first. The SDK gives you the types for tool calls.

Send the tool definitions in the `tools` field of the request, with a JSON Schema for the arguments of each tool. Read the tool calls from `message.tool_calls`, not from the reply text. Send each result back as a message with `role: "tool"` and the `tool_call_id` of its call. Add the assistant message to the conversation exactly as the API returned it. Some models need their reasoning fields back to continue the turn.

You are done when `extractToolCall` and the format instructions in the system prompt are gone, and both tests from Part 2 pass. Then ask the agent to read two files. If the reply has two tool calls, the harness runs both.

Background: [Native tool calling](breakout-sessions.md#1-native-tool-calling).

### Stream replies

Set `stream: true` in the request and print the text of the reply as it arrives. With native tool calling, the arguments of a tool call also arrive in pieces. Collect all pieces before you run the tool.

You are done when the text appears while the model writes, and both tests from Part 2 pass.

### Resume a session

Step 1 of Part 2 gave your harness a session log. Add a start option that loads a session log into the conversation. The harness then continues where the session stopped. Decide what the harness does when the log and the files on disk no longer agree.

To test it, exit the harness and start it again with the log of that session. Enter `What did I ask you before?` You are done when the agent answers from the earlier conversation.

Background: [Session logs](breakout-sessions.md#2-session-logs).

### Guardrails

The starter changes every file that the model asks for. Add a hard restriction: the harness does not change files outside the working directory. A hard restriction is a rule in the code of the harness, so the model cannot turn it off.

Start with `write` and `edit`. Resolve the path to an absolute path first, so that a path with `../` does not get past the rule. If the path is outside the working directory, do not run the tool. Send the refusal to the model as the tool result, so that the model knows what happened.

To test it, enter `Use the write tool to create the file ../outside.txt with the text "x".` You are done when the tool result of `write` is a refusal.

Then test `bash`. Enter `Run the command "touch ../outside.txt".` The file appears, because a rule for paths does not cover shell commands. A shell command can change every file that your user account can change. To close this gap, run each command in a sandbox of the operating system. The sandbox permits writes only in the working directory. On macOS, `sandbox-exec` does this. On Linux and WSL, [Bubblewrap](https://github.com/containers/bubblewrap) does this. Delete `../outside.txt` after the test.

Background: [sandboxing](https://code.claude.com/docs/en/sandboxing) in Claude Code, and [Run Pi safely](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md) in the docs of Pi.

### Web tools

Add two tools. `fetch_content` takes a URL and returns the page as plain text, cut to a maximum length. `web_search` takes a query and returns a list of results with a title, a URL, and a short text for each. For the search you need a search API, for example Exa, Tavily, or Brave Search, or the [web search tool](https://openrouter.ai/docs/guides/features/server-tools/web-search) of OpenRouter.

You are done when the agent answers a question about something that was released this month, and names the URL that it read.

Background: [Web search](breakout-sessions.md#5-web-search).

### Skills

At start, find each `SKILL.md` file under `.agents/skills/`. Put only the `name` and the `description` of each skill in the context. Tell the model to read the full file with `read` when a task matches the description. The [Agent Skills specification](https://agentskills.io/specification) defines the format and explains why skills load in steps.

You are done when two prompts give different results. A prompt that matches a skill makes the agent read its `SKILL.md`. A prompt that does not match leaves the file unread. The session log shows both.

Background: [Skills](breakout-sessions.md#6-skills).

### A better UI

The starter prints replies as plain text. Write your own interface, or use a framework such as [Pi TUI](https://github.com/earendil-works/pi/tree/main/packages/tui) or [OpenTUI](https://opentui.com/docs/). A web page that talks to the harness is also an option.

You are done when your prompts, the text of the model, the tool calls, and the tool results look different from each other. You can also stop a turn without stopping the harness.

## What to show

When you finish, be ready to show three things:

1. The session log of Test 2, with the tool call that failed, the error, and the answer.
2. One feature from Part 3 and its test.
3. Something new you learned and maybe something that surprised you.
