import { Button, Icon } from "@mui/material";
import CORES from "../../styles/Cores";
import { useState } from "react";
import Estilos from "../../styles/Styles";

const AcaoTelaInicialItem = (props = {}) => {
  const { item } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...Estilos.sombraContainer,
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        padding: 10,
        backgroundColor: isHovered ? CORES.CINZA_PADRAO : CORES.BRANCO,
        borderRadius: 5,
        width: "100%",
        transition: "background-color 0.3s, box-shadow 0.3s",
      }}
      onClick={() => item?.acao()}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: item?.color,
            width: 52.5,
            height: 52.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
            borderRadius: 5,
          }}
        >
          <Icon style={{ color: CORES.BRANCO, fontSize: 30, lineHeight: "1" }}>
            {item?.icone}
          </Icon>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: item?.color,
              textAlign: "left",
            }}
          >
            {item?.nome}
          </span>
          <span style={{ fontSize: 12, color: CORES.PRETO, textAlign: "left" }}>
            {item?.descricao}
          </span>
        </div>
      </div>
    </Button>
  );
};

export default AcaoTelaInicialItem;
