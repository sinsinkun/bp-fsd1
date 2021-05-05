import { Typography, Grid, Button, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";

function ListEntry(props) {

  const [data, setData] = useState({name:"", email:"", phone:"", Address:""});

  useEffect(() => {
    const name = props.name || "Name";
    const email = props.email || "Email";
    const phone = props.phone || "Phone Number";
    const address = props.address || "Address";

    setData({name:name, email:email, phone:phone, address:address});
  },[props])

  return(
    <Grid container>
      <Grid item xs={8}>
        <Typography>{data.name}</Typography>
        <Typography>{data.email} | {data.phone}</Typography>
        <Typography>{data.address}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" color="primary">EDIT</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" color="primary" fullWidth>DELETE</Button>
      </Grid>
    </Grid>
  )
}

export default ListEntry;