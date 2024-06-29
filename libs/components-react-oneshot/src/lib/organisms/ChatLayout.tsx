import React from 'react';
import { Button, Card, GridArea, GridTemplate, Input } from "@components-layout";
import { useChat } from '@helper';
import { globalDataContext } from "@static";
import { useCallback, useContext, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import { ErrorIcon, LoadingIcon } from '@static';

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
  const {sendChat, chatStatus} = useChat();

  const handleSendChat = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
    sendChat(humanText);
    setHumanText('');
  }, [humanText, sendChat]);

  if(!overview?.description) {
    return [];
  }

  return <GridArea className="full-width" name={gridName}>
    <Card layer="2" heading="Chat">
      {history.length > 0 ? <Button type="button" onClick={clearHistory}>Clear Chat <FaTrashAlt /></Button> : []}
      <GridTemplate columns={1}>
        {history.map(({role, message})=> <Card layer="3" heading={`${role}:`}>
          <ReactMarkdown>{message}</ReactMarkdown>
        </Card>)}
      </GridTemplate>
      <form onSubmit={handleSendChat}>
        <GridTemplate gridTemplateAreas={GRID_TEMPLATE_AREA} columns={4}>
          <GridArea name="input___">
            <Input
              id="chatText"
              value={humanText}
              disabled={chatStatus === 'loading'}
              autoComplete="off"
              onChange={handleSetName}
              label="Message"
            />
          </GridArea>
          <GridArea name="submit__" justifySelf="center" alignSelf="end">
            <Button type="submit" disabled={chatStatus === 'loading'}>Send <AiFillMessage /></Button>
            {chatStatus === 'loading'
              ? <LoadingIcon />
              : chatStatus==='error'
                ? <ErrorIcon />
                : []}
          </GridArea>
        </GridTemplate>
      </form>
    </Card>
  </GridArea>;
};
