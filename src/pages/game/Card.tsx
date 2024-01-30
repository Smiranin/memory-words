import { GameCard, CARD_STATUSES } from 'models/game.model';
import styles from './card.module.css';
import { joinClasses } from 'utils/styles-healper';
import { useEffect, useState } from 'react';

const CARD_TIMEOUT = 2000;

export default function Card(props: {
  card: GameCard;
  onOpen: (result: GameCard) => void;
  onTimeoutCb: (result: GameCard) => void;
}) {
  const { card, onOpen, onTimeoutCb } = props;
  const [cssClasses, setCssClasses] = useState('');

  function handleClick(): void {
    if (card.status !== CARD_STATUSES.closed) return;
    onOpen(card);
  }

  useEffect(() => {
    let timeoutId: number;
    if (card.status === CARD_STATUSES.opened) {
      timeoutId = setTimeout(() => onTimeoutCb(card), CARD_TIMEOUT);
    }
    const newState = joinClasses(
      {
        [styles.open]: card.status === CARD_STATUSES.opened,
        [styles.won]: card.status === CARD_STATUSES.completed
      },
      styles.card
    );
    setCssClasses(newState);
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [card.status]);

  return (
    <div onClick={handleClick} className={cssClasses}>
      <div className={styles.content}>
        <div className={styles.front}>{card.word}</div>
        <div className={styles.back}></div>
      </div>
    </div>
  );
}

// const tiltRef = useRef(null);

// useEffect(() => {
//   if (tiltRef.current) {
//     const tiltNode = tiltRef.current;
//     const vanillaTiltOptions = {
//       max: 25,
//       speed: 400,
//       glare: true,
//       'max-glare': 0.5
//     };
//     VanillaTilt.init(tiltNode, vanillaTiltOptions);
//     // @ts-expect-error. titlNoda has vanillaTilt property
//     return () => tiltNode.vanillaTilt.destroy();
//   }
// }, [])
