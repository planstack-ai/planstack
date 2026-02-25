# Features

This document describes the key features and capabilities of Plan Stack.

## Core Features

### 1. Plan-First Development

Every implementation starts with a plan.

```
User Request → Research → Plan → Approval → Execute → Review
```

**Benefits:**
- Align on approach before writing code
- Reduce rework from misaligned implementations
- Create reviewable artifacts for every change

### 2. Knowledge Accumulation

Plans accumulate in `docs/plans/`, creating institutional knowledge.

```
docs/plans/
├── 20250115_user_authentication.md
├── 20250120_payment_integration.md
├── 20250201_api_rate_limiting.md
└── completed/
    ├── 20241218_staff_message.md
    └── 20241220_signup_profile.md
```

**Benefits:**
- New implementations reference past decisions
- Onboarding accelerates with accumulated context
- AI assistants leverage historical knowledge

### 3. Context-Aware AI Assistance

AI agents start from curated context, not raw codebase.

| Traditional Approach | Plan Stack Approach |
|---------------------|---------------------|
| Dump entire repo | Load relevant plans |
| Start from zero | Start from past decisions |
| Lose context on `/clear` | Restore from plans |

**Benefits:**
- Higher quality AI outputs
- Consistent implementation patterns
- Preserved decision reasoning

### 4. Structured Review Process

Reviews compare plan vs implementation, detecting drift.

**Review Checklist:**
- [ ] Implementation matches plan intent
- [ ] Deviations are documented with rationale
- [ ] Lessons learned are captured

**Benefits:**
- Focused reviews on intent, not just code
- Drift tracking prevents silent divergence
- Continuous improvement through feedback

## Workflow Features

### Research Phase

Search past plans before starting new work.

```bash
# Find related implementations
ls docs/plans/ | grep authentication
```

**What to look for:**
- Similar feature implementations
- Architectural decisions that apply
- Patterns that worked (or didn't)

### Plan Phase

Create structured implementation plans.

**Plan includes:**
1. Task overview and context
2. Research findings
3. Implementation approach
4. Files to modify
5. Verification plan

Use [plan template](../templates/plan-template.md) for consistency.

### Execute Phase

Implement with the plan as guide.

**Best practices:**
- Follow the approved approach
- Document deviations as they occur
- Keep changes scoped to the plan

### Review Phase

Compare plan vs actual implementation.

**Review dimensions:**
- Completeness: Was everything implemented?
- Drift: What changed from the plan?
- Quality: Does the code meet standards?
- Lessons: What should we remember?

## Team Features

### Human-in-the-Loop

Approval gates ensure human oversight.

```
Plan Created → Human Review → Approved/Rejected → Execute
```

**Control points:**
- Plan approval before implementation
- Code review after implementation
- Drift review before merge

### Onboarding Acceleration

New members learn by writing plans.

**Onboarding workflow:**
1. Investigate assigned area with AI assistance
2. Write a plan for a small fix
3. Senior reviews intent before code
4. Implement after approval
5. Review captures lessons

**Result:** Questions become documented answers.

### Asynchronous Collaboration

Plans enable async review and handoff.

**Use cases:**
- Review plans in different timezone
- Hand off implementation to another developer
- Resume work after interruption

## Integration Features

### GitHub Integration

Plans integrate with GitHub workflow.

- Include plans in pull requests
- Reference plans in commit messages
- Link issues to implementation plans

### CI/CD Integration

Automated review via Claude GitHub Actions.

```yaml
# Example workflow
on: pull_request
jobs:
  review:
    - Compare implementation vs plan
    - Flag drift for human review
    - Generate review summary
```

### IDE Integration

Work with Claude Code for seamless experience.

**Key shortcuts:**
- `Shift+Tab` twice: Enter Plan Mode
- `/clear`: Reset context
- Resume: "Read the plan and continue"

## Advanced Features

### Plan Promotion

Promote important plans to permanent documentation.

| Destination | Criteria |
|-------------|----------|
| `architecture/` | Affects 3+ features or defines system boundaries |
| `features/` | Referenced by multiple future plans |

### Existing Project Adoption

Start with problems, not methodology.

```
Audit → Triage → Plan → Implement → Review
```

1. AI analyzes codebase for issues
2. Convert findings to GitHub Issues
3. Pick top priority, create plan
4. Implement following plan
5. Review and close issue

### Scaling Considerations

Plan Stack scales with codebase size.

| Concern | Solution |
|---------|----------|
| 1000+ plan files | Filesystem organization, grep for search |
| Large teams | Domain-based plan ownership |
| Multiple repos | Plan references across repositories |

---

## Related

- [Getting Started](getting-started.md)
- [Architecture](architecture.md)
- [Templates](../templates/)
