import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CORES from "../../styles/Cores";

const StyledTextField = styled(TextField)({
  "& input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0 1000px rgba(255, 255, 255, 0.2) inset`,
    WebkitTextFillColor: CORES.BRANCO,
    transition: "background-color 5000s ease-in-out 0s",
  },
  "& .MuiInputBase-input": {
    color: CORES.BRANCO,
  },
});

export default StyledTextField;
