import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '../tokens/build/tokens.js';

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

export const Typography: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--color-primary-blue-dark)', fontFamily: 'var(--font-family-base)', fontWeight: 'var(--font-weight-medium)' as never }}>
      <div style={{ fontSize: 'var(--font-size-button-big)', lineHeight: 'var(--font-line-height-button-big)' }}>
        Body/Button Big — Poppins Medium 18/27
      </div>
      <div style={{ fontSize: 'var(--font-size-small)', lineHeight: 'var(--font-line-height-small)' }}>
        Body/Small Medium — Poppins Medium 14/21
      </div>
      <div style={{ fontSize: 'var(--font-size-micro)', lineHeight: 'var(--font-line-height-micro)' }}>
        Body/Micro Medium — Poppins Medium 10/15
      </div>
    </div>
  ),
};
