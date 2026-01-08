# Plan Stack

**AI-native development workflow that compounds knowledge over time.**

## What is Plan Stack?

Plan Stack is a development methodology for the AI era where implementation plans are accumulated, referenced, and reviewed—creating a self-reinforcing knowledge loop.

**Research → Plan → Implement → Review → (repeat)**

## The Problem

- Documentation gets outdated or never written
- Knowledge is lost when team members leave
- AI coding assistants start from zero every time
- Code reviews lack context about intent

## The Solution

| Phase | What Happens |
|-------|--------------|
| **Research** | AI checks `docs/` for similar past implementations |
| **Plan** | AI generates implementation plan, human reviews |
| **Implement** | Code with the plan as guide |
| **Review** | AI compares plan vs implementation, detects drift |

Plans accumulate in `docs/plans/`. Each new task references past plans.
Knowledge compounds. Context is never lost.

## Why Now?

With models like Claude Opus, generating quality plans costs nearly zero.
The reason not to document has disappeared.

## Quick Start

→ [Getting Started](docs/getting-started.md)

## Documentation

- [Directory Structure](docs/directory-structure.md)
- [Templates](docs/templates/)

## Origin

Created by [X-HACK Inc.](https://x-and-hack.com) Proven with a 10-engineer team on a 500-table Rails application over 2 months.

## License

MIT