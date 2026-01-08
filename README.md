# You are losing context every time you use AI to code.

Six months later:
- You don't remember why this was implemented this way
- The AI confidently suggests breaking changes
- Fixing a bug requires re-reading dozens of files

This is not a tooling problem. This is a **context preservation problem**.

---

## The Real Problem with AI-assisted Development

The code survives. The reasoning doesn't.

Every feature you build with AI involves:
- Reading existing code to understand patterns
- Exploring approaches that don't work
- Making dozens of micro-decisions

When you're done, only the code remains. The *judgment* behind it vanishes.

Next time you (or anyone else) touch that code:
- The AI starts from zero
- You re-investigate the same questions
- You risk breaking things the original implementation carefully avoided

**This isn't because AI is bad. It's because nothing captures the research.**

---

## Why Existing Practices Fail

| Approach | Why It Fails |
|----------|--------------|
| Documentation | Written late, or never. Outdated within weeks. |
| Code comments | Too local. Explains "what", not "why this approach". |
| Long AI sessions | Context degrades before it overflows. Quality drops silently. |

The problem is structural, not motivational. You can't document what you've already forgotten.

---

## Plan Stack

**A development workflow where implementation plans are first-class artifacts.**

Plans are written *before* coding, reviewed by humans, and accumulated as long-term memory for both humans and AI.

```
Research → Plan → Implement → Review → (repeat)
```

Each new task references past plans. Knowledge compounds. Context is never lost.

---

## Plans are Distilled Research

Implementing a feature requires reading thousands of lines of code, exploring dead ends, and making dozens of micro-decisions.

A plan captures all of this in 200-300 lines.

Six months later, when a bug appears or requirements change, you (and Claude) get the benefit of that original research—without re-consuming the original context.

**Without a plan:** Re-read 50 files, re-discover edge cases, re-make decisions.
**With a plan:** Read 300 lines, understand intent, modify with confidence.

---

## Context Degrades Before It Overflows

200K tokens sounds huge, but complex tasks fill it fast.

As context fills, Claude gradually forgets earlier instructions and becomes repetitive. The problem isn't hitting the limit—it's degradation well before the limit.

**The fix:**
1. Research until you have a clear approach
2. Save plan to file
3. `/clear`
4. "Read docs/plans/xxx.md and implement"

You restart at 0% with all knowledge preserved.

Without a plan, `/clear` means starting over.
With a plan, it's a fresh start with full context.

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
