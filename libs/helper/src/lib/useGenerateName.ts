"use client";
import { useCallback, useContext } from "react";
import { globalDataContext } from "@static";
import { useNetworkOperation } from './useNetworkOperation';

type T_Sig = () => {
  getName: () => void
  nameLoading: boolean
  nameStatus: string
};

export const useGenerateName:T_Sig = () => {
  const {setName, partyLevel} = useContext(globalDataContext);
  const handleReply = useCallback((message: string) => {
    console.log({message});
    setName(message);
  }, []);
  const {run, loading, status} = useNetworkOperation('api/llm/name', handleReply);
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
