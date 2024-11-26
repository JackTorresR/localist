import Estilos from "../../styles/Styles";
import { Box, Typography } from "@mui/material";
import Formulario from "../../components/Formularios/Formulario";
import { useState } from "react";
import { alterarSenhaUsuario } from "../../database/dbUsuario";
import { useSelector } from "react-redux";
import CORES from "../../styles/Cores";

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
    <div
      style={{
        ...Estilos.containerPrincipal,
        alignItems: "flex-start",
        paddingTop: 100,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        sx={{
          height: "auto",
          p: 3,
          boxShadow: 3,
          borderRadius: 3,
          bordercolor: CORES.PRETO_ALT,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            height: 100,
            background: CORES.BACKGROUND_GRADIENT,
            borderRadius: 3,
            mb: 5,
            boxShadow: 3,
          }}
        >
          <Typography fontSize={36} color={CORES.PRETO_ALT} fontWeight={"bold"}>
            Alterar senha
          </Typography>
        </Box>
        <Formulario
          campos={campos}
          dados={dados}
          onChange={handleChange}
          onSubmit={handleApply}
          sx={{ m: 0, ml: 0, mr: 0, pb: 0 }}
          buttonTitleSubmit="Alterar"
        />
      </Box>
    </div>
  );
};

export default AlterarSenhaForm;
