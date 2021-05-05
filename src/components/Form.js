import { Button, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';

const formParent = {
  display:"flex",
  flexDirection: "column",
}

function Form() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function submitForm(e) {
    e.preventDefault();
    // ...
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  }

  return(
    <form style={formParent} onSubmit={submitForm}>
      <TextField label="Name" variant="filled" value={name} 
        onChange={(e) => setName(e.target.value)} />
      <br/>
      <TextField label="Email" variant="filled" value={email} 
        onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <TextField label="Phone Number" variant="filled" value={phone} 
        onChange={(e) => setPhone(e.target.value)} />
      <br/>
      <TextField label="Address" variant="filled" value={address} 
        onChange={(e) => setAddress(e.target.value)} />
      <br/>
      <Grid container>
        <Grid item xs={6} style={{textAlign:"center"}}>
          <Button variant="contained" color="primary" onClick={submitForm}>Save</Button>
        </Grid>
        <Grid item xs={6} style={{textAlign:"center"}}>
          <Button variant="outlined" color="primary" onClick={clearForm}>Delete</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Form;