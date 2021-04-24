import React, {useState, useRef, useCallback} from 'react';
import {Button, Container, Grid, Paper, TextField} from "@material-ui/core";
import useLoginStyle from "../style/login";
import IconTheme from "./block/icon-theme";
import {useDispatch, useSelector} from "react-redux";
import {appStateChatSocket} from "../redux/reducer/selector/app-state-selector";
import {Redirect} from "react-router-dom";
import {appStateActionCreators} from "../redux/reducer/types/t-app-state";


interface IProps {

}

type TProps = IProps

const Login: React.FC<TProps> = () => {
  const server = useSelector(appStateChatSocket)
  const [joinFriendsTextField, setJoinFriendsTextField] = useState(false)
  const [joinChat, setJoinChat] = useState({status: false, uri: ``})
  const style = useLoginStyle()
  const name = useRef()
  const urlField = useRef()
  const dispatch = useDispatch()




  const createEndMoveChat = useCallback(() => {
    const userName = name.current as unknown as HTMLInputElement
    let idNow = `0`
    if (joinFriendsTextField) {
      const idField = urlField.current as unknown as HTMLInputElement
      idNow = idField.value.split(`/chat/`)[1]
    }
    server.joinRoom({id: idNow, name: userName.value}, ({status, id}) => {
      if (status) {
        dispatch(appStateActionCreators.setAuthStatus(true))
        server.setUserName(userName.value)
        setJoinChat({status: true, uri: `/chat/${id}`})
      }
      server.joinRoomDisconnect()
    })
  }, [dispatch, server, joinFriendsTextField])
  if (joinChat.status) {
    return <Redirect to={joinChat.uri}/>
  }

  return (<>
    <Grid className={style.container} container justify={"center"}>
      <Container maxWidth={'sm'}>
        <Paper>
          <Grid className={style.paperContainer} container direction={'column'} alignItems={'center'} spacing={4}>
            {joinFriendsTextField ?
              <Grid item>
                <TextField inputRef={urlField} variant={'filled'} placeholder={'your friend\'s link'} autoFocus required
                           color={'primary'}/>
              </Grid>
              : <Button onClick={() => setJoinFriendsTextField(true)} size={"small"}>join friends chat</Button>}
            <Grid item>
              <TextField inputRef={name} size={'small'} variant={'outlined'} placeholder={'name'} autoFocus required
                         color={'primary'}/>
            </Grid>
            <Grid item>
              <Grid container spacing={4}>
                <Grid item>
                  <Button onClick={createEndMoveChat}>create chat</Button>
                </Grid>
                <IconTheme/>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  </>)
}

export default Login