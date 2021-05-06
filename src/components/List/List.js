import { List, ListItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useStoreContext } from '../GlobalStore';
import ListEntry from "./ListEntry";

function UserList() {

  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  
  const [store, setStore] = useStoreContext();

  function refreshPage() {
    setRefresh(prev => !prev);
    if (store.showLoad) setStore({do:"toggleLoading"});
  }

  useEffect(() => {
    async function apiCall() {
      if (!store.showLoad) setStore({do:"toggleLoading"});
      const data = await fetch("https://elu249nmfh.execute-api.us-east-2.amazonaws.com/dev/users")
      .then(r => r.json())
      .catch(err => console.log(err));
      
      setUserData(data || []);
      setStore({do:"toggleLoading"});
    }
    apiCall();
    // eslint-disable-next-line
  },[refresh])

  return(
    <List aria-label="user list">
      {userData.map(user => 
        <ListItem divider key={user._id}>
          <ListEntry {...user} refreshPage={refreshPage} />
        </ListItem>
      )}
    </List>
  )
}

export default UserList;