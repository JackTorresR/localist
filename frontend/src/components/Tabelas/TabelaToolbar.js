import { Toolbar, Typography, IconButton } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { abrirModal } from "../../redux/acoes/acoesModal";
import FiltrarRegistrosModal from "../Modal/FiltrarRegistrosModal";
import CORES from "../../styles/Cores";
import TooltipAplicavel from "../Tooltip/TooltipAplicavel";

const TabelaToolbar = (dados) => {
  const { title, searchModalName, searchFields, onApplyFilter } = dados;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        background: CORES.BACKGROUND_GRADIENT,
        position: "sticky",
        left: 0,
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h4"
        id="tableTitle"
        component="div"
        color={CORES.BRANCO}
      >
        {title}
      </Typography>
      <TooltipAplicavel titulo="Filtrar lista">
        <IconButton onClick={() => abrirModal(searchModalName)}>
          <IoFilter style={{ color: CORES.BRANCO }} size={45} />
        </IconButton>
      </TooltipAplicavel>
      <FiltrarRegistrosModal
        modalName={searchModalName}
        searchFields={searchFields}
        onApplyFilter={onApplyFilter}
      />
    </Toolbar>
  );
};

export default TabelaToolbar;
