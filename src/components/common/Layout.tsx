import { Grid, SxProps } from "@mui/material";
import SectionHeader from "./SectionHeader";

interface LayoutProps {
  content: React.ReactNode;
  title: string;
  sx?: SxProps;
  mb?: string;
  sectionSubHeader?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  content,
  title,
  sx,
  mb = "0",
  sectionSubHeader,
}) => {
  return (
    <Grid container sx={sx}>
      <Grid item xs={12}>
        <SectionHeader title={title} mb={mb} />
        {sectionSubHeader}
      </Grid>
      {content}
    </Grid>
  );
};

export default Layout;
