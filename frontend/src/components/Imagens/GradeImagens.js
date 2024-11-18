import { useState } from "react";
import { Box } from "@mui/material";
import MenuImagemGaleria from "./MenuImagemGaleria";
import ConfirmarAcaoModal from "../Modal/ConfirmarAcaoModal";

const GradeImagens = ({
  imagens,
  justifyContent = "center",
  gap = 16,
  aoDeletarImagem,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setImagemSelecionada(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent,
        flexWrap: "wrap",
        gap: `${gap}px`,
        p: 2,
      }}
    >
      {imagens?.length > 0 &&
        imagens?.map((imagem, index) => (
          <Box
            key={index}
            sx={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={imagem?.url}
              alt={`imagem-${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <MenuImagemGaleria
              anchorEl={anchorEl}
              open={isMenuOpen && imagemSelecionada === index}
              onClose={handleMenuClose}
              onMenuOpen={handleMenuOpen}
              index={index}
            />
          </Box>
        ))}
      <ConfirmarAcaoModal
        modalName="confirmarExcluirImagemFuncionario"
        executeAction={() =>
          aoDeletarImagem(imagens[imagemSelecionada]?.nomeArquivo)
        }
        titulo="Confirmar Exclusão"
        descricao={"Deseja excluir a imagem?"}
      />
    </Box>
  );
};

export default GradeImagens;
