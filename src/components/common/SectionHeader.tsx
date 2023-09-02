import { Typography, TypographyProps } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  mb?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  mb = "1rem",
}) => {
  const typographyProps: TypographyProps = {
    variant: "h5",
    component: "h5",
    sx: {
      fontSize: { xs: "12px", sm: "16px", md: "18px" },
      color: "rgba(255,255,255,.7)",
      fontWeight: "600",
      lineHeight: 1,
      textAlign: "center",
      fontFamily: "Roboto Condensed",
      marginBottom: mb,
    },
  };

  return <Typography {...typographyProps}>{title}</Typography>;
};

export default SectionHeader;
