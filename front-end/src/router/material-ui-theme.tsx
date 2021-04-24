import React from 'react';
import {useSelector} from "react-redux";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import DarkTheme from "../style/theme/dark-theme";
import WhiteTheme from "../style/theme/white-theme";
import {appStateDarkModeSelector} from "../redux/reducer/selector/app-state-selector";

interface IProps {

}

type TProps = IProps

const MaterialUiTheme: React.FC<TProps> = ({children}) => {
  const prefersDarkMode = useSelector(appStateDarkModeSelector)

  let theme = React.useMemo(() =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light', ...prefersDarkMode ? DarkTheme : WhiteTheme
        },
      }),
    [prefersDarkMode],
  );
  return (<>
    <style>{`
      body {
        background: ${prefersDarkMode ? "darkslategray" : "#e9ebee"};
      }
      /* width */
      ::-webkit-scrollbar {
         width: 10px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
         background: ${prefersDarkMode ? `#555` : "gray"}; 
      }
 
      /* Handle */
      ::-webkit-scrollbar-thumb {
         background: ${prefersDarkMode ? "gray" : `#633f28`}; 
      }

       /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
         background: ${prefersDarkMode ? "#8a3324" : `#cd793b`}

      }
    `}
    </style>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </>)
}

export default MaterialUiTheme