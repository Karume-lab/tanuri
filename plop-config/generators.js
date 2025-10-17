import { exec } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pluralize from "pluralize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "..");

export const getComponentGeneratorConfig = (plop) => ({
  description:
    "Generate a new React component in containers, layouts, or presenters for web or mobile",
  prompts: [
    {
      type: "list",
      name: "app",
      message: "Which app do you want to scaffold into?",
      choices: [
        { name: "Web Site", value: "tanuri-website" },
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

    const componentsPath = path.join(appRoot, "src/components");

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

        const filePath = path.join(
          componentsPath,
          `${folder}/${pascalName}${pascalType}.tsx`,
        );

        exec(`code "${filePath}"`);
        return `Opened ${filePath} in VS Code`;
      },
    ];
  },
});

export const getFeatureGeneratorConfig = (plop) => ({
  description: "Generate a full feature folder under src/features/",
  prompts: [
    {
      type: "list",
      name: "app",
      message: "Which app do you want to scaffold into?",
      choices: [
        { name: "Company Web", value: "tanuri-website" },
        { name: "Consumer Mobile", value: "tanuri-consumer-mobile" },
      ],
    },
    {
      type: "input",
      name: "feature",
      message: "What is the feature name?",
    },
    {
      type: "checkbox",
      name: "parts",
      message: "Which parts do you want to generate?",
      choices: () => {
        const files = [
          "index.ts",
          "components/index.ts",
          "components/containers/index.ts",
          "components/layouts/index.ts",
          "components/presenters/index.ts",
          "hooks/index.ts",
          "hooks/api/mutations.ts",
          "hooks/api/queries.ts",
          "store/index.ts",
          "types/index.ts",
          "urls/index.ts",
          "utils/index.ts",
          "validations/index.ts",
        ];

        return [
          { name: "[Select/Deselect All]", value: "*", checked: true },
          ...files.map((file) => ({ name: file, value: file, checked: true })),
        ];
      },
      filter: (input) => {
        const allFiles = [
          "index.ts",
          "components/index.ts",
          "components/containers/index.ts",
          "components/layouts/index.ts",
          "components/presenters/index.ts",
          "hooks/index.ts",
          "hooks/api/mutations.ts",
          "hooks/api/queries.ts",
          "store/index.ts",
          "types/index.ts",
          "urls/index.ts",
          "utils/index.ts",
          "validations/index.ts",
        ];
        return input.includes("*") ? allFiles : input;
      },
    },
  ],
  actions: (answers) => {
    if (!answers) return [];

    const appRoot = path.resolve(__dirname, "apps", answers.app);
    const featureRoot = path.join(
      appRoot,
      "src",
      "features",
      plop.getHelper("kebabCase")(answers.feature),
    );

    const templates = {
      "index.ts": `// Barrel file for {{pascalCase feature}} feature

// Components
export * from "./components";

// Hooks
export * from "./hooks";

// Types
export * from "./types";

// URLS
export * from "./urls";

// Utils
export * from "./utils";

// Validations
export * from "./validations";
`,
      "components/index.ts": "// Components for {{pascalCase feature}}",
      "components/containers/index.ts":
        "// Containers for {{pascalCase feature}}",
      "components/layouts/index.ts": "// Layouts for {{pascalCase feature}}",
      "components/presenters/index.ts":
        "// Presenters for {{pascalCase feature}}",
      "hooks/index.ts": "// Hooks for {{pascalCase feature}}",
      "hooks/api/mutations.ts": "// API mutations for {{pascalCase feature}}",
      "hooks/api/queries.ts": "// API queries for {{pascalCase feature}}",
      "store/index.ts": "// Store for {{pascalCase feature}}",
      "types/index.ts": "// Types for {{pascalCase feature}}",
      "urls/index.ts": "// URLs for {{pascalCase feature}}",
      "utils/index.ts": "// Utils for {{pascalCase feature}}",
      "validations/index.ts": "// Validations for {{pascalCase feature}}",
    };

    return answers.parts.map((file) => ({
      type: "add",
      path: path.join(featureRoot, file),
      template: templates[file],
      skipIfExists: true,
    }));
  },
});

export const getPageGeneratorConfig = (plop) => ({
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

    const appRoot = path.join(__dirname, "apps/tanuri-website");
    const appDir = path.join(appRoot, "src/app");
    const templatesRoot = path.join(appRoot, "scaffold-templates/pages");

    const pluralName = pluralize(name);
    const segmentFolder = `(pages)/(${access})/${plop.getHelper("kebabCase")(
      pluralName,
    )}`;
    const listPageFile = path.join(appDir, segmentFolder, "page.tsx");

    const actions = [
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
