import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { Netflix_Logo } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false);

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsuscribe will be code when component unmounds
    return () => unsuscribe();
  }, []);

  const handleDrop = () => {
    drop ? setDrop(false) : setDrop(true);
  };

  return (
    <div className="absolute py-2 px-8 bg-gradient-to-b from-black z-50 flex justify-between items-center w-full">
      <img
        className="w-44 no-outline"
        src={Netflix_Logo}
        alt="logo"
        srcset=""
      />
      <div>
        {user && (
          <div className="flex w-56 items-center justify-center flex-col">
            <img
              className="w-10 h-10 rounded-full absolute"
              src={user?.photoURL}
              alt="user Avatar"
              onClick={handleDrop}
            />
          </div>
        )}

        {drop && (
          <div className="relative font-bold text-xl text-white bg-black translate-y-7 h-0">
            <div className="bg-black opacity-70 flex flex-col justify-center items-center p-5">
              <div>welcome {user?.displayName}</div>
              <hr className="w-full bg-white mt-1 mb-1" />
              <div>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
