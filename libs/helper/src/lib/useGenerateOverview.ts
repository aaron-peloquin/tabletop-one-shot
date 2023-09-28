"use client";
import { T_Overview } from "@static";
import { Dispatch, SetStateAction, useCallback, useState } from "react";


type T_Sig = (
  setOverviewCallback: (overview: T_Overview) => void,
  setOverviewErrorCallback: Dispatch<SetStateAction<string>>,
) => {
  generateOverview: (name: string, context: string) => Promise<void>,
  overviewLoading: boolean
};

export const useGenerateOverview:T_Sig = (setOverviewCallback, setOverviewErrorCallback) => {
  const [overviewLoading, setOverviewLoading] = useState(false);

  const generateOverview = useCallback(async (name: string, context: string) => {
    setOverviewLoading(true);
    const body = JSON.stringify({name, context});
    fetch('/api/llm/overview', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(({message, error})=>{
        if(message) {
          setOverviewErrorCallback('');
          setOverviewCallback(message);
        }
        if(error) {
          setOverviewErrorCallback(error);
        }
        setOverviewLoading(false);
      });
  }, [setOverviewCallback, setOverviewErrorCallback]);

  return {generateOverview, overviewLoading};
};
