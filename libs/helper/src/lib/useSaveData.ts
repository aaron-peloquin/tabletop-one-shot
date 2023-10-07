"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { T_SavedDataItem, globalDataContext } from "@static";
import { useSession } from "next-auth/react";
import { useNetworkOperation } from "./useNetworkOperation";

type T_Sig = () => {
  canSave: boolean
  handleSageSave: (event: React.ChangeEvent<HTMLSelectElement>) => void
  loadData: () => void
  saveData: () => Promise<void>
  savedDataList: T_SavedDataItem[]
  stagedSave: T_SavedDataItem|null,
  somethingIsLoading: boolean
};

export const useSaveData:T_Sig = () => {
  const {status} = useSession();
  const [savedDataList, setSavedDataList] = useState<T_SavedDataItem[]>([]);
  const {
    name, setName,
    context, setContext,
    partyLevel, setPartyLevel,
    overview, setOverview, setOverviewError,
    history, setHistory,
    saveId, setSaveId, setSavedSuccessful
  } = useContext(globalDataContext);
  const [stagedSave, setStagedSave] = useState<T_SavedDataItem|null>(null);

  const handleSageSave = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const sageSave = savedDataList?.find((save) => save.id === parseInt(event.target.value));
    if(sageSave) {
      setStagedSave(sageSave);
    } else {
      setStagedSave(null);
    }
  }, [savedDataList]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoadSuccess = useCallback((data: any) => {
    setSaveId(data.id);
    setName(data.name);
    setPartyLevel(data.party_level || 'mid');
    setContext(data.context);
    setHistory(data.chat_history);
    setOverview(data.overview_data);
    setStagedSave(null);
    setTimeout(() => {
      setSavedSuccessful(true);
    }, 5);
  }, []);

  const onLoadError = useCallback(() => {
    setOverviewError('Error loading ' + stagedSave?.name);
  }, [stagedSave]);
  
  const listingBag = useNetworkOperation('/api/data/load', setSavedDataList);
  const fetchSavedData = useCallback(listingBag.run, [listingBag]);
  useEffect(fetchSavedData, []);
  
  const loadBag = useNetworkOperation('/api/data/load', onLoadSuccess, onLoadError);

  const canSave = status === 'authenticated' && !!(name && overview);

  const loadData = useCallback(() => {
    const body = JSON.stringify({saveId: stagedSave?.id});
    loadBag.run(body);
  }, [stagedSave?.id]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSaveSuccess = useCallback(({saveId, error})=>{
    if(error) {
      setSavedSuccessful(false);
    } else if(saveId) {
      setSaveId(saveId);
      setSavedSuccessful(true);
    }
    fetchSavedData();
  }, []);
  
  const onSaveError = useCallback(() => {
    setOverviewError('Error loading ' + stagedSave?.name);
  }, [stagedSave]);
  const saveBag = useNetworkOperation('/api/data/save', onSaveSuccess, onSaveError);

  const saveData = useCallback(async () => {
    if (canSave) {
      const body = JSON.stringify({saveId, name, partyLevel, context, overview, history});
      saveBag.run(body);
    }
  }, [canSave, name, saveId, context, overview, history]);

  return {
    canSave,
    handleSageSave,
    loadData,
    saveData,
    somethingIsLoading: saveBag.loading || loadBag.loading || listingBag.loading,
    savedDataList,
    stagedSave,
  };
};
