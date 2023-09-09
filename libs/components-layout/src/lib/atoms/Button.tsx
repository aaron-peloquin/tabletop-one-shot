import {memo, SyntheticEvent} from 'react';

import style from './Button.module.css';

type T_Props = {
  ariaLabel?: string
  disabled?: boolean
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: SyntheticEvent) => void
}

type T_CombinedProps = T_Props

const Button: React.FC<T_CombinedProps> = memo(({
  ariaLabel,
  disabled,
  text,
  type,
  ...buttonAttributes
}) => {
  return <button
    aria-label={ariaLabel}
    className={style['button']}
    disabled={disabled}
    type={type}
    {...buttonAttributes}
  >
    {text}
  </button>;
});

Button.displayName = 'Button';
export {Button};
