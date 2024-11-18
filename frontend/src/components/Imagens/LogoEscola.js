import Logo from "../../assets/Logo.png";
import Estilos from "../../styles/Styles";

const LogoEscola = (props = {}) => {
  return (
    <div
      style={{
        ...Estilos.sombraContainer,
        marginTop: -40,
        alignSelf: "center",
        marginBottom: 20,
        width: "80%",
        background: "linear-gradient(to right, #FCB100, #FFE680)",
        borderRadius: 25,
        overflow: "hidden",
        ...props?.style,
      }}
    >
      <img
        src={Logo}
        width={150}
        style={{
          objectFit: "contain",
          borderWidth: 10,
        }}
        alt="Logo da escola"
      />
    </div>
  );
};

export default LogoEscola;
