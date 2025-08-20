import { exec } from "child_process";
import type { NodePlopAPI } from "node-plop";

const Plopper = (plop: NodePlopAPI) => {
	plop.setGenerator("component", {
		description:
			"Generate a new React component in containers, layouts, or presenters",
		prompts: [
			{
				type: "list",
				name: "type",
				message: "Which type of component?",
				choices: ["containers", "layouts", "presenters"],
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
		actions: [
			{
				type: "add",
				path: "src/components/{{type}}/{{pascalCase name}}.tsx",
				templateFile:
					"scaffold-templates/components/{{type}}/{{pascalCase type}}.tsx.hbs",
			},
			{
				type: "append",
				path: "src/components/index.ts",
				pattern: "/* PLOP_INJECT_IMPORT */",
				template:
					"import {{pascalCase name}} from '@/components/{{type}}/{{pascalCase name}}';",
			},
			{
				type: "append",
				path: "src/components/index.ts",
				pattern: "/* PLOP_INJECT_EXPORT */",
				template: "  {{pascalCase name}},",
			},
			function openFileInCode(answers) {
				const filePath = `src/components/${answers.type}/${plop.getHelper("pascalCase")(answers.name)}.tsx`;
				exec(`code ${filePath}`);
				return `Opened ${filePath} in VS Code`;
			},
		],
	});
};

export default Plopper;
