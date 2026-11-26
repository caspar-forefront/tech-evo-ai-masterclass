# Coding harness

[`src/loop.ts`](src/loop.ts) is the starting point for the coding agent lab. It is a complete coding agent in 98 lines. The agent sends your prompt to a model through OpenRouter. If the model asks to use a tool, the agent runs it and sends the result back. When the model replies without asking for a tool, the current turn ends. The agent shows the `>` prompt and waits for your next message.

## Run the starter

Use Node.js 22.19 or later. Set your OpenRouter API key in the terminal:

```sh
export OPENROUTER_API_KEY='YOUR_LAB_KEY'
```

Then start the agent from the repository root:

```sh
node coding-harness/src/loop.ts
```

To exit the agent, press Ctrl+D at the `>` prompt. The starter writes the conversation to standard error when it exits this way.
