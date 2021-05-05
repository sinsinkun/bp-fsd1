import { Button, Grid, TextField, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import envFile from '../env.json';

const formParent = {
  display:"flex",
  flexDirection: "column",
}

const API_KEY = envFile.API_KEY;

function Form() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/user/")) {
      console.log("look up user", location.pathname.replace("/user/",""));
    }
  }, [location])

  function submitForm(e) {
    e.preventDefault();
    // ...
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setShowMap(false);
  }

  function searchMap() {
    if (address.length < 1) {
      console.log("no search term");
      return;
    }
    setQuery( address.replace(" ","+") );
    setShowMap(true);
  }

  return(
    <div>
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
          onChange={(e) => setAddress(e.target.value)} 
          InputProps={{endAdornment: (
              <IconButton onClick={searchMap}><SearchIcon /></IconButton>
          )}}
        />
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
      {/* Google Map Display */}
      {showMap ? 
        <iframe title="Google Maps" loading="lazy"
          src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${query}`}>
        </iframe>
      : ""}
    </div>
  )
}

export default Form;