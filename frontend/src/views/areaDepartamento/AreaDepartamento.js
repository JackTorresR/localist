import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import {
  colunasTabelaAreaDepartamento,
  getAreasDepartamentos,
  removerAreaDepartamento,
  salvarAreaDepartamento,
} from "../../database/dbAreaDepartamento";
import { useState } from "react";
import FormModal from "../../components/Modal/FormModal";
import InfoModal from "../../components/Modal/InfoModal";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import { dadoExiste } from "../../utils/utils";
import {
  camposFormCliente,
  colunasTabelaClientes,
  getClientes,
  salvarCliente,
} from "../../database/dbCliente";

const AreaDepartamento = () => {
  const areasDepartamentos = useSelector((state) => state?.areaDepartamento);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const campos = [
    {
      tamanhoGrid: { md: 9 },
      label: "Nome",
      name: "nomeSemPontuacao",
    },
    {
      tamanhoGrid: { md: 3 },
      label: "Sigla",
      name: "sigla",
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Responsável",
      name: "responsavel",
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Cliente",
      name: "nomeCliente",
      componente: {
        acao: getClientes,
        entidade: "cliente",
        campoId: "idCliente",
        acaoSalvar: salvarCliente,
        campos: camposFormCliente,
        colunas: colunasTabelaClientes,
      },
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Código da área",
      name: "codigoArea",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Tipo",
      name: "tipo",
      tipo: "select",
      selectItems: [
        { label: "Área", value: "Área" },
        { label: "Departamento", value: "Departamento" },
      ],
    },
  ];

  const handleSubmit = (dados) => {
    salvarAreaDepartamento(dados);
    setItemDetalhe({});
  };

  const entidade = "areaDepartamento";
  const propsComponentes = { campos, entidade, itemDetalhe };
  const tituloCard =
    (dadoExiste(itemDetalhe?._id) ? "Editar" : "Criar") +
    " área ou departamento";

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <FormModal
          {...propsComponentes}
          tituloCard={tituloCard}
          onSubmit={handleSubmit}
          onClose={() => setItemDetalhe({})}
        />
        <InfoModal
          {...propsComponentes}
          titulo="Informações da área ou departamento"
        />
        <ConfirmarAcaoModal
          {...propsComponentes}
          acao={() => removerAreaDepartamento(itemDetalhe?._id)}
        />
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...areasDepartamentos}
          titulo="Áreas e departamentos"
          colunas={colunasTabelaAreaDepartamento}
          acao={getAreasDepartamentos}
          camposFiltro={campos}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
          acaoRemover={(item) => {
            setItemDetalhe(item);
            abrirModal(`${entidade}-modal-delete`);
          }}
          acaoDetalhar={(item) => {
            setItemDetalhe(item);
            abrirModal(`${entidade}-modal-info`);
          }}
          acaoEditar={(item) => {
            setItemDetalhe(item);
            abrirModal(`${entidade}-modal-form`);
          }}
          onAdd={() => {
            setItemDetalhe({});
            abrirModal(`${entidade}-modal-form`);
          }}
        />
      </div>
    </div>
  );
};

export default AreaDepartamento;
