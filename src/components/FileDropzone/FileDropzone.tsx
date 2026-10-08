import { useId, useState, type DragEvent, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import './FileDropzone.css';

export interface FileDropzoneProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange' | 'children'> {
  /** Called with the chosen or dropped files. */
  onFiles?: (files: File[]) => void;
  /** Native `accept`, e.g. `image/*`. */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** First line, next to the icon. */
  label?: ReactNode;
  /** Link-like text after “or,”. */
  browseLabel?: ReactNode;
  /** `default` = 95px high (Figma BarcodeSettings), `large` = 160px high (Figma Add Product Modal → Upload Image). */
  size?: 'default' | 'large';
  /** Preview only: draws the drag-over state. Real drag-over comes from the browser events. */
  forceDragOver?: boolean;
}

/**
 * Figma `Drag Files` (BarcodeSettings → Upload): a dashed drop area with an upload icon, “Drag your files here”
 * and “or, Browse”. A real `<input type="file">` sits inside, so click, keyboard and drop all work.
 */
export function FileDropzone({
  onFiles,
  accept,
  multiple,
  disabled = false,
  label = 'Drag your files here',
  browseLabel = 'Browse',
  size = 'default',
  forceDragOver = false,
  className,
  ...rest
}: FileDropzoneProps) {
  const inputId = useId();
  const [over, setOver] = useState(false);
  const classes = [
    'ds-file-dropzone',
    size === 'large' && 'ds-file-dropzone--large',
    (over || forceDragOver) && 'is-drag-over',
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setOver(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles?.(multiple ? files : files.slice(0, 1));
  };

  return (
    <label
      htmlFor={inputId}
      className={classes}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      {...rest}
    >
      <input
        id={inputId}
        type="file"
        className="ds-file-dropzone__input"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles?.(files);
          e.target.value = '';
        }}
      />
      <span className="ds-file-dropzone__line">
        <Icon name="upload" size={24} color="hover" className="ds-file-dropzone__icon" />
        <span>{label}</span>
      </span>
      <span>
        or, <span className="ds-file-dropzone__browse">{browseLabel}</span>
      </span>
    </label>
  );
}
