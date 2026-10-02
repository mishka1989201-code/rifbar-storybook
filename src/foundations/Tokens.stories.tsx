import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '../tokens/build/tokens.js';
import { ThemeTable } from './ResponsiveDocs';

const meta = { title: 'Foundations/Tokens', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;

const cell = { padding: '8px 12px', borderBottom: '1px solid #eee', fontFamily: 'var(--font-family-base)', fontSize: 13 };

function TokenTable({ group }: { group: string }) {
  const rows = tokens.filter((t) => t.group === group);
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['Preview', 'Token', 'Value', 'Source'].map((h) => (
            <th key={h} style={{ ...cell, textAlign: 'left' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.name}>
            <td style={cell}>
              {group === 'color' ? (
                <div style={{ width: 40, height: 40, borderRadius: 5, background: `var(${t.name})`, boxShadow: 'inset 0 0 0 1px #0002' }} />
              ) : group === 'spacing' || group === 'size' ? (
                <div style={{ height: 8, width: `var(${t.name})`, background: 'var(--color-headlines)' }} />
              ) : group === 'radius' ? (
                <div style={{ width: 40, height: 40, borderRadius: `var(${t.name})`, background: 'var(--color-primary-blue-dark)' }} />
              ) : group === 'shadow' ? (
                <div style={{ width: 40, height: 40, borderRadius: 4, background: 'var(--color-white)', boxShadow: `var(${t.name})` }} />
              ) : null}
            </td>
            <td style={cell}><code>{t.name}</code></td>
            <td style={cell}><code>{t.value}</code></td>
            <td style={cell}>{t.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const Colors: StoryObj = { render: () => <TokenTable group="color" /> };
export const Spacing: StoryObj = { render: () => <TokenTable group="spacing" /> };
export const Radius: StoryObj = { render: () => <TokenTable group="radius" /> };
export const Sizes: StoryObj = { render: () => <TokenTable group="size" /> };
export const Shadows: StoryObj = { render: () => <TokenTable group="shadow" /> };
export const Theme: StoryObj = { render: () => <ThemeTable /> };
