import { Button, Card, GridArea, GridTemplate, Input } from "@components-layout";
import { useChat } from '@helper';
import { useCallback, useContext, useState } from "react";
import { globalDataContext } from "../providers/globalData";
import ReactMarkdown from 'react-markdown';

type T_Props = {
  gridName: string
};

export const ChatLayout: React.FC<T_Props> = ({gridName}) => {
  const [humanText, setHumanText] = useState('');
  const {overview} = useContext(globalDataContext);
  const handleSetName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHumanText(event?.target.value);
  }, []);
  const {loadingChat, clearChat, sendChat, history} = useChat();

  const handleSendChat = useCallback(() => {
    setHumanText('');
    sendChat(humanText, overview);
  }, [humanText, overview, sendChat]);

  if (!overview) {
    if(history.length) {
      clearChat();
    }
    return [];
  }

  return <GridArea className="full-width" name={gridName}>
    <Card layer="2" heading="Chat">
      {history.length > 0 ? <Button text="Clear Chat" onClick={clearChat} /> : []}
      <GridTemplate columns={1}>
        {history.map(({role, message})=> <Card layer="3" heading={`${role}:`}>
          <ReactMarkdown>{message}</ReactMarkdown>
        </Card>)}
      </GridTemplate>
      <form>
        <GridTemplate columns={2}>
          <GridArea>
            <Input
              id="name"
              value={humanText}
              disabled={loadingChat}
              autoComplete="off"
              onChange={handleSetName}
              label="Message"
            />
          </GridArea>
          <GridArea justifySelf="center" alignSelf="end">
            <Button type="submit" text="Send =>" disabled={loadingChat} onClick={handleSendChat} />
          </GridArea>
        </GridTemplate>
      </form>
    </Card>
  </GridArea>;
};
