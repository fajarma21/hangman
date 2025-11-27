import type { FocusEvent } from 'react';

import css from './View.module.scss';
import type { InputProps } from './View.types';

const Input = ({ onFocusCallback, ...restProps }: InputProps) => {
  const { disabled, value } = restProps;
  const handleForceFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (!disabled)
      e.target.focus({
        preventScroll: true,
      });
    onFocusCallback();
  };

  return (
    <input
      type="text"
      id="guess-letter"
      autoComplete="off"
      autoFocus
      className={css.input}
      data-active={!!value || undefined}
      onBlur={handleForceFocus}
      {...restProps}
    />
  );
};

export default Input;
