import SyncIcon from "@mui/icons-material/Sync";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { React, useState } from "react";
import GetUpdatedCustomers from "../../firebase/GetUpdateTotalCustomers";

export default function HandleSync({ setRefetch }) {
  const [badgeNum, setBadgeNum] = useState(0);

  GetUpdatedCustomers(setBadgeNum);
  function handleRefetch() {
    // Reset the badge number and trigger a refetch
    setBadgeNum(0);
    setRefetch((prev) => !prev);
  }

  return (
    <>
      <Badge badgeContent={badgeNum} color="error">
        <IconButton
          sx={{ color: "white" }}
          aria-label="refresh"
          onClick={handleRefetch}
        >
          <SyncIcon />
        </IconButton>
      </Badge>
    </>
  );
}
