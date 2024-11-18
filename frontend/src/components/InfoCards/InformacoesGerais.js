import InformacaoGeralItem from "./InformacaoGeralItem";
import Estilos from "../../styles/Styles";
import CORES from "../../styles/Cores";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Local from "../../assets/icons/local.png";
import Telefone from "../../assets/icons/telefone.png";
import Pessoas from "../../assets/icons/pessoas.png";

const InformacoesGerais = (props = {}) => {
  const lotacao = useSelector((state) => state?.lotacao?.lista || []);
  const contagemFuncionarios = useSelector(
    (state) => state?.funcionario?.quantidade || 0
  );

  const [informacoes, setInformacoes] = useState({
    local: "Não identificado",
    telefone: "Não identificado",
  });

  useEffect(() => {
    const dadosLocalStorage = JSON.parse(localStorage.getItem("lotacao")) || {};

    const municipioId = dadosLocalStorage?.municipioId;
    const secretariaId = dadosLocalStorage?.secretariaId;
    const orgaoId = dadosLocalStorage?.orgaoId;

    const municipio = lotacao?.find((m) => m._id === municipioId) || {};
    const secretaria =
      municipio?.secretarias?.find((s) => s._id === secretariaId) || {};
    const orgao = secretaria?.orgaos?.find((o) => o._id === orgaoId) || {};

    let local = orgao?.local || secretaria?.local || "Não identificado";
    let telefone = orgao?.telefone || secretaria?.telefone || "Não identificado";

    if (!municipioId) {
      const primeiroMunicipio = lotacao?.[0] || {};
      const primeiraSecretaria = primeiroMunicipio?.secretarias?.[0] || {};
      const primeiroOrgao = primeiraSecretaria?.orgaos?.[0] || {};

      local =
        primeiroOrgao?.local || primeiraSecretaria?.local || "Não identificado";
      telefone =
        primeiroOrgao?.telefone ||
        primeiraSecretaria?.telefone ||
        "Não identificado";
    }

    setInformacoes({ local, telefone });
  }, [lotacao]);

  const INFORMACOES_ESCOLA = [
    { icone: Local, texto: informacoes.local },
    { icone: Telefone, texto: informacoes.telefone },
    { icone: Pessoas, texto: `${contagemFuncionarios} pessoas` },
  ];

  return (
    <div
      style={{
        ...Estilos.sombraContainer,
        borderRadius: 5,
        overflow: "hidden",
        margin: 10,
        width: props?.preencherContainer ? "100%" : null,
      }}
    >
      <div
        style={{
          background: CORES.BACKGROUND_GRADIENT,
          padding: 10,
        }}
      >
        <span style={{ color: "white", marginLeft: 10 }}>
          INFORMAÇÕES GERAIS
        </span>
      </div>
      {INFORMACOES_ESCOLA.map((info, index) => (
        <InformacaoGeralItem
          key={`${index}_info_card`}
          index={index}
          info={info}
        />
      ))}
    </div>
  );
};

export default InformacoesGerais;
