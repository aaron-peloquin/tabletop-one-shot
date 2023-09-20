import { useCallback, useContext, useState } from "react";
import { T_Overview, globalDataContext } from "@static";

export const useChat = () => {
  const [loadingChat, setLoading] = useState(false);
  const {history, setHistory} = useContext(globalDataContext);

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
          setHistory((history) => {
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
  }, [history]);

  return {loadingChat, sendChat};
};
