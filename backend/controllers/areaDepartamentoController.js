const AreaDepartamento = require("../models/areaDepartamento");
const Cliente = require("../models/cliente");

const criarAreaDepartamento = async (req, res) => {
  try {
    const {
      idCliente,
      tipo,
      nome,
      descricao,
      responsavel,
      status,
      codigoArea,
    } = req.body;

    if (!idCliente || !tipo || !nome) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando!" });
    }

    const novaAreaDepartamento = new AreaDepartamento({
      idCliente,
      tipo,
      nome,
      descricao,
      responsavel,
      status,
      codigoArea,
    });

    await novaAreaDepartamento.save();

    res.status(201).json({
      mensagem: "Área/Departamento criado com sucesso!",
      areaDepartamento: novaAreaDepartamento,
    });
  } catch (error) {
    console.error("Erro ao criar Área/Departamento:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const listarAreasDepartamentos = async (req, res) => {
  try {
    const { offset = 0, limite = 15 } = req.query;

    const quantidade = await AreaDepartamento.countDocuments();
    const lista = await AreaDepartamento.find()
      .sort({ nomeSemPontuacao: 1 })
      .skip(parseInt(offset))
      .limit(parseInt(limite));

    const listaComNomeCliente = await Promise.all(
      lista.map(async (area) => {
        if (!area?.idCliente) return area.toObject();

        const cliente = await Cliente.findById(area?.idCliente);
        return {
          ...area.toObject(),
          nomeCliente: cliente ? cliente?.nome : null,
        };
      })
    );

    res.status(200).json({ lista: listaComNomeCliente, quantidade });
  } catch (error) {
    console.error("Erro ao listar Áreas/Departamentos:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const detalharAreaDepartamento = async (req, res) => {
  try {
    const { id } = req.params;

    const areaDepartamento = await AreaDepartamento.findById(id)
      .populate("idCliente", "nome")
      .populate("responsavel", "nome");

    if (!areaDepartamento) {
      return res
        .status(404)
        .json({ mensagem: "Área/Departamento não encontrado!" });
    }

    res.status(200).json(areaDepartamento);
  } catch (error) {
    console.error("Erro ao detalhar Área/Departamento:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const editarAreaDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacoes = req.body;

    const areaDepartamentoAtualizado = await AreaDepartamento.findByIdAndUpdate(
      id,
      atualizacoes,
      { new: true, runValidators: true }
    );

    if (!areaDepartamentoAtualizado) {
      return res
        .status(404)
        .json({ mensagem: "Área/Departamento não encontrado!" });
    }

    res.status(200).json({
      mensagem: "Área/Departamento atualizado com sucesso!",
      areaDepartamento: areaDepartamentoAtualizado,
    });
  } catch (error) {
    console.error("Erro ao editar Área/Departamento:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const deletarAreaDepartamento = async (req, res) => {
  try {
    const { id } = req.params;

    const areaDepartamento = await AreaDepartamento.findByIdAndDelete(id);

    if (!areaDepartamento) {
      return res
        .status(404)
        .json({ mensagem: "Área/Departamento não encontrado!" });
    }

    res
      .status(200)
      .json({ mensagem: "Área/Departamento deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar Área/Departamento:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = {
  criarAreaDepartamento,
  listarAreasDepartamentos,
  detalharAreaDepartamento,
  editarAreaDepartamento,
  deletarAreaDepartamento,
};