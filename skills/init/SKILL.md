---
name: init
description: Scaffold Plan Stack workflow in the current project. Creates docs/plans/, templates, docs/README.md, .claude/settings.json, docs-navigator agent, and adds Plan Stack section to CLAUDE.md.
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: []
---

# Plan Stack Init

Set up the Plan Stack workflow in the current project. This is idempotent — safe to run multiple times.

## Steps

### 1. Create directories

```bash
mkdir -p docs/plans/completed
mkdir -p docs/templates
mkdir -p .claude/agents
mkdir -p .claude/agent-memory/docs-navigator
```

### 2. Create template files

Read the following template files from this skill's directory and write them to the project:

- Read `templates/plan-template.md` from the skill directory → Write to `docs/templates/plan-template.md`
- Read `templates/review-template.md` from the skill directory → Write to `docs/templates/review-template.md`

**Skip if the file already exists.** Do not overwrite.

### 3. Create docs/README.md

Create `docs/README.md` as a navigation hub for the project's documentation. The content should list all documents under `docs/` with links and brief descriptions.

If `docs/README.md` already exists, skip.

Example:

```markdown
# Documentation

Project documentation index.

## Guides

| Document | Description |
|----------|-------------|
| [Templates](templates/) | Plan and review templates |

## Plans

- [Active plans](plans/)
- [Completed plans](plans/completed/)
```

Adapt the content to what actually exists in `docs/` at the time of generation.

### 4. Create docs-navigator agent

Read `templates/docs-navigator.md` from the skill directory → Write to `.claude/agents/docs-navigator.md`

**Skip if the file already exists.**

### 5. Configure .claude/settings.json

If `.claude/settings.json` exists, add `"plansDirectory": "docs/plans"` to it (merge, don't overwrite other settings).

If it does not exist, create it:

```json
{
  "plansDirectory": "docs/plans"
}
```

### 6. Add Plan Stack section to CLAUDE.md

If `CLAUDE.md` exists at the project root, check if it already contains a "Plan Stack" section. If not, append the following section:

```markdown

## Plan Stack Workflow

Before implementing any feature or fix:
1. Search `docs/plans/` for similar past implementations
2. Enter Plan Mode (Shift+Tab twice in Claude Code)
3. Create implementation plan in `docs/plans/YYYYMMDD_feature_name.md`
4. Get human approval before coding
5. Exit Plan Mode and implement

After implementation:
- AI review compares plan vs code
- Move completed plan to `docs/plans/completed/`

Reference: https://github.com/planstack-ai/planstack
```

If `CLAUDE.md` does not exist, create it with the section above.

### 7. Report

After completion, display a summary:

```
Plan Stack initialized!

  docs/README.md           — Documentation index
  docs/plans/              — Implementation plans
  docs/plans/completed/    — Archived plans
  docs/templates/          — Plan & review templates
  .claude/settings.json    — plansDirectory configured
  .claude/agents/          — docs-navigator agent
  CLAUDE.md                — Plan Stack workflow added

Next: Enter Plan Mode (Shift+Tab ×2) and start planning.
```

List which files were created vs skipped (already existed).
