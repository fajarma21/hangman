import css from './View.module.scss';
import type { HeaderProps } from './View.types';

const Header = ({ score, status, totalScore }: HeaderProps) => {
  return (
    <div className={css.header}>
      <div className={css.inner}>
        <h1>HANGMAN</h1>
        <div className={css.score}>
          <h2 key={totalScore}>{totalScore}</h2>
          {!!score && (
            <p
              key={totalScore + score}
              className={css.addedScore}
              data-status={status}
            >
              {score}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
