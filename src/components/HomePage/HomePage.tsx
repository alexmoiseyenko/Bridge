import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import img from '../../public/images/card/cardBack.jpeg';
import { getBoard, getCards, shuffleCards } from '../../utils/api/board/board';
import { getCardValue } from '../../utils/cards/cards';
import { addAmount, subtractAmount } from '../../redux/actions/balance';
import MOCK_BET_AMOUNT from '../../utils/consts';

import Card from '../Card/Card';

export enum PICKED_CARD {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

enum GAME_STATUS {
    WON = 'WON',
    DRAW = 'DRAW',
    LOSE = 'LOSE',
}

const HomePage = (): JSX.Element => {
  const { t } = useTranslation('homePage');
  const store = useStore();
  const navigate = useNavigate();

  const [deckID, setDeckID] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>();

  const [leftCardPic, setLeftCardPic] = useState<string>();
  const [rightCardPic, setRightCardPic] = useState<string>();

  useEffect(() => {
    const deckId = localStorage.getItem('deck_id');
    const userName = localStorage.getItem('userName');

    if (deckId) {
      setDeckID(deckId);
    } else if (userName) {
      getBoard().then((board) => {
        localStorage.setItem('deck_id', board.deck_id);
        setDeckID(board.deck_id);
      });
    } else {
      navigate('/login');
    }
  }, []);

  const onCardClick = (pickedCard: PICKED_CARD) => {
    if (leftCardPic) {
      return;
    }

    getCards(deckID).then(({ cards }) => {
      const leftCard = cards[0];
      const rightCard = cards[1];

      const leftCardValue = getCardValue(leftCard.value);
      const rightCardValue = getCardValue(rightCard.value);

      if (leftCardValue === rightCardValue) {
        setGameStatus(GAME_STATUS.DRAW);
      } else if (leftCardValue < rightCardValue) {
        if (pickedCard === PICKED_CARD.LEFT) {
          setGameStatus(GAME_STATUS.LOSE);
          store.dispatch(subtractAmount(MOCK_BET_AMOUNT));
        } else {
          setGameStatus(GAME_STATUS.WON);
          store.dispatch(addAmount(MOCK_BET_AMOUNT * 2));
        }
      } else if (leftCardValue > rightCardValue) {
        if (pickedCard === PICKED_CARD.RIGHT) {
          setGameStatus(GAME_STATUS.LOSE);
          store.dispatch(subtractAmount(MOCK_BET_AMOUNT));
        } else {
          setGameStatus(GAME_STATUS.WON);
          store.dispatch(addAmount(MOCK_BET_AMOUNT * 2));
        }
      }

      setLeftCardPic(leftCard.images.png);
      setRightCardPic(rightCard.images.png);
    });
  };

  const resetGame = useCallback(() => {
    setGameStatus(undefined);
    setLeftCardPic(undefined);
    setRightCardPic(undefined);
    shuffleCards(deckID);
  }, [deckID]);

  const getGameStatus = useCallback(() => {
    if (gameStatus === GAME_STATUS.WON) {
      return (
        <p className="py-4 text-xl font-bold text-green-700">
          {t('homePage.game.status.win', { amount: MOCK_BET_AMOUNT * 2 })}
        </p>
      );
    }

    if (gameStatus === GAME_STATUS.LOSE) {
      return (
        <p className="py-4 text-xl font-bold text-rose-600">
          {t('homePage.game.status.lost')}
        </p>
      );
    }

    return (
      <p className="py-4 text-xl font-bold">
        {t('homePage.game.status.draw')}
      </p>
    );
  }, [gameStatus]);

  return (
    <div className="flex justify-center">
      <div className="container h-full w-full py-4 flex flex-col justify-between items-center px-4 justify-center">
        <h2 className="text-2xl font-bold">
          {t('homePage.title')}
        </h2>
        <p className="text-slate-400">
          {t('homePage.description')}
        </p>
        <div className="flex flex-col sm:flex-row w-full justify-between">
          <Card
            cardPic={leftCardPic || img}
            cardSide={PICKED_CARD.LEFT}
            onCardClick={onCardClick}
          />
          {leftCardPic && (
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold">
                {t('homePage.gameStatus')}
                :
              </h3>
                {getGameStatus()}
              <button
                type="button"
                className="px-4 py-2 bg-blue-700 text-white cursor-pointer rounded"
                onClick={resetGame}
              >
                {t('homePage.button.playAgain')}
              </button>
            </div>
          )}
          <Card
            cardPic={rightCardPic || img}
            cardSide={PICKED_CARD.RIGHT}
            onCardClick={onCardClick}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
