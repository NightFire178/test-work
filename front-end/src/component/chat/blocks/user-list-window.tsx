import React, {useEffect, useState} from 'react';
import WindowLayout from "./layout/window-layout";
import {useSelector} from "react-redux";
import {appStateChatSocket} from "../../../redux/reducer/selector/app-state-selector";

interface IProps {

}

type TProps = IProps

const UserListWindow: React.FC<TProps> = (props) => {
  const server = useSelector(appStateChatSocket)
  const [userList, setUserList] = useState()
  useEffect(()=>{
    server.listenUserList((users)=>{
      setUserList(users.map((user:string, id:number)=>(
        <React.Fragment key={user+id}>
          <div>{user}</div>
        </React.Fragment>
      )))
    })
  }, [server])
  return (<>
    <WindowLayout size={3}>
      {userList}
    </WindowLayout>
  </>)
}

export default UserListWindow