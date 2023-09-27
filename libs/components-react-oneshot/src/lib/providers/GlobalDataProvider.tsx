"use client";

import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { T_ChatHistory, T_Overview, globalDataContext } from '@static';

const {Provider} = globalDataContext;

export const GlobalDataProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [name, setName] = useState('');
  const [saveId, setSaveId] = useState(0);
  const [context, setContext] = useState('');
  const [history, setHistory] = useState<T_ChatHistory>([]);
  const [overview, setOverview] = useState<T_Overview>(null);
  const [overviewError, setOverviewError] = useState('');

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const clearOverview = useCallback(() => {
    setSaveId(0);
    setOverview(null);
    clearHistory();
  }, [clearHistory]);

  const value = useMemo(() => ({
    name, setName,
    saveId, setSaveId,
    context, setContext,
    history, setHistory, clearHistory,
    overview, setOverview, clearOverview,
    overviewError, setOverviewError
  }), [clearHistory, clearOverview, context, history, name, overview, overviewError, saveId]);

  return <Provider value={value}>{children}</Provider>;
};
