# Tech Evolution AI Masterclass

This repository holds the material for the labs of the masterclass.

## Lab 1: The harness

A coding agent such as Claude Code, Codex, or Pi is a model plus a harness. The harness is the program around the model. It sends the conversation to the model, runs the tools that the model asks for, and sends the results back. In this lab you look inside a harness of 98 lines, and then you extend it.

### Goal

Understand the building blocks of coding agents such as Claude Code, Codex, and Pi. With that knowledge you can evaluate agentic tools and adapt your workflows as software engineering changes.

After the lab, you can do three things:

* **Trace what a coding agent does.** Follow a task from the first request through the replies of the model, the tool calls, and the next steps in the agent loop.
* **Shape the context of the agent.** Explain what the model sees on each request: the system prompt, the instructions, the tool definitions, and the conversation history. Name the parts that you control.
* **Learn with a coding agent.** Use a coding agent as a guide when you explore topics and codebases. Let it lead you to the sources, then build your own understanding from them.

### Agenda

| Start | Length | Part | What you do |
| --- | --- | --- | --- |
| 0:00 | 30 min | Presentation: Inside a coding agent | See how a harness is built from a system prompt, tools, and a loop. |
| 0:30 | 30 min | Questions and discussion | Ask about the presentation and about the agents that you use. |
| 1:00 | 45 min | [Breakout session](docs/breakout-sessions.md) | Explore one topic in a group with a coding agent, then present it. |
| 1:45 | 15 min | [Lab assignment](docs/lab-assignments.md) | Go through the assignment together. If there is time, start Part 1 together. |

The parts build on each other. The presentation gives you the model of a harness. In the breakout session, your group explores one feature that production harnesses have and the starter lacks. In the assignment, you add such features to the starter.

### Before the lab

Finish this setup before the lab starts:

1. Install Node.js 22.19 or later.
2. Get an API key. The starter calls OpenRouter, so you need an OpenRouter key. Create an [OpenRouter account](https://openrouter.ai/sign-in) and create a key there, or ask the instructor for a lab key. The instructor sends the lab key by email.
3. Run the starter with your key. The [coding harness](coding-harness/README.md) page has the commands. Make sure that the starter answers one prompt.

You can also use a key from another provider, for example OpenAI. In that case, change the function `sendMessages` in `coding-harness/src/loop.ts` first: the URL, the name of the environment variable, and the model ID. The provider must accept requests in the format of the OpenAI chat completions API.

### Material

- The [coding harness](coding-harness/README.md) page describes the starter and how to run it.
- The [breakout session](docs/breakout-sessions.md) page has the topics and the plan for the group work.
- The [lab assignment](docs/lab-assignments.md) page tells you how to turn the starter into a harness that you can work with.

### Read more

These sources explain the same ideas in other ways:

- [The Emperor Has No Clothes](https://www.mihaileric.com/The-Emperor-Has-No-Clothes/) by Mihail Eric builds a coding agent in about 200 lines.
- [What Is a Harness](https://earendil.com/posts/what-is-a-harness/) explains the parts of a harness from first principles.
- [How to Build an Agent](https://ampcode.com/notes/how-to-build-an-agent) by Thorsten Ball builds an agent with native tool calling from the first step.

Three production harnesses are open source, so you can read how they solve each problem: [Pi](https://github.com/earendil-works/pi), [OpenCode](https://github.com/anomalyco/opencode), and [Codex](https://github.com/openai/codex). Pi is the closest to the starter.
