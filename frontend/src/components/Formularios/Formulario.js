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
import { abrirModal } from "../../redux/acoes/acoesModal";
import { FaSearch } from "react-icons/fa";
import LocalizadorModal from "../Modal/LocalizadorModal";
import CORES from "../../styles/Cores";

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
  const [propsCampoLocalizador, setPropsCampoLocalizador] = useState({});

  const mostrarBotaoLimpar = onReset;

  const defaultSubmitText = dadoExiste(dados?._id) ? "Salvar" : "Criar";

  const handleToggleSenha = useCallback(
    (name) => setMostrarSenha((prev) => ({ ...prev, [name]: !prev[name] })),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleValueChange({ name, value });
  };

  const handleValueChange = ({ name, value }) => onChange({ name, value });

  const autocompleteCustomizado = {
    usuario: "new-usuario",
    senha: "new-password",
  };

  const propsInput = (campo) => ({
    label: campo.label,
    name: campo.name,
    value: dados?.[campo.name] || "",
    fullWidth: true,
    variant: "outlined",
    required: campo.obrigatorio || false,
    rows: campo?.rows || 1,
    multiline: campo?.rows > 1,
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
    sx: {
      "& input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 1000px rgba(255, 255, 255, 0.2) inset`,
        WebkitTextFillColor: CORES.PRETO,
        transition: "background-color 5000s ease-in-out 0s",
      },
      "& .MuiInputBase-input": {
        color: CORES.PRETO,
      },
    },
    error: Boolean(erros?.[campo.name]),
    helperText: erros?.[campo.name] || "",
  });

  const renderizarCampo = (campo = {}, index) => {
    const { tamanhoGrid, componente, mask, tipo } = campo;
    let campoRenderizado = (
      <TextField onChange={handleChange} {...propsInput(campo)} />
    );

    if (tipo === "checkbox") {
      campoRenderizado = (
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
      );
    }

    if (tipo === "select") {
      campoRenderizado = (
        <TextField select onChange={handleChange} {...propsInput(campo)}>
          <MenuItem value="">
            <em>Nenhum selecionado</em>
          </MenuItem>
          {campo.selectItems.map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    if (dadoExiste(mask)) {
      campoRenderizado = (
        <PatternFormat
          customInput={TextField}
          format={
            campo?.mask === "cpfCnpj"
              ? dados?.[campo?.name]?.length > 11
                ? mascaras?.cnpj
                : mascaras?.cpf
              : mascaras[campo.mask]
          }
          onValueChange={({ value }) =>
            handleValueChange({ name: campo.name, value })
          }
          {...propsInput(campo)}
        />
      );
    }

    if (componente) {
      campoRenderizado = (
        <TextField
          {...propsInput(campo)}
          InputProps={{
            ...propsInput(campo).InputProps,
            endAdornment: (
              <>
                {propsInput(campo).InputProps.endAdornment}
                <InputAdornment position="end">
                  <FaSearch
                    onClick={() => {
                      setPropsCampoLocalizador({
                        ...componente,
                        campoNome: campo?.name,
                      });
                      abrirModal(`${componente?.entidade}-modal-smartcard`);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </InputAdornment>
              </>
            ),
          }}
          editable="false"
        />
      );
    }

    return (
      <Grid
        item
        container
        xs={tamanhoGrid?.xs || 12}
        md={tamanhoGrid?.md}
        key={index}
        alignItems="center"
      >
        {campoRenderizado}
      </Grid>
    );
  };

  return (
    <>
      <LocalizadorModal
        {...propsCampoLocalizador}
        onRegistroSelecionado={(item) => {
          handleValueChange({
            name: propsCampoLocalizador?.campoId,
            value: item?._id,
          });
          handleValueChange({
            name: propsCampoLocalizador?.campoNome,
            value: item?.nome,
          });
        }}
      />
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
            ?.map((campo, index) => renderizarCampo(campo, index))}
        </Grid>
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
            {buttonTitleSubmit || defaultSubmitText}
          </Button>
        </Grid>
      </Box>
    </>
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
