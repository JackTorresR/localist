const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const identificarParametros = (props = {}) => {
  const { params, camposPermitidos } = props;

  let filtro = {};
  for (const item of camposPermitidos) {
    const { campo, tipo } = item;
    const valorCampo = params[campo];

    if (params[campo] !== undefined) {
      if (tipo === "NUMBER") {
        const valor = Number(valorCampo);
        if (!isNaN(valor)) {
          filtro[campo] = valor;
        } else {
          return res.status(400).json({
            erro: `'${valorCampo}' não é um número válido para '${campo}'.`,
          });
        }
      } else if (tipo === "BOOLEAN") {
        filtro[campo] = valorCampo.toUpperCase() === "SIM";
      } else if (tipo === "DATE") {
        const dataInicio = dayjs(valorCampo)
          .startOf("day")
          .tz("America/Fortaleza")
          .toISOString();
        const dataFim = dayjs(valorCampo)
          .endOf("day")
          .tz("America/Fortaleza")
          .toISOString();

        console.log("valorCampo", valorCampo);
        console.log("dataInicio", dataInicio);
        console.log("dataFim", dataFim);

        filtro[campo] = { $gte: dataInicio, $lt: dataFim };
      } else if (tipo === "REF") {
        filtro[campo] = valorCampo;
      } else {
        filtro[campo] = new RegExp(valorCampo, "i");
      }
    }
  }

  return filtro;
};

module.exports = { identificarParametros };
