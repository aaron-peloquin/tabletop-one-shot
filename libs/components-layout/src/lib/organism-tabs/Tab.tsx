import {memo, useContext, useEffect, useMemo} from 'react';

import style from './Tab.module.css';

import {tabsContext, T_Tab} from './tabsContext';

type T_Props = T_Tab
const Tab: React.FC<T_Props> = memo(({children, id, name, sort}) => {
  const tabsData = useContext(tabsContext);
  const {deregisterTab, registerTab, tabs} = tabsData;

  useEffect(() => {
    const isTabRegistered = tabs.some((tab) => tab.id === id);
    if (!isTabRegistered) {
      registerTab({id, name, sort});
    }
  }, [id, name, registerTab, sort, tabs]);

  useEffect(() => {
    return () => {
      deregisterTab({id, name, sort});
    };
  }, [deregisterTab, id, name, sort]);


  const classNames = useMemo(() => id === tabsData.currentTabId ? `${style['tab']} ${style['active-tab']}` : style['tab'], [id, tabsData.currentTabId]);

  return <div
    className={classNames}
    tabIndex={0}
    role="tabpanel"
    id={`${id}-tab`}
    key={`${id}-tab`}
    aria-labelledby={id}
  >
    {children}
  </div>;
});

Tab.displayName = 'Tab';
export {Tab};
