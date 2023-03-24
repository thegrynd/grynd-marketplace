import { Box, styled, useTheme } from "@mui/material";
import appIcons from "components/icons";
import Scrollbar from "components/Scrollbar";
import BazaarCard from "components/BazaarCard";
import { H3, H5, Span } from "components/Typography";
import Accordion from "components/accordion/Accordion";
import { FlexBetween, FlexBox } from "components/flex-box";
import AccordionHeader from "components/accordion/AccordionHeader";

const NavbarRoot = styled(BazaarCard)(({ isfixed, theme, sidebarstyle }) => ({
  height: "100%",
  boxShadow: "none",
  borderRadius: "8px",
  position: "relative",
  overflow: isfixed ? "auto" : "unset",
  "& .linkList": {
    transition: "all 0.2s",
    padding: "8px 20px",
  },
  background: "#066344",
  ...(sidebarstyle === "style2" && {
    height: "auto",
    paddingBottom: 10,
    backgroundColor: theme.palette.primary[50],
  }),
}));
const StyledList = styled(FlexBox)(({ theme }) => ({
  transition: "all 0.2s",
  padding: "4px 20px",
  alignItems: "center",
  "& .listCircle": {
    background: theme.palette.grey[600],
  },
  "&:hover": {
    "& .listCircle": {
      background: theme.palette.primary[300],
    },
  },
}));
const BorderBox = styled(FlexBetween)(({ theme, linestyle }) => ({
  marginTop: 5,
  marginBottom: 15,
  "& span": {
    width: "100%",
  },
  ...(linestyle === "dash" && {
    borderBottom: "2px",
    borderStyle: "none none dashed none",
    borderColor: theme.palette.primary.main,
    "& span": {
      display: "none",
    },
  }),
}));
const ColorBorder = styled(Span)(({ grey, theme }) => ({
  borderRadius: "2px 0 0 2px",
  width: "8px",
  height: grey ? "2px" : "3px",
  background: grey ? "green" : theme.palette.primary.main,
}));
const Circle = styled("span")({
  width: "4px",
  height: "4px",
  marginLeft: "2rem",
  marginRight: "8px",
  borderRadius: "3px",
});

// ==================================================================

// ==================================================================

const SideNavbar = (props) => {
  const {
    isFixed,
    navList,
    lineStyle,
    sidebarStyle,
    sidebarHeight,
    handleSelect = () => {},
    handleSelectSub = () => {},
  } = props;

  // const Icon = appIcons[item.icon];
  const { palette } = useTheme();

  const renderChild = (childList) => {
    return childList.map((item) => (
      <StyledList
        key={item._id}
        onClick={() => handleSelectSub(item._id)}
        sx={{
          color: "white",
          cursor: "pointer",
        }}
      >
        <Circle className="listCircle" />
        <Span py={0} flex="1 1 0">
          {item.name}
        </Span>
      </StyledList>
    ));
  };
  return (
    <Scrollbar
      autoHide={false}
      sx={{
        maxHeight: sidebarHeight,
      }}
    >
      <NavbarRoot isfixed={isFixed} sidebarstyle={sidebarStyle}>
        <Box>
          <Box padding="16px 20px 5px 20px">
            <H5 textTransform="uppercase">Select Product Based on Category</H5>

            <BorderBox linestyle={lineStyle}>
              <ColorBorder />
              <ColorBorder grey={1} />
            </BorderBox>
          </Box>

          {navList.map((item, ind) => {
            // const Icon = appIcons[item.icon];
            return (
              <Box mb="2px" color="grey.700" key={ind}>
                {item.subcategories?.length ? (
                  <Accordion>
                    <AccordionHeader
                      px={0}
                      py={0.75}
                      className="linkList"
                      sx={{
                        color: "white",
                        ":hover": {
                          color: palette.primary.main,
                        },
                      }}
                    >
                      <FlexBox gap={1.5} alignItems="center">
                        {/* <Icon fontSize="small" /> */}
                        <Span fontWeight="600">{item.name}</Span>
                      </FlexBox>
                    </AccordionHeader>

                    {item.subcategories.length
                      ? renderChild(item.subcategories)
                      : null}
                  </Accordion>
                ) : (
                  <Box
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    sx={{
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <FlexBox gap={1.5} className="linkList" py={0.75}>
                      {/* <Icon fontSize="small" /> */}
                      <Span fontWeight="600">{item.name}</Span>
                    </FlexBox>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </NavbarRoot>
    </Scrollbar>
  );
};
SideNavbar.defaultProps = {
  lineStyle: "solid",
  sidebarHeight: "auto",
  sidebarStyle: "style1",
};
export default SideNavbar;

{
  /* <Box sx={{ color: "white" }}>
  <Box padding="16px 20px 5px 20px">
    <H3>Tubers</H3>
    <BorderBox linestyle={lineStyle}>
      <ColorBorder />
      <ColorBorder grey={1} />
    </BorderBox>
  </Box> */
}
// <Box mb="2px" color="grey.700">
//   <Accordion>
//     <AccordionHeader
//       px={0}
//       py={0.75}
//       className="linkList"
//       sx={{
//         color: "white",
//         ":hover": {
//           color: palette.primary.main,
//         },
//       }}
//     >
//       <FlexBox gap={1.5} alignItems="center">
//         {/* <Icon fontSize="small" /> */}
//         <Span fontWeight="600" color="white">
//           Yam
//         </Span>
//       </FlexBox>
//     </AccordionHeader>
//     <StyledList
//       // onClick={() => handleSelect(item.title)}
//       sx={{
//         color: "red",
//         cursor: "pointer",
//       }}
//     >
//       <Span py={0.2} flex="1 1 0">
//       Abuja yam
//     </Span>
//   </StyledList>
// </Accordion>
// <Box
//   // key={item.title}
//   onClick={() => handleSelect}
//   sx={{
//     color: "grey.700",
//     cursor: "pointer",
//   }}
// >
//   <FlexBox gap={1.5} className="linkList" py={0.75}>
//     {/* <Icon fontSize="small" /> */}
//     <Span fontWeight="600" color="white">
//       Potato
//     </Span>
//   </FlexBox>
// </Box>
// <Box
// key={item.title}
//   onClick={() => handleSelect}
//   sx={{
//     color: "grey.700",
//     cursor: "pointer",
//   }}
// >
//       <FlexBox gap={1.5} className="linkList" py={0.75}>
//         {/* <Icon fontSize="small" /> */}
//         <Span fontWeight="600" color="white">
//           Potato
//         </Span>
//       </FlexBox>
//     </Box>
//   </Box>
// </Box>;
