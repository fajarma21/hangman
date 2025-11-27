import { useRef, useState, type ChangeEvent } from 'react';

import Button from '@/components/Button';
import { ANIMAL_LIST } from '@/constants/animals';
import type { Status, WordData } from '@/types';

import Input from './components/Input';
import WrongGuess from './components/WrongGuess';
import Hangman from './components/Hangman';
import Header from './components/Header';
import HiddenWord from './components/HiddenWord';
import { getGoogleUrl, getRandomWord } from './View.helpers';
import css from './View.module.scss';
import { useIntersect } from 'fajarma-react-lib';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const INITIAL_HIDDEN = (() => getRandomWord(ANIMAL_LIST))();

const App = () => {
  const doneWords = useRef<string[]>([]);

  const [totalScore, setTotalScore] = useState(0);
  const [score, setScore] = useState('');

  const [wordData, setwordData] = useState<WordData>(INITIAL_HIDDEN.data);
  const [status, setStatus] = useState<Status>('');
  const [hiddenWord, setHiddenWord] = useState(INITIAL_HIDDEN.hidden);
  const [guessLetter, setGuessLetter] = useState('');
  const [wrongLetters, setWrongLetters] = useState<string>('');

  const [showedOnViewport, setShowedOnViewport] = useState(false);
  const { ref } = useIntersect<HTMLDivElement>(setShowedOnViewport);

  const isDone = !!status;

  const handleGuessLetter = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.toUpperCase();
    const newValue = value[value.length - 1];

    if (
      !newValue ||
      !newValue.match(/[A-Z]/) ||
      (hiddenWord + wrongLetters).includes(newValue)
    )
      return;

    setGuessLetter(newValue);

    const word = wordData.name;
    if (word.includes(newValue)) {
      const newHiddenArr = hiddenWord.split('');
      for (let index = 0; index < word.length; index++) {
        if (word[index] === newValue) newHiddenArr[index] = newValue;
      }
      const hiddenStr = newHiddenArr.join('');
      setHiddenWord(hiddenStr);

      if (word === hiddenStr) {
        const scoreAdd = Math.max(1, word.length - wrongLetters.length);
        setScore('+' + String(scoreAdd));
        setTotalScore((prev) => prev + scoreAdd);
        setStatus('win');
        doneWords.current.push(word);
      }
    } else {
      setWrongLetters((prev) => prev + newValue);

      if (wrongLetters.length + 1 >= 6) {
        const remainingLetter = hiddenWord.replace(/\w/g, '').length;
        setScore('-' + String(remainingLetter));
        setTotalScore((prev) => prev - remainingLetter);

        setStatus('lose');
        setHiddenWord(word);
      }
    }
  };

  const handleReset = () => {
    let randomWord = getRandomWord(ANIMAL_LIST);
    while (doneWords.current.includes(randomWord.data.name)) {
      randomWord = getRandomWord(ANIMAL_LIST);
    }

    setwordData(randomWord.data);
    setHiddenWord(randomWord.hidden);
    setWrongLetters('');
    setGuessLetter('');
    setStatus('');
  };

  const handleFocus = () => {
    if (ref.current && !showedOnViewport)
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <Header score={score} status={status} totalScore={totalScore} />
      <div className={css.container}>
        <Hangman count={wrongLetters.length} status={status}></Hangman>

        <div ref={ref} className={css.section}>
          <Input
            key={guessLetter}
            value={guessLetter}
            disabled={isDone}
            onChange={handleGuessLetter}
            onFocusCallback={handleFocus}
          />

          <HiddenWord
            word={hiddenWord}
            isDone={isDone}
            wordType={wordData.type}
          />
        </div>

        <div className={css.section}>
          <WrongGuess letters={wrongLetters} />
        </div>

        {isDone && (
          <div className={css.section} data-horizontal>
            <Button
              variant="secondary"
              href={getGoogleUrl(wordData)}
              target="_blank"
            >
              <FaMagnifyingGlass />
            </Button>
            <Button autoFocus={isDone} onClick={handleReset}>
              Play Again
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
