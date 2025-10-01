import {
  getComponentGeneratorConfig,
  getFeatureGeneratorConfig,
  getPageGeneratorConfig,
} from "./plop-config/generators.js";

const plopper = (plop) => {
  plop.setGenerator("component", getComponentGeneratorConfig(plop));
  plop.setGenerator("feature", getFeatureGeneratorConfig(plop));
  plop.setGenerator("page", getPageGeneratorConfig(plop));
};

export default plopper;
