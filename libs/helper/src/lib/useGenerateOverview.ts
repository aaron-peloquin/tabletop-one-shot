import { useCallback, useState } from "react";

export function useGenerateOverview(callback) {
  const [overviewLoading, setOverviewLoading] = useState(false);

  const generateOverview = useCallback(async (name) => {
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
}
