"use client";
import { globalDataContext } from "@static";
import { useCallback, useContext, useState } from "react";


type T_Sig = () => {
  generateOverview: () => Promise<void>,
  overviewLoading: boolean
};

export const useGenerateOverview:T_Sig = () => {
  const [overviewLoading, setOverviewLoading] = useState(false);
  const {name, context, levelDescriptor, setOverview, setOverviewError} = useContext(globalDataContext);

  const generateOverview = useCallback(async () => {
    setOverviewLoading(true);
    const body = JSON.stringify({name, context, levelDescriptor});
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
          setOverviewError('');
          setOverview(message);
        }
        if(error) {
          setOverviewError(error);
        }
        setOverviewLoading(false);
      }).catch(() => {
        setOverviewError('Network or API error');
        setOverviewLoading(false);
      });
  }, [name, context, levelDescriptor, setOverview]);

  return {generateOverview, overviewLoading};
};
