"use client";
import { T_Overview, URLs, globalDataContext } from "@static";
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
      setOverview(message);
    }
  }, []);

  const onError = useCallback((error: string) => {
    setOverviewError(error);
    setOverview(null);
  }, []);

  const {run, loading} = useNetworkOperation(URLs.api.overview, onSuccess, onError);

  const generateOverview = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setOverview({});
    setOverviewError('');
    const body = JSON.stringify({name, context, partyLevel});
    run(body);
  }, [name, context, partyLevel, setOverview]);

  return {
    generateOverview,
    overviewLoading: loading
  };
};
