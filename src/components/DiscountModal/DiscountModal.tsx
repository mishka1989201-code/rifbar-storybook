import { useId, useState } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { FilterField, InputField } from '../InputField';
import { Modal, ModalSection, type ModalProps } from '../Modal';
import './DiscountModal.css';

/** What `onApply` receives: the chosen group and its number. */
export interface DiscountValue {
  kind: 'percent' | 'currency';
  value: number;
}

export interface DiscountModalProps
  extends Omit<ModalProps, 'title' | 'icon' | 'size' | 'description' | 'important' | 'actions' | 'children' | 'onClose'> {
  title?: ModalProps['title'];
  description?: ModalProps['description'];
  important?: ModalProps['important'];
  /** Initial choice. Figma draws the first state with nothing chosen. */
  defaultChoice?: DiscountValue['kind'] | null;
  defaultPercent?: string;
  defaultAmount?: string;
  /** Base currency shown in the (not yet interactive) currency field. */
  currency?: string;
  /** Error under the chosen field; set by the caller or by the modal itself on `Apply` without a value. */
  error?: string;
  /** Text of the error the modal shows on `Apply` without a value (Figma). */
  emptyError?: string;
  onApply?: (discount: DiscountValue) => void;
  onCancel?: () => void;
  onClose?: () => void;
  cancelLabel?: string;
  applyLabel?: string;
}

/**
 * Figma `Discount Modal` (Property = Info / Error / percent / currency): the wide `Modal` with the `Error/Importantly/Info`
 * header texts and two radio groups — a percent value or a currency amount — separated by “OR”.
 * The group that is not chosen is drawn in Grey Dark. Typing in a group chooses it.
 */
export function DiscountModal({
  title = 'Discount confirmation',
  description = 'You have selected some product(s) for the customer. Select the interest rate for the discount.',
  important = 'If you specify the discount value as 0 or empty and this customer already has a discount, it will be deleted.',
  defaultChoice = null,
  defaultPercent = '',
  defaultAmount = '',
  currency = 'US dollar',
  error,
  emptyError = 'To continue - enter the value in the input field!',
  onApply,
  onCancel,
  onClose,
  cancelLabel = 'Cancel',
  applyLabel = 'Accept',
  ...rest
}: DiscountModalProps) {
  const name = useId();
  const [choice, setChoice] = useState<DiscountValue['kind'] | null>(defaultChoice);
  const [percent, setPercent] = useState(defaultPercent);
  const [amount, setAmount] = useState(defaultAmount);
  const [own, setOwn] = useState<string | undefined>();
  const shown = error ?? own;

  const apply = () => {
    const kind = choice ?? 'percent';
    const raw = (kind === 'percent' ? percent : amount).trim().replace(',', '.');
    const value = Number(raw);
    if (!raw || Number.isNaN(value)) {
      setChoice(kind);
      setOwn(emptyError);
      return;
    }
    onApply?.({ kind, value });
  };
  const pick = (kind: DiscountValue['kind']) => {
    setChoice(kind);
    setOwn(undefined);
  };

  return (
    <Modal
      title={title}
      icon="gift-discount"
      size="wide"
      description={description}
      important={important}
      onClose={onClose}
      actions={
        <>
          <Button variant="light" iconLeft="xmark" onClick={onCancel ?? onClose}>
            {cancelLabel}
          </Button>
          <Button variant="dark" iconLeft="tick" onClick={apply}>
            {applyLabel}
          </Button>
        </>
      }
      {...rest}
    >
      <ModalSection divider={false} className="ds-discount-modal__body">
        <div className={`ds-discount-modal__group${choice === 'percent' ? ' is-chosen' : ''}`}>
          <Checkbox type="radio" size={16} name={name} aria-label="Percent" checked={choice === 'percent'} onChange={() => pick('percent')} />
          <div className="ds-discount-modal__column">
            <span className="ds-discount-modal__caption">Enter the value of the discount in percent (%)</span>
            <div className="ds-discount-modal__field">
              <InputField
                aria-label="Discount in percent"
                inputMode="decimal"
                placeholder={shown && choice === 'percent' ? 'Write the discount value here' : 'Enter the value'}
                value={percent}
                invalid={!!shown && (choice === 'percent' || choice === null)}
                onFocus={() => pick('percent')}
                onChange={(e) => {
                  setPercent(e.target.value);
                  pick('percent');
                }}
              />
              {shown && (choice === 'percent' || choice === null) && (
                <span className="ds-modal__error" role="alert">
                  {shown}
                </span>
              )}
            </div>
          </div>
        </div>
        <span className="ds-discount-modal__or">OR</span>
        <div className={`ds-discount-modal__group${choice === 'currency' ? ' is-chosen' : ''}`}>
          <Checkbox type="radio" size={16} name={name} aria-label="Currency" checked={choice === 'currency'} onChange={() => pick('currency')} />
          <div className="ds-discount-modal__row">
            <div className="ds-discount-modal__column">
              <span className="ds-discount-modal__caption">Enter the discount value in currency</span>
              <div className="ds-discount-modal__field">
                <InputField
                  aria-label="Discount in currency"
                  inputMode="decimal"
                  placeholder="Write the amount here"
                  value={amount}
                  invalid={!!shown && choice === 'currency'}
                  onFocus={() => pick('currency')}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    pick('currency');
                  }}
                />
                {shown && choice === 'currency' && (
                  <span className="ds-modal__error" role="alert">
                    {shown}
                  </span>
                )}
              </div>
            </div>
            <div className="ds-discount-modal__column ds-discount-modal__column--currency">
              <span className="ds-discount-modal__caption">Base currency</span>
              <FilterField value={currency} />
            </div>
          </div>
        </div>
      </ModalSection>
    </Modal>
  );
}
