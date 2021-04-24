import {makeStyles} from "@material-ui/core/styles";

const useChatStyle = makeStyles(() => {
  return {
    paper: {
      marginTop: `3vh`,
      padding: `2vh`
    },
    gridContainer: {
      minHeight: `90vh`,
    },
    mainWindow: {
      width: '90%'
    },
    window: {
      height: `80vh`,
      padding: `2vh 0`
    },
    content: {
      padding: `0 2vh`,
      height: `78vh`,
      overflow: `auto`
    },
    input: {
      width: `100%`
    },
    buttonUrl: {
      whiteSpace: `nowrap`
    }
  }
})

export default useChatStyle