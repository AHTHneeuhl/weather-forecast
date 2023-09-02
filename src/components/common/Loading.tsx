import { Box, BoxProps, CircularProgress } from "@mui/material";

interface LoadingProps extends BoxProps {
  children?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        ...rest,
      }}
    >
      <CircularProgress sx={{ color: "rgba(255,255,255, .8)" }} />
      {children}
    </Box>
  );
};

export default Loading;
