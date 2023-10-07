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
  saveIsLoading: boolean
};

export const useSaveData:T_Sig = () => {
  const {status} = useSession();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
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

  const listingBag = useNetworkOperation('/api/data/load', setSavedDataList);

  const fetchSavedData = useCallback(() => {
    listingBag.run();
  }, []);
  useEffect(fetchSavedData, []);

  const canSave = status==='authenticated' && !!(name && overview);

  const loadData = useCallback(() => {
    const body = JSON.stringify({saveId: stagedSave?.id});
    fetch('/api/data/load', {method: 'POST', body})
      .then(res => res.json())
      .then(({data}) => {
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
      })
      .catch(e => {
        setOverviewError('Error loading '+stagedSave?.name);
      });
  }, [stagedSave?.id]);

  const saveData = useCallback(async () => {
    setSavedSuccessful(null);
    if (canSave) {
      setSaveIsLoading(true);
      const body = JSON.stringify({saveId, name, partyLevel, context, overview, history});
      fetch('/api/data/save', {
        method: 'POST',
        body,
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(res => res.json())
        .then(({message, saveId, error})=>{
          if(error) {
            setSavedSuccessful(false);
          } else if(message) {
            setSaveId(saveId);
            setSavedSuccessful(true);
          }
          setSaveIsLoading(false);
          fetchSavedData();
        });
    }
  }, [canSave, name, saveId, context, overview, history]);

  return {
    canSave,
    handleSageSave,
    loadData,
    saveData,
    saveIsLoading,
    savedDataList,
    stagedSave,
  };
};
