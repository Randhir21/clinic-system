import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import React, { useState } from "react";
import { getFirestore,collection, addDoc } from "firebase/firestore"; 
import {app} from './firebase';

const Home = () => {
  const fee=500;
 
  const [inputValues, setInputValues] = useState({
    name: '',
    guardian: '',
    age: '',
    gendar: '',
    add: '',
    po: '',
    ps: '',
    dist: '',
    pin: '',
    state: '',
    date: new Date().toJSON().slice(0,10),
    fee
  });

 

  // Function to handle input changes
  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
    
  const firestore = getFirestore(app);
  const writeData= async(e)=>{
    e.preventDefault();
    const result=await addDoc(collection(firestore, "paitent"),inputValues);
    console.log("Result :" , result);
    setInputValues({
      name: '',
      guardian: '',
      age: '',
      gendar: '',
      add: '',
      po: '',
      ps: '',
      dist: '',
      pin: '',
      state: '',
    });
  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid container sapcing={0}>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                label="Name"
                placeholder="Enter your name"
                variant="outlined"
                fullWidth
                name="name"
                value={inputValues.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                label="Guardian"
                placeholder="Enter Guardian name"
                variant="outlined"
                fullWidth
                name="guardian"
                value={inputValues.guardian}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
              type="number"
                label="Age"
                placeholder="Enter your Age"
                variant="outlined"
                fullWidth
                name="age"
                value={inputValues.age}
                onChange={handleInputChange}
              />
            </Grid>
            
            
          </Grid>
          <Grid container>
                
              <Grid xs={12} sm={6} md={4} item p={1}>
              <Grid sx={{display: "flex"}}>
                  <Typography py={1} mr={3}>Gendar:</Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gendar"
                    value={inputValues.gendar}
                    onChange={handleInputChange}
                    
                    
                  >
                      <Grid sx={{display: "flex"}}>
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </Grid>
                  </RadioGroup>

                </Grid>
                </Grid>
          </Grid>
          <Typography p={1}>Address:</Typography>

          <Grid container sapcing={0}>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                rows={2}
                multiline
                label="Address"
                placeholder="Enter your Address"
                variant="outlined"
                fullWidth
                name="add"
                value={inputValues.add}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                label="P.O"
                placeholder="Enter your P.O"
                variant="outlined"
                fullWidth
                name="po"
                value={inputValues.po}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                label="P.S"
                placeholder="Enter your P.S"
                variant="outlined"
                fullWidth
                name="ps"
                value={inputValues.ps}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                label="District"
                placeholder="Enter your District"
                variant="outlined"
                fullWidth
                name="dist"
                value={inputValues.dist}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                type="number"
                label="PIN"
                placeholder="Enter your PIN"
                variant="outlined"
                fullWidth
                name="pin"
                value={inputValues.pin}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                label="State"
                placeholder="Enter your State"
                variant="outlined"
                fullWidth
                name="state"
                value={inputValues.state}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Typography p={1}>Fee:</Typography>
          <Grid container>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                value={fee + " /-"}
                disabled
                variant="outlined"
                fullWidth
                
              />
            </Grid>
            {/* <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                onChange={(e) => {
                  setDiscount(Number(e.target.value));
                  updateFee();
                }}
                
                variant="outlined"
                fullWidth
              />
            </Grid> */}
            
          </Grid>
          <Grid container>
            
            <Grid xs={12} sm={6} md={4} item p={1}>
              <Button onClick={writeData} variant="contained" size="large" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
