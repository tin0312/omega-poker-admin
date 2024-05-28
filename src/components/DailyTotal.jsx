import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import GetTotalCustomer from "../firebase/GetTotalCustomer";
import Box from "@mui/material/Box";

export default function DailyTotal({ refetch, users }) {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // update time
  useEffect(() => {
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

  // update number of customers
  useEffect(() => {
    const fetchData = async () => {
      const totalCustomerCount = await GetTotalCustomer();
      setTotalCustomer(totalCustomerCount);
    };

    fetchData();
  }, [refetch, users]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 2,
        m: 1,
        "@media (max-width: 600px)": {
          p: 1,
          m: 0,
        },
      }}
    > 
      <Title>Current parties</Title>
      <Typography component="p" variant="h4">
        {totalCustomer}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        on {currentDate}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {currentTime}
      </Typography>
    </Box>
  );
}
