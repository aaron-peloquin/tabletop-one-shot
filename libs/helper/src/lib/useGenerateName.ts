"use client";
import { useCallback, useContext } from "react";
import { URLs, globalDataContext } from "@static";
import { useNetworkOperation } from './useNetworkOperation';

type T_Sig = () => {
  getName: () => void
  nameLoading: boolean
  nameStatus: string
};

export const useGenerateName:T_Sig = () => {
  const {setName, partyLevel} = useContext(globalDataContext);
  const handleReply = useCallback((message: string) => {
    setName(message);
  }, []);
  const {run, loading, status} = useNetworkOperation(URLs.api.name, handleReply);
  const getName = useCallback(() => {
    const body = JSON.stringify({partyLevel});
    run(body);
  }, []);

  return {
    getName,
    nameLoading: loading,
    nameStatus: status,
  };
};
