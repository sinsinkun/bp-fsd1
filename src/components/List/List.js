import { List, ListItem } from '@material-ui/core';
import ListEntry from "./ListEntry";

function UserList() {
  return(
    <List aria-label="user list">
      <ListItem><ListEntry /></ListItem>
      <ListItem><ListEntry /></ListItem>
      <ListItem><ListEntry /></ListItem>
    </List>
  )
}

export default UserList;