import type { NodePlopAPI } from "node-plop";
import {
  getComponentGeneratorConfig,
  getFeatureGeneratorConfig,
} from "./plop-config";

const Plopper = (plop: NodePlopAPI) => {
  plop.setGenerator("component", getComponentGeneratorConfig(plop));

  plop.setGenerator("feature", getFeatureGeneratorConfig());
};

export default Plopper;
