import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
          })
        );
        navigate("/dashboard");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-[100%] bg-gray-800 flex justify-between">
      <div>
        <button className="py-4 px-4 mx-2 text-white">Home</button>
        <button className="py-4 px-4 mx-2 text-white">About Us</button>
        <button className="py-4 px-4 mx-2 text-white">Contact Us</button>
      </div>
      {user && (
        <button className="py-4 px-4 text-white" onClick={handleSignOut}>
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
