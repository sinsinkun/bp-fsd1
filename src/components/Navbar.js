import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Navbar() {

  const [activeTab, setActiveTab] = useState("a");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // toggle animation of active tab based on URL
    if (location.pathname === "/") setActiveTab("a");
    if (location.pathname === "/list") setActiveTab("b");
    if (location.pathname.includes("/user/")) setActiveTab("a");
  }, [location])

  function gotoPage(link) {
    history.push(link);
  }

  return(
    <AppBar>
      <Tabs variant="fullWidth" centered aria-label="navigation" value={activeTab}>
        <Tab value="a" label="CREATE USER" onClick={() => gotoPage("/")} />
        <Tab value="b" label="LIST USERS" onClick={() => gotoPage("/list")} />
      </Tabs>
    </AppBar>
  )
}

export default Navbar;