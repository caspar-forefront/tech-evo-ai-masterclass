# Labs

- 30 min presentation
- 30 min Q&A, discussion
- 45 min break out groups
    - Exercises
- 15 min Lab

## What should they learn?

- How a coding harness work
- How to use an agent to explore and understand a code base
- What is Spec Driven Development
- What are SKILLS
- What MCPs
- Models & Tokenomics
    - Tips & Tricks
        - Small sessions
        - Reduce context
    - OpenAI, Anthropic, Google
    - Open Weight (DeepSeek, Kimi)


## TODO

- Send material to Martin
- Write a new presentation
- Write lab description
- Write breakout exercises
- API Keys
- Provide examples for exercise
    - How to explore a code base
        - Do my own walk through, and show how I do it.
        - Then come up with examples where they can try to figure out something in a code base.
        - How to present it. This could also be done by Marshall
        - Live walkthrough: explore the [Pi codebase](https://github.com/earendil-works/pi). After Pi’s `read` tool returns, how does the result reach the next model request? What happens when the model replies without another tool call? Start in [`agent-loop.ts`](https://github.com/earendil-works/pi/blob/main/packages/agent/src/agent-loop.ts).
    - [excercises.md](../docs/coding-harness/07-exercises.md)
    - UI, Terminal vs Web
    - Provide links to other open source harnesses, OpenCode, Pi, ...?
    - Bootstrapping
