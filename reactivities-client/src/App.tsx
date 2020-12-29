import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Routes from './routes/index';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from './data/mobx/rootStore';
import ModalContainer from './components/modal/ModalContainer';
import { Toast, ToastContainer } from 'react-toastify';
import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  const { commonStore, userStore} = useContext(RootStoreContext);
  const {setAppLoaded, token, retrieveToken, appLoaded} = commonStore
  const {getUser} = userStore

  useEffect(() => {
    if(token){
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }
  }, [getUser, token, setAppLoaded]);

  if(!appLoaded) return <LoadingComponent />

  return (
    <React.Fragment>
      <ToastContainer position='bottom-right'/>
      <Navbar></Navbar>
      <Routes />
      <Footer></Footer>
      <ModalContainer />
    </React.Fragment>
  );
};

export default observer(App);
