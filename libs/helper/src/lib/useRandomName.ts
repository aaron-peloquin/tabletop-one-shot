import { useCallback, useState } from "react";

export function useRandomName(callback) {
  const [nameLoading, setNameLoading] = useState(false);
  const getName = useCallback(async () => {
    setNameLoading(true);
    fetch('/api/llm/name').then(res => res.json()).then(({message})=>{
      callback(message);
      setNameLoading(false);
    });
  }, [callback]);

  return {getName, nameLoading};
}
