import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const ButtonLeftNavbar = ({ item, extraConfig, ix }) => {
  const handleNavItemClick = (item) => {
    item?.acao(item);
  };

  return (
    <ListItem key={`${ix}_navBar_drawer`} disablePadding>
      <ListItemButton
        sx={{ textAlign: "left", ...extraConfig?.sx, ...extraConfig?.style }}
        onClick={() => handleNavItemClick(item)}
      >
        <ListItemText primary={item?.nome} />
      </ListItemButton>
    </ListItem>
  );
};

export default ButtonLeftNavbar;
