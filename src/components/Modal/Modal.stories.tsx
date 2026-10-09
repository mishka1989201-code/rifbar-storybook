import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { FilterField, InputField } from '../InputField';
import { Checkbox } from '../Checkbox';
import { FileDropzone } from '../FileDropzone';
import { Modal, ModalField, ModalRow, ModalSection } from './Modal';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7058-30262';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'Create warehouse', size: 'desktop', onClose: () => {} },
  argTypes: {
    title: { control: 'text' },
    size: { control: 'inline-radio', options: ['desktop', 'mobile', 'wide', 'list', '480', '360'] },
    icon: { control: 'text' },
    children: { control: false },
    actions: { control: false },
    onClose: { action: 'close' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const Fields = ({ idPrefix }: { idPrefix: string }) => (
  <>
    <ModalSection>
      <ModalField label="Warehouse name" htmlFor={`${idPrefix}-name`}>
        <InputField id={`${idPrefix}-name`} placeholder="Enter the name of the warehouse" />
      </ModalField>
      <ModalField label="Location" htmlFor={`${idPrefix}-location`}>
        <InputField id={`${idPrefix}-location`} placeholder="Enter the warehouse address" />
      </ModalField>
    </ModalSection>
    <ModalSection>
      <ModalField label="Manager" htmlFor={`${idPrefix}-manager`}>
        <FilterField id={`${idPrefix}-manager`} placeholder="Choose a warehouse manager" />
      </ModalField>
    </ModalSection>
  </>
);

const Actions = ({ accept = 'Accept', cancel = 'Close' }: { accept?: string; cancel?: string }) => (
  <>
    <Button variant="light" iconLeft="xmark">{cancel}</Button>
    <Button variant="dark" iconLeft="tick">{accept}</Button>
  </>
);

// ─── DEFAULT (Figma: Property 1=Desktop) ─────────────────────────────────────
export const Default: Story = {
  render: (args) => (
    <Modal {...args} actions={<Actions />}>
      <Fields idPrefix="desktop" />
    </Modal>
  ),
};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Mobile: Story = {
  name: 'Mobile',
  args: { size: 'mobile' },
  render: (args) => (
    <Modal {...args} actions={<Actions accept="Save" />}>
      <Fields idPrefix="mobile" />
    </Modal>
  ),
};

export const WithoutIcon: Story = {
  name: 'Without icon',
  args: { icon: null },
  render: (args) => (
    <Modal {...args} actions={<Actions />}>
      <Fields idPrefix="noicon" />
    </Modal>
  ),
};

export const WithoutFooter: Story = {
  name: 'Without footer',
  args: { title: 'Warehouse details' },
  render: (args) => (
    <Modal {...args}>
      <Fields idPrefix="nofooter" />
    </Modal>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    if (!open) return <Button variant="dark" onClick={() => setOpen(true)}>Open pop-up</Button>;
    return (
      <Modal {...args} onClose={() => setOpen(false)} actions={
        <>
          <Button variant="light" iconLeft="xmark" onClick={() => setOpen(false)}>Close</Button>
          <Button variant="dark" iconLeft="tick" onClick={() => setOpen(false)}>Accept</Button>
        </>
      }>
        <Fields idPrefix="interactive" />
      </Modal>
    );
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Create a new warehouse for the northern distribution region' },
  render: (args) => (
    <Modal {...args} actions={<Actions />}>
      <Fields idPrefix="longtitle" />
    </Modal>
  ),
};

export const LongTitleMobile: Story = {
  name: 'Long title (mobile)',
  args: { size: 'mobile', title: 'Create a new warehouse for the northern distribution region' },
  render: (args) => (
    <Modal {...args} actions={<Actions accept="Save" />}>
      <Fields idPrefix="longtitlemobile" />
    </Modal>
  ),
};

export const AddEmployee: Story = {
  name: 'Add employee (Figma Add Product Modal)',
  args: { title: 'Adding an employee to the warehouse' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=682-287127',
    },
    docs: { description: { story: 'Figma `Add Product Modal`: the same dialog with one `FilterField`; the long title wraps to two lines. Footer button is called “Save”.' } },
  },
  render: (args) => (
    <Modal {...args} actions={<Actions accept="Save" />}>
      <ModalSection>
        <ModalField label="Employee name" htmlFor="add-employee-name">
          <FilterField id="add-employee-name" placeholder="Choose an employee" />
        </ModalField>
      </ModalSection>
    </Modal>
  ),
};

export const AddProduct: Story = {
  name: 'Add product (wide, two columns)',
  args: { title: 'Add product', size: 'wide' },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=73-42643' },
    docs: { description: { story: 'Figma `Add Product Modal` (630px): `size="wide"`, `ModalRow`s with two fields, an image `FileDropzone size="large"`, no line under the body. Buttons are “Cancel” / “Accept”.' } },
  },
  render: (args) => (
    <Modal {...args} actions={<><Button variant="light" iconLeft="xmark">Cancel</Button><Button variant="dark" iconLeft="tick">Accept</Button></>}>
      <ModalSection divider={false}>
        <ModalRow>
          <ModalField label="Category" htmlFor="product-category">
            <FilterField id="product-category" placeholder="Choose category" />
          </ModalField>
          <ModalField label="Name" htmlFor="product-name">
            <InputField id="product-name" placeholder="Enter the product name" />
          </ModalField>
        </ModalRow>
        <ModalRow>
          <ModalField label="Color" htmlFor="product-color">
            <FilterField id="product-color" placeholder="Choose color" />
          </ModalField>
          <ModalField label="Flavor" htmlFor="product-flavor">
            <FilterField id="product-flavor" placeholder="Choose flavor" />
          </ModalField>
        </ModalRow>
        <ModalRow>
          <ModalField label="Price" htmlFor="product-price">
            <InputField id="product-price" inputMode="decimal" placeholder="Write the amount here" />
          </ModalField>
          <ModalField label="Base currency" htmlFor="product-currency">
            <FilterField id="product-currency" value="US dollar" />
          </ModalField>
        </ModalRow>
        <ModalField label="Image">
          <FileDropzone size="large" accept="image/*" />
        </ModalField>
      </ModalSection>
    </Modal>
  ),
};

export const AddProductNarrow: Story = {
  name: 'Add product in a narrow container',
  args: { title: 'Add product', size: 'wide' },
  decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Fields of a `ModalRow` stack when the dialog is narrower than two 200px fields (AI-defined).' } } },
  render: (args) => (
    <Modal {...args}>
      <ModalSection divider={false}>
        <ModalRow>
          <ModalField label="Category" htmlFor="narrow-category">
            <FilterField id="narrow-category" placeholder="Choose category" />
          </ModalField>
          <ModalField label="Name" htmlFor="narrow-name">
            <InputField id="narrow-name" placeholder="Enter the product name" />
          </ModalField>
        </ModalRow>
      </ModalSection>
    </Modal>
  ),
};

export const InvalidField: Story = {
  name: 'Field with error',
  render: (args) => (
    <Modal {...args} actions={<Actions />}>
      <ModalSection>
        <ModalField label="Warehouse name" htmlFor="invalid-name">
          <InputField id="invalid-name" defaultValue="" invalid placeholder="Enter the name of the warehouse" />
        </ModalField>
      </ModalSection>
    </Modal>
  ),
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  render: (args) => (
    <div style={{ maxWidth: 280 }}>
      <Modal {...args} actions={<Actions />}>
        <Fields idPrefix="narrow" />
      </Modal>
    </div>
  ),
};

// ─── ERROR / IMPORTANT / INFO (Figma `Error/Importantly/Info`) ───────────────
const ERROR_FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=818-308102';

const DISCOUNT_INFO = 'You have selected some product(s) for the customer. Select the interest rate for the discount.';
const DISCOUNT_IMPORTANT =
  'If you specify the discount value as 0 or empty and this customer already has a discount, it will be deleted.';

type DiscountChoice = 'percent' | 'currency' | null;

/** Figma `Discount Modal`: two radio groups (percent / currency) separated by “OR”. The inactive group is drawn in Grey Dark. */
function DiscountBody({ choice, percent, amount, error }: { choice: DiscountChoice; percent?: string; amount?: string; error?: string }) {
  const name = useId();
  const caption = (active: boolean): React.CSSProperties => ({
    color: active ? 'var(--color-text)' : 'var(--color-grey-dark)',
    fontSize: 'var(--font-size-small)',
    lineHeight: 'var(--font-line-height-small)',
    fontWeight: 'var(--font-weight-medium)',
  });
  const group: React.CSSProperties = { display: 'flex', gap: 'var(--spacing-8)', alignItems: 'flex-start' };
  const column: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', flex: '1 1 0', minWidth: 0 };
  return (
    <ModalSection divider={false} style={{ gap: 'var(--spacing-24)' }}>
      <div style={group}>
        <Checkbox type="radio" size={16} name={name} aria-label="Percent" checked={choice === 'percent'} onChange={() => {}} />
        <div style={column}>
          <span style={caption(choice === 'percent')}>Enter the value of the discount in percent (%)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <InputField
              aria-label="Discount in percent"
              placeholder={error ? 'Write the discount value here' : 'Enter the value'}
              defaultValue={percent}
              invalid={!!error}
            />
            {error && (
              <span className="ds-modal__error" role="alert">
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
      <span style={{ ...caption(true), fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', lineHeight: 1 }}>OR</span>
      <div style={group}>
        <Checkbox type="radio" size={16} name={name} aria-label="Currency" checked={choice === 'currency'} onChange={() => {}} />
        <div style={{ ...column, flexDirection: 'row', gap: 'var(--spacing-8)' }}>
          <div style={column}>
            <span style={caption(choice === 'currency')}>Enter the discount value in currency</span>
            <InputField aria-label="Discount in currency" placeholder="Write the amount here" defaultValue={amount} />
          </div>
          <div style={{ ...column, flex: 'none' }}>
            <span style={caption(choice === 'currency')}>Base currency</span>
            <FilterField value="US dollar" />
          </div>
        </div>
      </div>
    </ModalSection>
  );
}

const discountDocs = (text: string) => ({
  design: { type: 'figma' as const, url: ERROR_FIGMA_URL },
  docs: { description: { story: text } },
});

export const WithDescriptionAndImportant: Story = {
  name: 'Description and important note (Figma Info / Importantly)',
  args: {
    title: 'Discount confirmation',
    icon: 'gift-discount',
    size: 'wide',
    description: DISCOUNT_INFO,
    important: DISCOUNT_IMPORTANT,
  },
  parameters: discountDocs(
    'Figma `Error/Importantly/Info`: `description` is Medium text in Secondary Grey, `important` is Semi-Bold text in Warning, both under the title row, 8px apart.',
  ),
  render: (args) => (
    <Modal {...args} actions={<Actions cancel="Cancel" />}>
      <DiscountBody choice={null} />
    </Modal>
  ),
};

export const DiscountWithError: Story = {
  name: 'Discount: field error (Figma Error)',
  args: { title: 'Discount confirmation', icon: 'gift-discount', size: 'wide', description: DISCOUNT_INFO, important: DISCOUNT_IMPORTANT },
  parameters: discountDocs(
    'Figma `Discount Modal` with an error: the chosen group has an empty field with a Danger border and the message “To continue - enter the value in the input field!” (Regular 12px, Danger) 4px below it.',
  ),
  render: (args) => (
    <Modal {...args} actions={<Actions cancel="Cancel" />}>
      <DiscountBody choice="percent" error="To continue - enter the value in the input field!" />
    </Modal>
  ),
};

export const DiscountPercentChosen: Story = {
  name: 'Discount: percent chosen',
  args: { title: 'Discount confirmation', icon: 'gift-discount', size: 'wide', description: DISCOUNT_INFO, important: DISCOUNT_IMPORTANT },
  parameters: discountDocs('Figma `Discount Modal`: the percent group is chosen and filled (`15`); the currency group is Grey Dark.'),
  render: (args) => (
    <Modal {...args} actions={<Actions cancel="Cancel" />}>
      <DiscountBody choice="percent" percent="15" />
    </Modal>
  ),
};

export const DiscountCurrencyChosen: Story = {
  name: 'Discount: currency chosen',
  args: { title: 'Discount confirmation', icon: 'gift-discount', size: 'wide', description: DISCOUNT_INFO, important: DISCOUNT_IMPORTANT },
  parameters: discountDocs('Figma `Discount Modal`: the currency group is chosen and filled (`1200`, US dollar); the percent group is Grey Dark.'),
  render: (args) => (
    <Modal {...args} actions={<Actions cancel="Cancel" />}>
      <DiscountBody choice="currency" amount="1200" />
    </Modal>
  ),
};

export const FileNotSupported: Story = {
  name: 'File error (Figma Add Product Modal → error)',
  args: { title: 'Add product', size: 'wide' },
  parameters: discountDocs(
    'Figma `Add Product Modal` with an error: the dropzone keeps its dashed border; a Danger message “The attached file is not supported!” sits 4px under it (`ModalField error`, the dropzone is `invalid`).',
  ),
  render: (args) => (
    <Modal {...args} actions={<Actions cancel="Cancel" />}>
      <ModalSection divider={false}>
        <ModalField label="Image" error="The attached file is not supported!">
          <FileDropzone size="large" accept="image/*" invalid />
        </ModalField>
      </ModalSection>
    </Modal>
  ),
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-32)', alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 450px', maxWidth: 450 }}>
        <Modal title="Create warehouse" actions={<Actions />}>
          <Fields idPrefix="all-desktop" />
        </Modal>
      </div>
      <div style={{ flex: '1 1 340px', maxWidth: 340 }}>
        <Modal title="Create warehouse" size="mobile" actions={<Actions accept="Save" />}>
          <Fields idPrefix="all-mobile" />
        </Modal>
      </div>
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Add Product Modal Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AddProductDark: Story = {
  ...AddProduct,
  name: 'Add product (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
