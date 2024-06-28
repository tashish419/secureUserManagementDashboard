import React from "react";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)

    const handleSignOut = async () => {
        await signOut(auth);
        dispatch(removeUser());
      };
    
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        <p className="mb-4">Welcome, <span className="font-bold">{user?.email}</span></p>
        <button 
          onClick={handleSignOut} 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
