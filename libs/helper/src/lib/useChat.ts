import { useCallback, useContext, useState } from "react";
import { T_Overview, globalDataContext } from "@static";

export const useChat = () => {
  const [loadingChat, setLoading] = useState(false);
  const {history, setHistory} = useContext(globalDataContext);

  const sendChat = useCallback((human: string, overview: T_Overview) => {
    const body = JSON.stringify({ history, human, overview });
    setLoading(true);
    setHistory((history) => {
      history.push({message: human, role: 'human'});
      return history;
    });
    const popHistory = () => {
      setHistory((history) => {
        history.pop();
        return history;
      });  
    };

    fetch('/api/llm/chat', {
      method: 'POST',
      body,
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(({message}) => {
        if(message) {
          setHistory((history) => {
            history.push({message: message, role: 'ai'});
            return history;
          });
        } else {
          popHistory();
        }
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        popHistory();
        setLoading(false);
      });
  }, [history]);

  return {loadingChat, sendChat};
};
