import { NUMBER_REGEX } from '../constants';

export const formateDate = (date: string) => {
  return new Date(date).getFullYear();
};

export const isNumber = (value: string) => NUMBER_REGEX.test(value);
