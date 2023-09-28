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
  const [savedSuccessful, setSavedSuccessful] = useState<boolean|null>(null);

  const handleSetName = useCallback((name: string) => {
    setSavedSuccessful(null);
    setName(name);
  }, []);

  const handleSetContext = useCallback((context: string) => {
    setSavedSuccessful(null);
    setContext(context);
  }, []);

  const handleSetOverview = useCallback((overview: T_Overview) => {
    setSavedSuccessful(null);
    setOverview(overview);
  }, []);

  const handleSetHistory = useCallback((history: T_ChatHistory) => {
    setSavedSuccessful(null);
    setHistory(history);
  }, []);

  const clearHistory = useCallback(() => {
    setSavedSuccessful(null);
    setHistory([]);
  }, []);

  const clearOverview = useCallback(() => {
    setSavedSuccessful(null);
    setSaveId(0);
    setOverview(null);
    clearHistory();
  }, [clearHistory]);

  const value = useMemo(() => ({
    name, setName: handleSetName,
    saveId, setSaveId,
    savedSuccessful, setSavedSuccessful,
    context, setContext: handleSetContext,
    history, setHistory: handleSetHistory, clearHistory,
    overview, setOverview: handleSetOverview, clearOverview,
    overviewError, setOverviewError
  }), [clearHistory, clearOverview, context, handleSetContext, handleSetHistory, handleSetName, handleSetOverview, history, name, overview, overviewError, saveId, savedSuccessful]);

  return <Provider value={value}>{children}</Provider>;
};
