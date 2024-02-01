import { useState, useEffect } from "react";
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import {app} from './components/firebase'
import { Outlet } from "react-router-dom";
import DenseAppBar from "./components/DenseAppBar";
import MiniDrawer from "./components/MiniDrawer";
import { Box } from "@mui/material";
import SignIn from "./components/SignIn";
const auth=getAuth(app);
function App() {

  const [user,setUser] = useState(null)
  useEffect(() => {
    
    onAuthStateChanged(auth,(user) => {
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
    })
  }, []);

  if(!user){
    return (
      <>
       <SignIn />
      </>
    )
  }


  return (
    <>
          <DenseAppBar />
          <Box height={40} />
          <Box sx={{ display: "flex" }}>
            <MiniDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Outlet />
            </Box>
          </Box>
        
     
    </>
  );
}

export default App;
