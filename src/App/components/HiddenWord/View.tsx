import { HIDDEN_MARK, SEPARATORS } from '@/constants';

import css from './View.module.scss';
import type { HiddenWordProps } from './View.types';

const HiddenWord = ({ word, isDone, wordType }: HiddenWordProps) => {
  return (
    <>
      {isDone && wordType && <p className={css.type}>{wordType}</p>}
      {!!word && (
        <div className={css.boxContainer} data-reveal={isDone || undefined}>
          {word.split('').map((letter, index) => {
            const isSeparator = SEPARATORS.includes(letter);
            return (
              (isDone || !isSeparator) && (
                <div
                  key={`${letter}${index}`}
                  className={css.box}
                  data-separator={isSeparator || undefined}
                >
                  {letter === HIDDEN_MARK ? '' : letter}
                </div>
              )
            );
          })}
        </div>
      )}
    </>
  );
};

export default HiddenWord;
