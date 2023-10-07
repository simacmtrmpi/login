import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import SocialLogin from "./SocialLogin";
import { useRef, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Login = () => {
  const [logInError, setLogInError] = useState(null);
  const [logInSuccess, setLogInSuccess] = useState(null);
  const [passShow, setPassShow] = useState(false);

  const { logIn } = useAuthContext();

  const navigate = useNavigate();
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLogInError("");
    setLogInSuccess("");

    logIn(email, password)
      .then(() => {
        setLogInSuccess("Login successfully");

        // navigate
        return navigate("/");
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/invalid-email).") {
          return setLogInError("invalid email");
        } else if (
          err.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          return setLogInError("email already in use");
        }
        setLogInError(err.message.slice(15));
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide an email");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("please provide a valid email");
    }

    //get forget pass reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left my-6">
          <h1 className="text-5xl font-bold">Login now !!!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
                name="email"
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={passShow ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
              <span
                className="mt-1 absolute top-12 right-4 w-4 h-3"
                onClick={() => setPassShow(!passShow)}
              >
                {!passShow ? <VscEyeClosed></VscEyeClosed> : <VscEye></VscEye>}
              </span>
              <div className="my-2">
                {logInError && <p className=" text-red-500">{logInError}</p>}
                {logInSuccess && (
                  <p className=" text-green-500">{logInSuccess}</p>
                )}
              </div>
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className=" mt-3">
              <p>
                Don&apos;t have an account?
                <Link
                  to={"/signup"}
                  className="font-semibold text-blue-500 hover:underline ml-1"
                >
                  SignUp
                </Link>
              </p>
            </div>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
