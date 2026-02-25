# Architecture

This document explains the core architecture and principles behind Plan Stack.

## Overview

Plan Stack is built on **Context Engineering** principles—a systematic approach to managing the information that AI models receive during development tasks.

```
┌─────────────────────────────────────────────────────────────┐
│                     Plan Stack Workflow                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────┐ │
│   │ Research │───>│   Plan   │───>│ Execute  │───>│Review│ │
│   └──────────┘    └──────────┘    └──────────┘    └──────┘ │
│        │               │               │              │     │
│        v               v               v              v     │
│   ┌──────────────────────────────────────────────────────┐ │
│   │                   docs/plans/                         │ │
│   │              (Accumulated Knowledge)                  │ │
│   └──────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## The Three Principles

### 1. Isolation

**Don't dump the monolith. Scope by responsibility.**

Provide the smallest effective context for the task—not the smallest *file*, but the smallest *bounded context*.

| Good Context | Bad Context |
|-------------|-------------|
| Files directly related to the feature | Entire repository |
| Relevant past plans | All plans ever created |
| Specific API endpoints | All API documentation |

**Ask:** *"What is the minimum context required to solve this specific problem?"*

### 2. Chaining

**Pass artifacts, not histories.**

Break work into stages. Each stage receives the *output* of the previous stage—not the entire conversation.

```
┌──────────┐     artifact      ┌──────────┐     artifact      ┌──────────┐
│   Plan   │ ───────────────> │ Execute  │ ───────────────> │  Review  │
│  Phase   │   (plan.md)      │  Phase   │   (code + plan)  │  Phase   │
└──────────┘                   └──────────┘                   └──────────┘
     │                              │                              │
     │ fresh context               │ fresh context               │ fresh context
     └──────────────────────────────┴──────────────────────────────┘
```

This keeps signal density high and context fresh.

**Ask:** *"Can I decompose this into stages that pass summaries, not transcripts?"*

### 3. Headroom

**Never run at 100% capacity. Reserve space to reason.**

Token limits cover input *and* output combined. Stuffing 195K into a 200K window leaves almost no room for the model to think.

| Context Usage | Quality |
|--------------|---------|
| 75% or less | Optimal reasoning space |
| 75-90% | Reduced quality |
| 90%+ | Severely degraded output |

**Ask:** *"Have I left enough space for the model to think—not just respond?"*

## Workflow Architecture

### Phase 1: Research

Search `docs/plans/` for similar past implementations before starting new work.

**Purpose:** Start from curated context, not raw codebase.

### Phase 2: Plan

Generate a structured implementation plan and get human approval.

**Purpose:** No implementation yet—reasoning gets full capacity.

### Phase 3: Execute

Write code with the plan as guide.

**Purpose:** Receives plan artifact, not conversation history.

### Phase 4: Review

Compare plan vs implementation, detect drift.

**Purpose:** Fresh context, artifact-based evaluation.

## Plan as First-Class Artifact

A plan captures:
- Research findings across thousands of lines of code
- Exploration of multiple approaches
- Dead ends and why they were rejected
- Dozens of small decisions

All compressed into **200–300 lines**.

### Why Plans Matter

| Without a Plan | With a Plan |
|----------------|-------------|
| Re-read 50 files | Read one file |
| Re-discover everything | Understand intent |
| Re-make decisions | Modify with confidence |

Plans are **curated context**—expensive research distilled into something both humans and AI can reliably consume.

## The `/clear` Pattern

Context degrades long before it overflows.

1. Research until the approach is clear
2. Write the plan
3. Clear the context (`/clear`)
4. Resume from the plan

You restart at 0% context—**without starting over**.

## Integration Points

### With Git

- Plans are committed alongside code
- PRs include both implementation and reasoning
- History preserves decision context

### With CI/CD

- Automated review compares plan vs code
- Drift detection catches deviations
- Plans inform future implementations

### With Team Workflow

- Human approval gates implementation
- Plans become onboarding material
- Knowledge compounds over time

---

## Related

- [Getting Started](getting-started.md)
- [Directory Structure](directory-structure.md)
- [Features](features.md)
