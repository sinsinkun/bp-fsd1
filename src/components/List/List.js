import { List, ListItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ListEntry from "./ListEntry";

const mockData = [
  {_id:"1a2", name:"John Doe", email:"email@ema.il", phone:"123", Address:"456 abc st"},
  {_id:"3b4", name:"Sam Brand", email:"eml@ema.il", phone:"321", Address:"152 abc st"},
  {_id:"6c7", name:"Abby Hill", email:"eal@ema.il", phone:"157", Address:"789 def st"}
]

function UserList() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // to-do: access data from database
    setUserData(mockData)
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