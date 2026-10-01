---
name: dobzha-storybook-ds
description: >
  Storybook design system setup and maintenance skill. Use this skill whenever a user
  mentions Storybook, design system, component library, design tokens, or wants to set up,
  audit, or document UI components. Trigger on storybook, design system, component library,
  DS, DLS, tokens, figma to code, figma MCP, component documentation, empty state, stories,
  shadcn, MUI, Gluestack, new project setup, source of truth. Even for vague requests like
  set up the design system or document components — use this skill. This skill replaces
  Figma as the source of truth for component states, tokens, and design guidelines.
---

# Dobzha Storybook Design System Skill

Storybook is the single source of truth for this workflow — replacing Figma as the place where components, states, tokens, and design guidelines live. Developers open Storybook the way they used to open Figma. Designers use it to verify states that prototypes can't show (empty states, error states, loading, edge cases).

For deep reference on any topic, read the relevant file in `references/`:

| File | When to read |
|------|-------------|
| `references/storybook-setup.md` | Initial setup, config files, addons, folder structure |
| `references/component-story-template.md` | Story anatomy, states, tokens, MDX docs |
| `references/design-tokens-pipeline.md` | Figma → tokens.json → CSS/JS, Style Dictionary |
| `references/figma-mcp-guide.md` | Figma MCP + Figma Console MCP — pulling components and tokens from Figma |
| `references/developer-guidelines.md` | Handoff standards, what devs need, accessibility |

---

## 1. Onboarding — always start here

When a user activates this skill for a new project, run through this sequence before doing anything else. Ask questions one group at a time, not all at once.

**Group 1 — Project context:**
- Is this a new project from scratch, or does one already exist?
- If existing: is there code already? A Figma file? Both?

**Group 2 — Stack:**
- What framework? (React, Vue, Angular, React Native, Svelte, other)
- What UI library, if any? (shadcn/ui, MUI, Chakra, Gluestack, Ant Design, custom)
- TypeScript or JavaScript?

**Group 3 — Design assets:**
- Are there design tokens defined anywhere? (Figma variables, a JSON file, CSS vars, none yet)
- Is there a Figma file with components? If yes — is Figma MCP connected?

**Group 4 — Goals:**
- What does the team need Storybook to do? (developer reference, design review, testing, all of the above)
- Who will be the main consumers — developers, designers, both?

Based on the answers, pick one of these starting paths:

**Path A — From scratch (idea only):** Help the user define the component inventory first, then set up Storybook, then build foundations (tokens → atoms → molecules → organisms).

**Path B — Existing code, no Storybook:** Audit existing components, set up Storybook, write stories for what exists, identify documentation gaps.

**Path C — Figma exists, going to code:** Use Figma MCP or Figma Console MCP to extract tokens and component specs. Set up the token pipeline first, then Storybook. See `references/figma-mcp-guide.md`.

**Path D — Storybook exists but is a mess:** Audit current stories, identify missing states and documentation, bring everything to standard.

---

## 2. Core principles

**Storybook = source of truth.** Everything a developer or designer needs to understand a component must be findable in Storybook. If it's not there, it doesn't officially exist.

**Prototype shows the happy path. Storybook shows everything else.** Prototypes can't reliably show empty states, error states, loading states, skeleton screens, or edge cases. These must be explicitly documented as stories.

**Token-first always.** No hardcoded colors, spacing, or radius in components. Every value must reference a design token — and every token referenced must have a real, visible value and a documented source. See Section 3 for the mandatory protocol. This is the single most common failure mode of this skill: generating abstract token names without ever surfacing their actual values.

**States are not optional.** Every interactive component needs: Default, Hover, Focus, Active/Pressed, Disabled, Loading (if applicable), Error (if applicable). Every data-display component needs: Populated, Empty, Loading, Error.

**Framework-agnostic mindset.** The principles apply regardless of stack. When generating config or story templates, adapt to whatever framework the user is on. Storybook supports React, Vue, Angular, Svelte, Web Components, and more.

---

## 3. Source of truth & token mapping protocol (mandatory, no exceptions)

This is the rule that makes or breaks this skill. A design system is useless if developers can't tell what value a token holds or which property it controls. Every single token referenced anywhere — in CSS, in stories, in docs — must be traceable to a real value and a real usage point. No silent placeholders, no abstract token names floating without a value attached.

**Before writing any token or component, determine the source:**

1. **Figma is connected (MCP available)** → Read the actual variables. Use the real hex codes, real spacing numbers, real values. See `references/figma-mcp-guide.md`.
2. **Existing code has tokens already** (CSS vars, a tokens.json, a theme file) → Read that file first. Reuse exact existing values, don't invent new ones for things that already exist.
3. **Neither exists, and the user wants AI to decide the values** → This is a valid and common path. Proceed, but every value chosen must be presented to the user as a deliberate design decision, not buried silently in code. State it plainly: "I'm defining `--action-primary-default: #2563EB` (a standard accessible blue, 4.5:1+ contrast on white) since no token existed yet."
4. **Neither exists, and it's unclear whether the user wants AI to decide** → Stop and ask. Don't guess silently.

**What's never acceptable, regardless of source:**
- Writing `var(--action-primary-default)` in a component without that token existing with an actual value somewhere in `tokens.json` / `tokens.css`
- Writing documentation that lists a token name without showing its current value
- Generating a story or component and skipping the token mapping step because "it's implied by the template"

**After creating or editing ANY component, output a Token Usage Report** — this is not optional, it happens every time, automatically, without the user needing to ask:

```
## Token Usage Report — Button

| Property | Token | Value | Source |
|----------|-------|-------|--------|
| background-color (primary) | --action-primary-default | #2563EB | Figma: action/primary/default |
| background-color (hover) | --action-primary-hover | #1D4ED8 | Figma: action/primary/hover |
| text color | --text-inverse | #FFFFFF | Existing tokens.json |
| padding (horizontal) | --spacing-4 | 16px | AI-defined (no prior token existed) |
| border-radius | --radius-md | 8px | AI-defined (no prior token existed) |
```

The `Source` column must always be one of: `Figma: [variable path]`, `Existing tokens.json`, `Existing CSS file`, or `AI-defined (reason)`. Never leave it blank or vague.

This table also belongs in the component's MDX documentation under "Design tokens used" (see `references/component-story-template.md`) — the Token Usage Report isn't just a chat output, it's a deliverable that ships with the component.

---

## 4. Required story anatomy

Every component story must contain:

```
ComponentName/
├── Default story          — Component in its most common state
├── Variants stories       — One per meaningful visual variant
├── States stories         — Hover, Focus, Disabled, Loading, Error
├── Empty state story      — What renders when there's no data
├── Edge cases             — Long text, RTL, mobile viewport, etc.
└── MDX documentation      — Usage guidelines, do's/don'ts, token list
```

When a user asks to "create a component" or "add X to Storybook," always check:
- Does it need an empty state? (lists, tables, dashboards, search results → always yes)
- Does it have a loading state?
- Does it have an error state?
- Are there edge cases with long content or short content?

If the user hasn't thought about these — surface them. Don't silently skip them.

Read `references/component-story-template.md` for the exact code template.

---

## 5. Design token standards

All visual values must come from tokens — never hardcoded. Token structure follows a three-tier hierarchy:

```
Primitive → Semantic → Component-specific (optional)

colors/blue/500           → #0097DB
action/primary/default    → {colors/blue/500}
button/bg/primary         → {action/primary/default}
```

**In code:**
```css
/* ✅ Correct */
background-color: var(--action-primary-default);
padding: var(--spacing-4);

/* ❌ Wrong */
background-color: #0097DB;
padding: 16px;
```

When tokens come from Figma, use the pipeline in `references/design-tokens-pipeline.md`.
When Figma MCP is connected, use the workflow in `references/figma-mcp-guide.md` to extract them directly.

---

## 6. Figma ↔ Storybook integration

There are two directions of integration, and two sets of tools. Know which one applies:

**Direction 1: Figma → Storybook (design to code)**
Use when: A Figma file has components that need to become Storybook stories.
Tools: Figma MCP or Figma Console MCP (read `references/figma-mcp-guide.md`), Style Dictionary, Storybook Designs addon.

**Direction 2: Storybook → Figma (code to design)**
Use when: Storybook is the source of truth and Figma needs to stay in sync.
Tools: Storybook Connect plugin (free, by Chromatic) — embeds live stories in Figma. story.to.design (paid, $99/mo) — auto-generates full Figma component library from stories.

**Storybook Connect setup (recommended for most teams):**
1. Publish Storybook to Chromatic (free tier available)
2. Install "Storybook Connect" plugin in Figma
3. Link each Figma component to its corresponding story URL
4. Designers can then see the live implementation inside Figma

---

## 7. Storybook folder structure

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.stories.tsx    ← stories
│       ├── Button.mdx            ← documentation
│       └── Button.css
├── foundations/
│   ├── Colors.stories.tsx        ← token swatches
│   ├── Typography.stories.tsx
│   ├── Spacing.stories.tsx
│   └── Tokens.stories.tsx
└── tokens/
    ├── tokens.json               ← source (synced from Figma or manual)
    └── build/
        ├── tokens.css
        └── tokens.js
```

For full config files and setup commands, read `references/storybook-setup.md`.

---

## 8. Component documentation checklist

Before marking a component as "done" in Storybook, verify:

**Token mapping (check this first — see Section 3):**
- [ ] Token Usage Report generated and shown to the user
- [ ] Every token in the report has a real value (no abstract names without values)
- [ ] Every token's Source column is filled in (Figma path, existing file, or AI-defined + reason)
- [ ] The same table appears in the component's MDX under "Design tokens used"

**Stories:**
- [ ] Default story exists
- [ ] All variants covered
- [ ] All interactive states covered (hover, focus, disabled, loading, error)
- [ ] Empty state story exists (for data-display components)
- [ ] Edge cases covered (long text, no content, error from API)

**Documentation (MDX):**
- [ ] Component description — what it is, what it does
- [ ] When to use / when NOT to use
- [ ] Props table with types and defaults
- [ ] Token list with real values — which tokens this component uses, and their current values (not just names)
- [ ] Links to related components
- [ ] Figma link (if Figma file exists)
- [ ] Code snippet — copy-paste ready usage example

**Tokens:**
- [ ] No hardcoded values anywhere
- [ ] All colors reference semantic tokens
- [ ] All spacing references spacing tokens

**Accessibility:**
- [ ] Focus state is visible and designed
- [ ] Minimum touch target 44×44px (interactive components)
- [ ] Color contrast 4.5:1 for text, 3:1 for UI elements
- [ ] ARIA labels on icon-only components

---

## 9. Workflow for adding a new component

When a user says "add [component] to Storybook" or "create [component]":

1. **Clarify source** — Is this coming from Figma? Existing code? Being designed from scratch (AI decides values)? See Section 3 for the protocol.
2. **Define states** — Walk through: default, variants, interactive states, empty, loading, error
3. **Map tokens (mandatory)** — For every visual property (color, spacing, radius, typography), determine the token, its real value, and its source, following the protocol in Section 3. Do this BEFORE writing the component code, not after.
4. **Write stories** — Use template from `references/component-story-template.md`
5. **Write MDX docs** — Cover usage, props, tokens (with real values, not just names), do's/don'ts
6. **Link to Figma** — If Figma file exists, add the Figma URL to the story parameters
7. **Output the Token Usage Report** — As shown in Section 3, every time, unprompted
8. **Check checklist** — Run through Section 8 before declaring done

---

## 10. Maintaining the design system

**When tokens change in Figma:**
1. Use Figma MCP to re-sync (see `references/figma-mcp-guide.md`)
2. Run Style Dictionary build
3. Check Storybook for visual regressions
4. Update changelog in Storybook (Changelog.stories.tsx)
5. Re-run the Token Usage Report for every affected component — values may have shifted

**When a component updates:**
1. Update stories to reflect new states or variants
2. Update MDX documentation
3. Update token references if token names changed
4. Re-verify the checklist in Section 8

**Naming conventions:**
- Story titles: `Category/ComponentName` (e.g., `Forms/TextInput`, `Navigation/TabBar`)
- Story names: PascalCase (e.g., `Default`, `WithIcon`, `DisabledState`)
- Token CSS vars: `--category-purpose-state` (e.g., `--action-primary-hover`)
- CSS classes: `ds-[component]__[element]--[modifier]` (BEM-style)
