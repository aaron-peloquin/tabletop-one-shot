import {GiShoonerSailboat} from 'react-icons/gi';

import classNames from './TravelingShip.module.css';

import {GridArea} from '../molecules/GridArea';
import {GridTemplate} from '../molecules/GridTemplate';

const TravelingShip = () => {
  return <GridTemplate justifyItems="center">
    <svg width="1px" height="1px">
      <defs>
        <linearGradient id="wagon-gradient" gradientTransform="rotate(81.2)">
          <stop stopColor="tan" offset="0%" />
          <stop stopColor="sandybrown" offset="89.5%" />
          <stop stopColor="saddlebrown" offset="90.5%" />
        </linearGradient>
      </defs>
    </svg>
    <GridArea className={classNames['ship']}>
      <GiShoonerSailboat fill="url(#wagon-gradient)" />
    </GridArea>
  </GridTemplate>;
};

TravelingShip.displayName = 'TravelingShip';
export {TravelingShip};
