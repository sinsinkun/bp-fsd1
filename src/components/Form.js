import { Button, Grid, TextField, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreContext } from './GlobalStore';
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

  const [store, setStore] = useStoreContext();

  useEffect(() => {
    async function lookUpUser(id) {
      if (!store.showLoad) setStore({do:"toggleLoading"});
      const data = await fetch(`https://elu249nmfh.execute-api.us-east-2.amazonaws.com/dev/users?id=${id}`)
      .then(r => r.json())
      .catch(err => console.log(err));

      if (data.name) setName(data.name);
      if (data.email) setEmail(data.email);
      if (data.phone) setPhone(data.phone);
      if (data.address) setAddress(data.address);
      setStore({do:"toggleLoading"});
    }
    if (location.pathname.includes("/user/")) {
      lookUpUser(location.pathname.replace("/user/",""));
    }
    // eslint-disable-next-line
  }, [location])

  async function submitForm(e) {
    e.preventDefault();
    if (!store.showLoad) setStore({do:"toggleLoading"});
    let payload = { name:name, email:email, phone:phone, address:address };
    // attach id if exists
    if (location.pathname.includes("/user/")) {
      console.log("edit user", location.pathname.replace("/user/",""));
      payload.id = location.pathname.replace("/user/","");
    }
    // send data to API endpoint /api/user
    await fetch("https://elu249nmfh.execute-api.us-east-2.amazonaws.com/dev/users", {
      method:"POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(payload) 
    }).catch(err => console.log(err));

    // redirect to list page
    setStore({do:"toggleLoading"});
    history.push("/list");
  }

  function clearForm() {
    // if currently in "edit" mode, delete entry
    if (location.pathname.includes("/user/")) {
      const id = location.pathname.replace("/user/","");
      // note: does not need to await execution of deletion
      fetch(`https://elu249nmfh.execute-api.us-east-2.amazonaws.com/dev/users?id=${id}`, 
      { method:"DELETE" }).catch(err => console.log(err));
      // move back to index
      history.push("/");
    }
    // clear forms
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