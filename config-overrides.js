const { paths } = require("react-app-rewired");
const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");
module.exports = override(
  addWebpackAlias({
    "@store": path.resolve(__dirname, `${paths.appSrc}/store/`),
    "@components": path.resolve(__dirname, `${paths.appSrc}/components/`),
    "@editor/constants": path.resolve(
      __dirname,
      `${paths.appSrc}/views/editor/constants/`
    ),
  })
);

// time npm run build
