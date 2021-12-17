import { Box } from "@mui/system";
import React from "react";

export default function Container({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        pt: {
          sx: 2,
          md: 5,
        },
        pb: {
          sx: 2,
          md: 5,
        },
        bgcolor: "background.paper",
        width: "100%",
        // height: "100vh",
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "background.paper",
          pt: 2,
          pb: 2,
          pl: 2,
          pr: 2,
          boxSizing: "border-box",
          boxShadow: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
