import { List, ListItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ListEntry from "./ListEntry";

function UserList() {

  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function refreshPage() {
    setRefresh(prev => !prev);
  }

  useEffect(() => {
    async function apiCall() {
      const data = await fetch("https://elu249nmfh.execute-api.us-east-2.amazonaws.com/dev/users")
      .then(r => r.json())
      .catch(err => console.log(err));
      
      setUserData(data || []);
    }
    apiCall();
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