import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import GetUsers from '../firebase/GetUsers';

function preventDefault(event) {
  event.preventDefault();
}

function Appointments() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await GetUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Customers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Game</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length !== 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.position}</TableCell>
                <TableCell>{`${user.fname} ${user.lname}`}</TableCell>
                <TableCell>{user.game}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell align="right">{`$${user.email}`}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
            <TableCell align="center" colSpan={5}>
              <p>No current appointments.</p>
            </TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}

export default Appointments;
