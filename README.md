# Plan Stack

**AI-native development workflow that compounds knowledge over time.**

*Stop losing context. Start stacking plans.*

## What is Plan Stack?

Plan Stack is a development methodology for the AI era where implementation plans are accumulated, referenced, and reviewed—creating a self-reinforcing knowledge loop.

**Research → Plan → Implement → Review → (repeat)**

## Why Plan Stack?

### Plans are distilled research

Implementing a feature requires reading thousands of lines of code, exploring dead ends, and making dozens of micro-decisions. A plan captures all of this in 200-300 lines.

Six months later, when a bug appears or requirements change, you (and Claude) get the benefit of that original research without re-consuming the original context.

**Without a plan:** Re-read 50 files, re-discover edge cases, re-make decisions.
**With a plan:** Read 300 lines, understand intent, modify with confidence.

### Context degrades before it overflows

200K tokens sounds huge, but complex tasks fill it fast. As context fills, Claude gradually forgets earlier instructions and becomes repetitive. The problem isn't hitting the limit—it's degradation well before the limit.

**The solution:**
1. Research until you have a clear approach
2. Save plan to file
3. `/clear`
4. "Read docs/plans/xxx.md and implement"

You restart at 0% with all knowledge preserved. Without a plan, `/clear` means starting over. With a plan, it's a fresh start with full context.

## The Problem

- Documentation gets outdated or never written
- Knowledge is lost when team members leave
- AI coding assistants start from zero every time
- Code reviews lack context about intent

## Why Now?

Plan Stack is built on a key insight: **Claude Opus-level reasoning makes high-quality plans practical.**

Previous AI assistants could generate text, but not reliable implementation plans. They lacked the ability to:
- Investigate codebases thoroughly
- Understand architectural context
- Produce plans worth reviewing

With Claude Code, the AI can research your codebase, reference past decisions, and generate plans that humans actually want to approve. The bottleneck shifts from "writing documentation" to "reviewing it."

The reason not to document has disappeared.

## The Solution

| Phase | What Happens |
|-------|--------------|
| **Research** | AI checks `docs/` for similar past implementations |
| **Plan** | AI generates implementation plan, human reviews |
| **Implement** | Code with the plan as guide |
| **Review** | AI compares plan vs implementation, detects drift |

Plans accumulate in `docs/plans/`. Each new task references past plans.
Knowledge compounds. Context is never lost.

## Context Management

When context fills up:

| Option | Pros | Cons |
|--------|------|------|
| `/compact` | Quick, keeps some context | Lossy, unpredictable what survives |
| `/clear` + read plan | Precise, you control what loads | Requires plan to exist |

With Plan Stack, prefer `/clear` + plan. `/compact` is for emergencies before a plan exists.

## Quick Start

[Getting Started](docs/getting-started.md)

**The key instruction in CLAUDE.md:**

```
Search docs/plans/ for similar past implementations before planning.
```

This single line creates the self-reinforcing loop:
- Claude checks `docs/` first
- Finds distilled context (hundreds of tokens)
- Skips reading raw code (tens of thousands of tokens)

Without it, Claude starts from raw code every time. With it, Claude leverages accumulated knowledge automatically.

## Documentation

- [Directory Structure](docs/directory-structure.md)
- [Templates](docs/templates/)
- [Example Plans](examples/plans/)

## FAQ

**"Won't 1000+ plan files become unmanageable?"**

No.
- Each task references 1-2 plans, not all
- `ls docs/plans/completed/ | grep feature_name` finds what you need
- 300 lines x 1000 files = 30MB (trivial)
- Filesystem is enough—no database needed

The cost of deletion: A bug surfaces 6 months later, and the reasoning behind the original implementation is gone. Re-research costs 10x more than keeping the file.

## Origin

Created by [X-HACK Inc.](https://x-and-hack.com) Proven with a 10-engineer team on a 500-table Rails application over 2 months.

## License

MIT
