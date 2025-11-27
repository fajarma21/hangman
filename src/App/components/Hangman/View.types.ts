import type { ReactNode } from 'react';
import type { Status } from '@/types';

export interface HangmanProps {
  children?: ReactNode;
  count: number;
  status: Status;
}
