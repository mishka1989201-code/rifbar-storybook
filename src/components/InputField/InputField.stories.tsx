import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { ColorField, FilterField, InputField, TextField } from './InputField';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=17-7380';

// Figma sample widths: Inputfield 127px, Textfield 392px. Inputfield / Textfield fill their container.
const width = (w: number) => (Story: () => JSX.Element) => <div style={{ width: w }}>{Story()}</div>;

const meta = {
  title: 'Atoms/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'text', description: 'Has a value → Figma `Status=Activated`' },
    disabled: { control: 'boolean', description: 'Figma `Status=Disabled`' },
    invalid: { control: 'boolean', description: 'Figma `Status=Error`' },
    forceHover: { control: 'boolean', description: 'Figma `Status=Hover` (preview only)' },
    forceFocus: { control: 'boolean', description: 'Figma `Status=Focus` (preview only)' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  decorators: [width(127)],
  args: { placeholder: 'Enter Text*', 'aria-label': 'Name' },
};

// ─── TYPE=INPUTFIELD — statuses ──────────────────────────────────────────────
export const Static: Story = {
  decorators: [width(127)], args: { placeholder: 'Enter Text*', 'aria-label': 'Static' } };

export const Activated: Story = {
  decorators: [width(127)],
  args: { placeholder: 'Enter Text*', defaultValue: 'Enter Text*', 'aria-label': 'Activated' },
  parameters: { docs: { description: { story: 'Has a value: text Color Text, border Input field.' } } },
};

export const Hover: Story = {
  decorators: [width(127)], args: { placeholder: 'Enter Text*', forceHover: true, 'aria-label': 'Hover' } };

export const Focus: Story = {
  decorators: [width(127)], args: { placeholder: 'Enter Text*', forceFocus: true, 'aria-label': 'Focus' } };

export const Disabled: Story = {
  decorators: [width(127)], args: { placeholder: 'Enter Text*', disabled: true, 'aria-label': 'Disabled' } };

export const Invalid: Story = {
  decorators: [width(127)],
  name: 'Error',
  args: { placeholder: 'Enter Text*', defaultValue: 'abc', invalid: true, 'aria-label': 'Invalid' },
  parameters: { docs: { description: { story: 'Figma `Status=Error`: border Danger `#ED5742`, `aria-invalid`. The error message belongs to a future form-field molecule.' } } },
};

// ─── TYPE=TEXTFIELD ──────────────────────────────────────────────────────────
export const Textfield: Story = {
  render: (args) => <TextField placeholder="Address*" aria-label="Address" {...(args as object)} />,
  decorators: [width(392)],
};

export const TextfieldActivated: Story = {
  render: () => <TextField placeholder="Address*" aria-label="Address" defaultValue="Address*" />,
  decorators: [width(392)],
};

export const TextfieldLongText: Story = {
  render: () => (
    <TextField
      aria-label="Address"
      defaultValue={'Kyiv, Khreshchatyk St. 22, office 405\nEntrance from the courtyard, 4th floor, ring twice\nWorking hours 9:00–18:00'}
    />
  ),
  decorators: [width(392)],
  parameters: { docs: { description: { story: 'Long text: the field scrolls; the user can drag it taller.' } } },
};

// ─── TYPE=FILTER ─────────────────────────────────────────────────────────────
export const Filter: Story = {
  render: () => <FilterField placeholder="Filter 1" aria-label="Filter 1" />,
};

export const FilterActivated: Story = {
  render: () => <FilterField value="Filter 1" aria-label="Filter 1" />,
};

export const FilterOpen: Story = {
  name: 'Filter Open (Focus)',
  render: () => <FilterField placeholder="Filter 2" open aria-label="Filter 2" />,
  parameters: { docs: { description: { story: 'Figma `Status=Focus` of the Filter = the list is open, chevron up.' } } },
};

export const FilterLongValue: Story = {
  render: () => <FilterField value="Warehouse — Kyiv, Left bank" aria-label="Warehouse" />,
  parameters: { docs: { description: { story: 'The field grows with the text (hug), 32px gap before the chevron.' } } },
};

// ─── TYPE=COLOR ──────────────────────────────────────────────────────────────
export const Color: Story = {
  render: () => <ColorField aria-label="Label color" />,
  parameters: { docs: { description: { story: 'Empty (Figma `Status=Static`): black swatch. Click opens the system picker.' } } },
};

export const ColorActivated: Story = {
  render: () => <ColorField defaultValue="#63DF95" aria-label="Label color" />,
};

// ─── STATE MATRIX (mirrors the Figma frame `InputField`) ─────────────────────
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'max-content 130px 127px 140px 392px',
  gap: '20px 24px',
  alignItems: 'start',
};
const caption: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 12,
  color: 'var(--color-grey-dark)',
};

const statuses = [
  { label: 'Activated', filled: true, props: {} },
  { label: 'Static', filled: false, props: {} },
  { label: 'Focus', filled: false, props: { forceFocus: true } },
  { label: 'Disabled', filled: false, props: { disabled: true } },
  { label: 'Hover', filled: false, props: { forceHover: true } },
  { label: 'Error', filled: true, props: { invalid: true } },
];

export const AllVariants: Story = {
  name: 'All Types × Statuses',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={grid}>
      <span />
      {['Filter', 'Inputfield', 'Color', 'Textfield'].map((t) => (
        <span key={t} style={caption}>
          {t}
        </span>
      ))}
      {statuses.map(({ label, filled, props }) => (
        <div key={label} style={{ display: 'contents' }}>
          <span style={{ ...caption, lineHeight: '32px' }}>{label}</span>
          <div>
            <FilterField
              aria-label={`Filter ${label}`}
              placeholder={label === 'Focus' || label === 'Disabled' ? 'Filter 2' : 'Filter 1'}
              value={filled ? 'Filter 1' : undefined}
              open={label === 'Focus'}
              {...props}
            />
          </div>
          <InputField
            aria-label={`Input ${label}`}
            placeholder="Enter Text*"
            defaultValue={filled ? 'Enter Text*' : undefined}
            {...props}
          />
          <div>
            <ColorField
              aria-label={`Color ${label}`}
              defaultValue={filled || label === 'Hover' ? '#63DF95' : undefined}
              {...props}
            />
          </div>
          <TextField
            aria-label={`Text ${label}`}
            placeholder="Address*"
            defaultValue={filled ? 'Address*' : undefined}
            {...props}
          />
        </div>
      ))}
    </div>
  ),
};

// ─── IN CONTEXT: filters + form ──────────────────────────────────────────────
const OPTIONS = ['All warehouses', 'Kyiv', 'Lviv', 'Odesa'];

function FormDemo() {
  const [open, setOpen] = useState(false);
  const [warehouse, setWarehouse] = useState<string>();
  const [color, setColor] = useState('#63DF95');
  const [name, setName] = useState('');
  const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, width: 392 };
  const menu: CSSProperties = {
    position: 'absolute',
    top: 36,
    left: 0,
    zIndex: 2,
    minWidth: '100%',
    margin: 0,
    padding: 4,
    listStyle: 'none',
    background: 'var(--color-white)',
    border: '1px solid var(--color-stroke-light-v2)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-tooltip)',
    fontFamily: 'var(--font-family-base)',
    fontSize: 14,
  };
  return (
    <div style={col}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <FilterField
            placeholder="Warehouse"
            value={warehouse}
            open={open}
            onClick={() => setOpen(!open)}
            aria-label="Warehouse"
          />
          {open && (
            <ul role="listbox" style={menu}>
              {OPTIONS.map((o) => (
                <li
                  key={o}
                  role="option"
                  aria-selected={o === warehouse}
                  style={{ padding: '4px 8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onClick={() => {
                    setWarehouse(o);
                    setOpen(false);
                  }}
                >
                  {o}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ColorField value={color} onChange={(e) => setColor(e.target.value)} aria-label="Tag color" />
      </div>
      <InputField
        placeholder="Product name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        invalid={name.length > 0 && name.length < 3}
        aria-label="Product name"
      />
      <TextField placeholder="Address*" aria-label="Address" />
    </div>
  );
}

export const FormExample: Story = {
  name: 'Example: Filters and form',
  render: () => <FormDemo />,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Interactive. The option list is demo-only (not part of the atom — it belongs to a future Dropdown). ' +
          'Name shorter than 3 characters shows the error state. 16px gaps are AI-defined (demo only).',
      },
    },
  },
};

/** Figma "Dark Atoms Components" → Field Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All Types × Statuses (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16 }}>
        <Story />
      </div>
    ),
  ],
};
