"use client";
import { zodSchemaOverview } from "@static";
import { Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { z } from "zod";

export type T_Overview = z.infer<typeof zodSchemaOverview> | null;

type T_Sig = (
  setOverviewCallback: Dispatch<SetStateAction<T_Overview>>,
  setOverviewErrorCallback: Dispatch<SetStateAction<string>>,
) => {
  generateOverview: (name: string) => Promise<void>,
  overviewLoading: boolean
};

export const useGenerateOverview:T_Sig = (setOverviewCallback, setOverviewErrorCallback) => {
  const [overviewLoading, setOverviewLoading] = useState(false);

  const generateOverview = useCallback(async (name: string) => {
    setOverviewLoading(true);
    const body = JSON.stringify({name});
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
