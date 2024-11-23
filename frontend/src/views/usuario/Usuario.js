import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import {
  getUsuarios,
  removerUsuario,
  salvarUsuario,
} from "../../database/dbUsuario";
import { useState } from "react";
import { normalizarTelefone } from "../../utils/utils";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import InfoModal from "../../components/Modal/InfoModal";
import FormModal from "../../components/Modal/FormModal";

const Usuario = () => {
  const usuarios = useSelector((state) => state?.usuario);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const campos = [
    {
      tamanhoGrid: { md: 12 },
      label: "Nome completo",
      name: "nome",
      obrigatorio: true,
      filtravel: false,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Nome sem pontuação",
      name: "nomeSemPontuacao",
      mostrarFormulario: false,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Nome de usuário",
      name: "usuario",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Senha",
      name: "senha",
      tipo: "password",
      obrigatorio: true,
      filtravel: false,
      editavel: false,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Email",
      name: "email",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Matrícula",
      name: "matricula",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Função",
      name: "funcao",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Telefone",
      name: "telefone",
      mask: "telefone",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Perfil de acesso",
      name: "perfilAcesso",
      tipo: "select",
      selectItems: [
        { label: "Administrativo", value: "Administrativo" },
        { label: "Operacional", value: "Operacional" },
      ],
    },
  ];

  const handleSubmit = (dados) => {
    salvarUsuario(dados);
    setItemDetalhe({});
  };

  const propsComponentes = { campos, itemDetalhe, entidade: "usuario" };

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <FormModal
          {...propsComponentes}
          onSubmit={handleSubmit}
          onClose={() => setItemDetalhe({})}
        />
        <InfoModal {...propsComponentes} titulo="Informações do usuário" />
        <ConfirmarAcaoModal
          {...propsComponentes}
          acao={() => removerUsuario(itemDetalhe?._id)}
        />
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...usuarios}
          titulo="Usuários"
          colunas={[
            { name: "Matrícula", value: "matricula" },
            { name: "Nome", value: "nome" },
            { name: "Email", value: "email" },
            { name: "Função", value: "funcao" },
            {
              name: "Telefone",
              value: "telefone",
              formatar: (v) => normalizarTelefone(v),
            },
            { name: "Perfil", value: "perfilAcesso" },
          ]}
          acao={getUsuarios}
          camposFiltro={campos}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
          acaoRemover={(item) => {
            setItemDetalhe(item);
            abrirModal("usuario-modal-delete");
          }}
          acaoDetalhar={(item) => {
            setItemDetalhe(item);
            abrirModal("usuario-modal-info");
          }}
          acaoEditar={(item) => {
            setItemDetalhe(item);
            abrirModal("usuario-modal-form");
          }}
          onAdd={() => {
            setItemDetalhe({});
            abrirModal("usuario-modal-form");
          }}
        />
      </div>
    </div>
  );
};

export default Usuario;
