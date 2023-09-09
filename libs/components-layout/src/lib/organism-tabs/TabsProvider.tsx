import {memo, useCallback, useEffect, useMemo, useState} from 'react';

import {tabsContext, T_Tab, T_tabsContextValue} from './tabsContext';

const {Provider} = tabsContext;

type T_Props = {
  defaultTab?: string
}
const TabsProvider:React.FC<T_Props> = memo(({children, defaultTab = ''}) => {
  const [currentTabId, setCurrentTabId] = useState(defaultTab);
  const [tabs, setTabs] = useState<T_Tab[]>([]);


  const registerTab = useCallback((tab: T_Tab) => {
    setTabs((currentTabs)=>{
      if (!tab.sort) {
        tab.sort = currentTabs.length + 1;
      }
      currentTabs.push(tab);
      currentTabs = currentTabs.sort((a, b) => (a.sort || 0) > (b.sort || 0) ? 0 : -1);
      return currentTabs;
    });
  }, []);

  const deregisterTab = useCallback((tab: T_Tab) => {
    setTabs((currentTabs) => {
      return currentTabs.filter(({id}) => tab.id !== id);
    });
  }, []);

  useEffect(() => {
    if (!currentTabId && tabs.length > 0) {
      setCurrentTabId(tabs[0].id);
    }
  }, [currentTabId, tabs]);

  const providerValue:T_tabsContextValue = useMemo(() => ({currentTabId, deregisterTab, registerTab, setCurrentTabId, tabs}), [currentTabId, deregisterTab, registerTab, tabs]);

  return <Provider value={providerValue}>
    {children}
  </Provider>;
});

TabsProvider.displayName = 'TabsProvider';
export {TabsProvider};
