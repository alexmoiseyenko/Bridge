const MOCK_INITIAL_BALANCE = 100;

const initState = {
  balance: MOCK_INITIAL_BALANCE,
};

export enum ACTION {
  ADD_AMOUNT = 'ADD_AMOUNT',
  SUBTRACT_AMOUNT = 'SUBTRACT_AMOUNT',
}

interface ActionProps {
  type: ACTION;
  amount: number;
}

const balance = (
  state = initState,
  action = { type: ACTION.ADD_AMOUNT, amount: 10 },
) => {
  switch (action.type) {
    case ACTION.ADD_AMOUNT:
      return {
        balance: state.balance + action.amount,
      };
    case ACTION.SUBTRACT_AMOUNT:
      return {
        balance: state.balance - action.amount,
      };
    default:
      return state;
  }
};

export default balance;
