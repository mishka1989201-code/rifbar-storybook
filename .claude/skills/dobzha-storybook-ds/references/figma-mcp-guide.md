# Figma MCP Guide — Pulling Components and Tokens from Figma

This guide covers the two MCP tools that connect Claude to Figma, how to choose between them, and the exact workflow for extracting tokens and component specs for use in Storybook.

---

## Two tools, two purposes

### Figma's Official MCP
Made by Figma. Best for design-to-code: turning mockups into React components, reading layout specs, extracting assets.

**Works with:** Claude Desktop (built-in connector), Claude Code, VS Code, Cursor  
**Does NOT work with:** Claude.ai in browser  
**Strengths:** Instant setup via built-in connector, great for reading visual specs  
**Limitation:** Smaller tool set, less suited for bulk variable/token work

### Figma Console MCP
Community-built by Southleft. Best for design system work — 92+ tools specifically for variables, components, tokens.

**Works with:** Claude.ai (browser), Claude Desktop, Claude Code, any MCP-compatible tool  
**Two modes:**
- **Cloud mode** (no terminal): Works at claude.ai. Good for reading and light editing. Requires the Desktop Bridge plugin running in Figma Desktop + a 6-character pairing code.
- **Local mode** (terminal): All 92+ tools, real-time monitoring, lowest latency. Requires Node.js 18+.

**Rule of thumb:** If you're doing token work, variable syncing, or bulk component extraction → use Figma Console MCP. If you're turning a single screen mockup into code → Official MCP is fine.

---

## Setup: Official Figma MCP (Claude Desktop)

1. Open Claude Desktop → click **Code** tab
2. Click **+** → **Connectors** → find **Figma** → click to add
3. A browser window opens → click **Allow Access**
4. Verify: ask Claude "What Figma files can you see?"

That's it. No terminal required.

---

## Setup: Figma Console MCP (Cloud Mode — Claude.ai browser)

**Step 1 — Get a Figma personal access token:**
1. Go to figma.com → Settings → Personal access tokens
2. Generate new token, name it `Claude MCP`
3. Scopes: File content (Read), Variables (Read + Write), Comments (Read + Write)
4. Copy immediately (starts with `figd_`) — you won't see it again

**Step 2 — Add connector in Claude.ai:**
1. claude.ai → Profile → Settings → Connectors
2. Add Custom Connector:
   - Name: `Figma Console`
   - URL: `https://figma-console-mcp.southleft.com/mcp`
3. Paste your Figma token when asked

**Step 3 — Install Desktop Bridge plugin (for write access):**
1. Open your design file in Figma Desktop (not browser)
2. Plugins → Development → Import plugin from manifest
3. Navigate to `~/.figma-console-mcp/plugin/manifest.json`
4. Run: Plugins → Development → Figma Desktop Bridge
5. You'll see "MCP ready"

**Step 4 — Pair with a code:**
1. In Claude.ai, say: "Connect to my Figma plugin"
2. Claude generates a 6-character code (expires in 5 min)
3. In Desktop Bridge plugin: toggle Cloud Mode → enter code → Connect

---

## Setup: Figma Console MCP (Local Mode — terminal)

```bash
# Requires Node.js 18+
npx figma-console-mcp@latest
```

Follow prompts to authenticate. Then add to your Claude Code or MCP client config.

Local mode gives all 92+ tools, real-time console log monitoring, and lowest latency.

---

## Workflow: Extract design tokens from Figma

Once MCP is connected, use these prompts with Claude:

**Pull all variables as tokens.json:**
```
Read all variable collections from my Figma file and create a tokens/tokens.json 
file structured as: primitive colors → semantic colors → spacing → radius → typography.
Include variable descriptions as comments — these become usage guidelines.
```

**Handle light/dark modes:**
```
My Figma file has Light and Dark modes defined. Create separate files:
- tokens/tokens.light.json
- tokens/tokens.dark.json
```

**If MCP returns stale data:**
```
Fetch my Figma variables again with refreshCache set to true
```

Or bypass the REST API cache entirely:
```
Use figma.variables.getVariableByIdAsync to get the current value of [variable name]
```

**Extract usage guidelines separately:**
```
Also extract all variable descriptions into tokens/guidelines.json — 
these will become the usage documentation in Storybook stories.
```

---

## Workflow: Extract component specs from Figma

**Read a specific component:**
```
Read the [ComponentName] component from my Figma file. I need:
- All variants and their properties
- All states (default, hover, pressed, disabled, focus)
- Exact spacing values (padding, gap)
- Border radius values
- Typography specs (size, weight, line-height)
- Which semantic tokens each value maps to
```

**Generate a story from Figma specs:**
```
Based on the [ComponentName] component specs you just read from Figma, 
generate a Storybook story file using the dobzha-storybook-ds template.
Map all visual values to semantic design tokens, not hardcoded values.
```

**Batch extract multiple components:**
```
List all components in the [PageName] page of my Figma file, 
then extract specs for each one.
```

---

## Workflow: Keep Figma and Storybook in sync

### Direction 1: Figma → Storybook (design is ahead of code)

When designers update tokens or components in Figma:

1. In Claude: "Sync tokens from Figma" → Claude uses MCP to pull latest variables
2. Run Style Dictionary: `npm run build:tokens`
3. Stories automatically pick up new CSS custom properties
4. Check Storybook for visual changes
5. Update changelog story

### Direction 2: Storybook → Figma (code is source of truth)

When Storybook components are ahead of Figma:

**Option A — Storybook Connect (free):**
1. Publish Storybook to Chromatic (free tier)
2. Install "Storybook Connect" Figma plugin
3. In Figma, select component → open plugin → paste story URL
4. Designers see live story embedded in Figma sidebar

**Option B — story.to.design (paid, $99/mo):**
1. Automatically imports all Storybook stories as Figma components
2. Keeps them in sync when code changes
3. Best for large design systems (100+ components)

---

## Token naming: Figma variables → CSS custom properties

When Figma Console MCP extracts variables, it preserves the naming structure. Map it consistently:

| Figma variable | CSS custom property | JS token |
|---------------|---------------------|----------|
| `action/primary/default` | `--action-primary-default` | `ActionPrimaryDefault` |
| `text/primary` | `--text-primary` | `TextPrimary` |
| `bg/surface` | `--bg-surface` | `BgSurface` |
| `spacing/4` | `--spacing-4` | `Spacing4` |
| `radius/md` | `--radius-md` | `RadiusMd` |

**Rule:** Figma uses slashes → CSS uses hyphens → JS uses PascalCase.

---

## Troubleshooting

**"MCP returns wrong/old values"**  
Ask Claude to use `refreshCache: true`. If still wrong, bypass REST API via Plugin API directly.

**"Can read but can't write to Figma"**  
Write access requires: Cloud mode → Desktop Bridge plugin running in Figma Desktop (not browser) + paired with code. Make sure the plugin stays running.

**"Figma MCP tools not showing in Claude Code"**  
Run: `claude mcp add --transport http figma https://mcp.figma.com/mcp`  
Then type `/mcp` → select figma → Authenticate. Restart Claude Code after setup.

**"Cloud pairing code expired"**  
Codes expire in 5 min. Ask Claude for a new code and re-enter in Desktop Bridge plugin. Plugin must stay running in Figma for connection to persist.

**"Official MCP has 6 call/month limit"**  
This applies only to the Official Figma MCP on the free Figma plan. Figma Console MCP cloud mode has no such limit (but requires the Desktop Bridge plugin).
