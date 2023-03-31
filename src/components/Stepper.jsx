import { Fragment, useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";

// ========================================================

// ========================================================

const Stepper = ({ selectedStep = 1, stepperList, onChange }) => {
  const [selected, setSelected] = useState(selectedStep - 1);

  const handleStepClick = (step, ind) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(ind);
    }
  };
  useEffect(() => {
    setSelected(selectedStep - 1);
  }, [selectedStep]);

  return (
    <FlexRowCenter flexWrap="wrap" my="-4px">
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          <Chip
            disabled={step.disabled}
            label={`${ind + 1}. ${step.title}`}
            onClick={handleStepClick(step, ind)}
            sx={{
              backgroundColor: ind <= selected ? "#066344" : "#90EE90",
              color: ind <= selected ? "primary.contrastText" : "black",
              p: "0.5rem 1rem",
              fontSize: "14px",
              fontWeight: "600",
              my: "4px",
              "&:hover:not(:disabled)": {
                backgroundColor: "#808080",
                color: "primary.contrastText",
              },
            }}
          />
          {ind < stepperList.length - 1 && (
            <Box
              width="50px"
              height="4px"
              bgcolor={ind < selected ? "#066244" : "#90EE90"}
            />
          )}
        </Fragment>
      ))}
    </FlexRowCenter>
  );
};
export default Stepper;
