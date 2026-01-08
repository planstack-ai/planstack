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
6. **Plans are save points** — Context windows fill up. Saved plans let you `/clear` and restore with "read the plan and continue."

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

## 3. Configure CLAUDE.md

Add the following to your project's `CLAUDE.md` to instruct Claude Code:

```markdown
## Plan Stack Workflow

Before implementing any feature or fix:
1. Search docs/plans/ for similar past implementations
2. Enter Plan Mode (Shift+Tab twice in Claude Code)
3. Create implementation plan in docs/plans/YYYYMMDD_feature_name.md
4. Get human approval before coding
5. Exit Plan Mode and implement

After implementation:
- AI review compares plan vs code
- Move completed plan to docs/plans/completed/
```

## 4. Workflow

### Step 1: Research

Before any implementation, search for similar past work:

```
Search docs/plans/ for implementations related to [your feature].
```

### Step 2: Plan

Enter Plan Mode in Claude Code (`Shift+Tab` twice) and create a plan:

```bash
# Plan file naming convention
docs/plans/YYYYMMDD_feature_name.md

# Examples
docs/plans/20250108_user_authentication.md
docs/plans/20250108_csv_export.md
```

The plan should include:
- Task overview
- Research findings (related past plans, affected files)
- Implementation approach
- Files to modify

See [real examples](../examples/plans/) for reference.

**Wait for human approval before proceeding.**

### Step 3: Implement

Exit Plan Mode and implement following the approved plan.

### Step 4: Review

AI compares the plan vs actual implementation:
- What was completed as planned?
- What deviated (drift) and why?
- Lessons learned for future plans

Archive completed plans:
```bash
mv docs/plans/20250108_feature.md docs/plans/completed/
```

## 5. Continuous Improvement

- Never delete plans—accumulate them
- Reference past plans when implementing similar features
- Apply review insights to future plans

---

## For Existing Projects

Adopting Plan Stack on a large, existing codebase? Start with finding problems, not with "let's do Plan Stack."

```
Audit → Triage → Plan → Implement → Review
```

1. **Audit** — Have Claude analyze your codebase and identify issues (tech debt, performance, security)
2. **Triage** — Convert findings to GitHub Issues. Human prioritizes.
3. **Plan** — Pick top priority issue, create implementation plan
4. **Implement** — Opus implements following the plan
5. **Review** — Compare plan vs code, close the issue

**Why this works:**
- "Find problems" is easier than "adopt a methodology"
- Uses GitHub Issues you already have
- Human focuses on prioritization (the essential work)
- Plans accumulate naturally with each cycle

---

## For Onboarding

**How fast new members become productive is one of the most important metrics for a team.**

Many teams leave onboarding to chance. Plan Stack treats it as a first-class concern.

With Plan Stack, new members learn by writing plans:

1. Investigate assigned area with Claude (`docs/` provides existing context)
2. Write a plan — even for a small fix
3. Senior reviews intent before code
4. Implement after approval

Questions become documented answers. Each plan becomes a reference for future members. As a side effect, senior engineers stop repeating the same explanations — Claude and accumulated docs handle it.

---

## Next Steps

- [Directory Structure](directory-structure.md)
- [Templates](templates/)
