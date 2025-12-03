import type { WordData } from '@/types';

export const getRandomWord = (list: WordData[]) => {
  const listLength = list.length;
  const index = Math.floor(Math.random() * listLength);
  const data = list[index];

  return {
    data: {
      ...data,
      name: data.name.toUpperCase(),
    },
    hidden: data.name.replace(/\w/g, '*'),
  };
};

export const getGoogleUrl = (value: WordData) => {
  const query = (value.type || 'hewan') + ' ' + value.name;
  return `https://google.com/search?q=${query.trim().toLowerCase()}&hl=id`;
};
