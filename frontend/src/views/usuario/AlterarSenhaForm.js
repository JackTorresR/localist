import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { Box } from "@mui/material";
import Formulario from "../../components/Formularios/Formulario";
import { useState } from "react";
import CabecalhoTabela from "../../components/Tabelas/CabecalhoTabela";
import { alterarSenhaUsuario } from "../../database/dbUsuario";
import { useSelector } from "react-redux";

const AlterarSenhaForm = () => {
  const usuarioId = useSelector((state) => state?.auth?._id);
  const [dados, setDados] = useState({});

  const campos = [
    {
      tamanhoGrid: { md: 12 },
      label: "Senha atual",
      name: "senhaAtual",
      tipo: "password",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Senha nova",
      name: "novaSenha",
      tipo: "password",
      obrigatorio: true,
    },
  ];

  const handleChange = ({ name, value }) =>
    setDados((prev) => ({ ...prev, [name]: value }));

  const handleApply = (event) => {
    event.preventDefault();
    alterarSenhaUsuario({ usuarioId, ...dados });
  };

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <Box
          sx={{
            borderRadius: "8px",
            boxShadow: 3,
            width: { xs: "90%", sm: "80%", md: "70%" },
            margin: "32px auto",
          }}
        >
          <CabecalhoTabela titulo="Alterar senha" />
          <Box maxHeight={"80vh"} overflow={"auto"} sx={{ p: 2 }}>
            <Formulario
              campos={campos}
              dados={dados}
              onChange={handleChange}
              onSubmit={handleApply}
              onReset={null}
              sx={{ m: 0, ml: 0, mr: 0, pb: 0 }}
              buttonTitleSubmit="Alterar"
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AlterarSenhaForm;
