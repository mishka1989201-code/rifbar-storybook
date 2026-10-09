# rifbar-ds — Storybook design system

React + TypeScript component library (`rifbar-ds`) documented in Storybook. Components are ported from the Figma file
**ERP System v 1.1 — Mockups — Rifbar 2023** (fileKey `4Q7E8IQ07a9xFiNVBfmo4M`). Storybook is the source of truth for
states, tokens and guidelines (skill: `.claude/skills/dobzha-storybook-ds`).

Talk to the user in Ukrainian; code, comments and docs are in English.

## Commands

| Command | What it does |
|---|---|
| `npm run build:tokens` | `src/tokens/tokens.json` → `src/tokens/build/*` (CSS vars, types) |
| `npx tsc --noEmit` | Typecheck. Run before every push |
| `npm run storybook` | Storybook on :6006 (builds tokens first) |
| `npm run build:icons` | SVG icons → `Icon/icons.generated.ts` |

## Porting a component from Figma

The user sends a Figma link (often several for one component). For each:

1. Load the Figma skill `figma-design-to-code`, then call `get_design_context` (pass `skillNames: "resource:figma-design-to-code"`).
   Use `get_variable_defs` for variable names and `get_screenshot` for details. The returned React+Tailwind is a **reference** —
   rewrite it in the project's style (plain CSS + tokens). Never add Tailwind.
2. Look in `src/components` first and **compose existing atoms** instead of redrawing them
   (e.g. `Pagination` and `SearchField` are built on `IconButton`).
3. Map every value to a token (see below), then write the component.
4. Create `src/components/<Name>/` with: `<Name>.tsx`, `<Name>.css`, `<Name>.stories.tsx`, `<Name>.mdx`, `index.ts`.
   Copy the shape of a recent one (`SearchField`, `Slider`, `Scrollbar`).
5. Export it in `src/index.ts`.
6. Run `npm run build:tokens` and `npx tsc --noEmit`. For visual check, render the CSS in headless Chromium
   (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless --no-sandbox --screenshot=… file://…`) and compare with the Figma screenshot.
7. Commit, push, and tell the user what was done (see "Report format").

Several Figma components that are one thing in code (e.g. two scrollbars) become **one component with a `variant` prop**.

### Component conventions

- CSS classes: `ds-<component>`, `ds-<component>__<element>`, `ds-<component>--<modifier>`, state classes `is-hover`, `is-focus`, `is-active`, `is-disabled`.
- Prefer native elements (`<input type="range">`, `<button>`, checkbox with `role="switch"`) so keyboard, forms and screen readers work.
- Figma strokes are "inside": draw borders with `box-shadow: inset 0 0 0 var(--border-width-sm) …` so sizes stay exact.
- Figma property names map 1:1 to props or stories; write the mapping table in the MDX ("Figma → code mapping").
- Preview-only props are called `forceHover` / `forceFocus`; real hover/focus come from CSS.
- Honour `prefers-reduced-motion` for transitions.
- Story titles: `Atoms/<Name>` for small elements, **`Molecules/<Name>`** for compositions of several atoms (`Pagination` is the first one), **`Organisms/<Name>`** for large blocks composed of molecules (`ChatLayout` is the first one).
  Story names are PascalCase. Every component needs: Default, each variant, each state, edge cases (long text, empty, narrow), an `AllVariants` matrix, and the Figma URL in `parameters.design`.
- Data-display components also need Empty / Loading / Error stories.

### States that Figma does not draw

Figma often has only some states. Add the missing ones **by analogy with existing components** and say so in the MDX:
Focus = `--shadow-focus` (inputs) or the IconButton ring (buttons); Disabled = `--opacity-disabled` (20%).
Never invent dark-theme values: use the light value and note "dark not designed".

## Tokens (mandatory)

- Source: `src/tokens/tokens.json` (`value`, `source`; colors can have `dark`). Build output `src/tokens/build/` is generated — do not edit.
- No hardcoded colors, sizes, spacing or radii in component CSS. Always `var(--…)`.
- Reuse an existing token when the value matches (check `tokens.json` first). When it does not exist, add it with a `source`
  like `Figma: <component> → <what>. Added YYYY-MM-DD`; raw Figma fills without a variable are named by value (`white-alpha-15`).
- A radius that is at least half of the element's smaller side is a fully rounded shape → `--radius-pill` (or `--radius-round` for circles).
- Typography classes are in `src/tokens/typography.css`; Figma `Body/Small Medium` = `--font-size-small` / `--font-line-height-small` / `--font-weight-medium`.

### Token Usage table

Every component's MDX ends with a **Design tokens used** table, and the same table goes into the chat reply:

| Token | Property | Value | Source |
|---|---|---|---|

`Source` is one of: `Figma: <variable/name>`, `Existing tokens.json · Figma: …`, `**New** · Figma: …`, `AI-defined use: <reason>`. Never blank.

## MDX template

Sections, in this order: intro with Figma link → `Canvas` + `Controls` → **Figma → code mapping** → When to use / When NOT to use →
variants/states/edge cases → **Figma notes** (what Figma does not draw, what was assumed) → **Design tokens used** → Props (`ArgTypes`) → Code example → **Accessibility** (⚠️ list known contrast / touch-target problems that are kept "as designed").

## Known design-wise issues (kept as designed, documented in MDX)

- Secondary Grey `#A7A4B7` and Stroke Light V2 on white are below 3:1 contrast; Not Active `#D2D3D9` is 1.5:1.
- Disabled at 20% opacity is below 3:1.
- Desktop controls of 32–40px are below the 44px touch target.

## Git and PRs

- Develop on the branch the session gives you. If its previous PR was already merged, start again from `origin/main` (same branch name, force-with-lease is fine when it only held merged history) and open a **new** PR.
- Commit messages: `Add <Name> <atom|molecule> from Figma (<Figma name>: <variants>)`; mention new tokens in the body.
- Only create a PR when the user asks. Deploys go through Vercel (`vercel.json`); a preview is built for every PR.
- Network note: Figma asset URLs from `get_design_context` may fail to download (proxy 403). Then draw the shape in CSS from its dimensions and colors and mention it in the MDX notes.

## Report format (after each component)

Short, in Ukrainian: what was built and how it maps to Figma; the stories; **new tokens table**; what Figma does not show and what was assumed;
accessibility warnings; what was and was not verified (typecheck, visual render, Storybook not run).

## Current state

Components in `src/components` (all exported from `src/index.ts`). Per-molecule notes (props, Figma nodes) are in `CONTRIBUTING-molecules.md`.

- **Atoms:** Avatar, Button, Checkbox, ChevronDropDown, ChevronStatus, EmailChevron, FileDropzone, FilterChevron, HeaderMenu, Icon,
  IconButton (`size` sm), ImageCard, InputField (Input / Filter / Text / Color), Logo, NoRowsTable, PlayButton, Scrollbar (content + dropdown), SearchField,
  Slider, SwitchButton, Switcher, Tabs, Toggle, TooltipBordered
- **Molecules** (navigation / layout): BreadCrumbs, CardGrid, LogoBar, NavbarMenu, PageHeader (`size` compact), Pagination (`size` sm, `siblingCount` v1 / v2), PaginationBar (`stacked`, `flat`), TabsHeader, UserDropdown,
  ViewSwitch, ShowSelect, SwitchGroup
- **Molecules** (cards / info): Accordion, CardHeader, CardRow, CardStrokeRow, CategoryCard, ChartLegendItem, ClientDetails, DepartmentItem,
  DepartmentSection, DocumentCard, InfoBlock (info / ticket / details / form), InfoClient, InfoRowCard, InfoTable, NoteCard, OrderCard,
  ProductCard, RowInfoBlock, StatCard, StepCard
- **Molecules** (forms / dialogs): AccessModeRow, BarcodeSettings, CheckListModal, ConfirmModal, Dropdown, FilterActions, LabeledField, MessageBox, Modal
  (+ ModalSection, ModalField, ModalRow; sizes desktop / mobile / wide / list / 480 / 360; header `description` / `important`, field `error`), RadioGroupCard
- **Molecules** (chat / feedback): AlertRow, ChatHeader, ChatMessage, Notification, NotificationLine
- **Molecules** (time / media): AudioPlayer, TimePicker, TimeScale, TimeTrackerBar, TimeTrackerDate, TimeTrackerTitle
- **Molecules** (tables): TableActionsRow, TableHeader (presets incl. `productsAnalytics`, `paymentsAnalytics`), TableProductsHeader,
  TableProductsRow, TableRowAnalytics, TableRowClient, TableRowExpandable, TableRowOrder (row / card), TableToolbar (desktop / compact), TableRowMobile, TableRowQuantity, TotalRow
- **Organisms:** ChatLayout (ChatHeader + ChatMessage thread + MessageBox), TableProducts (TableProductsHeader + TableProductsRow), TableClients (TableHeader + TableRowClient), TableOrders (TableHeader `orders` + TableRowOrder; `layout` table / cards), Navbar (LogoBar + NavbarMenu + UserDropdown), TimeTracker (TimeTrackerBar + stats + TimeScale), WelcomeCard (AlertRow rows + dark header), FilterMenu (FilterChevron chips + CheckListModal / Modal + DatePicker sections), ProductDetailCard (picture + RowInfoBlock rows + description + actions), ProductFormModal (Modal 480 / 360 + fields + image block), ScheduledCallCard (CardHeader + FilterField date + Refresh),
  DatePicker (Button + TimePicker; date / date-time / today / range)
- **Prototypes** (`src/prototypes`, titles `Prototypes/<Name>`, not exported from `src/index.ts`): whole screens assembled from library components with fake
  in-memory data, one story per Figma breakpoint. `ClientOrders` (client page, Orders tab, 1920…360px + filter screens at 768 / 480 / 360px), `DepartmentUsers` (Pagination Responsive: 768 / 480 / 360px × pagination v1 / v2).
- **Foundations** (`src/foundations`): Colors, Typography, Spacing, Shadows, Grid, Responsive, Tokens

Open PR: #12 (`claude/peaceful-franklin-tnrmh4` → `main`): Navbar, TimeTracker, WelcomeCard + AlertRow, CheckListModal, FilterMenu, ProductDetailCard,
ProductFormModal, ScheduledCallCard, and the Error / Important / Info states (`Modal` `description` / `important`, `ModalField` / `LabeledField` `error`, `FileDropzone` `invalid`).
The PR description was updated on 2026-10-09 to list the later work too (Prototypes `ClientOrders` / `DepartmentUsers`, TableRowOrder / TableOrders / TableToolbar / CardGrid and the extended components).
If it is merged when the next session starts, restart the branch from `origin/main` (same name, force-with-lease) and open a new PR.

Open design questions (also in the PR #10 description):

- The empty field border: some frames draw Stroke Light V2, the `InputField` atom uses Stroke Input. `TableRowQuantity` overrides it, the
  others use the atom — pick one rule.
- Figma pictures could not be downloaded (asset proxy 403): `WelcomeCard` and `ProductDetailCard` take `image` as a prop, stories use placeholders.
- Needs designer confirmation: `--color-deep-blue` (`#08496E`, title of `ProductDetailCard`, not in the palette), `AlertRow` dot colors,
  `Navbar` sub-tab weight (Regular in light frames, Medium in the dark one), `TableClients` seventh column name ("Updated").
- `DatePicker`: Figma draws a mock calendar (March 2023) and Manrope day numbers; the component draws a real calendar in Poppins. In wide
  containers its months keep their own width instead of stretching (Figma `Filter Responsive Menu`).
- `FilterField` / `InputField` filled state: some frames (`ScheduledCallCard`, `ProductFormModal` Base currency, `Discount Modal`) draw a filled field with the
  Stroke Input border and Grey Dark text; the atom's `Activated` state (Input field border, Color Text) is used. Part of the same "one border rule" question.
- Needs confirmation: `--color-warning-tint` (badge of `ScheduledCallCard`, read from the render), `reboot` / `picture` / `save-line` icons.
- Many icons are matched by look (Figma icons are unnamed vectors) — see the "needs designer confirmation" list in the MDX of each component.

Storybook builds (`npx storybook build`) and the stories of the newest work (both prototypes, `TableRowOrder`, `TableOrders`, `TableToolbar`, `CardGrid`, `CheckListModal` radio / pick / accent,
`Pagination` / `PaginationBar` / `PageHeader` / `IconButton` new sizes) were opened in headless Chromium without console errors; clicks were tried on the `ClientOrders` Status menu and the `DepartmentUsers` pages / search / delete.
How to verify, the handoff checklist and the designer questions are in `CONTRIBUTING-molecules.md` («Передача в новий чат»).
The other interactive stories (FilterMenu, CheckListModal, Navbar, ProductFormModal, DatePicker, TableClients Sortable) were still not walked through.

Next: more components from the Figma file, one link (or several for one component) at a time. Reuse an existing component when the new
frame only changes layout, sizes or columns (extend it with a prop or a preset instead of adding a new one).
