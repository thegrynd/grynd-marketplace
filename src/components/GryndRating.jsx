import { Rating } from "@mui/material";
import { compose, spacing, styled, typography } from "@mui/system";

const GryndRating = styled(Rating)(compose(spacing, typography));
GryndRating.defaultProps = {
  fontSize: "1.25rem",
};
export default GryndRating;
