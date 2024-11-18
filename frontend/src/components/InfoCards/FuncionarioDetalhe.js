import avatarPlaceholder from "./../../assets/avatar_placeholder.png";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  dadoExiste,
  normalizarCPF,
  separarPrimeiroNome,
} from "../../utils/utils";
import dayjs from "dayjs";
import { buscarImagensUsuarios } from "../../database/dbFuncionario";
import { useEffect, useState } from "react";
import CORES from "../../styles/Cores";
import { BsShieldFillCheck, BsShieldX } from "react-icons/bs";
import Estilos from "../../styles/Styles";
import TooltipAplicavel from "../Tooltip/TooltipAplicavel";

const FuncionarioDetalhe = ({ sx }) => {
  const [imagemUrl, setImagemUrl] = useState(avatarPlaceholder);
  const funcionario = useSelector((state) => state?.funcionario?.detalhe);
  const lotacao = useSelector((state) => state?.lotacao?.lista || []);

  useEffect(() => {
    const carregarImagem = async () => {
      const imagens = await buscarImagensUsuarios(funcionario);
      setImagemUrl(imagens[0]?.url || avatarPlaceholder);
    };

    carregarImagem();
  }, [funcionario]);

  const temFuncionarioSelecionado = dadoExiste(funcionario?._id);
  const funcionarioAdministrador = funcionario?.eAdministrador === true;

  const lotacaoFuncionario = lotacao?.find(
    (item) => item?._id === funcionario?.municipioId
  );

  const secretariaFuncionario = lotacaoFuncionario?.secretarias?.find(
    (item) => item?._id === funcionario?.secretariaId
  );

  const orgaoFuncionario = secretariaFuncionario?.orgaos?.find(
    (item) => item?._id === funcionario?.orgaoId
  );

  const camposDetalhe = [
    {
      label: "Contratação",
      value: "dataContratacao",
      formatar: (valor) => dayjs(valor)?.format("DD/MM/YYYY"),
    },
    { label: "Email", value: "email" },
    { label: "CPF", value: "cpf", formatar: (valor) => normalizarCPF(valor) },
    { label: "Função", value: "funcao" },
    { label: "Matrícula", value: "matricula" },
    {
      label: "Município",
      value: "municipioId",
      formatar: () => lotacaoFuncionario?.nome,
    },
    {
      label: "Secretaria",
      value: "secretariaId",
      formatar: () => secretariaFuncionario?.nome,
    },
    {
      label: "Órgão",
      value: "orgaoId",
      formatar: () => orgaoFuncionario?.nome,
    },
  ];

  const renderizarCamposDetalhe = (campo, ix) => {
    const valorCampo = funcionario?.[campo?.value];
    const valorFinal = campo?.formatar
      ? campo?.formatar(valorCampo)
      : valorCampo;

    return (
      dadoExiste(valorFinal) && (
        <Typography
          key={`${ix}_campo_detalhe`}
          variant="body1"
          gutterBottom
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            maxWidth: "100%",
          }}
        >
          <span>
            {`${campo?.label}: `} <b>{valorFinal}</b>
          </span>
        </Typography>
      )
    );
  };

  return (
    <Box
      sx={{
        mt: 10,
        p: 2,
        pt: 0,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          marginBottom: 1,
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={imagemUrl}
          alt="Foto do Funcionário"
          sx={{
            width: 200,
            height: 200,
            borderRadius: 2,
            ...Estilos.sombraContainer,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {temFuncionarioSelecionado ? (
          <>
            <TooltipAplicavel
              titulo={
                funcionarioAdministrador
                  ? "Tem permissão de administrador!"
                  : "Funcionário comum!"
              }
              style={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">
                {funcionarioAdministrador ? (
                  <BsShieldFillCheck
                    size={20}
                    color={CORES.AZUL_ESCURO}
                    style={{ marginRight: 5 }}
                  />
                ) : (
                  <BsShieldX
                    size={20}
                    color={CORES.AZUL_ESCURO}
                    style={{ marginRight: 5 }}
                  />
                )}
                {separarPrimeiroNome(funcionario?.nome)}
              </Typography>
            </TooltipAplicavel>
            {camposDetalhe.map((campo, ix) =>
              renderizarCamposDetalhe(campo, ix)
            )}
          </>
        ) : (
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              flexDirection: "row",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "center",
              maxWidth: 200,
              fontSize: 25,
            }}
          >
            Selecione um funcionário na listagem
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FuncionarioDetalhe;
