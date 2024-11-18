import { Box} from "@mui/material";
import { useRef} from "react";
import { salvarImagem } from "../../database/dbFuncionario";
import CORES from "../../styles/Cores";
import { FaCamera } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import BotaoComHover from "../Botoes/BotaoComHover";

const RegistrarFoto = ({ aoDesligarCamera, videoRef }) => {
  const canvasRef = useRef(null);

  const desativarCamera = () => {
    videoRef?.current?.srcObject
      ?.getTracks()
      ?.forEach((track) => track?.stop());
    aoDesligarCamera();
  };

  const capturarFoto = () => {
    const larguraDiv = videoRef.current.clientWidth;
    const alturaDiv = videoRef.current.clientHeight;

    canvasRef.current.width = larguraDiv;
    canvasRef.current.height = alturaDiv;

    const contexto = canvasRef.current.getContext("2d");
    contexto.drawImage(videoRef.current, 0, 0, larguraDiv, alturaDiv);

    canvasRef.current.toBlob(async (blob) => {
      const timestamp = Date.now();
      const arquivoFoto = new File([blob], `foto-capturada-${timestamp}.jpg`, {
        type: "image/jpeg",
      });

      const eventoMock = { target: { files: [arquivoFoto] } };
      await salvarImagem(eventoMock);

      desativarCamera();
    });
  };

  return (
    <Box
      sx={{
        background: CORES.CINZA_CLARO,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        p: 1,
      }}
    >
      <video ref={videoRef} style={{ width: "100%", height: "auto" }}></video>
      <Box
        sx={{
          display: "flex",
          p: 3,
          gap: 4,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BotaoComHover
          fullWidth
          sx={{
            backgroundColor: CORES.VERMELHO_ESCURO,
            flex: 1,
          }}
          onClick={() => desativarCamera()}
        >
          {" "}
          <MdCancel size={50} color={CORES.BRANCO} />
        </BotaoComHover>
        <BotaoComHover
          fullWidth
          sx={{ backgroundColor: CORES.VERDE_ESCURO, flex: 1 }}
          onClick={capturarFoto}
        >
          <FaCamera size={50} color={CORES.BRANCO} />
        </BotaoComHover>
      </Box>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Box>
  );
};

export default RegistrarFoto;
