import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  Box,
  TextField,
  Typography,
  InputAdornment,
  Icon,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { PatternFormat } from "react-number-format";
import { dadoExiste, mascaras } from "../../utils/utils";
import VisibilidadeCampo from "./VisibilidadeCampo";

const Formulario = (props) => {
  const {
    sx,
    dados,
    erros,
    campos,
    titulo,
    onReset,
    onChange,
    onSubmit,
    buttonTitleSubmit,
    buttonsAlignment,
  } = props;

  const [mostrarSenha, setMostrarSenha] = useState({});

  const mostrarBotaoLimpar = onReset;

  const handleToggleSenha = useCallback(
    (name) => setMostrarSenha((prev) => ({ ...prev, [name]: !prev[name] })),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleValueChange({ name, value });
  };

  const handleValueChange = ({ name, value }) => {
    onChange({ name, value });
  };

  const autocompleteCustomizado = {
    email: "new-email",
    senha: "new-password",
  };

  const propsInput = (campo) => ({
    label: campo.label,
    name: campo.name,
    value: dados?.[campo.name] || "",
    fullWidth: true,
    variant: "outlined",
    required: campo.obrigatorio || false,
    type:
      campo?.tipo === "password" && mostrarSenha?.[campo.name]
        ? "text"
        : campo?.tipo || "text",
    autoComplete: autocompleteCustomizado?.[campo.name] || "off",
    InputLabelProps: {
      shrink: campo?.tipo === "date" ? true : undefined,
    },
    InputProps: {
      startAdornment: campo?.iconeInicio && (
        <InputAdornment position="start">
          <Icon size={24}>{campo?.iconeInicio}</Icon>{" "}
        </InputAdornment>
      ),
      endAdornment: campo?.tipo === "password" && (
        <VisibilidadeCampo
          toggle={mostrarSenha?.[campo?.name]}
          handleToggleSenha={() => handleToggleSenha(campo?.name)}
        />
      ),
    },
    error: Boolean(erros?.[campo.name]),
    helperText: erros?.[campo.name] || "",
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => onSubmit(e)}
      onReset={() => onReset()}
      sx={{
        ml: { xs: 5, md: 20 },
        mr: { xs: 5, md: 20 },
        mt: 10,
        pb: 10,
        ...sx,
      }}
    >
      {dadoExiste(titulo) && (
        <Typography variant="h4" gutterBottom>
          {titulo}
        </Typography>
      )}
      <Grid container spacing={2} flex={1}>
        {campos
          ?.filter((campo) => campo?.condicao !== false)
          ?.map((campo, index) => (
            <Grid
              item
              container
              xs={campo?.tamanhoGrid?.xs || 12}
              md={campo?.tamanhoGrid?.md}
              key={index}
              alignItems="center"
            >
              {campo?.tipo === "checkbox" ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dados[campo.name] || false}
                      onChange={(e) =>
                        handleValueChange({
                          name: campo.name,
                          value: e.target.checked,
                        })
                      }
                      color="primary"
                    />
                  }
                  label={campo.label}
                />
              ) : campo?.tipo === "select" ? (
                <TextField
                  select
                  onChange={handleChange}
                  {...propsInput(campo)}
                >
                  <MenuItem value="">
                    <em>Nenhum selecionado</em>
                  </MenuItem>
                  {campo.selectItems.map((item, i) => (
                    <MenuItem key={i} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : campo.mask ? (
                <PatternFormat
                  customInput={TextField}
                  format={mascaras[campo.mask]}
                  onValueChange={({ value }) =>
                    handleValueChange({ name: campo.name, value })
                  }
                  {...propsInput(campo)}
                />
              ) : (
                <TextField onChange={handleChange} {...propsInput(campo)} />
              )}
            </Grid>
          ))}
        <Grid
          item
          sx={{ mt: 2 }}
          container
          flex={1}
          alignItems="center"
          justifyContent={buttonsAlignment || "flex-end"}
        >
          {mostrarBotaoLimpar && (
            <Button
              sx={{ ml: 2 }}
              type="reset"
              variant="contained"
              color="warning"
            >
              Limpar
            </Button>
          )}
          <Button
            sx={{ ml: 2 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            {buttonTitleSubmit || "Gravar"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

Formulario.propTypes = {
  campos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tamanhoGrid: PropTypes.object,
      mask: PropTypes.string,
      required: PropTypes.bool,
      tipo: PropTypes.string,
      selectItems: PropTypes.array,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Formulario;
