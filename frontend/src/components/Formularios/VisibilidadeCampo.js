import { IconButton, InputAdornment } from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import CORES from "../../styles/Cores";
import React from "react";

const VisibilidadeCampo = React.memo((props = {}) => {
  const { toggle, iconeToggleOn, iconeToggleOff, handleToggleSenha } = props;

  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => handleToggleSenha()}
        edge="end"
      >
        {toggle
          ? iconeToggleOn || (
              <MdOutlineVisibilityOff
                style={{ color: CORES.CINZA_PADRAO }}
                size={24}
              />
            )
          : iconeToggleOff || (
              <MdOutlineVisibility
                style={{ color: CORES.CINZA_PADRAO }}
                size={24}
              />
            )}
      </IconButton>
    </InputAdornment>
  );
});

export default VisibilidadeCampo;
