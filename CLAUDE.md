# CLAUDE.md

## Project Overview

Plan Stack is a development methodology for the AI era. This repository aims to share this approach with the world.

## Background

This methodology was developed while managing a large-scale Rails project:
- 500+ database tables
- 300,000+ lines of code
- 10-engineer team
- 2 months of proven usage

## Problem We Solved

In AI-assisted development, three problems kept recurring:

1. **Review overhead** — Reviewers lacked context about implementation intent
2. **Implementation rework** — AI would write code that needed significant revision
3. **AI utilization** — AI assistants started from zero every session, unable to leverage past decisions

## The Insight

With models like Claude, generating quality implementation plans costs nearly zero. **The reason not to document has disappeared.**

## The Solution: Plan Stack

A workflow where plans are accumulated, referenced, and reviewed:

```
Research → Plan → Implement → Review → (repeat)
```

Key elements:
- Save Claude Code's plan mode output as markdown in `docs/plans/`
- Include plans in pull requests
- Automated review (Claude GitHub Actions) compares implementation against plans
- Each new plan references past plans — knowledge compounds

## Why This Matters

- **Reduces rework** — Align on approach before writing code
- **Scales with complexity** — Both humans and AI navigate large codebases through accumulated context
- **Integrates AI naturally** — AI becomes a participant in institutional knowledge, not a stateless tool

## Mission

Share this methodology globally so that teams everywhere can benefit from AI-native development workflows that compound knowledge over time.

## Repository Structure

```
docs/
├── plans/                  # Implementation plans (with completed/ for archives)
├── architecture/           # Design & architecture docs
├── features/               # Feature documentation by domain
├── guides/                 # Developer guides & how-tos
├── templates/              # Plan and review templates
├── getting-started.md      # Introduction and setup guide
└── directory-structure.md  # Recommended directory organization
```

## Development Guidelines

- All documentation should be in English
- Keep explanations concise and practical
- Focus on the "why" — the methodology matters more than specific tooling
