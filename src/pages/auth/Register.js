import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../actions/userActions";
import constants from "../../constants";


const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    if (user) history.push("/")
  }, [user]);

  // Register user with Email and Password.
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      dispatch(setUser({
        name: user.displayName,
        email: user.email,
        permission: user.email.indexOf('@levelshealth.com') > -1
      }));
      toast.success(
        constants.register_success
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          constants.register_error_email
        );
      } else {
        toast.error(
          constants.register_error
        );
      }
      setEmail("");
    }

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
  };


  // Register with Email and Password - render part
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
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!email || !password}
        >
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