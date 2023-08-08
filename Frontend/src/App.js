// import './App.css';
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Model from './Model';
import AxiosApi from './API/createapi';

function App() {
  const [userdata, setUserdata] = useState("");
  const [show, setShow] = useState(false);
  const [editRow, setEditRow] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (updatedata) => {
    setEditRow(updatedata)
    setShow(true);
  }

  function getdata() {
    AxiosApi.get('user/data').then((res) =>
    // console.log(res.data))
     setUserdata(res.data))
  }

  function deleteuser(index) {
    AxiosApi.delete("user/delete/" + index).then((response) => {
      // console.log(response)
      getdata()
    });
  }
  useEffect(() => {
    getdata()
  }, []);

  return (
    <>
      <h2 style={{
        textAlign: 'center',
        color: 'white'
      }}>View Data</h2>
      <Button variant='contained' className='float-right' onClick={() => { handleShow() }} >add data</Button>

      <div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table-light">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userdata && userdata.map((user, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.tbl_role ? user.tbl_role.role_name : ""}</TableCell>
                  <TableCell>{user.tbl_designation ? user.tbl_designation.designation_name : ""}</TableCell>
                  <TableCell>{user.tbl_company ? user.tbl_company.company_name: ""}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Button onClick={() => { handleShow(user) }}>Edit</Button>
                    <Button onClick={() => deleteuser(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Model editRow={editRow} setEditRow={setEditRow} handleshow={handleShow} handleClose={handleClose} show={show} getdata={getdata} />
    </>
  );
}

export default App;
