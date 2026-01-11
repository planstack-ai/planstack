# Plan Stack

**Stop stuffing context. Start engineering it.**

A development workflow built on Context Engineering principles
for reliable AI-assisted system development.

[See the Principles](#the-three-principles-of-context-engineering) · [See the Workflow](#plan-stack-these-principles-in-practice)

---

## The Problem: Context Stuffing Doesn't Scale

In two years, context windows grew 62×—from 32K to 2M tokens.

The intuition was obvious: *"If everything fits, just put everything in."*

It doesn't work.

- **Lost in the Middle**: Information in the middle of long contexts is systematically ignored (Liu et al., 2023)
- **The 75% Rule**: Claude Code's quality *improved* when Anthropic limited context usage to 75%—leaving 25% empty
- **Capacity ≠ Capability**: A 2M-token window is not 2M tokens of understanding

The uncomfortable truth:

> **A context window is not storage. It is cognitive load.**

---

## Why Existing Practices Fail

| Approach | Why It Breaks |
|----------|---------------|
| **Long chat sessions** | Context degrades long before the token limit. Earlier instructions fade. The model becomes repetitive or contradictory. |
| **Dump the whole repo** | Signal drowns in noise. The model misinterprets architectural intent because it can't distinguish core from peripheral. |
| **Detailed documentation** | More detail ≠ better understanding. Comprehensive docs produce unfocused responses that drift from the actual question. |
| **RAG everything** | Retrieval finds *related* content, not *relevant* content. Without curation, you're still stuffing context—just automatically. |

These approaches share a common assumption:

> *"If the model can access it, the model can use it."*

This assumption is wrong.

Access is not understanding. Retrieval is not reasoning.
The bottleneck was never capacity—it was **curation**.

---

## The Three Principles of Context Engineering

### Principle 1: Isolation

**Don't dump the monolith. Scope by responsibility.**

Provide the smallest effective context for the task—not the smallest *file*, but the smallest *bounded context*.

For "Add OAuth2 authentication," the model needs:
- `User` model, `SessionController`, `routes.rb`, auth middleware

It does *not* need:
- Billing module, CSS, unrelated endpoints, other test fixtures

Ask: *"What is the minimum context required to solve this specific problem?"*

---

### Principle 2: Chaining

**Pass artifacts, not histories.**

Break work into stages. Each stage receives the *output* of the previous stage—not the entire conversation.
```
Plan → Execute → Reflect
```

- **Plan**: Produces a structured implementation plan
- **Execute**: Receives *only the plan*, generates code
- **Reflect**: Reviews code against the plan in fresh context

This keeps signal density high and context fresh.

Ask: *"Can I decompose this into stages that pass summaries, not transcripts?"*

---

### Principle 3: Headroom

**Never run at 100% capacity. Reserve space to reason.**

Token limits cover input *and* output combined. Stuffing 195K into a 200K window leaves almost no room for the model to think.

Claude Code's quality improved dramatically when Anthropic enforced the 75% rule—not despite the constraint, but *because of it*.

Ask: *"Have I left enough space for the model to think—not just respond?"*

---

## Plan Stack: These Principles in Practice

Plan Stack is a development workflow that implements all three principles simultaneously.

### The Workflow

| Phase | What Happens | Principles Applied |
|-------|--------------|-------------------|
| **Research** | AI checks `docs/plans/` for similar past implementations | **Isolation**: Starts from curated context, not raw codebase |
| **Plan** | AI generates implementation plan, human reviews | **Headroom**: No implementation yet—reasoning gets full capacity |
| **Execute** | Code with the plan as guide | **Chaining**: Receives plan artifact, not conversation history |
| **Review** | AI compares plan vs implementation, detects drift | **Isolation + Chaining**: Fresh context, artifact-based evaluation |

### Why Plans Are First-Class Artifacts

Implementing a feature involves:
- Reading thousands of lines of code
- Exploring multiple approaches
- Hitting dead ends
- Making dozens of small decisions

A good plan captures all of that in **200–300 lines**.

Six months later:

| Without a plan | With a plan |
|----------------|-------------|
| Re-read 50 files | Read one file |
| Re-discover everything | Understand intent |
| Re-make decisions | Modify with confidence |

Plans are **curated context**—expensive research distilled into something both humans and AI can reliably consume.

### The `/clear` Pattern

Context degrades long before it overflows.

Plan Stack embraces this:

1. Research until the approach is clear
2. Write the plan
3. Clear the context
4. Resume from the plan

You restart at 0% context—**without starting over**.

This is Chaining + Headroom in action: explicit handoff through artifacts, fresh context for each phase.

---

## Why Now?

Plan Stack is built on a key insight:

> **Claude Opus-level reasoning makes high-quality plans practical.**

Previous AI assistants could generate text, but not reliable implementation plans. They lacked:
- Thorough codebase investigation
- Architectural context understanding
- Structured output that humans actually want to review

With models like Claude Opus 4 / Sonnet 4, the AI can:
- Research your codebase deeply
- Reference past decisions from `docs/plans/`
- Generate plans worth approving

The bottleneck shifts from *"writing documentation"* to *"reviewing it."*

**The reason not to document has disappeared.**

---

## Quick Start

[Getting Started →](docs/getting-started.md)

---

## Documentation

- [Directory Structure](docs/directory-structure.md)
- [Templates](docs/templates/)
- [Example Plans](examples/plans/)
- [Real-world docs/ Structure Guide](examples/docs-structure-guide.md)

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