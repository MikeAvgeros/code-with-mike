import React, { useState, useEffect } from "react";
import store from "../Store/Store";
import { useSnapshot } from "valtio";
import { Snackbar, Alert } from "@mui/material";

const Alerts = () => {
  const snap = useSnapshot(store);
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
    severity: "error",
    open: false,
    message: "",
  });

  useEffect(() => {
    if (snap.errorResponses.length > 0) {
      setState({
        ...state,
        severity: "error",
        open: true,
        message: snap.errorResponses[0],
      });
    }
  }, [snap.errorResponses]);

  useEffect(() => {
    if (snap.successResponse) {
      setState({
        ...state,
        severity: "success",
        open: true,
        message: snap.successResponse,
      });
    }
  }, [snap.successResponse]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false, message: "" });
    store.errorResponses = [];
    store.successResponse = null;
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: state.vertical,
          horizontal: state.horizontal,
        }}
        open={state.open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={state.severity}
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Alerts;
