import React from 'react';
import img from '../../public/images/card/cardBack.jpeg';
import { PICKED_CARD } from '../HomePage/HomePage';

interface CardProps {
  cardPic: string;
  cardSide: PICKED_CARD;
  onCardClick: (cardSide: PICKED_CARD) => void;
}

const Card: React.FC<CardProps> = (props): JSX.Element => {
  const { cardPic, cardSide, onCardClick } = props;
  return (
    <button
      type="button"
      onClick={() => onCardClick(cardSide)}
    >
      <img
        className="
          h-36
          sm:h-48
          md:h-60
          lg:h-72
          xl:h-84
          2xl:h-96
          w-24
          sm:w-32
          md:w-40
          lg:w-48
          xl:w-64
          2xl:w-80
          cursor-pointer
        "
        src={cardPic || img}
        alt="Card"
      />
    </button>
  );
};

export default Card;
