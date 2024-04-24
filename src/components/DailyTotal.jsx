import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import GetTotalCustomer from '../firebase/GetTotalCustomer';

export default function Deposits() {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const totalCustomerCount = await GetTotalCustomer();
      setTotalCustomer(totalCustomerCount);
    };

    fetchData();

    const updateTime = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const updateDate = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);

    return () => {
      clearInterval(updateTime);
      clearInterval(updateDate);
    };
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Customers</Title>
      <Typography component="p" variant="h4">
        {totalCustomer}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {currentDate}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {currentTime}
      </Typography>
    </React.Fragment>
  );
}
