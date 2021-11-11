import React, { FC, useState, useCallback, useEffect } from "react";
import { Card } from "./Card";
import { cloneDeep } from "lodash";

const style = {
  // width: 400,
  maxHeight: 300,
  overFlow: "auto",
  background: "#e8e8e8",
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const ListContainer: FC<{
  list: { index: number; text: string }[];
  onDrop: (list: any[]) => void;
}> = ({ list, onDrop }) => {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    setCards(cloneDeep(list));
  }, [list]);
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      //   onDrop(dragIndex, hoverIndex);
      const dragCard = cards[dragIndex];
      const newCards = [...cards];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      setCards(newCards);
    },
    [cards]
  );
  const localOnDrop = () => {
    onDrop(cards);
  };

  const renderCard = (card: { index: number; text: string }, index: number) => {
    return (
      <Card
        key={card.index}
        index={index}
        text={card.text}
        moveCard={moveCard}
        onDrop={localOnDrop}
      />
    );
  };

  return (
    <>
      <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
    </>
  );
};
