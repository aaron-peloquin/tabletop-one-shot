import { useCallback, useState } from "react";
import { T_Overview } from "./useGenerateOverview";

type T_ChatHistory = {
  role: 'human'|'ai'
  message: string
}[];      

export const useChat = () => {
  const [loadingChat, setLoading] = useState(false);
  const [history, setHistory] = useState<T_ChatHistory>([]);

  const clearChat = useCallback(() => {
    setHistory([]);
  }, []);

  const sendChat = useCallback((human: string, overview: T_Overview) => {
    const body = JSON.stringify({ history, human, overview });
    setLoading(true);

    fetch('/api/llm/chat', {
      method: 'POST',
      body,
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(({message}) => {
        if(message) {
          setHistory(history => {
            history.push({message: human, role: 'human'});
            history.push({message: message, role: 'ai'});
            return history;
          });
        }
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return {loadingChat, clearChat, sendChat, history};
};
