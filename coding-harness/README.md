# Coding harness

[`src/loop.ts`](src/loop.ts) is the starting point for the coding agent lab. The agent sends your prompt to a model through OpenRouter. If the model asks to use a tool, the agent runs it and sends the result back. The loop stops when the model replies without asking for a tool.

## Run the starter

Use Node.js 22.19 or later. You do not need to install any packages.

Run the starter only in an isolated lab environment. The model can read and change files and run shell commands without asking for confirmation. OpenRouter receives your prompts and the results from tools. Use a lab API key. Keep private files and other credentials out of the environment.

In Bash or Zsh, replace `YOUR_LAB_KEY` with your key:

```sh
export OPENROUTER_API_KEY='YOUR_LAB_KEY'
```

From the repository root, start the agent:

```sh
node coding-harness/src/loop.ts
```

At the `>` prompt, enter `Read coding-harness/README.md and tell me how to exit the agent.` Press Ctrl+D at an empty prompt to exit.

## Set up TypeScript in your editor

To let your editor recognize Node.js names and imports, run `npm ci` in `coding-harness/`. From the same folder, run `npm run typecheck` to check for TypeScript errors. You can run the starter without these packages.
