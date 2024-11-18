import Store from "../redux/Store";

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

export const normalizarCPF = (cpf = "") =>
  dadoExiste(cpf)
    ? cpf?.length === 11
      ? cpf
          ?.replace(/\D/g, "")
          ?.replace(/(\d{5}|\d{0,5})(\d{3})(\d{3})(\d{2})/, "XXX.XX$2.$3-$4")
      : "CPF não é válido!"
    : "Não informado";

export const mascaras = { cpf: "###.###.###-##" };

export const separarPrimeiroNome = (nome = "") =>
  nome?.toString()?.trim()?.split(" ")?.[0];
