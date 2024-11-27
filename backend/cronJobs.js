const cron = require("node-cron");
const {
  atualizarSituacaoCaixas,
} = require("./controllers/caixaArquivoController");

const comprimentoTotal = 50;
const criarTituloEstilizado = (titulo) => {
  const comprimentoTitulo = titulo.length;
  const quantidadeDeTracos = (comprimentoTotal - comprimentoTitulo) / 2;
  const tracos = "-".repeat(quantidadeDeTracos);
  const linhaSuperior = tracos + titulo + tracos;
  const tracosInferiores = "-".repeat(comprimentoTotal - linhaSuperior.length);
  return `\n${linhaSuperior}${tracosInferiores}`;
};

const situacoesCaixas = () => {
  const titulo = "SITUAÇÕES CAIXAS";
  let mensagemExecucao = "\n";
  mensagemExecucao += criarTituloEstilizado(titulo);

  (async () => {
    console.info(mensagemExecucao);
    await atualizarSituacaoCaixas();
    console.info("-".repeat(comprimentoTotal));
  })();

  cron.schedule("1 0 * * *", async () => {
    console.info(mensagemExecucao);
    await atualizarSituacaoCaixas();
    console.info("-".repeat(comprimentoTotal));
  });
};

const cronJobs = () => {
  situacoesCaixas();
};

module.exports = cronJobs;
