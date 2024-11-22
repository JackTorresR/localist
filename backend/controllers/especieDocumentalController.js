const EspecieDocumental = require("../models/especieDocumental");
const AreaDepartamento = require("../models/areaDepartamento");

const criarEspecieDocumental = async (req, res) => {
  try {
    const {
      nome,
      nomeSemPontuacao,
      descricao,
      retencao,
      tipoRetencao,
      categoria,
      idAreaDepartamento,
    } = req.body;

    const camposNaoPreenchidos =
      !nome ||
      !nomeSemPontuacao ||
      !retencao ||
      !tipoRetencao ||
      !categoria ||
      !idAreaDepartamento;

    if (camposNaoPreenchidos) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando!" });
    }

    const novaEspecieDocumental = new EspecieDocumental({
      nome,
      nomeSemPontuacao,
      descricao,
      retencao,
      tipoRetencao,
      categoria,
      idAreaDepartamento,
    });

    await novaEspecieDocumental.save();

    res.status(201).json({
      mensagem: "Espécie Documental criada com sucesso!",
      especieDocumental: novaEspecieDocumental,
    });
  } catch (error) {
    console.error("Erro ao criar Espécie Documental:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const listarEspeciesDocumentais = async (req, res) => {
  try {
    const { offset = 0, limite = 15 } = req.query;

    const quantidade = await EspecieDocumental.countDocuments();
    const lista = await EspecieDocumental.find()
      .sort({ nomeSemPontuacao: 1 })
      .skip(parseInt(offset))
      .limit(parseInt(limite));

    const listaComNomeAreaDepartamento = await Promise.all(
      lista.map(async (especie) => {
        if (!especie?.idAreaDepartamento) return especie.toObject();

        const areaDepartamento = await AreaDepartamento.findById(
          especie?.idAreaDepartamento
        );
        return {
          ...especie.toObject(),
          nomeAreaDepartamento: areaDepartamento
            ? areaDepartamento?.nome
            : null,
          idAreaDepartamento: areaDepartamento ? areaDepartamento?._id : null,
        };
      })
    );

    res.status(200).json({ lista: listaComNomeAreaDepartamento, quantidade });
  } catch (error) {
    console.error("Erro ao listar Espécies Documentais:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const detalharEspecieDocumental = async (req, res) => {
  try {
    const { id } = req.params;

    const especieDocumental = await EspecieDocumental.findById(id);

    if (!especieDocumental) {
      return res
        .status(404)
        .json({ mensagem: "Espécie Documental não encontrada!" });
    }

    res.status(200).json(especieDocumental);
  } catch (error) {
    console.error("Erro ao detalhar Espécie Documental:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const editarEspecieDocumental = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacoes = req.body;

    const especieDocumentalAtualizado =
      await EspecieDocumental.findByIdAndUpdate(id, atualizacoes, {
        new: true,
        runValidators: true,
      });

    if (!especieDocumentalAtualizado) {
      return res
        .status(404)
        .json({ mensagem: "Espécie Documental não encontrada!" });
    }

    res.status(200).json({
      mensagem: "Espécie Documental atualizada com sucesso!",
      especieDocumental: especieDocumentalAtualizado,
    });
  } catch (error) {
    console.error("Erro ao editar Espécie Documental:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const deletarEspecieDocumental = async (req, res) => {
  try {
    const { id } = req.params;

    const especieDocumental = await EspecieDocumental.findByIdAndDelete(id);

    if (!especieDocumental) {
      return res
        .status(404)
        .json({ mensagem: "Espécie Documental não encontrada!" });
    }

    res
      .status(200)
      .json({ mensagem: "Espécie Documental deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar Espécie Documental:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = {
  criarEspecieDocumental,
  listarEspeciesDocumentais,
  detalharEspecieDocumental,
  editarEspecieDocumental,
  deletarEspecieDocumental,
};
