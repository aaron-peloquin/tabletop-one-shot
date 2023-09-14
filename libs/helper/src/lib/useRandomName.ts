import { useCallback, useState } from "react";

export function useRandomName(callback) {
  const [loading, setLoading] = useState(false)
  const getName = useCallback(async () => {
    setLoading(true)
    fetch('/api/llm/name').then(res => res.json()).then(({message})=>{
      callback(message)
      setLoading(false)
    })
  }, [callback])

  return {getName, loading};
}
 