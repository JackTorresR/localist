const CaixaArquivo = require("../models/caixaArquivo");
const EspecieDocumental = require("../models/especieDocumental");
const Cliente = require("../models/cliente");

const criarCaixaArquivo = async (req, res) => {
  try {
    const {
      idCliente,
      idEspecieDocumental,
      anoDocumentos,
      dataArmazenamento,
      dataExpiracao,
      situacao,
      observacoes,
    } = req.body;

    if (
      !idCliente ||
      !idEspecieDocumental ||
      !anoDocumentos ||
      !dataArmazenamento ||
      !dataExpiracao ||
      !situacao
    ) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando!" });
    }

    const novaCaixaArquivo = new CaixaArquivo({
      idCliente,
      idEspecieDocumental,
      anoDocumentos,
      dataArmazenamento,
      dataExpiracao,
      situacao,
      observacoes,
    });

    await novaCaixaArquivo.save();
    const { __v, ...retorno } = novaCaixaArquivo.toObject();

    res.status(201).json({
      mensagem: "Caixa de arquivo criada com sucesso!",
      caixaArquivo: retorno,
    });
  } catch (error) {
    console.error("Erro ao criar caixa de arquivo:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const listarCaixasArquivos = async (req, res) => {
  try {
    const { offset = 0, limit = 15, ...params } = req.query;
    const offsetInt = parseInt(offset, 10);
    const limitInt = parseInt(limit, 10);

    const camposPermitidos = ["situacao"];

    const filtro = {};
    for (const key of camposPermitidos) {
      if (params[key] !== undefined) {
        filtro[key] = new RegExp(params[key], "i");
      }
    }

    const quantidade = await CaixaArquivo.countDocuments(filtro);
    const lista = await CaixaArquivo.find(filtro, "-__v")
      .skip(offsetInt)
      .limit(limitInt);

    const listaComDetalhes = await Promise.all(
      lista.map(async (caixa) => {
        const cliente = caixa?.idCliente
          ? await Cliente.findById(caixa.idCliente).select("nome")
          : null;
        const especieDocumental = caixa?.idEspecieDocumental
          ? await EspecieDocumental.findById(caixa.idEspecieDocumental).select(
              "nome"
            )
          : null;

        return {
          ...caixa.toObject(),
          nomeCliente: cliente ? cliente.nome : null,
          nomeEspecieDocumental: especieDocumental
            ? especieDocumental.nome
            : null,
        };
      })
    );

    res.status(200).json({ lista: listaComDetalhes, quantidade });
  } catch (error) {
    console.error("Erro ao listar caixas de arquivo:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const detalharCaixaArquivo = async (req, res) => {
  try {
    const { id } = req.params;
    const caixaArquivo = await CaixaArquivo.findOne({ _id: id }, "-__v");
    if (!caixaArquivo) {
      return res
        .status(404)
        .json({ mensagem: "Caixa de arquivo não encontrado!" });
    }
    res.status(200).json(caixaArquivo);
  } catch (error) {
    console.error("Erro ao detalhar caixa de arquivo:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const editarCaixaArquivo = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacoes = req.body;

    const caixaArquivoAtualizado = await CaixaArquivo.findOneAndUpdate(
      { _id: id },
      atualizacoes,
      { new: true, runValidators: true }
    );

    if (!caixaArquivoAtualizado) {
      return res
        .status(404)
        .json({ mensagem: "Caixa de arquivo não encontrado!" });
    }

    res.status(200).json({
      mensagem: "Caixa de arquivo atualizado com sucesso!",
      caixaArquivo: caixaArquivoAtualizado,
    });
  } catch (error) {
    console.error("Erro ao editar caixa de arquivo:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const deletarCaixaArquivo = async (req, res) => {
  try {
    const { id } = req.params;

    const caixaArquivoDeletado = await CaixaArquivo.findOneAndDelete({
      _id: id,
    });

    if (!caixaArquivoDeletado) {
      return res
        .status(404)
        .json({ mensagem: "Caixa de arquivo não encontrado!" });
    }

    res
      .status(200)
      .json({ mensagem: "Caixa de arquivo deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar caixa de arquivo:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = {
  criarCaixaArquivo,
  listarCaixasArquivos,
  detalharCaixaArquivo,
  editarCaixaArquivo,
  deletarCaixaArquivo,
};
