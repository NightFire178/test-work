import {makeStyles} from "@material-ui/core/styles";

const useIconThemeStyle = makeStyles((theme)=>({
  icon:{
    marginTop:'6px',
    "&:hover":{
      cursor: 'pointer'
    }
  },
}))

export default useIconThemeStyle