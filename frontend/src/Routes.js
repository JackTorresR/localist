import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AcessoForm from "./views/acesso/AcessoForm";
import { acessoAutomatico, sairDoSistema } from "./database/dbAuth";
import { Toaster } from "react-hot-toast";
import BotaoVoltar from "./components/Botoes/BotaoVoltar";

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
    <div>
      <BotaoVoltar acaoCustomizada={() => sairDoSistema()} />
      <h2 style={{ marginLeft: 60 }}>Tela inicial</h2>
    </div>
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

  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          style: { maxWidth: "95%", fontSize: 20, wordBreak: "break-word" },
        }}
      />
      <Routes>
        <Route path="/" element={<RotaLoginOuTelaInicial />} />
        <Route
          path="/clientes"
          element={
            <RotaPrivativa>
              <div>
                <h2>Clientes</h2>
              </div>
            </RotaPrivativa>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
