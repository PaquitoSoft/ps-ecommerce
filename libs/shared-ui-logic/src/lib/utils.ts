import { v4 as uuiv4 } from 'uuid';

export const generateId = () => uuiv4();

export const deepClone = (source: unknown) => JSON.parse(JSON.stringify(source));

export const createArray = (length: number, value?: unknown) => Array.from({ length }, () => value);

export const noop = () => false;
