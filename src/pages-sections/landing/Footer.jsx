import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import Youtube from "@mui/icons-material/YouTube";
import { Container } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Span } from "components/Typography";
const Footer = () => {
  return (
    <Container
      sx={{
        py: "4rem",
      }}
    >
      <FlexBox justifyContent="space-between" flexWrap="wrap">
        <FlexBox className="flex" alignItems="center">
          &copy; &nbsp;{" "}
          <Span color="#066344" fontWeight={700}>
            {" "}
            Grynd Tech Inc
          </Span>{" "}
          &nbsp;
          {new Date().getFullYear()}
        </FlexBox>

        <FlexBox className="flex">
          {iconList.map((item, ind) => (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer noopenner"
              key={ind}
            >
              <item.icon
                color="inherit"
                sx={{
                  mx: "0.5rem",
                  fontSize: "1.25rem",
                  transition: "0.2s ease-in-out",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              />
            </a>
          ))}
        </FlexBox>
      </FlexBox>
    </Container>
  );
};
const iconList = [
  {
    icon: Facebook,
    url: "https://www.facebook.com/UILibOfficial",
  },
  {
    icon: Twitter,
    url: "https://twitter.com/uilibofficial",
  },
  {
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/uilibofficial/",
  },
];
export default Footer;
