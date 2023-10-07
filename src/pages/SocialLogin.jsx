import useAuthContext from "../hooks/useAuthContext";

const SocialLogin = () => {
  const { googleLogin } = useAuthContext();

  const handleGoogleLogin = (google) => {
    google()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="divider">continue with</div>
      <div className="flex justify-around">
        <button
          onClick={() => handleGoogleLogin(googleLogin)}
          className="btn btn-neutral btn-sm"
        >
          Google
        </button>
        <button className="btn btn-sm">Github</button>
      </div>
    </div>
  );
};

export default SocialLogin;
