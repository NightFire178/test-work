import React, {useCallback, useRef} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import IconTheme from "../../block/icon-theme";
import useChatStyle from "../../../style/chat";
import {useSelector} from "react-redux";
import {appStateChatSocket} from "../../../redux/reducer/selector/app-state-selector";

interface IProps {

}

type TProps = IProps

const InputChat: React.FC<TProps> = (props) => {
  const style = useChatStyle()
  const input = useRef()
  const server = useSelector(appStateChatSocket)
  const handleSendMessage = useCallback(()=>{
    const element = input.current as unknown as HTMLInputElement
    if(element?.value){
      server.sendChatMessage(element.value)
      element.value = ``
    }
  }, [server])

  return (<>
    <Grid item xs={3} sm={7} lg={9}>
      <TextField inputRef={input} className={style.input} size={'small'} placeholder={'you message'} required color={'primary'}/>
    </Grid>
    <Grid item xs={3} sm={1} lg={1}>
      <Button onClick={handleSendMessage}>send</Button>
    </Grid>
    <Grid item xs={6} sm={3} lg={2}>
      <Grid container>
        <Grid item xs={6}>
          <IconTheme/>
        </Grid>
      </Grid>
    </Grid>
  </>)
}

export default InputChat