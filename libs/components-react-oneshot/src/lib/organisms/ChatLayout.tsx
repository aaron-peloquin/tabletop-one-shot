import { Button, Card, GridArea, GridTemplate, Input } from "@components-layout";
import { useChat } from '@helper';
import { globalDataContext } from "@static";
import { useCallback, useContext, useState } from "react";
import ReactMarkdown from 'react-markdown';

type T_Props = {
  gridName: string
};

const GRID_TEMPLATE_AREA =`
"input___ input___ input___ submit__"
`;

export const ChatLayout: React.FC<T_Props> = ({gridName}) => {
  const [humanText, setHumanText] = useState('');
  const {overview, history, clearHistory} = useContext(globalDataContext);
  const handleSetName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHumanText(event?.target.value);
  }, []);
  const {loadingChat, sendChat} = useChat();

  const handleSendChat = useCallback(() => {
    setHumanText('');
    sendChat(humanText, overview);
  }, [humanText, overview, sendChat]);

  if(!overview) {
    return [];
  }

  return <GridArea className="full-width" name={gridName}>
    <Card layer="2" heading="Chat">
      {history.length > 0 ? <Button type="button" text="Clear Chat" onClick={clearHistory} /> : []}
      <GridTemplate columns={1}>
        {history.map(({role, message})=> <Card layer="3" heading={`${role}:`}>
          <ReactMarkdown>{message}</ReactMarkdown>
        </Card>)}
      </GridTemplate>
      <GridTemplate gridTemplateAreas={GRID_TEMPLATE_AREA} columns={4}>
        <form>
          <GridArea name="input___">
            <Input
              id="name"
              value={humanText}
              disabled={loadingChat}
              autoComplete="off"
              onChange={handleSetName}
              label="Message"
            />
          </GridArea>
          <GridArea name="submit__">
            <Button type="submit" text="Send =>" disabled={loadingChat} onClick={handleSendChat} />
          </GridArea>
        </form>
      </GridTemplate>
    </Card>
  </GridArea>;
};
