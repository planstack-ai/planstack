# Getting Started

A step-by-step guide to adopting Plan Stack in your project.

## Why Plan Stack?

**The Problem:**

- Documentation gets outdated or never written
- Knowledge is lost when team members leave
- AI coding assistants start from zero every time
- Code reviews lack context about original intent

**The Solution:**

Plan Stack creates a self-reinforcing knowledge loop where implementation plans are accumulated, referenced, and reviewed. Each new task builds on past knowledge.

```
Research → Plan → Implement → Review → (repeat)
```

**Key Principles:**

1. **Always follow Research → Plan → Implement** — Never skip the planning phase
2. **Save Claude Code's plan mode output as markdown** — Plans become permanent artifacts
3. **Include plans in pull requests** — PRs contain both code and the reasoning behind it
4. **Automated review references plans** — Claude GitHub Actions compares implementation against intent
5. **Stack plans over time** — Each plan references past plans, building institutional knowledge

**Why This Works:**

- Reduces rework in AI-assisted development by aligning on approach before coding
- Scales with codebase complexity — both humans and AI can navigate large codebases through accumulated context
- Plans cost nearly zero with modern AI models — the reason not to document has disappeared

---

## 1. Create Directory Structure

Create the following directories in your project root:

```bash
mkdir -p docs/plans
mkdir -p docs/templates
```

## 2. Add Templates

Place the following templates in `docs/templates/`:

- `plan-template.md` - Template for implementation plans
- `review-template.md` - Template for reviews

## 3. Instruct Your AI Assistant

Before starting implementation, give your AI assistant these instructions:

```
Before implementing a new feature, check docs/plans/ for similar past implementations.
Reference relevant plans and create a new plan for the current task.
```

## 4. Workflow

### Research

Have the AI search `docs/plans/` for related past implementation plans.

### Plan

AI generates an implementation plan. Human reviews and approves.

```bash
# Plan file naming convention
docs/plans/YYYYMMDD_feature_name.md
```

### Implement

Write code following the approved plan.

### Review

AI compares the plan vs actual implementation, detecting any drift.

## 5. Continuous Improvement

- Never delete plans—accumulate them
- Reference past plans when implementing similar features
- Apply review insights to future plans

## Next Steps

- [Directory Structure](directory-structure.md)
- [Templates](templates/)
