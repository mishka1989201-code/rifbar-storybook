import { useId, useState, type HTMLAttributes } from 'react';
import { Button } from '../Button';
import { FileDropzone, type FileDropzoneProps } from '../FileDropzone';
import { TextField } from '../InputField';
import './BarcodeSettings.css';

/** Figma `Property 1`: `generate` = Information1, `upload` = Information2, `preview` = Information3. */
export type BarcodeSettingsMode = 'generate' | 'upload' | 'preview';

export interface BarcodeSettingsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  mode?: BarcodeSettingsMode;

  // ── generate ──
  /** `generate`: the text to encode. Controlled when set. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;

  // ── upload ──
  /** `upload`: props of the `FileDropzone`. */
  dropzoneProps?: Omit<FileDropzoneProps, 'disabled'>;

  // ── generate + upload ──
  /** Heading above the field. Default “Generate barcode” / “Upload barcode”. */
  title?: string;
  /** Label of the confirm button. Default “Generate” / “Accept”. */
  submitLabel?: string;
  /** Label of the clear button. */
  clearLabel?: string;
  /**
   * Enables the confirm button. In Figma it is drawn at 20 % (disabled): by default `generate` enables it
   * once the text is not empty, `upload` keeps it disabled until you pass `true`.
   */
  canSubmit?: boolean;
  onSubmit?: () => void;
  onClear?: () => void;

  // ── preview ──
  /** `preview`: barcode image URL. */
  image?: string;
  /** `preview`: text alternative of the barcode, e.g. its number. */
  imageAlt?: string;
}

/**
 * Figma `BarcodeSettings` (Information1 / 2 / 3): one panel of the barcode card — the text to generate a barcode
 * from, the file to upload one, or the barcode preview. The panel has the Secondary Light line on its right side,
 * so three of them side by side form the Figma card.
 */
export function BarcodeSettings({
  mode = 'generate',
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Enter data to create a barcode',
  dropzoneProps,
  title,
  submitLabel,
  clearLabel = 'Clean up',
  canSubmit,
  onSubmit,
  onClear,
  image,
  imageAlt = 'Barcode',
  className,
  ...rest
}: BarcodeSettingsProps) {
  const titleId = useId();
  const [inner, setInner] = useState(defaultValue);
  const text = value ?? inner;
  const classes = ['ds-barcode-settings', `ds-barcode-settings--${mode}`, className].filter(Boolean).join(' ');

  if (mode === 'preview') {
    return (
      <div className={classes} {...rest}>
        <div className="ds-barcode-settings__preview">
          {image && <img className="ds-barcode-settings__image" src={image} alt={imageAlt} />}
        </div>
      </div>
    );
  }

  const isGenerate = mode === 'generate';
  const enabled = canSubmit ?? (isGenerate ? text.trim() !== '' : false);
  const clear = () => {
    setInner('');
    if (isGenerate) onChange?.('');
    onClear?.();
  };

  return (
    <div className={classes} role="group" aria-labelledby={titleId} {...rest}>
      <div className="ds-barcode-settings__section">
        <p id={titleId} className="ds-barcode-settings__title">
          {title ?? (isGenerate ? 'Generate barcode' : 'Upload barcode')}
        </p>
        {isGenerate ? (
          <TextField
            className="ds-barcode-settings__field"
            aria-labelledby={titleId}
            placeholder={placeholder}
            value={text}
            onChange={(e) => {
              setInner(e.target.value);
              onChange?.(e.target.value);
            }}
          />
        ) : (
          <FileDropzone {...dropzoneProps} />
        )}
        <div className="ds-barcode-settings__buttons">
          <Button variant="light" iconLeft="xmark" onClick={clear}>
            {clearLabel}
          </Button>
          <Button variant="dark" iconLeft="tick" disabled={!enabled} onClick={onSubmit}>
            {submitLabel ?? (isGenerate ? 'Generate' : 'Accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
