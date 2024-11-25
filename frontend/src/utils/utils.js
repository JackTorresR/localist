import Store from "../redux/Store";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.locale("pt-br");

export const dispatcher = (type, payload) => Store.dispatch({ type, payload });

const diasDaSemana = {
  sunday: "Domingo",
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
};

export const obterDiaDaSemanaEmPortugues = (diaEmIngles) => {
  return diasDaSemana[diaEmIngles.toLowerCase()] || diaEmIngles;
};

export const dadoExiste = (dado) => {
  if (typeof dado === "string") {
    const dadoValido =
      dado !== "" &&
      dado?.trim() !== "" &&
      dado?.trim() !== "---" &&
      dado?.toUpperCase() !== "NÃO INFORMADO" &&
      dado?.toUpperCase() !== "NAO INFORMADO" &&
      dado?.toUpperCase() !== "NI" &&
      dado?.toUpperCase() !== "NULL" &&
      dado?.toUpperCase() !== "R$ 0,00" &&
      dado?.toUpperCase() !== "R$ 0.00" &&
      dado?.toUpperCase() !== "R$0.00" &&
      dado?.toUpperCase() !== "R$0,00" &&
      dado?.toUpperCase() !== "R$,00";

    if (dadoValido) return true;
    else return false;
  }
  if (dado !== undefined && dado != null) return true;
  return false;
};

export const limparPontuacaoTexto = (texto) =>
  texto?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");

export const gerarNomeSemPontuacao = (texto) =>
  limparPontuacaoTexto(texto)?.toString()?.trim()?.toUpperCase();

export const gerarStringAleatoria = (tamanho = 6) => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  for (let i = 0; i < tamanho; i++) {
    resultado += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return resultado;
};

export const normalizarDocumento = (documento = "") =>
  documento?.length === 11
    ? documento
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    : documento?.length === 14
    ? documento
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    : "Documento não é válido!";

export const normalizarTelefone = (telefone = "") =>
  telefone?.length === 11
    ? telefone.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    : telefone?.length === 10
    ? telefone.replace(/\D/g, "").replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    : dadoExiste(telefone)
    ? telefone
    : "Telefone não é válido!";

export const normalizarData = (data, formato = "DD/MM/YYYY") =>
  dayjs(data).tz("America/Sao_Paulo").format(formato);

export const mascaras = {
  cpf: "###.###.###-###",
  cnpj: "##.###.###/####-##",
  telefone: "(##) # ####-####",
};

export const separarPrimeiroNome = (nome = "") =>
  nome?.toString()?.trim()?.split(" ")?.[0];

export const calcularTempo = (item = {}) => {
  const { retencao, tipoRetencao } = item;

  if (!retencao || !tipoRetencao) return "Dados insuficientes";

  let dias;
  switch (tipoRetencao) {
    case "Ano":
      dias = retencao * 365;
      break;
    case "Mês":
      dias = retencao * 30;
      break;
    case "Dia":
      dias = retencao;
      break;
    default:
      return "Tipo de retenção inválido";
  }

  const anos = Math.floor(dias / 365);
  dias %= 365;

  const meses = Math.floor(dias / 30);
  dias %= 30;

  let resultado = [];
  if (anos > 0) resultado.push(`${anos} Ano${anos > 1 ? "s" : ""}`);
  if (meses > 0) resultado.push(`${meses} M${meses > 1 ? "eses" : "ês"}`);
  if (dias > 0) resultado.push(`${dias} Dia${dias > 1 ? "s" : ""}`);

  if (resultado.length > 1) {
    return (
      resultado.slice(0, -1).join(", ") +
      " e " +
      resultado[resultado.length - 1]
    );
  }

  return resultado.length ? resultado.join("") : "0 Dia";
};
