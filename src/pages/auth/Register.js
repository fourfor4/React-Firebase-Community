import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { setUser } from "../../actions/userActions";


const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    if (user) history.push("/")
  }, [user]);

  //^Register user
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      dispatch(setUser({
        name: user.displayName,
        email: user.email,
        permission: user.email.indexOf('@levelshealth.com') > -1
      }));
      toast.success(
        'You are registed successfully, you will go to the dashboard!'
      );
    } catch (error) {
      toast.error(
        'You are not registed successfully, try again!'
      );
      setEmail("");
    }

    //^save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <input
        type="text"
        className="form-control mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;