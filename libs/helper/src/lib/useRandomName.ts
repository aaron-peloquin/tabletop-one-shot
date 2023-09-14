import { useCallback } from "react";

export function useRandomName() {
  const getName = useCallback(async () => {
    const response = await fetch('/api/llm/name')
    const reply = await response.json()
    return reply.message
  }, [])

  return getName;
}
 