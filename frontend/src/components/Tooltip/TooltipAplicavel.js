import { Tooltip } from "@mui/material";

const TooltipAplicavel = (props = {}) => {
  const {
    titulo = "Clique aqui!",
    style = {},
    children = (
      <div>
        <h1>Vázio</h1>
      </div>
    ),
  } = props;

  return (
    <Tooltip
      title={<span style={{ fontSize: 13, lineHeight: 1.5 }}>{titulo}</span>}
      style={style}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipAplicavel;
