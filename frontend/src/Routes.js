import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AcessoForm from "./views/acesso/AcessoForm";
import { acessoAutomatico } from "./database/dbAuth";
import { Toaster } from "react-hot-toast";
import Cliente from "./views/cliente/Cliente";
import MenuLateral from "./components/MenuLateral/MenuLateral";
import Usuario from "./views/usuario/Usuario";
import AreaDepartamento from "./views/areaDepartamento/AreaDepartamento";
import EspecieDocumental from "./views/especieDocumental/EspecieDocumental";
import CaixaArquivo from "./views/caixaArquivo/CaixaArquivo";
import AlterarSenhaForm from "./views/usuario/AlterarSenhaForm";
import MeuPerfil from "./views/usuario/MeuPerfil";
import Notificacao from "./views/notificacao/Notificacao";

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
  return token || localStorage.getItem("token") ? <Cliente /> : <AcessoForm />;
};

const Rotas = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await acessoAutomatico(dispatch);
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
    { caminho: "/usuario", componente: <Usuario /> },
    { caminho: "/area", componente: <AreaDepartamento /> },
    { caminho: "/especie-documental", componente: <EspecieDocumental /> },
    { caminho: "/caixa-arquivo", componente: <CaixaArquivo /> },
    { caminho: "/alterar-senha", componente: <AlterarSenhaForm /> },
    { caminho: "/meu-perfil", componente: <MeuPerfil /> },
    { caminho: "/notificacao", componente: <Notificacao /> },
  ];

  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          style: { maxWidth: "95%", fontSize: 20, wordBreak: "break-word" },
        }}
      />
      <MenuLateral />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<RotaLoginOuTelaInicial />} />
        {rotasExtras?.map((item, index) => (
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
