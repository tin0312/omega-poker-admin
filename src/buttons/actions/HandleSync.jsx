import SyncIcon from "@mui/icons-material/Sync";
import IconButton from "@mui/material/IconButton";
import React from "react";

export default function HandleSync({setRefetch}) {
    function handleRefetch() {
        setRefetch((prev) => !prev);
    }
  return (
    <>
    <IconButton sx= {{color: "white"}}aria-label="refresh" onClick={handleRefetch}>
      <SyncIcon />
    </IconButton>
  </>
  );
}
