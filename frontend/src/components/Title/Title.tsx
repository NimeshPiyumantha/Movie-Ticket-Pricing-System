import * as React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: React.ReactNode;
}

const Title = (props: TitleProps) => {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      sx={{
        fontWeight: "bold",
        fontSize: "1.5rem",
        marginBottom: "1rem",
        marginTop: "1rem",
        fontFamily: "Roboto",
      }}
    >
      {props.children}
    </Typography>
  );
};

export default Title;
