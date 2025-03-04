// noinspection JSUnusedGlobalSymbols

import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import importPlugin from "eslint-plugin-import"
import effector from "eslint-plugin-effector"
import react from "eslint-plugin-react"


export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			importPlugin.flatConfigs.recommended,
			effector.configs.recommended,
		],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			react,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
      effector
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					disallowTypeAnnotations: false,
				},
			],
			"@typescript-eslint/no-unused-vars": ["error"],
			"import/no-unresolved": 0,
			"import/no-named-as-default": "off",
			"import/no-anonymous-default-export": "off",
			"react/display-name": "off",
			"react/function-component-definition": [
				"error",
				{
					namedComponents: "arrow-function",
					unnamedComponents: "arrow-function",
				},
			],
		},
	},
)
