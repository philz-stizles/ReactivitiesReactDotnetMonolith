import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./routes/index";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "./data/mobx/rootStore";

const App = () => {
  const { activityStore } = useContext(RootStoreContext);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Routes />
      <Footer></Footer>
    </React.Fragment>
  );
};

export default observer(App);
