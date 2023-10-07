import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const SignUp = () => {
  const [signInError, setSignInError] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [passShow, setPassShow] = useState(false);

  const { signUp } = useAuthContext();

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    setSignInError("");
    setSignInSuccess("");

    if (password.length < 6) {
      return setSignInError("Password should be at least 6 characters");
    }

    if (!terms) {
      return setSignInError("please accept our terms and conditions");
    }

    signUp(email, password)
      .then(() => {
        // profile update
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            setSignInSuccess("Sign Up successfully");
          })
          .catch((error) => {
            console.log(error);
          });

        //email verification
        sendEmailVerification(auth.currentUser).then(() => {
          alert("Email verification sent!");

          //navigate
          navigate("/");
        });
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/invalid-email).") {
          return setSignInError("invalid email");
        } else if (
          err.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          return setSignInError("email already in use");
        }
        setSignInError(err.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left my-6">
          <h1 className="text-5xl font-bold">Sign Up now !!!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="name"
                className="input input-bordered"
                name="name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
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
              <div className="mt-4">
                <input type="checkbox" name="" id="terms" />
                <label className="ml-2" htmlFor="terms">
                  Accept out{" "}
                  <a className="hover:underline text-blue-500" href="">
                    terms and conditions
                  </a>
                </label>
              </div>
              <div className="my-2">
                {signInError && <p className=" text-red-500">{signInError}</p>}
                {signInSuccess && (
                  <p className=" text-green-500">{signInSuccess}</p>
                )}
              </div>
            </div>
            <div className="form-control my-2">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <div>
              <p>
                Do you have an account?
                <Link
                  to={"/login"}
                  className="font-medium text-blue-500 ml-1 hover:underline"
                >
                  Login
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

export default SignUp;
