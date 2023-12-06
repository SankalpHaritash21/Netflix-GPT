import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Netflix_background, User_Avatar } from "../utils/constant";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [paassword, setPaassword] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const defaultEmail = "test@gmail.com";
  const defaultPassword = "Test@123456";

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //validate form data.
    try {
      const msg = checkValidData(email.current.value, password.current.value);
      setErrorMessage(msg);

      if (msg !== null) return;

      //create a new user sign-in  and sign-up
      if (!isSignInForm) {
        //Sign-up logic

        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: User_Avatar,
            })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      } else {
        //Sign-in logic

        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customBackgroundStyle = {
    backgroundImage: `url(${Netflix_background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="overflow-hidden min-h-screen" style={customBackgroundStyle}>
      <Header />
      {/* <div className="absolute min-h-screen">
        <img
          src={Netflix_background}
          alt="background"
          srcset=""
          className="min-h-screen"
        />
      </div>*/}
      <form
        action=""
        className="p-5 md:p-10 flex flex-col absolute w-72 md:w-1/2  lg:w-3/12 gap-y-1  lg:gap-y-4 bg-black my-28 mx-auto left-0 right-0 bg-opacity-70 rounded-t-xl no-outline"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-white font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 m-1 w-full bg-gray-600 rounded-xl"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 m-1 w-full bg-gray-600 rounded-xl"
        />

        <div className="flex items-center justify-center">
          <input
            ref={password}
            value={paassword}
            type={visible ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPaassword(e.target.value)}
            className="p-4 my-4 w-full bg-gray-700 rounded-xl"
          />
          <button
            onClick={() => setVisible(!visible)}
            className="w-0 -translate-x-6 text-white"
          >
            {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        </div>
        <p className="text-red-600 text-sm p-2 animate-pulse">{errorMessage}</p>
        <button
          className="p-4 m-2 bg-red-600 font-bold rounded-2xl text-white w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-gray-500">
          <p
            className="text-white hover:underline cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign Up"
              : "Already a user Sign In"}
          </p>
        </p>
        <p className="text-white text-xs">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </p>
      </form>
    </div>
  );
};

export default Login;
