"use client";
import { useCallback, useContext, useState } from "react";
import { globalDataContext } from "@static";


type T_Sig = () => {
  canSave: boolean
  saveData: () => Promise<void>
  savedSuccessful: boolean|null
  saveIsLoading: boolean
};

export const useSaveData:T_Sig = () => {
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [savedSuccessful, setSavedSuccessful] = useState<boolean|null>(null);
  const {name, context, overview, history, saveId, setSaveId} = useContext(globalDataContext);

  const canSave = !!(name && overview);

  const saveData = useCallback(async () => {
    if (canSave) {
      setSaveIsLoading(true);
      const body = JSON.stringify({name, saveId, context, overview, history});
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
        });
    }
  }, [canSave, name, saveId, context, overview, history]);

  return {canSave, saveData, savedSuccessful, saveIsLoading};
};
