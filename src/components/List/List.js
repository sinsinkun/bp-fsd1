import { List, ListItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ListEntry from "./ListEntry";

function UserList() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function apiCall() {
      const data = await fetch("https://elu249nmfh.execute-api.us-east-2.amazonaws.com/default/users")
      .then(r => r.json())
      .catch(err => console.log(err));
      
      setUserData(data || []);
    }
    apiCall();
  },[])

  return(
    <List aria-label="user list">
      {userData.map(user => 
        <ListItem divider key={user._id}>
          <ListEntry {...user} />
        </ListItem>
      )}
    </List>
  )
}

export default UserList;