import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import staticData from './staticData';
import LeftView from './components/leftview'

function App() {

  function createData(
    county: string, 
    dateOfSale:  number,
    deedBook: number,
     deedPage: number, 
     propertyAddress: string, 
     propertyValue: number, 
     buyerName: string, 
     buyerAddress: string, 
     sellerName: string, 
     sellerAddress: string,
     ) {
    return {county, dateOfSale, deedBook, deedPage, propertyAddress, propertyValue, buyerName, buyerAddress, sellerName, sellerAddress};
  }

  const rows = staticData;

  function BasicTable() {
    return (
      <TableContainer className="default_table" component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((title) => {
                return (<TableCell align="right"> {title} </TableCell>)
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.County}</TableCell>
                <TableCell component="th" scope="row">
                  {row["Date Of Sale"]}
                </TableCell>
                <TableCell align="right">{row.Deedbook}</TableCell>
                <TableCell align="right">{row.DeedPage}</TableCell>
                <TableCell align="right">{row["Property Address"]}</TableCell>
                <TableCell align="right">{row["Property Value"]}</TableCell>
                <TableCell align="right">{row["Buyer Name"]}</TableCell>
                <TableCell align="right">{row["Buyer Address"]}</TableCell>
                <TableCell align="right">{row["Seller Name"]}</TableCell>
                <TableCell align="right">{row["Seller Address"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const headCells = [
    "County",
    "Date Of Sale",
    "Deedbook",
    "DeedPage",
    "Property Address",
    "Property Value",
    "Buyer Name",
    "Buyer Address",
    "Seller Name",
    "Seller Address",
  ]
  const retrieveData = () => {

  }
  return (
    <div className="App">
      <header className="main">
        <h1> Deed Scrapper</h1>
      </header>
      <form>
        <input type="text" id="address" name="address" placeholder="Search by address ..." />
        <input type="button" value="Retrieve Deed" onClick={retrieveData} />
      </form>
      <section>
      <LeftView />
      <BasicTable />
      </section>

    </div>
  );
}

export default App;
