"use client";
import { zodSchemaOverview } from "@static";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { z } from "zod";

export type T_Overview = z.infer<typeof zodSchemaOverview> | null;

type T_Sig = (callback: Dispatch<SetStateAction<T_Overview>>) => {
  generateOverview: (name: string) => Promise<void>,
  overviewLoading: boolean
};

export const useGenerateOverview:T_Sig = (callback) => {
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
      .then(({message})=>{
        callback(message);
        setOverviewLoading(false);
      });
  }, [callback]);

  return {generateOverview, overviewLoading};
};
