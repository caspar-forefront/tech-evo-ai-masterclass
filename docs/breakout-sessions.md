# Lab 1: Breakout session

| | |
|---|---|
| Group size | 4 to 5 people |
| Exploration | 30 min |
| Presentations | 15 min in total, about 5 min for each group |

## Purpose

Practice using a coding agent to research and explore a topic until you understand it well enough to explain it to others.

Each topic is a feature that production harnesses have and the starter in `coding-harness/src/loop.ts` lacks. What your group learns here is the background for the [lab assignment](lab-assignments.md).

## How

1. Form a group and pick one topic from the [list below](#topics). Each group takes a different topic.
2. Choose a coding agent, for example Claude Code, Codex, or GitHub Copilot.
3. Work in mob programming style with a stable driver. If you do not know what that means, ask the agent. That is your first exploration.
4. Explore the topic together. Ask follow-up questions, read the code or docs that the agent points to, and compare its claims with the sources.
5. Keep notes on the prompts that you send and on what you learn. You need them for the presentation.

Use this plan for the 30 minutes:

| Minutes | What you do |
| --- | --- |
| 0 to 5 | Form the group. Pick a topic and a driver. |
| 5 to 25 | Explore the topic. |
| 25 to 30 | Decide what you show and who shows it. |

## Explore with an agent

An agent answers from one of two places: the sources that it reads now, or the memory of the model. The memory comes from training data, and it is often out of date for tools that change each month.

Make the agent read. Give it the source: a file, a repository, or the URL of the docs. Then find out where each answer comes from. Open the files and the pages that the agent names, and test a claim yourself before you rely on it.

## What to present

Each group presents for about 5 minutes. Up to you how you present your findings, web page, markdown, slide deck or show the agent session, the code and your notes.

* The topic - Explain the topic to the rest of the group based on your findings.
* Tools - What coding agent and the other tools that you used.
* Prompts - What worked, what did not work.
* Artifacts - Anything that the agent produced, such as notes, diagrams, or code.
* Open question - One thing that you did not find out, or one claim that you did not confirm.

## Topics

Each topic has a question, a list of things to find out, and one thing to bring back. The [references](#references) at the end list coding agents that you can compare. The four topics below are the main topics.

### 1. Native tool calling

The starter describes its tools in the system prompt and finds tool calls in the reply text with a regular expression. Most LLM APIs support native tool calling, also known as function calling. What is native tool calling, how does it differ from the approach of the starter, and what are the benefits?

The starter also calls the OpenRouter API directly with `fetch`, in the function `sendMessages`. An SDK is a library that wraps the API of a provider. The OpenAI SDK is the first step toward native tool calling, because it gives you the types for tool calls.

Find out:

- What the OpenAI SDK replaces in `sendMessages`, and what it adds.
- Where the tool descriptions go.
- How the model asks for a tool in the response, and how the harness sends the result back. What is the ID of a tool call for?
- Which parts of the starter you can delete, and which work stays in the harness.
- What the model can do with native tool calling that the text format does not allow.

Bring back the request and the response for one tool call as JSON, in the text format and in the native format.

### 2. Session logs

Most coding agents save each session in a file on your machine. This file is the session log. It holds each prompt, each reply of the model, each tool call, and each tool result. What does your agent save about a session, and how do you add a session log to the starter?

Find out:

- Where your agent stores its session logs, and the format of the file.
- Where one prompt, one tool call, and one tool result are in the file.
- What the file stores in addition to the messages, for example the time and the number of tokens.
- What the starter saves, and when the starter loses the conversation.
- How you add a session log to the starter. Decide where the file goes, when the harness writes to it, and what one line holds.

Bring back three lines from a real session file, and explain each line. Also bring back your design for the session log of the starter.

### 3. Project instructions

Project instructions are a file such as `AGENTS.md` that the harness adds to the context of every session. The context is the text that the model reads on each request. What does your agent read about your project before you type the first prompt, and where does that text go?

Find out:

- Which file names your agent reads, and from which folders: the project, the folders above it, and your home folder.
- What your agent does when two files disagree.
- Where the text goes in the request: in the system prompt, or in a user message. Compare your agent with one other agent.
- How many tokens your file uses, and how often the harness sends them.
- What belongs in the file, and what does not.

Add one line to the instruction file of a test project, for example `Answer in Swedish.` Start a new session, and make sure that the line changes the answers.

Bring back the line that changed the answers, and say where your agent puts it in the request.

If you finish early, continue with [Skills](#6-skills). Project instructions go into the context of every session. A skill holds instructions that the agent needs only for some tasks. Find out when each of the two enters the context.

### 4. The system prompt

The system prompt is the first text that the model reads on each request. It tells the model what it is, which tools it has, and how to work. The system prompt of the starter has about 130 words. What does the system prompt of a production agent tell the model that the starter does not?

Start with `systemPrompt` in `coding-harness/src/loop.ts`. Then try to find the system prompt of other production agents. Same are easier to find and understand then other, see what you can find.

The session log of your own agent can hold the system prompt that the harness sent. Search the log of Codex for `base_instructions`. Search the log of Copilot CLI for `system.message`, and the log of Claude Code for `api-request-shape`.

Find out:

- How long each prompt is, and which sections it has.
- Which instructions are about the tools, which are about how to work, and which are facts about your machine.
- What the production prompts tell the model that the starter does not.
- Why some agents have a different prompt for each model family.
- What the harness adds to the prompt when a session starts, for example the date.

Change one line in `systemPrompt`, start the starter again, and watch what changes. For example, remove the line for `edit`, and ask the agent to change one word in a file.

Bring back three things that production prompts tell the model and the starter does not. Also bring back your one change and what it did.

## Bonus topics

Each bonus topic prepares one feature in Part 3 of the lab assignment.

### 5. Web search

The knowledge of a model ends with its training data. A coding agent gives the model tools that search the web and read pages. Which search API is the best choice for your harness?

Start with your own coding agent. Ask it which web tools it has, and ask for the description and the parameters of each tool. Then compare these candidates:

- [Exa](https://exa.ai/docs/reference/search)
- [Tavily](https://docs.tavily.com/documentation/api-reference/endpoint/search)
- [Brave Search API](https://api-dashboard.search.brave.com/documentation)
- The [web search tool](https://openrouter.ai/docs/guides/features/server-tools/web-search) of OpenRouter, which works with your OpenRouter key

You can add a candidate that your agent finds. The model remembers old prices, so give the agent the pricing page of each candidate.

Find out:

- What one search call returns: links, short texts, the text of the pages, or a finished answer.
- Whether the API can also return the text of one page from its URL. That is the job of a fetch tool.
- Who runs the search: the harness on your machine, or the provider on its servers. What changes for the harness?
- What 1,000 searches cost, what the free plan includes, and what you need to get a key.

Make one search call with `curl` to your first choice. Keep the API key in an environment variable. Do not put the key in a prompt, because the session log saves each prompt.

Bring back a table with one row for each candidate, your recommendation, and one search call that works.

### 6. Skills

A skill is a folder with a `SKILL.md` file that holds the instructions for one type of task. The harness does not put the full skill in the context, which is the text that the model reads on each request. How does the model know that a skill exists, and when does the agent read it?

Find out:

- What are skills and how are they defined.
- What the context holds about a skill before the agent uses it, and what the context holds after.
- Who decides that a skill loads, and which text that decision uses.
- Where your agent looks for skills.
- Which instructions belong in a skill, and which belong in `AGENTS.md`.

Write one small skill for your coding agent. Enter one prompt that matches its description, and one prompt that does not. Watch whether the agent reads `SKILL.md` each time.

Bring back the skill, and show the moment when the agent read it.

## References

Use this table when you compare coding agents. The official docs describe what an agent does. The source code shows how the agent does it. Copilot CLI and Claude Code are closed source, so their public repositories do not have the source of the CLI.

| Agent | Official docs | GitHub |
| --- | --- | --- |
| Pi | [Pi docs](https://docs.pi.dev/) | [Source code](https://github.com/earendil-works/pi) |
| Codex | [Codex CLI docs](https://learn.chatgpt.com/docs/codex/cli) | [Source code](https://github.com/openai/codex) |
| OpenCode | [OpenCode docs](https://opencode.ai/docs/) | [Source code](https://github.com/anomalyco/opencode) |
| GitHub Copilot CLI | [Copilot CLI docs](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) | [Public repo](https://github.com/github/copilot-cli), no CLI source |
| Claude Code | [Claude Code docs](https://code.claude.com/docs/en/overview) | [Public repo](https://github.com/anthropics/claude-code), no CLI source |
