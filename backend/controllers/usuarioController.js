const { CHAVE_SECRETA } = require("../config");
const Usuario = require("../models/usuario");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { identificarParametros } = require("../utils");
const path = require("path");
const fs = require("fs");

const obterArquivosPorUsuarioId = (id) => {
  try {
    const idString = id.toString();
    const uploadDir = path.join(__dirname, "../uploads/usuario", idString);

    if (!fs.existsSync(uploadDir)) {
      return [];
    }

    return fs.readdirSync(uploadDir);
  } catch (error) {
    console.error("Erro ao obter arquivos do usuário:", error);
    return [];
  }
};

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
    const { offset = 0, limite = 15, ...params } = req.query;

    const camposPermitidos = [
      { campo: "nomeSemPontuacao" },
      { campo: "usuario" },
      { campo: "email" },
      { campo: "matricula" },
      { campo: "funcao" },
      { campo: "telefone" },
      { campo: "perfilAcesso" },
    ];

    const filtro = identificarParametros({ params, camposPermitidos });

    const quantidade = await Usuario.countDocuments(filtro);
    const lista = await Usuario.find(filtro, "-senha")
      .sort({ nomeSemPontuacao: 1 })
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

    const imagens = obterArquivosPorUsuarioId(id);
    let retorno = { ...usuario.toObject(), imagens };
    delete retorno.senha;

    res.status(200).json(retorno);
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
      { _id: id },
      atualizacoes,
      { new: true, runValidators: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    const { senha: _, ...retorno } = usuarioAtualizado.toObject();

    const imagens = obterArquivosPorUsuarioId(id);

    let usuario = { ...retorno.toObject(), imagens };
    delete usuario.senha;

    res
      .status(200)
      .json({ mensagem: "Usuário atualizado com sucesso!", usuario });
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

    if (!usuarioEncontrado) {
      return res.status(401).json({ mensagem: "Informações incorretas!" });
    }

    const senhaHash = md5(senha);
    const senhaValida =
      senhaHash === usuarioEncontrado?.senha ||
      senha === usuarioEncontrado?.senha;

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Informações incorretas!" });
    }

    const objUsuario = {
      _id: usuarioEncontrado._id,
      nome: usuarioEncontrado.nome,
      usuario: usuarioEncontrado.usuario,
      matricula: usuarioEncontrado.matricula || "---",
      funcao: usuarioEncontrado.funcao || "---",
      telefone: usuarioEncontrado.telefone || "---",
      perfilAcesso: usuarioEncontrado.perfilAcesso || "---",
    };

    const imagens = obterArquivosPorUsuarioId(usuarioEncontrado._id);
    const dadosUsuario = { ...objUsuario, imagens };
    const token = jwt.sign(dadosUsuario, CHAVE_SECRETA, { expiresIn: "1h" });

    dadosUsuario.token = token;

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
    const { usuarioId, senhaAtual, novaSenha } = req.body;

    if (!usuarioId || !senhaAtual || !novaSenha) {
      return res.status(400).json({
        mensagem: "Usuário, senha atual e nova senha são obrigatórios!",
      });
    }

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    const senhaHash = md5(senhaAtual);
    const senhaValida =
      senhaHash === usuario?.senha || senhaAtual === usuario?.senha;

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha atual incorreta!" });
    }

    usuario.senha = md5(novaSenha);
    await usuario.save();

    res.status(200).json({ mensagem: "Senha alterada com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const autenticar = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ mensagem: "Token não fornecido!" });
    }

    const decoded = jwt.verify(token, CHAVE_SECRETA);
    const usuario = await Usuario.findById(decoded._id);

    if (!usuario) {
      return res.status(401).json({ mensagem: "Usuário não encontrado!" });
    }

    req.user = { id: usuario?._id?.toString(), nome: usuario.nome };
    next();
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(401).json({ mensagem: "Autenticação inválida!" });
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
  autenticar,
};
