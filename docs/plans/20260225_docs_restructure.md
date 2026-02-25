# Plan: docs/ Restructure

**Created:** 2026-02-25
**Status:** Implemented

## Overview

Restructure `docs/` to eliminate redundancy, fix broken links, and establish a clean language-first directory layout.

## Background & Objectives

- `docs/getting-started.md` and `docs/en/getting-started.md` are identical — confusing for contributors and users
- `docs/directory-structure.md` only exists at root, but `en/` and `ja/` docs link to it as if it's a sibling — links are broken
- First-time visitors can't tell which version to read
- Goal: every doc lives under its language directory, `docs/README.md` serves as the single entry point

## Related Past Implementations

None (first docs restructure).

## Implementation Approach

### Approach

**Language-First structure** — all content lives under `en/` or `ja/`, root level has only `README.md` and `templates/`.

### Target Structure

```
docs/
├── README.md                    ← Navigation hub (language selector + links)
├── en/
│   ├── getting-started.md
│   ├── directory-structure.md   ← moved from root
│   ├── architecture.md
│   └── features.md
├── ja/
│   ├── getting-started.md
│   ├── directory-structure.md   ← new (translate from EN)
│   ├── architecture.md
│   └── features.md
└── templates/
    ├── plan-template.md
    └── review-template.md
```

### Scope of Impact

- `docs/` — restructure
- `README.md` (root) — update documentation links
- `CLAUDE.md` — update repository structure section
- Internal links across all docs

## Implementation Steps

1. [ ] **Move `docs/directory-structure.md` → `docs/en/directory-structure.md`**
2. [ ] **Create `docs/ja/directory-structure.md`** — translate from EN version
3. [ ] **Delete `docs/getting-started.md`** — redundant with `docs/en/getting-started.md`
4. [ ] **Fix internal links in `docs/en/` files**
   - `getting-started.md`: Next Steps links → sibling files (remove `../`)
   - `architecture.md`: Related links → sibling + `../templates/`
   - `features.md`: Related links → sibling + `../templates/`
5. [ ] **Fix internal links in `docs/ja/` files** — same fixes as EN
6. [ ] **Rewrite `docs/README.md`** — language selector, clear navigation hub
7. [ ] **Update root `README.md`** — fix documentation section links to point to `docs/en/`
8. [ ] **Update `CLAUDE.md`** — fix repository structure section
9. [ ] **Fix `.gitignore`** — change `.examples/plans/*` to correct path
10. [ ] **Verify all links** — grep for broken references

## Considerations

### Backward Compatibility

- Root `README.md` links to `docs/getting-started.md` — must update to `docs/en/getting-started.md`
- External sites/articles linking to `docs/getting-started.md` will break — acceptable for pre-1.0 project

### Terminology

- Standardize on "plan" (lowercase) in running text, "Plan" when referring to the concept
- Use "implementation plan" only in template titles

## Test Plan

- [ ] All internal links resolve (no 404s on GitHub)
- [ ] `docs/README.md` navigates to every doc in both languages
- [ ] Root `README.md` Quick Start and Documentation links all work
- [ ] No orphan files in `docs/`

## Notes

This plan does NOT change content — only structure and links. Content improvements (docs-navigator documentation, plugin explanation, etc.) are separate future work.
