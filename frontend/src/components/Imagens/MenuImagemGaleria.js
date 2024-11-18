import { IconButton, Menu, MenuItem } from "@mui/material";
import { SlOptions } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { abrirModal } from "../../redux/acoes/acoesModal";

const MenuImagemGaleria = ({ anchorEl, open, onClose, onMenuOpen, index }) => {
  return (
    <>
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "white",
        }}
        onClick={(e) => onMenuOpen(e, index)}
      >
        <SlOptions />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            width: "150px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            abrirModal("confirmarExcluirImagemFuncionario");
            onClose();
          }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MdDelete size={24} style={{ marginRight: 8 }} />
          Excluir
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuImagemGaleria;
