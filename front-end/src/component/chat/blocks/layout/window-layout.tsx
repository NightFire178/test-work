import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import useChatStyle from "../../../../style/chat";

interface IProps {
  size:number,

}

type TProps = IProps

const WindowLayout: React.FC<TProps> = ({size, children}) => {
  const style = useChatStyle()
  return (<>
    {/*@ts-ignore*/}
    <Grid item xs={size}>
      <Paper className={style.window}>
        <div className={style.content}>
          {children}
        </div>
      </Paper>
    </Grid>
  </>)
}

export default WindowLayout