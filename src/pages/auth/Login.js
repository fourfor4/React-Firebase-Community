import React, { useState } from "react";
import { auth, googleAuthProvider, db } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions/userActions";
import constants from "../../constants";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  // SignIn with Email and Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      // set the current user
      dispatch(setUser({
        name: user.displayName,
        email: user.email,
        // allow the permission to access the post action
        permission: user.email.indexOf('@levelshealth.com') > -1
      }));
      toast.success(constants.login_success)
      history.push("/")
    }
    catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // Google Login
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        if (user && user.emailVerified == true) {
          // set the current user
          dispatch(setUser({
            name: user.displayName,
            email: user.email,
            // allow the permission to access the post action
            permission: user.email.indexOf('@levelshealth.com') > -1
          }));

          history.push("/");
        }
      })
      .catch(err => toast.error(err))
  };

  // Login with Email and Password - render part
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || !password}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
