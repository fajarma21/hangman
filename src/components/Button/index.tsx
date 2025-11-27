import css from './index.module.scss';
import type { ButtonProps } from './index.types';

const Button = ({
  children,
  href,
  target,
  variant = 'primary',
  ...restButtonProps
}: ButtonProps) => {
  if (href) {
    return (
      <a
        className={css.button}
        data-variant={variant}
        href={href}
        target={target}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={css.button}
      data-variant={variant}
      {...restButtonProps}
    >
      {children}
    </button>
  );
};

export default Button;
