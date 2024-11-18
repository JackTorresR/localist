import { Box, Typography } from "@mui/material";
import { salvarImagem } from "../../database/dbFuncionario";
import { useState } from "react";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import { FaFileUpload } from "react-icons/fa";

const CardUpload = () => {
  const [arquivoEmDrop, setArquivoEmDrop] = useState(false);

  const abrirSistemaArquivos = () => {
    const inputCamera = document.createElement("input");
    inputCamera.type = "file";
    inputCamera.accept = "image/*";
    inputCamera.capture = "environment";
    inputCamera.onchange = salvarImagem;
    inputCamera.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setArquivoEmDrop(false);
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length > 0) {
      const eventoMock = { target: { files: validFiles } };
      salvarImagem(eventoMock);
    }
  };

  return (
    <Box
      sx={{
        ...Estilos.containerFlexCentralizado,
        borderRadius: 2,
        cursor: "pointer",
        flexDirection: "column",
        border: `${arquivoEmDrop ? "5px solid" : "2px dashed"} ${
          CORES.AZUL_CLARO
        }`,
        backgroundColor: CORES.CINZA_CLARO,
        height: 216,
        p: 2,
      }}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setArquivoEmDrop(true);
      }}
      onDragLeave={() => {
        setArquivoEmDrop(false);
      }}
      onClick={abrirSistemaArquivos}
    >
      <FaFileUpload size={60} opacity={0.5} />
      <Typography sx={{ fontSize: 18, textAlign: "center", mt: 2 }}>
        Clique ou arraste a foto para essa área!
      </Typography>
    </Box>
  );
};

export default CardUpload;
