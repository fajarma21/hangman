import type { ANIMAL_LIST } from '@/constants/animals';

export type WordData = (typeof ANIMAL_LIST)[number];
export type Status = 'win' | 'lose' | '';
