import { Typography, Grid, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ListEntry(props) {

  const [data, setData] = useState({id:null, name:"", email:"", phone:"", Address:""});
  const history = useHistory();

  useEffect(() => {
    const id = props._id || null;
    const name = props.name || "(No Name)";
    const email = props.email || "(No Email)";
    const phone = props.phone || "(No Phone Number)";
    const address = props.address || "(No Address)";

    setData({id:id, name:name, email:email, phone:phone, address:address});
  },[props])

  function gotoEdit(id) {
    history.push('/user/'+id);
  }

  return(
    <Grid container>
      <Grid item xs={8}>
        <Typography>{data.name}</Typography>
        <Typography style={{color:"#999"}}>{data.email} | {data.phone}</Typography>
        <Typography style={{color:"#999"}}>{data.address}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" color="primary" onClick={() => gotoEdit(data.id)}>EDIT</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" color="primary" fullWidth>DELETE</Button>
      </Grid>
    </Grid>
  )
}

export default ListEntry;