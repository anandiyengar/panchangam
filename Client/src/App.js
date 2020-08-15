import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Form from './component/Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './auth/PrivateRoute';
import EditForm from './component/EditForm';
import FormList from './component/FormTable';
import ImgFinal from './layout/ImgFinal';
import FormNew from './component/FormNew';
import Mob from './layout/Mob';
import DownloadImg from './layout/DownloadImg';

function App() {
  useEffect(()=>{
    document.body.classList.remove('modal-open')
  },[])
  return (
    <BrowserRouter>
    
    <ToastContainer />
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/view/:formId" component={ImgFinal} />
      <Route exact path="/mob/:formId" component={Mob} />


      <Route exact path="/login" component={Login} />
      <Route exact path="/add-data" component={Form} />
      <Route exact path="/form/edit/:formId" component={EditForm} />
      <Route exact path="/forms" component={FormList}/>
      <Route exact path="/new" component={FormNew}/>
      <Route exact path = "/download/:formId" component = {DownloadImg} />


    </Switch>
    </BrowserRouter>
  );
}

export default App;

//Add shula/krisna to prathamai
//Edit form time