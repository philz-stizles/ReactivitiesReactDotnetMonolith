import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./routes/index";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "./data/mobx/rootStore";
import ModalContainer from "./components/modal/ModalContainer";

const App = () => {
  const { activityStore, commonStore } = useContext(RootStoreContext);
  const {setAppLoaded, token} = commonStore

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Routes />
      <Footer></Footer>
      <ModalContainer />
    </React.Fragment>
  );
};

export default observer(App);
