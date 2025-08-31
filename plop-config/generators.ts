import { exec } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NodePlopAPI, PlopGeneratorConfig } from "node-plop";
import pluralize from "pluralize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "..");

/* 
TODO:
- start plopping for mobile
- move the helpers to the hbs files where possible
- move each function to its own file
- allow opting out of some files while scaffolding features
- allow nested paths when adding a route
*/

const getComponentGeneratorConfig = (
  plop: NodePlopAPI,
): PlopGeneratorConfig => ({
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

const getFeatureGeneratorConfig = (plop: NodePlopAPI): PlopGeneratorConfig => ({
  description: "Generate a full feature folder under src/features/",
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
      type: "input",
      name: "feature",
      message: "What is the feature name?",
    },
  ],
  actions: (answers) => {
    if (!answers) return [];

    const appRoot = path.resolve(__dirname, "apps", answers.app);
    const featureRoot = path.join(
      appRoot,
      "src",
      "features",
      plop.getHelper("lowerCase")(answers.feature),
    );

    const files = [
      {
        path: path.join(featureRoot, "components/index.ts"),
        template: "// Components for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "components/containers/index.ts"),
        template: "// Containers  for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "components/layouts/index.ts"),
        template: "// Layouts  for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "components/presenters/index.ts"),
        template: "// Presenters for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "hooks/index.ts"),
        template: "// Hooks for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "hooks/api/mutations.ts"),
        template: "// API mutations for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "hooks/api/queries.ts"),
        template: "// API queries for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "styles/index.css"),
        template: "/* Styles for {{pascalCase feature}} */",
      },
      {
        path: path.join(featureRoot, "types/index.ts"),
        template: "// Types for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "utils/index.ts"),
        template: "// Utils for {{pascalCase feature}}",
      },
      {
        path: path.join(featureRoot, "validations/index.ts"),
        template: "// Validations for {{pascalCase feature}}",
      },
    ];

    return files.map((file) => ({
      type: "add",
      path: file.path,
      template: file.template,
      skipIfExists: true,
    }));
  },
});

const getPageGeneratorConfig = (plop: NodePlopAPI): PlopGeneratorConfig => ({
  description: "Generate a new Next.js App Router page",
  prompts: [
    {
      type: "list",
      name: "access",
      message: "Is this page protected or public?",
      choices: [
        { name: "Protected", value: "protected" },
        { name: "Public", value: "public" },
      ],
      default: "protected",
    },
    {
      type: "input",
      name: "name",
      message: "What is the name of your page? (singular)",
    },
    {
      type: "confirm",
      name: "withLayout",
      message: "Add a layout for this page folder?",
      default: false,
    },
    {
      type: "confirm",
      name: "withDynamicRoute",
      message: "Add a dynamic route?",
      default: false,
    },
  ],
  actions: (answers) => {
    if (!answers) return [];

    const { access, name, withLayout, withDynamicRoute } = answers;

    const appRoot = path.join(__dirname, "apps/tanuri-company-web");
    const appDir = path.join(appRoot, "src/app");
    const templatesRoot = path.join(appRoot, "scaffold-templates/pages");

    const pluralName = pluralize(name);
    const segmentFolder = `(pages)/(${access})/${plop.getHelper("kebabCase")(
      pluralName,
    )}`;
    const listPageFile = path.join(appDir, segmentFolder, "page.tsx");

    const actions: PlopGeneratorConfig["actions"] = [
      {
        type: "add",
        path: listPageFile,
        templateFile: path.join(templatesRoot, "Page.tsx.hbs"),
        data: {
          pageName: pluralName,
        },
      },
    ];

    if (withLayout) {
      actions.push({
        type: "add",
        path: path.join(appDir, segmentFolder, "layout.tsx"),
        templateFile: path.join(templatesRoot, "Layout.tsx.hbs"),
        data: {
          name: `${plop.getHelper("pascalCase")(pluralName)}`,
        },
      });
    }

    if (withDynamicRoute) {
      const detailFolder = path.join(appDir, segmentFolder, "[id]");
      const detailPageFile = path.join(detailFolder, "page.tsx");

      actions.push({
        type: "add",
        path: detailPageFile,
        templateFile: path.join(templatesRoot, "Page.tsx.hbs"),
        data: {
          pageName: `${plop.getHelper("pascalCase")(name)}`,
        },
      });
    }

    actions.push(() => {
      const filesToOpen = [listPageFile];
      if (withDynamicRoute) {
        filesToOpen.push(path.join(appDir, segmentFolder, "[id]/page.tsx"));
      }
      if (withLayout) {
        filesToOpen.push(path.join(appDir, segmentFolder, "layout.tsx"));
      }
      filesToOpen.forEach((file) => {
        exec(`code "${file}"`);
      });
      return `Opened generated files in VS Code`;
    });

    return actions;
  },
});

export {
  getComponentGeneratorConfig,
  getFeatureGeneratorConfig,
  getPageGeneratorConfig,
};
