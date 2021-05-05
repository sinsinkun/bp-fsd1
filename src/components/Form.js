import { Button, Grid, TextField, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
  const mapFrame = useRef();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname.includes("/user/")) {
      console.log("look up user", location.pathname.replace("/user/",""));
    }
  }, [location])

  function submitForm(e) {
    e.preventDefault();
    // send data to API endpoint /api/user
    history.push("/list");
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    if (showMap) hideMap();
  }

  function searchMap() {
    // if map already visible, hide map
    if (showMap) {
      hideMap();
      return;
    }
    // exit early if no search term
    if (address.length < 1) {
      console.log("no search term");
      return;
    }
    setQuery( address.replace(" ","+") );
    setShowMap(true);
  }

  function hideMap() {
    // mapFrame.current.classList.add("close");
    // setTimeout(() => {
    //   setShowMap(false);
    // }, 490)
    setShowMap(false);
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
        <div className="map" ref={mapFrame}>
          <iframe title="Google Maps" loading="lazy" 
            src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${query}`}>
          </iframe>
        </div>
      : ""}
    </div>
  )
}

export default Form;