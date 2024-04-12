import * as React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';


export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Recent Customers</Title>
      <Typography component="p" variant="h4">
        5
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Current Time
      </Typography>
      </div>
    </React.Fragment>
  );
}