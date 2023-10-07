import { useCallback, useContext, useState } from "react";
import { T_Overview, URLs, globalDataContext } from "@static";

export const useChat = () => {
  const [loadingChat, setLoading] = useState(false);
  const {history, setHistory, setSavedSuccessful} = useContext(globalDataContext);

  const sendChat = useCallback((human: string, overview: T_Overview) => {
    setSavedSuccessful(null);
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

    fetch(URLs.api.chat, {
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
