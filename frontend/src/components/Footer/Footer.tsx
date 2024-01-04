import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

const Footer = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/NimeshPiyumantha">
        NimeshPiyumantha
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
