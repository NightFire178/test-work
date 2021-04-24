import React from 'react';
import {Container, Paper, Grid} from "@material-ui/core";
import useChatStyle from "../../style/chat";
import ChatWindow from "./blocks/chat-window";
import UserListWindow from "./blocks/user-list-window";
import InputChat from "./blocks/input-chat";

interface IProps {

}

type TProps = IProps

const Chat: React.FC<TProps> = (props) => {
  const style = useChatStyle()
  return (<>
    <Container maxWidth={'lg'}>
      <Paper className={style.paper}>
        <Grid className={style.gridContainer} container justify={`space-between`} alignItems={'center'}
              alignContent={'center'} spacing={2}>
          <ChatWindow/>
          <UserListWindow/>
          <InputChat/>
        </Grid>
      </Paper>
    </Container>
  </>)
}

export default Chat