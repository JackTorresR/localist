import { Button } from "@mui/material";
import { useState } from "react";

const BotaoComHover = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      {...props}
      sx={{ ...props?.sx, opacity: isHovered ? 0.7 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.children}
    </Button>
  );
};

export default BotaoComHover;
