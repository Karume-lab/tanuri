import { exec } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NodePlopAPI } from "node-plop";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Plopper = (plop: NodePlopAPI) => {
  plop.setGenerator("component", {
    description:
      "Generate a new React component in containers, layouts, or presenters for web or mobile",
    prompts: [
      {
        type: "list",
        name: "app",
        message: "Which app do you want to scaffold into?",
        choices: [
          { name: "Company Web", value: "tanuri-company-web" },
          { name: "Consumer Mobile", value: "tanuri-consumer-mobile" },
        ],
      },
      {
        type: "list",
        name: "type",
        message: "Which type of component?",
        choices: [
          { name: "Containers", value: "Container" },
          { name: "Layouts", value: "Layout" },
          { name: "Presenters", value: "Presenter" },
        ],
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of your component?",
      },
      {
        type: "confirm",
        name: "withInterface",
        message: "Do you want to include a props interface?",
        default: false,
      },
    ],
    actions: (answers) => {
      if (!answers) return [];

      const appRoot = path.resolve(__dirname, "apps", answers.app);

      const componentsPath =
        answers.app === "tanuri-company-web"
          ? path.join(appRoot, "src/components")
          : path.join(appRoot, "components");

      const templateRoot = path.join(appRoot, "scaffold-templates/components");
      const indexFile = path.join(componentsPath, "index.ts");

      return [
        {
          type: "add",
          path: path.join(
            componentsPath,
            "{{lowerCase type}}s/{{pascalCase name}}{{pascalCase type}}.tsx",
          ),
          templateFile: path.join(templateRoot, "Component.tsx.hbs"),
        },
        {
          type: "append",
          path: indexFile,
          pattern: "/* PLOP_INJECT_IMPORT */",
          template:
            "import {{pascalCase name}}{{pascalCase type}} from '@/components/{{lowerCase type}}s/{{pascalCase name}}{{pascalCase type}}';",
        },
        {
          type: "append",
          path: indexFile,
          pattern: "/* PLOP_INJECT_EXPORT */",
          template: "  {{pascalCase name}}{{pascalCase type}},",
        },
        function openFileInCode(answers) {
          const folder = `${answers.type.toLowerCase()}s`;
          const pascalName = plop.getHelper("pascalCase")(answers.name);
          const pascalType = plop.getHelper("pascalCase")(answers.type);

          const baseComponentsPath =
            answers.app === "tanuri-company-web"
              ? path.join(appRoot, "src/components")
              : path.join(appRoot, "components");

          const filePath = path.join(
            baseComponentsPath,
            `${folder}/${pascalName}${pascalType}.tsx`,
          );

          exec(`code "${filePath}"`);
          return `Opened ${filePath} in VS Code`;
        },
      ];
    },
  });
};

export default Plopper;
