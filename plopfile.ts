import type { NodePlopAPI } from "node-plop";
import {
  getComponentGeneratorConfig,
  getFeatureGeneratorConfig,
  getPageGeneratorConfig,
  getScreenGeneratorConfig,
} from "./plop-config/generators.ts";

const plopper = (plop: NodePlopAPI) => {
  plop.setGenerator("component", getComponentGeneratorConfig(plop));
  plop.setGenerator("feature", getFeatureGeneratorConfig());
  plop.setGenerator("page", getPageGeneratorConfig());
  plop.setGenerator("screen", getScreenGeneratorConfig());
};

export default plopper;
