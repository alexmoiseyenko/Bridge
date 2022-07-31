type BoardProps = {
  'success': boolean,
  'deck_id': string,
  'remaining': number,
  'shuffled': boolean,
}

const getBoard = async (): Promise<BoardProps> => {
  const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

  return res.json();
};

const getCards = async (deckID: string) => {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`);

  return res.json();
};

const shuffleCards = (deckID: string) => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`);
};

export {
  getBoard,
  getCards,
  shuffleCards,
};
