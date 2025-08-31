import type { NodePlopAPI } from "node-plop";
import {
  getComponentGeneratorConfig,
  getFeatureGeneratorConfig,
  getPageGeneratorConfig,
} from "./plop-config/generators.ts";

const plopper = (plop: NodePlopAPI) => {
  plop.setGenerator("component", getComponentGeneratorConfig(plop));
  plop.setGenerator("feature", getFeatureGeneratorConfig(plop));
  plop.setGenerator("page", getPageGeneratorConfig(plop));
};

export default plopper;
