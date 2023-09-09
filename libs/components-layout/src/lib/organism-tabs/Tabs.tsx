import {memo} from 'react';

import {T_CardLayer} from 'TS_General';

import {T_TabId} from './tabsContext';
import {TabSelector} from './TabSelector';
import {TabsProvider} from './TabsProvider';

import {Card} from '../molecules/Card';

type T_Props = {
    defaultTab?: T_TabId
    layer: T_CardLayer
  }

const Tabs: React.FC<T_Props> = memo(({defaultTab, layer, children}) => {
  const hasCard = !!layer;
  return <TabsProvider defaultTab={defaultTab}>
    {hasCard ? <Card layer={layer}>
      <TabSelector />
      {children}
    </Card> : <>
      <TabSelector />
      {children}
    </>}
  </TabsProvider>;
});

Tabs.displayName = 'Tabs';
export {Tabs};
