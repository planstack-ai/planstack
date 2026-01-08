# You are losing context every time you use AI to code.

Six months after a feature was implemented:

- You don't remember **why** it was designed this way
- The AI confidently suggests changes that break invariants
- Fixing a bug requires re-reading dozens of files
- You hesitate to touch the code because the original intent is gone

The code exists.
The tests exist.
**The reasoning does not.**

This is not a tooling problem.
This is a **context preservation problem**.

---

## The Real Problem with AI-assisted Development

AI coding assistants are extremely good at:
- Reading code
- Writing code
- Refactoring code

They are extremely bad at one thing:

**Recovering the original intent behind an implementation.**

That intent usually lives in:
- Temporary research
- Dead ends that were explored and rejected
- Trade-offs that were discussed but never written down
- Mental context that disappears after `/clear`

Once that context is gone, both humans and AI are forced to:
- Re-read large parts of the codebase
- Re-discover edge cases
- Re-make the same decisions again

This cost repeats forever.

---

## Why Existing Practices Don't Solve This

| Approach | Why it fails |
|----------|--------------|
| Documentation | Written late, outdated quickly, or never read |
| Code comments | Too local — they explain *what*, not *why* |
| Long AI sessions | Context degrades long before the token limit |
| Code reviews | Capture correctness, not original reasoning |

The problem is structural.

Implementation decisions are made **before** code exists,
but most practices try to document them **after** the fact.

---

## Introducing Plan Stack

**Plan Stack** is an AI-native development workflow that treats
**implementation plans as first-class artifacts**.

Instead of letting research and decisions disappear,
they are captured in lightweight plans and accumulated over time.

These plans become:
- Long-term memory for humans
- External context for AI
- A reliable starting point after `/clear`

---

## Plans Are Distilled Research

Implementing a feature usually involves:
- Reading thousands of lines of code
- Exploring multiple approaches
- Hitting dead ends
- Making dozens of small but important decisions

A good plan captures all of that in **200–300 lines**.

Six months later:

- **Without a plan**
  Re-read 50 files. Re-discover everything. Re-make decisions.

- **With a plan**
  Read one file. Understand intent. Modify with confidence.

Plans compress large, expensive context into something both
humans and AI can reliably consume.

---

## Context Degrades Before It Overflows

200K tokens sounds huge.

In practice:
- Large codebases fill it quickly
- Earlier instructions fade
- The AI becomes repetitive or loses constraints

The real problem isn't hitting the limit —
it's **losing fidelity long before you do**.

Plan Stack embraces this reality instead of fighting it.

1. Research until the approach is clear
2. Write the plan
3. Clear the context
4. Resume from the plan

You restart at 0% context — without starting over.

---

## The One Rule That Makes Everything Work

Add this line to your `CLAUDE.md`:

```
Search docs/plans/ for similar past implementations before planning.
```

This single line creates the self-reinforcing loop:
- Claude checks `docs/` first
- Finds distilled context (hundreds of tokens)
- Skips reading raw code (tens of thousands of tokens)

Without it, Claude starts from raw code every time.
With it, Claude leverages accumulated knowledge automatically.

---

## The Workflow

| Phase | What Happens |
|-------|--------------|
| **Research** | AI checks `docs/` for similar past implementations |
| **Plan** | AI generates implementation plan, human reviews |
| **Implement** | Code with the plan as guide |
| **Review** | AI compares plan vs implementation, detects drift |

Plans accumulate in `docs/plans/`. Each new task references past plans.

---

## Why Now?

Plan Stack is built on a key insight: **Claude Opus-level reasoning makes high-quality plans practical.**

Previous AI assistants could generate text, but not reliable implementation plans. They lacked the ability to:
- Investigate codebases thoroughly
- Understand architectural context
- Produce plans worth reviewing

With Claude Code, the AI can research your codebase, reference past decisions, and generate plans that humans actually want to approve.

The bottleneck shifts from "writing documentation" to "reviewing it."

**The reason not to document has disappeared.**

---

## Quick Start

[Getting Started →](docs/getting-started.md)

---

## Documentation

- [Directory Structure](docs/directory-structure.md)
- [Templates](docs/templates/)
- [Example Plans](examples/plans/)

---

## FAQ

**"Won't 1000+ plan files become unmanageable?"**

No.
- Each task references 1-2 plans, not all
- `ls docs/plans/completed/ | grep feature_name` finds what you need
- 300 lines × 1000 files ≈ 30MB (trivial)
- Filesystem is enough—no database needed

The cost of deletion: A bug surfaces 6 months later, and the reasoning behind the original implementation is gone. Re-research costs 10x more than keeping the file.

---

## Origin

Created by [X-HACK Inc.](https://x-and-hack.com)

Proven with a 10-engineer team on a 500-table Rails application over 2 months.

---

## License

MIT
