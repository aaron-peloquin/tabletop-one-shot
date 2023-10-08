import { useCallback, useContext } from "react";
import { T_Overview, URLs, globalDataContext } from "@static";
import { useNetworkOperation } from "./useNetworkOperation";

export const useChat = () => {
  const {history, setHistory, setSavedSuccessful} = useContext(globalDataContext);

  const popHistory = useCallback(() => {
    setHistory((history) => {
      history.pop();
      return history;
    });  
  }, []);

  const onSuccess = useCallback((message: string) => {
    if(message) {
      setHistory((history) => {
        history.push({message: message, role: 'ai'});
        return history;
      });
    } else {
      popHistory();
    }
  }, []);

  const onError = useCallback(() => {
    popHistory();
  }, []);

  const {run, status} = useNetworkOperation(URLs.api.chat, onSuccess, onError);

  const sendChat = useCallback((human: string, overview: T_Overview) => {
    setSavedSuccessful(null);
    const body = JSON.stringify({ history, human, overview });
    setHistory((history) => {
      history.push({message: human, role: 'human'});
      return history;
    });

    run(body);
  }, [history, run]);

  return {
    sendChat,
    chatStatus: status
  };
};
