import css from './View.module.scss';
import type { WrongGuessProps } from './View.types';

const WrongGuess = ({ letters }: WrongGuessProps) => {
  return (
    <>
      <h4 className={css.title}>Wrong Guesses</h4>
      <div className={css.container}>{letters || '-'}</div>
    </>
  );
};

export default WrongGuess;
