import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getUsuarios } from "../../database/dbUsuario";
import UsuarioModalForm from "./UsuarioModalForm";
import { useState } from "react";
import { normalizarTelefone } from "../../utils/utils";

const Usuario = () => {
  const usuarios = useSelector((state) => state?.usuario);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const camposFiltro = [
    {
      tamanhoGrid: { md: 12 },
      label: "Nome completo",
      name: "nomeSemPontuacao",
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Nome de usuário",
      name: "usuario",
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Email",
      name: "email",
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

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <UsuarioModalForm itemDetalhe={itemDetalhe} />
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...usuarios}
          titulo="Usuários"
          colunas={[
            { nome: "Matrícula", valor: "matricula" },
            { nome: "Nome", valor: "nome" },
            { nome: "Email", valor: "email" },
            { nome: "Função", valor: "funcao" },
            {
              nome: "Telefone",
              valor: "telefone",
              formato: (v) => normalizarTelefone(v),
            },
            { nome: "Perfil", valor: "perfilAcesso" },
          ]}
          acao={getUsuarios}
          camposFiltro={camposFiltro}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
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
