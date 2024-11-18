import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import CORES from "../../styles/Cores";

const BotaoVoltar = (props = {}) => {
  const navigate = useNavigate();
  const { branco, acaoCustomizada = null } = props;

  return (
    <div style={{ position: "absolute", zIndex: 100, top: 5, left: 5 }}>
      <TiArrowBack
        size={80}
        color={branco ? CORES.BRANCO : CORES.PRETO}
        onClick={() => (acaoCustomizada ? acaoCustomizada() : navigate(-1))}
        style={{ cursor: "pointer", margin: branco ? -10 : -20 }}
      />
    </div>
  );
};

export default BotaoVoltar;
