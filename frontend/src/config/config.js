const { REACT_APP_ENV } = process.env;

const configs = {
  env: REACT_APP_ENV || "LOCAL",
  API_URL: "http://localhost:5160",
};

if (configs.env === "PRODUCAO") {
  configs.API_URL = "https://localist.nagelconsultoria.com.br:5161";
}

module.exports = configs;
