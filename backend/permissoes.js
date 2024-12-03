const PERMISSOES = {
  // Usuário
  USUARIO_MENU: "Menu usuário",
  USUARIO_CRIAR: "Criar usuário",
  USUARIO_EDITAR: "Editar usuário",
  USUARIO_LISTAR: "Listar usuários",
  USUARIO_DELETAR: "Deletar usuário",
  USUARIO_ALTERAR_SENHA: "Alterar senha",

  // Cliente
  CLIENTE_MENU: "Menu cliente",
  CLIENTE_CRIAR: "Criar cliente",
  CLIENTE_EDITAR: "Editar cliente",
  CLIENTE_LISTAR: "Listar clientes",
  CLIENTE_DELETAR: "Deletar cliente",

  // Caixa de Arquivo
  CAIXA_ARQUIVO_MENU: "Menu caixa de arquivos",
  CAIXA_ARQUIVO_CRIAR: "Criar caixa de arquivos",
  CAIXA_ARQUIVO_EDITAR: "Editar caixa de arquivos",
  CAIXA_ARQUIVO_LISTAR: "Listar caixas de arquivos",
  CAIXA_ARQUIVO_DELETAR: "Deletar caixa de arquivos",
  CAIXA_ARQUIVO_DESCARTAR: "Descartar caixa de arquivos",

  // Área/Departamento
  AREA_DEPARTAMENTO_MENU: "Menu área/departamento",
  AREA_DEPARTAMENTO_CRIAR: "Criar área/departamento",
  AREA_DEPARTAMENTO_EDITAR: "Editar área/departamento",
  AREA_DEPARTAMENTO_LISTAR: "Listar áreas/departamentos",
  AREA_DEPARTAMENTO_DELETAR: "Deletar área/departamento",

  // Espécie Documental
  ESPECIE_DOCUMENTAL_MENU: "Menu espécie documental",
  ESPECIE_DOCUMENTAL_CRIAR: "Criar espécie documental",
  ESPECIE_DOCUMENTAL_EDITAR: "Editar espécie documental",
  ESPECIE_DOCUMENTAL_LISTAR: "Listar espécies documentais",
  ESPECIE_DOCUMENTAL_DELETAR: "Deletar espécie documental",
};

const perfil = {
  Administrativo: Object.keys(PERMISSOES),

  Operacional: [
    ...Object.keys(PERMISSOES).filter(
      (key) =>
        key.endsWith("_CRIAR") ||
        key.endsWith("_LISTAR") ||
        key.endsWith("_MENU")
    ),
    "USUARIO_ALTERAR_SENHA",
  ],

  Cliente: ["CAIXA_ARQUIVO_MENU", "CAIXA_ARQUIVO_LISTAR"],
};

module.exports = { PERMISSOES, perfil };
