import { Button } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ButtonTopNavbar = ({ item, extraConfig, ix }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const handleNavItemClick = (item) => {
    item?.acao(item);
  };

  const telaAtual = location?.pathname;
  const destacarBotao = isHovered || telaAtual === item?.path;

  return (
    <Button
      key={`${ix}_navBar_topo`}
      sx={{ color: "#fff", ...extraConfig?.sx }}
      onClick={() => handleNavItemClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${
          destacarBotao ? "0.4" : "0.08"
        })`,
        height: 64,
        padding: 10,
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 0,
        ...extraConfig?.style,
      }}
    >
      {item?.nome}
    </Button>
  );
};

export default ButtonTopNavbar;
