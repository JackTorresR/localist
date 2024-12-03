import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AcessoForm from "./views/acesso/AcessoForm";
import { acessoAutomatico } from "./database/dbAuth";
import { Toaster } from "react-hot-toast";
import Usuario from "./views/usuario/Usuario";
import AreaDepartamento from "./views/areaDepartamento/AreaDepartamento";
import EspecieDocumental from "./views/especieDocumental/EspecieDocumental";
import CaixaArquivo from "./views/caixaArquivo/CaixaArquivo";
import AlterarSenhaForm from "./views/usuario/AlterarSenhaForm";
import MeuPerfil from "./views/usuario/MeuPerfil";
import Notificacao from "./views/notificacao/Notificacao";
import { getNotificacoes } from "./database/dbCaixaArquivo";
import NavbarCustom from "./components/Navbar/NavbarCustom";
import Cliente from "./views/cliente/Cliente";
import { checarPermissao, dadoExiste } from "./utils/utils";

const RotaPrivativa = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token || localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

const RotaLoginOuTelaInicial = () => {
  const token = useSelector((state) => state.auth.token);
  return token || localStorage.getItem("token") ? (
    <CaixaArquivo />
  ) : (
    <AcessoForm />
  );
};

const Rotas = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await acessoAutomatico(dispatch);
      await getNotificacoes();
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <h2>Carregando...</h2>
      </div>
    );
  }

  const rotasExtras = [
    {
      caminho: "/cliente",
      componente: <Cliente />,
      prefixoPermissao: "CLIENTE",
    },
    {
      caminho: "/usuario",
      componente: <Usuario />,
      prefixoPermissao: "USUARIO",
    },
    {
      caminho: "/area",
      componente: <AreaDepartamento />,
      prefixoPermissao: "AREA_DEPARTAMENTO",
    },
    {
      caminho: "/especie-documental",
      componente: <EspecieDocumental />,
      prefixoPermissao: "ESPECIE_DOCUMENTAL",
    },
    {
      caminho: "/caixa-arquivo",
      componente: <CaixaArquivo />,
      prefixoPermissao: "CAIXA_ARQUIVO",
    },
    {
      caminho: "/alterar-senha",
      componente: <AlterarSenhaForm />,
      permissao: "USUARIO_ALTERAR_SENHA",
    },
    { caminho: "/meu-perfil", componente: <MeuPerfil /> },
    { caminho: "/notificacao", componente: <Notificacao /> },
  ];

  const filtrarPermissao = (lista = []) => {
    const novaLista = lista?.filter((item) => {
      const naoTemPermissao =
        !dadoExiste(item?.permissao) && !dadoExiste(item?.prefixoPermissao);
      if (naoTemPermissao) return true;

      const permissao = item?.permissao || `${item?.prefixoPermissao}_MENU`;
      return checarPermissao(permissao);
    });

    return novaLista;
  };

  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          style: { maxWidth: "95%", fontSize: 20, wordBreak: "break-word" },
        }}
      />
      <NavbarCustom />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<RotaLoginOuTelaInicial />} />
        {filtrarPermissao(rotasExtras)?.map((item, index) => (
          <Route
            key={index}
            path={item?.caminho}
            element={<RotaPrivativa>{item?.componente}</RotaPrivativa>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
