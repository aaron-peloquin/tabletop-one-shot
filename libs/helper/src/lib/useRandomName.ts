"use client";
import { globalDataContext } from "@static";
import { useCallback, useContext, useState } from "react";

type T_Sig = () => {
  getName: () => Promise<void>,
  nameLoading: boolean
};

export const useRandomName:T_Sig = () => {
  const [nameLoading, setNameLoading] = useState(false);
  const {setName, partyLevel} = useContext(globalDataContext);
  const getName = useCallback(async () => {
    setNameLoading(true);
    const body = JSON.stringify({partyLevel});
    fetch('/api/llm/name', {method: 'POST', body}).then(res => res.json()).then(({message}) => {
      setName(message);
      setNameLoading(false);
    });
  }, [setName, partyLevel]);

  return {getName, nameLoading};
};
