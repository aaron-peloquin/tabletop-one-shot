"use client";
import { T_Overview, globalDataContext } from "@static";
import { useCallback, useContext } from "react";
import { useNetworkOperation } from "./useNetworkOperation";


type T_Sig = () => {
  generateOverview: () => Promise<void>,
  overviewLoading: boolean
};

export const useGenerateOverview:T_Sig = () => {
  const {name, context, partyLevel, setOverview, setOverviewError} = useContext(globalDataContext);
  const onSuccess = useCallback((message: T_Overview) => {
    if(message) {
      setOverviewError('');
      setOverview(message);
    }
  }, []);
  const {run, loading} = useNetworkOperation('/api/llm/overview', onSuccess, setOverviewError);

  const generateOverview = useCallback(async () => {
    const body = JSON.stringify({name, context, partyLevel});
    run(body);
  }, [name, context, partyLevel, setOverview]);

  return {
    generateOverview,
    overviewLoading: loading
  };
};
