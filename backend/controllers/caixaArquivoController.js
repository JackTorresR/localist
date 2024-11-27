const CaixaArquivo = require("../models/caixaArquivo");
const EspecieDocumental = require("../models/especieDocumental");
const Cliente = require("../models/cliente");
const { identificarParametros } = require("../utils");
const dayjs = require("dayjs");

const criarCaixaArquivo = async (req, res) => {
  try {
    const {
      identificador,
      localizacao,
      idCliente,
      idEspecieDocumental,
      anoDocumentos,
      dataArmazenamento,
      dataExpiracao,
      situacao,
      observacoes,
    } = req.body;

    const algumCamposVazios =
      !identificador ||
      !localizacao ||
      !idCliente ||
      !idEspecieDocumental ||
      !anoDocumentos ||
      !dataArmazenamento ||
      !dataExpiracao ||
      !situacao;

    if (algumCamposVazios) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando!" });
    }

    const dataExpiracaoUTC = dayjs(dataExpiracao).startOf("day").toISOString();
    const dataArmazenamentoUTC = dayjs(dataArmazenamento)
      .startOf("day")
      .toISOString();

    const novaCaixaArquivo = new CaixaArquivo({
      identificador,
      localizacao,
      idCliente,
      idEspecieDocumental,
      anoDocumentos,
      dataArmazenamento: dataArmazenamentoUTC,
      dataExpiracao: dataExpiracaoUTC,
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

    const camposPermitidos = [
      { campo: "identificador" },
      { campo: "anoDocumentos" },
      { campo: "localizacao" },
      { campo: "idCliente", tipo: "REF" },
      { campo: "idEspecieDocumental", tipo: "REF" },
      { campo: "dataArmazenamento", tipo: "DATE" },
      { campo: "dataExpiracao", tipo: "DATE" },
      { campo: "situacao" },
    ];

    const filtro = identificarParametros({ params, camposPermitidos });

    const quantidade = await CaixaArquivo.countDocuments(filtro);
    const lista = await CaixaArquivo.find(filtro, "-__v")
      .sort({ dataExpiracao: 1 })
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

    const dataExpiracaoUTC = dayjs(atualizacoes?.dataExpiracao)
      .startOf("day")
      .toISOString();
    const dataArmazenamentoUTC = dayjs(atualizacoes?.dataArmazenamento)
      .startOf("day")
      .toISOString();

    const caixaArquivoAtualizado = await CaixaArquivo.findOneAndUpdate(
      { _id: id },
      {
        ...atualizacoes,
        dataArmazenamento: dataArmazenamentoUTC,
        dataExpiracao: dataExpiracaoUTC,
      },
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

const atualizarSituacaoCaixas = async () => {
  try {
    const dataAtual = dayjs().toISOString();
    const caixasParaAtualizar = await CaixaArquivo.find({
      situacao: "Em Prazo",
      dataExpiracao: { $lt: dataAtual },
    });

    if (caixasParaAtualizar.length > 0) {
      const idsAtualizar = caixasParaAtualizar.map((caixa) => caixa._id);
      await CaixaArquivo.updateMany(
        { _id: { $in: idsAtualizar } },
        { $set: { situacao: "Aguardando descarte" } }
      );
      console.info(
        `${caixasParaAtualizar.length} caixas de arquivo atualizadas para "Aguardando descarte"!`
      );
    } else {
      console.info("Nenhuma caixa de arquivo necessita atualização!");
    }
  } catch (error) {
    console.error("Erro ao atualizar situação das caixas de arquivo:", error);
  }
};

const descartarCaixaArquivo = async (req, res) => {
  try {
    const { id } = req.params;
    const idUsuario = req.user?.id;

    if (!idUsuario) {
      return res.status(403).json({ mensagem: "Usuário não autenticado!" });
    }

    if (!id) {
      return res
        .status(400)
        .json({ mensagem: "Caixa de arquivo não informada!" });
    }

    const dataAtual = dayjs().toISOString();
    const caixaAtualizada = await CaixaArquivo.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          situacao: "Descartado",
          idUsuarioDescarte: idUsuario,
          dataDescarte: dataAtual,
        },
      },
      { new: true }
    );

    if (!caixaAtualizada) {
      return res.status(404).json({
        mensagem: "Caixa de arquivo não encontrada!",
      });
    }

    res
      .status(200)
      .json({ mensagem: "Caixa de arquivo descartada com sucesso!" });
  } catch (error) {
    console.error("Erro ao descartar caixa de arquivo:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = {
  criarCaixaArquivo,
  listarCaixasArquivos,
  detalharCaixaArquivo,
  editarCaixaArquivo,
  deletarCaixaArquivo,
  atualizarSituacaoCaixas,
  descartarCaixaArquivo,
};
