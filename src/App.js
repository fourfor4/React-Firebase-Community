import React, { useEffect, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { Spin, Space } from 'antd';
import './App.css'
import { setUser } from "./actions/userActions";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Header = lazy(() => import("./components/nav/Header"));

function App() {
  let dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {

    //getting the active user status
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser({
          name: user.displayName,
          email: user.email,
          permission: user.email.indexOf('@levelshealth.com') > -1
        }));
      } else {
        history.push('/login')
      }
    })
    //stop after getting once
    return () => unsubscribe();
  }, [])


  return (
    <Suspense fallback={
      <div className="col text-center d-flex justify-content-center p-5 ">
        <br />
        <div className="col p-200">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      </div>}>
      <Header />

      <div className="col d-flex justify-content-around p-5 ">

      </div>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}

export default App;
