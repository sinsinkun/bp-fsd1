import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Navbar() {

  const [activeTab, setActiveTab] = useState("a");
  const history = useHistory();

  function gotoPage(link) {
    history.push(link);
  }

  return(
    <AppBar>
      <Tabs variant="fullWidth" centered aria-label="navigation"
        value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab value="a" label="CREATE USER" onClick={() => gotoPage("/")} />
        <Tab value="b" label="LIST USERS" onClick={() => gotoPage("/list")} />
      </Tabs>
    </AppBar>
  )
}

export default Navbar;