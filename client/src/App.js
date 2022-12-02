import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getUser} from "./store/auth.js"
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import { Navigate, redirect } from "react-router-dom";


function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

    async function fetchUser() {
      setIsLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(res.ok){
        const user = await res.json()
        dispatch(getUser(user));
      }

      setIsLoading(false);
    }

  useEffect(() => {
   fetchUser();
  }, [])
  
if(isLoading){
  return <p>Loading ....</p>
}

  return (
    <>
      <AppBar />

      <Outlet />
    </>
  );
}

export default App;
