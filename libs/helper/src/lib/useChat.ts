import { useCallback, useContext } from "react";
import { URLs, globalDataContext } from "@static";
import { useNetworkOperation } from "./useNetworkOperation";

export const useChat = () => {
  const {history, overview, setHistory, setSavedSuccessful} = useContext(globalDataContext);

  const popHistory = useCallback(() => {
    setHistory((history) => {
      history.pop();
      return history;
    });  
  }, []);

  const onSuccess = useCallback((message: string) => {
    if(message) {
      setHistory((history) => {
        if(history?.[history.length-1]?.message !== message) {
          history.push({message, role: 'ai'});
        }
        return history;
      });
    } else {
      popHistory();
    }
  }, [popHistory]);

  const onError = useCallback(() => {
    popHistory();
  }, [popHistory]);

  const {run, status} = useNetworkOperation(URLs.api.chat, onSuccess, onError);

  const sendChat = useCallback((human: string) => {
    if (human) {
      setSavedSuccessful(null);
      console.log('history', JSON.stringify(history));
      
      const body = JSON.stringify({ history, human, overview });
      run(body);

      setHistory((history) => {
        if(history?.[history.length-1]?.message !== human) {
          history.push({message: human, role: 'human'});
        }
        return history;
      });

    }
  }, [history, run, overview]);

  return {
    sendChat,
    chatStatus: status
  };
};
