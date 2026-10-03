import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { EmailChevron } from './EmailChevron';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=5620-292268';

const PHOTO =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#7FC8A9"/>' +
      '<circle cx="32" cy="26" r="12" fill="#FFF4E0"/><path d="M10 64c2-14 12-22 22-22s20 8 22 22z" fill="#FFF4E0"/></svg>',
  );

const meta = {
  title: 'Atoms/EmailChevron',
  component: EmailChevron,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { name: 'David Schwimmer', onRemove: () => {} },
  argTypes: {
    name: { control: 'text', description: 'Recipient name (also gives the initials)' },
    avatarSrc: { control: 'text', description: 'Avatar photo URL' },
    removeLabel: { control: 'text', description: 'Accessible name of × (default “Remove {name}”)' },
  },
} satisfies Meta<typeof EmailChevron>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS / STATES ───────────────────────────────────────────────────────
export const WithPhoto: Story = {
  args: { avatarSrc: PHOTO },
  parameters: { docs: { description: { story: 'With `avatarSrc` the avatar shows a photo. (Demo picture, not a real person.)' } } },
};

export const Decorative: Story = {
  name: 'Without remove action',
  args: { onRemove: undefined },
  parameters: { docs: { description: { story: 'Without `onRemove` the × is only a picture: no button, not focusable (read-only email).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongName: Story = {
  args: { name: 'Maria Anna Kowalska-Shevchenko (Lviv Coffee, purchasing)' },
  decorators: [(Story) => <div style={{ width: 220 }}>{Story()}</div>],
  parameters: { docs: { description: { story: 'The name is cut with “…” when the container is narrow; avatar and × stay.' } } },
};

export const ShortName: Story = { args: { name: 'Ann' } };

// ─── IN CONTEXT: “To:” field with empty state ────────────────────────────────
const INITIAL = ['David Schwimmer', 'Lisa Kudrow', 'Matthew Perry'];

function ToField() {
  const [list, setList] = useState(INITIAL);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        width: 420,
        minHeight: 40,
        padding: '6px 12px',
        boxSizing: 'border-box',
        borderBottom: '1px solid var(--color-stroke-light-v1)',
        background: 'var(--color-white)',
        fontFamily: 'var(--font-family-base)',
        fontSize: 12,
        color: 'var(--color-grey-dark)',
      }}
    >
      <span>To:</span>
      {list.length === 0 ? (
        <>
          <span>No recipients.</span>
          <button type="button" onClick={() => setList(INITIAL)} style={{ fontSize: 12 }}>
            Reset demo
          </button>
        </>
      ) : (
        list.map((n) => <EmailChevron key={n} name={n} onRemove={() => setList((l) => l.filter((x) => x !== n))} />)
      )}
    </div>
  );
}

export const ToFieldExample: Story = {
  name: 'Example: “To:” field',
  render: () => <ToField />,
  parameters: {
    backgrounds: { default: 'canvas' },
    docs: {
      description: {
        story: 'Click × to remove a recipient; with none left the field shows the empty state. Field styles are demo-only (AI-defined).',
      },
    },
  },
};
