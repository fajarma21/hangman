import { useEffect, useRef } from 'react';

import css from './View.module.scss';
import type { InputProps } from './View.types';

// NOTE: This approach produces a good experience on Ipad.

const Input = ({ onFocusCallback, ...restProps }: InputProps) => {
  const { disabled, value } = restProps;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleFocus = (target: EventTarget | null) => {
      if (inputRef.current && target !== inputRef.current && !disabled) {
        inputRef.current.focus();
        onFocusCallback();
      }
    };

    document.addEventListener('click', ({ target }) => handleFocus(target));
    return () =>
      document.removeEventListener('click', ({ target }) =>
        handleFocus(target),
      );
  }, [disabled, onFocusCallback]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      id="guess-letter"
      autoComplete="off"
      className={css.input}
      data-active={!!value || undefined}
      {...restProps}
    />
  );
};

export default Input;
