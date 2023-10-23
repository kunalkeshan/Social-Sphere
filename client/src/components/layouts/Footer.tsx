/**
 * Footer Component
 */

// Dependencies
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box className="w-full my-6" component={"footer"}>
      <Box
        component={"p"}
        sx={{ maxWidth: "xl" }}
        className="mx-auto text-center"
      >
        {"Copyright © "}
        <Link to="/" className="font-heading">
          Social Sphere
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
        <a
          href="https://kunalkeshan.dev/"
          className="font-heading"
          target="_blank"
        >
          Made with ❤️ by <u>Kunal Keshan</u>
        </a>
        <br />
        <a
          href="https://github.com/kunalkeshan/Shiryoku"
          className="font-heading"
          target="_blank"
        >
          <u>Repo</u>
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
