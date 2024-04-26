import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import GetUsers from '../firebase/GetUsers';
import HandleRemove  from "../buttons/actions/HandleRemove";
import HandleNotify from '../buttons/actions/HandleNotify';


function preventDefault(event) {
  event.preventDefault();
}

export default function Booking({refetch}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await GetUsers();
      setUsers(data);
    }
    fetchData();
  }, [refetch]);


  return (
    <React.Fragment>
      <Title>Recent Customers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Position</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Game</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice().sort((user1, user2) => user1.position - user2.position).map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">{user.position}</TableCell>
              <TableCell align="center">{`${user.fname} ${user.lname}`}</TableCell>
              <TableCell align="center">{user.game}</TableCell>
              <TableCell align="center">{user.phone}</TableCell>
              <TableCell align="center">{`${user.email}`}</TableCell>
              <TableCell align="center">
                <HandleRemove userId={user.id} users = {users} setUsers= {setUsers}/>
                <HandleNotify phoneNumber={user.phone} userName={user.fname}/>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell align="center" colSpan={6}>
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
