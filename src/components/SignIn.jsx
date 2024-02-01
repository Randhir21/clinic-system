import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
import '../App.css'
const auth = getAuth(app);
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const createUser=()=>{
  //     createUserWithEmailAndPassword(auth, 'rps85071@gmail.com', 'password');
  // }

  const signInUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Store user-related information in localStorage (e.g., user.uid, user.email)
      //   localStorage.setItem('userId', user.uid);
      //   window.location.reload();
      //   navigate('/')
      console.log("Signin Success");
      console.log(user);
    } catch (err) {
      // Handle authentication error
      console.error(err);
      alert("Please fill correct username and password");
    }
  };
  const signInpage={
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }
  const customCardStyle={
    width: "500px",
    padding: "20px"
  }

  return (
    <div className="signInpage">
      <Card className="customCardStyle">
      <TextField
        style={{marginTop: "20px"}}
        type="email"
        label="User Name"
        placeholder="Enter User Name"
        variant="outlined"
        name="username"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        style={{margin: "20px 0"}}
        type="password"
        label="Password"
        placeholder="Enter Password"
        variant="outlined"
        name="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={signInUser} variant="contained" size="large">
        submit
      </Button>
      </Card>
    </div>
  );
};

export default SignIn;
