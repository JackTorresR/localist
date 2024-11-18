import Estilos from "../../styles/Styles";
import { useState } from "react";
import { Box, Card, Paper, Typography } from "@mui/material";
import CORES from "../../styles/Cores";
import Formulario from "../../components/Formularios/Formulario";
import { acessarSistema } from "../../database/dbAuth";

const AcessoForm = () => {
  const [dados, setDados] = useState({});

  const handleChange = ({ name, value }) =>
    setDados((prev) => ({ ...prev, [name]: value }));

  const handleApply = (event) => {
    event.preventDefault();
    acessarSistema(dados);
  };

  const campos = [
    {
      tamanhoGrid: { md: 12 },
      label: "Usuário",
      name: "usuario",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Senha",
      name: "senha",
      tipo: "password",
      obrigatorio: true,
    },
  ];

  return (
    <div>
      <div style={Estilos.containerPrincipal}>
        <Card
          sx={{
            width: { xs: "80%", sm: "50%", md: "35%" },
            padding: "30px",
            paddingBottom: 0,
            overflow: "unset",
            position: "relative",
          }}
        >
          <Box
            component={Paper}
            sx={{
              boxShadow: 5,
              padding: "10px",
              borderRadius: "8px",
              marginTop: "-40px",
              textAlign: "center",
              background: CORES.BACKGROUND_GRADIENT,
            }}
          >
            <Typography
              variant="h4"
              id={`acesso-form-titulo`}
              color={CORES.PRETO}
              fontWeight="bold"
            >
              Acessar sistema
            </Typography>
          </Box>
          <Box maxHeight={"80vh"} overflow={"auto"} sx={{ padding: "50px" }}>
            <Formulario
              campos={campos}
              dados={dados}
              onChange={handleChange}
              onSubmit={handleApply}
              buttonTitleSubmit="Acessar"
              buttonsAlignment="center"
              sx={{ m: 0, ml: 0, mr: 0, pb: 0 }}
            />
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default AcessoForm;
