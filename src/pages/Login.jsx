import { signUpWithGoogle } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/shoppingSlice";
import { FcGoogle } from "react-icons/fc";
function Login() {
  const dispatch = useDispatch();
  const loginWithGoogle = () => {
    signUpWithGoogle()
      .then((result) => {
        dispatch(login(result.user));
        localStorage.setItem("user", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="h-[400px] w-[300px] bg-slate-800 rounded-xl flex flex-col  ">
        <span className="mt-10 mb-5">
          <FcGoogle className="mx-auto  text-[120px]" />
        </span>
        <h1 className="text-white text-3xl  mb-14">Login with Google</h1>
        <button
          onClick={() => {
            loginWithGoogle();
          }}
          className="btn btn-outline btn-accent mx-auto w-[180px]"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
