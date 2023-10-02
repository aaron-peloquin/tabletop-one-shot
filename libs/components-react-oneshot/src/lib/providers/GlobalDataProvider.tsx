"use client";

import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { T_ChatHistory, T_Overview, globalDataContext } from '@static';

const {Provider} = globalDataContext;

export const GlobalDataProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [name, setName] = useState('');
  const [partyLevel, setPartyLevel] = useState('low');
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

  const handleSetPartyLevel = useCallback((partyLevel: string) => {
    setSavedSuccessful(null);
    setPartyLevel(partyLevel);
  }, []);

  const handleSetContext = useCallback((context: string) => {
    setSavedSuccessful(null);
    setContext(context);
  }, []);

  const handleSetOverview = useCallback((overview: T_Overview) => {
    setSavedSuccessful(null);
    setOverview(overview);
  }, []);

  const clearHistory = useCallback(() => {
    setSavedSuccessful(null);
    setHistory([]);
  }, []);

  const clearOverview = useCallback(() => {
    setSavedSuccessful(null);
    setSaveId(0);
    setPartyLevel('low');
    setOverview(null);
    clearHistory();
  }, [clearHistory]);

  const value = useMemo(() => ({
    name, setName: handleSetName,
    partyLevel, setPartyLevel: handleSetPartyLevel,
    saveId, setSaveId,
    savedSuccessful, setSavedSuccessful,
    context, setContext: handleSetContext,
    history, setHistory, clearHistory,
    overview, setOverview: handleSetOverview, clearOverview,
    overviewError, setOverviewError
  }), [clearHistory, clearOverview, context, handleSetContext, handleSetPartyLevel, handleSetName, handleSetOverview, history, partyLevel, name, overview, overviewError, saveId, savedSuccessful]);

  return <Provider value={value}>{children}</Provider>;
};
