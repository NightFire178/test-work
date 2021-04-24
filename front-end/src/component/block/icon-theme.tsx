import React from 'react';
import {Grid} from "@material-ui/core";
import {Brightness3, WbSunny} from "@material-ui/icons";
import {appStateActionCreators} from "../../redux/reducer/types/t-app-state";
import useIconThemeStyle from "../../style/block/icon-theme-style";
import {useDispatch, useSelector} from "react-redux";
import {appStateDarkModeSelector} from "../../redux/reducer/selector/app-state-selector";

interface IProps {

}

type TProps = IProps

const IconTheme: React.FC<TProps> = (props) => {
  const style = useIconThemeStyle()
  const dispatch = useDispatch()
  const prefersDarkMode = useSelector(appStateDarkModeSelector)
  const handleChangeDarkModeStatus = () => {
    dispatch(appStateActionCreators.setDarkMode(!prefersDarkMode))
  }
  return (<Grid className={style.icon} item>
    {prefersDarkMode ?
      <WbSunny onClick={handleChangeDarkModeStatus}/> :
      < Brightness3 onClick={handleChangeDarkModeStatus}/>
    }
  </Grid>)
}

export default IconTheme