const Cliente = require("../models/cliente");
const { identificarParametros } = require("../utils");

const criarCliente = async (req, res) => {
  try {
    const {
      nome,
      nomeSemPontuacao,
      email,
      telefone,
      endereco,
      cpfCnpj,
      observacoes,
      dataContrato,
    } = req.body;

    if (!nome || !nomeSemPontuacao || !email) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando!" });
    }

    const novoCliente = new Cliente({
      nome,
      nomeSemPontuacao,
      email,
      telefone,
      endereco,
      cpfCnpj,
      observacoes,
      dataContrato,
    });

    await novoCliente.save();
    const { __v, ...retorno } = novoCliente.toObject();

    res
      .status(201)
      .json({ mensagem: "Cliente criado com sucesso!", cliente: retorno });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    if (error.code === 11000) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
    }
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const listarClientes = async (req, res) => {
  try {
    const { offset = 0, limit = 15, ...params } = req.query;
    const offsetInt = parseInt(offset, 10);
    const limitInt = parseInt(limit, 10);

    const camposPermitidos = [
      { campo: "nomeSemPontuacao" },
      { campo: "email" },
      { campo: "endereco" },
      { campo: "cpfCnpj" },
      { campo: "telefone" },
    ];

    const filtro = identificarParametros({ params, camposPermitidos });

    const quantidade = await Cliente.countDocuments(filtro);
    const lista = await Cliente.find(filtro, "-__v")
      .sort({ nomeSemPontuacao: 1 })
      .skip(offsetInt)
      .limit(limitInt);

    const resposta = { lista, quantidade };

    res.status(200).json(resposta);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const detalharCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findOne({ _id: id }, "-__v");
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Erro ao detalhar cliente:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const editarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacoes = req.body;

    const clienteAtualizado = await Cliente.findOneAndUpdate(
      { _id: id },
      atualizacoes,
      { new: true, runValidators: true }
    );

    if (!clienteAtualizado) {
      return res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }

    res.status(200).json({
      mensagem: "Cliente atualizado com sucesso!",
      cliente: clienteAtualizado,
    });
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const deletarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const clienteDeletado = await Cliente.findOneAndDelete({ _id: id });

    if (!clienteDeletado) {
      return res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }

    res.status(200).json({ mensagem: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = {
  criarCliente,
  listarClientes,
  detalharCliente,
  editarCliente,
  deletarCliente,
};
