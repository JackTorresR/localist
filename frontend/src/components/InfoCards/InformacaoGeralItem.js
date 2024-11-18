import { Divider } from "@mui/material";
import CORES from "../../styles/Cores";

const InformacaoGeralItem = (props) => {
  const { index, info } = props;

  return (
    <>
      <div
        style={{
          display: "flex",
          padding: 10,
          backgroundColor: CORES.BRANCO,
          alignItems: "center",
        }}
      >
        <img
          src={info?.icone}
          width={20}
          height={20}
          style={{ marginRight: 10 }}
          alt={`Ícone #${index + 1} das informações da escola`}
        />
        <span style={{ fontSize: 14 }}>{info?.texto}</span>
      </div>
      <Divider variant="middle" style={{ width: "90%" }} />
    </>
  );
};

export default InformacaoGeralItem;
