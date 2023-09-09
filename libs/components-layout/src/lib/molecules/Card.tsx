import {memo, ReactNode, useEffect, useState} from 'react';

import {T_CardLayer} from 'TS_General';

import styles from './Card.module.css';

/* eslint-disable-next-line */
type T_Props = {
  layer: T_CardLayer
  heading?: string | ReactNode
  style?: Record<string, any>
}

const Card: React.FC<T_Props> = memo(({layer, heading, children, style}) => {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 50);
  }, []);
  const classNames = styles['card'] + ' ' + styles[`card-layer-${layer}`];

  return (
    <div className={classNames} style={{opacity, ...style}}>
      {(layer === '1' && heading) && <h1>{heading}</h1>}
      {(layer === '2' && heading) && <h2>{heading}</h2>}
      {(layer === '3' && heading) && <h3>{heading}</h3>}
      {(layer === '4' && heading) && <h4>{heading}</h4>}
      {(layer === '5' && heading) && <h5>{heading}</h5>}
      {children}
    </div>
  );
});

Card.displayName = 'Card';
export {Card};
