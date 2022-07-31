import { ACTION } from '../reducers/balance';

export const addAmount = (amount: number) => ({
  type: ACTION.ADD_AMOUNT,
  amount,
});

export const subtractAmount = (amount: number) => ({
  type: ACTION.SUBTRACT_AMOUNT,
  amount,
});
