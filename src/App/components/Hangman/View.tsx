import {
  FaBox,
  FaRegFaceDizzy,
  FaRegFaceLaughSquint,
  FaRegFaceSadCry,
} from 'react-icons/fa6';

import css from './View.module.scss';
import type { HangmanProps } from './View.types';

const Hangman = ({ children, count, status }: HangmanProps) => {
  const isWin = status === 'win';
  const isLose = status === 'lose';

  return (
    <div className={css.container}>
      <div className={css.category}>
        <FaBox />
        <p>Animal - Bahasa</p>
      </div>

      <div className={css.gallows}>
        <div className={css.horizontal} />
        <div className={css.vertical} />

        <div className={css.manContainer} data-active={isLose || undefined}>
          <div className={css.rope} />
          <div className={css.man} data-win={isWin || undefined}>
            {(isWin || count >= 1) && (
              <div className={css.head}>
                {isWin ? (
                  <FaRegFaceLaughSquint size={38} />
                ) : isLose ? (
                  <FaRegFaceDizzy size={38} />
                ) : (
                  <FaRegFaceSadCry size={38} />
                )}
              </div>
            )}
            {(isWin || count >= 2) && <div className={css.body} />}
            {(isWin || count >= 3) && <div className={css.rHand} />}
            {(isWin || count >= 4) && <div className={css.lHand} />}
            {(isWin || count >= 5) && <div className={css.rLeg} />}
            {(isWin || count >= 6) && <div className={css.lLeg} />}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Hangman;
