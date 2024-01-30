import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
} from "firebase/firestore";
import { app } from "./firebase";
import { useReactToPrint } from "react-to-print";

const Setting = () => {
  const firestore = getFirestore(app);
  const customStyles = {
    fontSize: "22px", // Set your desired font size
    fontWeight: "bold",
  };
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [data, setData] = useState([]);
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const sDateFun = (e) => {
    setSDate(e.target.value);
    // console.log(e.target.value);
  };
  
  const eDateFun = (e) => {
    setEDate(e.target.value);
    // console.log(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (new Date(sDate) > new Date(eDate)) {
          setShowValidationMessage(true);
        } else {
          // console.log(sDate);
          setShowValidationMessage(false);

          const querySnapshot = collection(firestore, "paitent");
          const q = query(
            querySnapshot,
            where("date", ">=", sDate),
            where("date", "<=", eDate)
          );
          const snap = await getDocs(q);

          // console.log('Query Snapshot:', snap);
          const result = [];
          snap.forEach((doc) => {
            result.push(doc.data());
          });

          console.log("Result:", result);
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sDate, eDate]);

  return (
    <>
      <Card>
        <CardContent>
          <Typography align="center" style={customStyles}>
            --- MIS ---
          </Typography>
          <Grid
            container
            sapcing={0}
            style={{ justifyContent: "center", display: "flex" }}
          >
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                variant="outlined"
                fullWidth
                name="SDate"
                type="date"
                value={sDate}
                onChange={sDateFun}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} item p={1}>
              <TextField
                variant="outlined"
                fullWidth
                name="eDate"
                type="date"
                value={eDate}
                onChange={eDateFun}
              />
            </Grid>
          </Grid>

          {showValidationMessage && (
            <Typography
              align="center"
              style={{ color: "red", marginTop: "10px" }}
            >
              Please input a valid date range. Start Date should be less than
              End Date.
            </Typography>
          )}
          {data.length === 0 ? (
            " "
          ) : (
            <Grid
              container
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Grid xs={4} sm={2} md={2} item p={1}>
                <Button
                  variant="outlined"
                  onClick={handlePrint}
                  size="large"
                  fullWidth
                >
                  Print
                </Button>
              </Grid>
            </Grid>
          )}
          {data.length === 0 ? (
            " "
          ) : (
            <TableContainer
              component={Paper}
              ref={componentRef}
              style={{ padding: "20px 30px" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">SI</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.fee}</TableCell>
                    </TableRow>
                  ))}
                  {data.reduce((acc, cur) => (
                    // <Grid style={{display:"flex" , justifyContent: "flex-end"}}>
                    //   <Typography align="left" p={2} style={{border: "1.5px solid #c3bebe61", width: "300px",fontSize: "20px"}}>
                    //   Total Amount:
                    //   {acc.fee+cur.fee} /-
                    // </Typography>
                    // </Grid>

                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left"> </TableCell>
                      <TableCell align="left"> </TableCell>
                      <TableCell align="left" style={{ fontSize: "18px" }}>
                        
                        Total Amount:
                      </TableCell>
                      <TableCell align="left" style={{ fontSize: "18px" }}>
                        {acc.fee + cur.fee} /-
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Setting;
