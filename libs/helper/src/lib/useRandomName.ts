"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type T_Sig = (callback: (name: string) => void) => {
  getName: () => Promise<void>,
  nameLoading: boolean
};

export const useRandomName:T_Sig = (callback) => {
  const [nameLoading, setNameLoading] = useState(false);
  const getName = useCallback(async () => {
    setNameLoading(true);
    fetch('/api/llm/name', {method: 'POST'}).then(res => res.json()).then(({message}) => {
      callback(message);
      setNameLoading(false);
    });
  }, [callback]);

  return {getName, nameLoading};
}
