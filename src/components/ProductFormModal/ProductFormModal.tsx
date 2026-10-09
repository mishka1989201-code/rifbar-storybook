import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import { FileDropzone } from '../FileDropzone';
import { ImageCard } from '../ImageCard';
import { FilterField, InputField } from '../InputField';
import { Modal, ModalField, ModalSection } from '../Modal';
import './ProductFormModal.css';

/** Figma `Property 1`: `add` (AddProduct) has the library button and the dropzone, `edit` (EditProduct) the photo and its buttons. */
export type ProductFormMode = 'add' | 'edit';

/** Figma `Property 2`. */
export type ProductFormSize = '480' | '360';

/** The seven fields of the form, in Figma order. */
export type ProductFormField = 'group' | 'category' | 'name' | 'color' | 'flavor' | 'price' | 'currency';

export type ProductFormValues = Partial<Record<ProductFormField, string>>;

export interface ProductFormModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  /** Figma `Property 1`. */
  mode?: ProductFormMode;
  /** Figma `Property 2`. */
  size?: ProductFormSize;
  /** Header title. Default “Add product” / “Edit product”. */
  title?: ReactNode;
  /** Current values; an empty field shows its placeholder. */
  values?: ProductFormValues;
  /** Called when the text of `name` or `price` changes. */
  onValueChange?: (field: ProductFormField, value: string) => void;
  /** Called when a list field (`group`, `category`, `color`, `flavor`, `currency`) is pressed — the page opens its list. */
  onFieldClick?: (field: ProductFormField) => void;
  /** `edit`: URL of the current photo. */
  image?: string;
  /** `add`: the “Add” button of the ERP library was pressed. */
  onLibrary?: () => void;
  /** `add`: files were chosen or dropped. */
  onFiles?: (files: File[]) => void;
  /** `edit`: replace the photo (the refresh button). */
  onReplaceImage?: () => void;
  /** `edit`: remove the photo (the delete button). */
  onDeleteImage?: () => void;
  /** Close button in the header. */
  onClose?: () => void;
  /** Footer: “Cancel” / “Close”. */
  onCancel?: () => void;
  /** Footer: “Accept” / “Save”. */
  onSubmit?: () => void;
}

const PLACEHOLDER: Record<ProductFormField, string> = {
  group: 'Choose a product group',
  category: 'Choose category',
  name: 'Enter the product name',
  color: 'Choose color',
  flavor: 'Choose flavor',
  price: 'Write the amount here',
  currency: 'Choose currency',
};

const LABEL: Record<ProductFormField, string> = {
  group: 'Group',
  category: 'Category',
  name: 'Name',
  color: 'Color',
  flavor: 'Flavor',
  price: 'Price',
  currency: 'Base currency',
};

const LIST_FIELDS: ProductFormField[] = ['group', 'category'];
const LIST_FIELDS_2: ProductFormField[] = ['color', 'flavor'];

/**
 * Figma `Modal` (Property 1 AddProduct / EditProduct × Property 2 480 / 360): the product form dialog.
 * An organism built from `Modal` (sizes `480` / `360`), `ModalField`, `FilterField` / `InputField`, `FileDropzone`,
 * `ImageCard` and `Button`. It draws only the dialog: the lists behind the filter fields, the overlay and the focus trap are the page's.
 */
export function ProductFormModal({
  mode = 'add',
  size = '480',
  title,
  values = {},
  onValueChange,
  onFieldClick,
  image,
  onLibrary,
  onFiles,
  onReplaceImage,
  onDeleteImage,
  onClose,
  onCancel,
  onSubmit,
  className,
  ...rest
}: ProductFormModalProps) {
  const edit = mode === 'edit';

  const list = (field: ProductFormField) => (
    <ModalField key={field} label={LABEL[field]} htmlFor={`ds-product-form-${field}`}>
      <FilterField
        id={`ds-product-form-${field}`}
        placeholder={PLACEHOLDER[field]}
        value={values[field]}
        onClick={() => onFieldClick?.(field)}
      />
    </ModalField>
  );

  const text = (field: 'name' | 'price') => (
    <ModalField label={LABEL[field]} htmlFor={`ds-product-form-${field}`}>
      <InputField
        id={`ds-product-form-${field}`}
        placeholder={PLACEHOLDER[field]}
        inputMode={field === 'price' ? 'decimal' : undefined}
        value={values[field] ?? ''}
        onChange={(e) => onValueChange?.(field, e.target.value)}
      />
    </ModalField>
  );

  return (
    <Modal
      {...rest}
      size={size}
      title={title ?? (edit ? 'Edit product' : 'Add product')}
      onClose={onClose}
      className={['ds-product-form-modal', className].filter(Boolean).join(' ')}
      actions={
        <>
          <Button variant="light" iconLeft="xmark" onClick={onCancel}>
            {edit ? 'Close' : 'Cancel'}
          </Button>
          <Button variant="dark" iconLeft={edit ? 'save-line' : 'tick'} onClick={onSubmit}>
            {edit ? 'Save' : 'Accept'}
          </Button>
        </>
      }
    >
      <ModalSection divider={false}>
        {LIST_FIELDS.map(list)}
        {text('name')}
        {LIST_FIELDS_2.map(list)}
        {text('price')}
        {list('currency')}
        {edit ? (
          <div className="ds-product-form-modal__image">
            <span className="ds-product-form-modal__caption">Image</span>
            <div className="ds-product-form-modal__edit">
              <ImageCard size="lg" src={image} alt="Product photo" />
              <div className="ds-product-form-modal__edit-buttons">
                <Button variant="dark" iconOnly="reboot" aria-label="Replace photo" onClick={onReplaceImage} />
                <Button variant="danger" iconOnly="delete" aria-label="Delete photo" onClick={onDeleteImage} />
              </div>
            </div>
          </div>
        ) : (
          <div className="ds-product-form-modal__image">
            <span className="ds-product-form-modal__caption">Image</span>
            <div className="ds-product-form-modal__library">
              <span className="ds-product-form-modal__hint">Choose a photo from the ERP system library</span>
              <Button variant="outline" iconLeft="picture" onClick={onLibrary}>
                Add
              </Button>
            </div>
            <FileDropzone size="large" accept="image/*" onFiles={onFiles} />
          </div>
        )}
      </ModalSection>
    </Modal>
  );
}
