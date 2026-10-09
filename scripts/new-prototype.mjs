// Creates the skeleton of a new Prototype screen in src/prototypes/<Name>/.
// Usage: node scripts/new-prototype.mjs <Name> <figmaNodeId e.g. 818-310893> <bp1,bp2,...> ["Short description"]
// Example: node scripts/new-prototype.mjs ClientMain 818-310000 1920,1440,1024,768,480,360 "Client page, Main info tab"
// Then fill <Name>Screen.tsx from the Figma frame (compose components from src/components, fake data in data.ts) and
// replace the TODO lines in <Name>.mdx. See CONTRIBUTING-molecules.md → «Прототипи: передача в новий чат».
import fs from 'fs';
import path from 'path';

const [name, node, bps, desc = 'TODO: one-line description of the screen'] = process.argv.slice(2);
if (!name || !node || !bps || !/^[A-Z][A-Za-z0-9]+$/.test(name)) {
  console.error('Usage: node scripts/new-prototype.mjs <PascalName> <figmaNodeId> <bp1,bp2,...> ["description"]');
  process.exit(1);
}
const breakpoints = bps.split(',').map((b) => b.trim());
const dir = path.join('src', 'prototypes', name);
if (fs.existsSync(dir)) {
  console.error(`${dir} already exists`);
  process.exit(1);
}
fs.mkdirSync(dir, { recursive: true });
const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const cls = `proto-${kebab}`;
const union = breakpoints.map((b) => `'${b}'`).join(' | ');
const figma = `https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=${node}`;
const w = (f, s) => fs.writeFileSync(path.join(dir, f), s);

w(`${name}Screen.tsx`, `import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import './${name}Screen.css';

export type ${name}Breakpoint = ${union};

export interface ${name}ScreenProps {
  /** Figma frame width. The layout follows it. */
  breakpoint?: ${name}Breakpoint;
}

/** ${desc}. Fake in-memory data; compose library components, do not redraw them. */
export function ${name}Screen({ breakpoint = '${breakpoints[0]}' }: ${name}ScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="${cls}" data-bp={breakpoint}>
      <main className="${cls}__panel">
        {/* TODO: build the frame from components (Navbar from 1440px, PageHeader, tables / cards, pagination …). */}
        <PageHeader title="${name}" onMenuClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} />
      </main>
    </div>
  );
}
`);
w(`${name}Screen.css`, `/* ${name} prototype — every value references a token from src/tokens/tokens.json.
   Page background is themed: --theme-app-bg (frame) and --theme-page-bg (panel). */

.${cls} {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  padding: var(--spacing-16);
  background: var(--theme-app-bg);
  font-family: var(--font-family-base);
}

.${cls}__panel {
  box-sizing: border-box;
  min-height: 100%;
  border-radius: var(--radius-modal);
  background: var(--theme-page-bg);
}
`);
w('index.ts', `export { ${name}Screen } from './${name}Screen';
export type { ${name}ScreenProps, ${name}Breakpoint } from './${name}Screen';
`);
w(`${name}.stories.tsx`, `import type { Meta, StoryObj } from '@storybook/react';
import { ${name}Screen, type ${name}Breakpoint } from './${name}Screen';

const FIGMA_URL =
  '${figma}';

const meta = {
  title: 'Prototypes/${name}',
  component: ${name}Screen,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { story: { inline: false, iframeHeight: 900 } },
  },
  argTypes: { breakpoint: { control: 'select', options: [${breakpoints.map((b) => `'${b}'`).join(', ')}] } },
  args: { breakpoint: '${breakpoints[0]}' },
  // The frame has the width of the Figma artboard; the canvas scrolls when it is wider than the window.
  decorators: [
    (Story, { args }) => (
      <div style={{ width: Number(args.breakpoint), minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ${name}Screen>;

export default meta;
type Story = StoryObj<typeof meta>;

const at = (breakpoint: ${name}Breakpoint): Story => ({ args: { breakpoint } });

export const Default: Story = at('${breakpoints[0]}');
${breakpoints.map((b) => `export const Width${b}: Story = { ...at('${b}'), name: '${b}px' };`).join('\n')}
`);
w(`${name}.mdx`, `import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ${name}Stories from './${name}.stories';

<Meta of={${name}Stories} />

# ${name} (prototype)

${desc}. Implements the Figma frame [\`${name}\`](${figma}).

A **prototype**: a whole screen of library components with fake in-memory data, not exported from \`rifbar-ds\`.

<Canvas of={${name}Stories.Default} />
<Controls of={${name}Stories.Default} />

## Figma → code mapping

| Figma | Code |
|---|---|
| TODO | TODO |

## Behaviour (what is interactive)

TODO

## Variants

${breakpoints.map((b) => `<Canvas of={${name}Stories.Width${b}} />`).join('\n')}

## Figma notes

What Figma draws: TODO.

Not drawn, defined by analogy (AI-defined):

- TODO (hover / focus / disabled, empty list, dark theme if no dark frame).

Assumed / normalised — **need designer confirmation**:

- TODO

## Design tokens used

| Token | Property | Value | Source |
|---|---|---|---|
| \`--theme-app-bg\` | frame background | \`#1D2542\` | Existing tokens.json · Figma: Responsive templates → screen background |
| \`--theme-page-bg\`, \`--radius-modal\` | page panel fill, radius | \`#F6F8FC\` / dark \`#101010\`, \`16px\` | Existing tokens.json · Figma: Content (BG Color, radius 16) |

## Accessibility

- TODO: landmarks (one \`main\`, one \`h1\`), names of icon-only buttons, contrast, ⚠️ touch targets kept as designed.
`);
console.log(`Created ${dir}: ${fs.readdirSync(dir).join(', ')}`);
