import {emptyFunction} from '@static';
import {createContext} from 'react';

export type T_TabId = string
type T_TabName = string

export type T_Tab = {
  id: T_TabId
  name: T_TabName
  sort?: number
}

export type T_tabsContextValue = {
  currentTabId: string
  deregisterTab: (removeTabId: T_Tab) => void
  setCurrentTabId: (id: T_TabId) => void
  registerTab: (tab: T_Tab) => void
  tabs: T_Tab[]
}

const tabsContextDefault:T_tabsContextValue = {
  currentTabId: '',
  deregisterTab: emptyFunction,
  registerTab: emptyFunction,
  setCurrentTabId: emptyFunction,
  tabs: [],
};

export const tabsContext = createContext<T_tabsContextValue>(tabsContextDefault);
