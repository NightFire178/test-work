import React, {useEffect, useState} from 'react';
import WindowLayout from "./layout/window-layout";
import {useSelector} from "react-redux";
import {appStateChatSocket} from "../../../redux/reducer/selector/app-state-selector";
import {IMessage} from "../../../socket-io/data-interface";

interface IProps {

}

type TProps = IProps
const ChatWindow: React.FC<TProps> = (props) => {
  const server = useSelector(appStateChatSocket)
  const [chatMessages, setChatMessages] = useState([])
  useEffect(()=>{
    const messages:IMessage[] = []
    server.listenChat(({message, userName})=>{
      messages.push({message, userName})
      console.log(messages)
      if(messages.length){
        // @ts-ignore
        setChatMessages(messages.map((obj, index)=>(
          <React.Fragment key={index}>
            <div>{obj.userName}:{obj.message}</div>
          </React.Fragment>
        )))
      }
    })
    //eslint-disable-next-line
  }, [])
  return (<>
      <WindowLayout size={9}>
        {chatMessages}
      </WindowLayout>
    </>)
}

export default ChatWindow