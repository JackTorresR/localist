const { CHAVE_SECRETA } = require("../config");
const Usuario = require("../models/usuario");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const criarUsuario = async (req, res) => {
  try {
    const {
      nome,
      nomeSemPontuacao,
      email,
      usuario,
      senha,
      telefone,
      perfilAcesso,
    } = req.body;

    if (!nome || !email || !usuario || !senha || !perfilAcesso) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando!" });
    }

    const senhaCriptografada = md5(senha);

    const novoUsuario = new Usuario({
      nome,
      nomeSemPontuacao,
      email,
      usuario,
      senha: senhaCriptografada,
      telefone,
      perfilAcesso,
    });

    await novoUsuario.save();

    const { senha: _, ...retorno } = novoUsuario.toObject();

    res
      .status(201)
      .json({ mensagem: "Usuário criado com sucesso!", usuario: retorno });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ mensagem: "E-mail ou Usuário já cadastrado!" });
    }
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const { offset = 0, limite = 10 } = req.query;

    const quantidade = await Usuario.countDocuments();
    const lista = await Usuario.find({}, "-senha")
      .skip(parseInt(offset))
      .limit(parseInt(limite));

    res.status(200).json({ lista, quantidade });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const detalharUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findOne({ id }, "-senha");
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao detalhar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { senha, ...atualizacoes } = req.body;

    if (senha) {
      atualizacoes.senha = md5(senha);
    }

    const usuarioAtualizado = await Usuario.findOneAndUpdate(
      { id },
      atualizacoes,
      { new: true, runValidators: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    const { senha: _, ...retorno } = usuarioAtualizado.toObject();

    res
      .status(200)
      .json({ mensagem: "Usuário atualizado com sucesso!", usuario: retorno });
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findOneAndDelete({ id });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const acessarSistema = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e senha são obrigatórios!" });
    }

    const usuarioEncontrado = await Usuario.findOne({ usuario });

    const senhaHash = md5(senha);
    const senhaValida =
      senhaHash === usuarioEncontrado?.senha ||
      senha === usuarioEncontrado?.senha;

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Informações incorretas!" });
    }

    const token = jwt.sign(
      { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario },
      CHAVE_SECRETA,
      { expiresIn: "1h" }
    );

    const dadosUsuario = {
      token,
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      usuario: usuarioEncontrado.usuario,
    };

    res.status(200).json({ mensagem: "Acesso autorizado!", dadosUsuario });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const validarAcesso = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não fornecido!" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, CHAVE_SECRETA, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido!" });
    }

    return res
      .status(200)
      .json({ mensagem: "Acesso autorizado!", usuario: decoded });
  });
};

const editarSenha = async (req, res) => {
  try {
    const { id, novaSenha } = req.query;

    if (!id || !novaSenha || novaSenha.trim().length < 6) {
      return res.status(400).json({
        mensagem:
          "O ID e a nova senha são obrigatórios e a senha deve ter pelo menos 6 caracteres!",
      });
    }

    const usuario = await Usuario.findOne({ id });

    if (!usuario || !usuario.ativo) {
      return res
        .status(404)
        .json({ mensagem: "Usuário não encontrado ou inativo!" });
    }

    const senhaHash = md5(novaSenha);
    usuario.senha = senhaHash;

    await usuario.save();

    res.status(200).json({ mensagem: "Senha atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  detalharUsuario,
  editarUsuario,
  deletarUsuario,
  acessarSistema,
  validarAcesso,
  editarSenha,
};
