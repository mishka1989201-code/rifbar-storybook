import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ProductDetailCard, type ProductDetailRow } from './ProductDetailCard';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=914-320788';

/**
 * Placeholder for the picture. The Figma photo (a cheerleader costume) could not be downloaded
 * (asset proxy 403), so the stories draw a neutral 16:9 shape; pass your own `image` in the app.
 */
const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#ECEEFB"/><circle cx="320" cy="130" r="44" fill="#A7A4B7"/><path d="M220 330c0-70 44-120 100-120s100 50 100 120z" fill="#A7A4B7"/></svg>',
)}`;

const DETAILS: ProductDetailRow[] = [
  { label: 'File type', value: 'PNG' },
  { label: 'Created by', value: 'Paul Rudd' },
  { label: 'Date', value: '12.04.2022' },
  { label: 'Manager email', value: 'paulrudd23@gmail.com' },
  { label: 'Manager work phone', value: '+48 79 1362547' },
  { label: 'Manager mobile phone', value: '+48 79 1362547' },
];

const TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.';

const meta = {
  title: 'Organisms/ProductDetailCard',
  component: ProductDetailCard,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    title: { control: 'text' },
    image: { control: 'text', description: 'URL of the picture' },
    details: { control: 'object' },
    description: { control: 'text' },
    descriptionTitle: { control: 'text' },
    actions: { control: false },
  },
  args: {
    title: 'Cheerleader costume',
    image: PLACEHOLDER_IMAGE,
    details: DETAILS,
    description: TEXT,
    actions: <Button variant="dark" iconLeft="download-cloud">Download</Button>,
  },
  // Figma card is 1524px wide.
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof ProductDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Product Card) ────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const NoImage: Story = { name: 'No image', args: { image: undefined } };

export const TwoActions: Story = {
  name: 'Two actions',
  args: {
    actions: (
      <>
        <Button variant="dark" iconLeft="download-cloud">Download</Button>
        <Button variant="light" iconLeft="edit">Edit</Button>
      </>
    ),
  },
  parameters: { docs: { description: { story: 'Figma has a hidden second 80px button next to Download; its text is not known, `Edit` is a placeholder.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoActions: Story = { name: 'No actions', args: { actions: undefined } };

export const NoDescription: Story = { name: 'No description', args: { description: undefined } };

export const FewDetails: Story = { name: 'Few details', args: { details: DETAILS.slice(0, 2) } };

export const OnlyTitle: Story = { name: 'Only title', args: { details: [], description: undefined, actions: undefined } };

export const LongContent: Story = {
  name: 'Long content',
  args: {
    title: 'Cheerleader costume with a removable skirt, sequin top and matching pom-poms for the autumn collection',
    details: [
      ...DETAILS.slice(0, 3),
      { label: 'Manager email', value: 'paul.rudd.the.very.long.address.of.the.manager@example-company-name.com' },
      { label: 'Manager work phone number for warehouse deliveries', value: '+48 79 1362547' },
    ],
    description: `${TEXT} ${TEXT}`,
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
  parameters: { docs: { description: { story: 'The info column drops under the picture; the picture never exceeds the container.' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <ProductDetailCard {...args} />
      <ProductDetailCard {...args} image={undefined} details={DETAILS.slice(0, 2)} />
      <ProductDetailCard {...args} details={[]} description={undefined} actions={undefined} />
    </div>
  ),
};
