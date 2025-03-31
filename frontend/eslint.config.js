// noinspection JSUnusedGlobalSymbols

import eslint from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
// eslint-disable-next-line import/no-unresolved
import tseslint from "typescript-eslint"
import importPlugin from "eslint-plugin-import"
import effector from "eslint-plugin-effector"
import react from "eslint-plugin-react"
import featureSliced from "@conarti/eslint-plugin-feature-sliced"

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	importPlugin.flatConfigs.recommended,
	{
		settings: {
			react: {
				version: "detect",
			},
		},
		extends: [effector.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			react: react,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			effector: effector,
			"@conarti/feature-sliced": featureSliced,
		},
		rules: {
			"@conarti/feature-sliced/layers-slices": [
				"error",
				{
					allowTypeImports: true,
					ignorePatterns: ["**/AppointmentBooking"],
				},
			],
			"@conarti/feature-sliced/absolute-relative": "error",
			"@conarti/feature-sliced/public-api": "error",
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"@typescript-eslint/consistent-type-imports": [
				"off",
				{
					disallowTypeAnnotations: false,
				},
			],
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-unused-vars": ["error"],
			"import/order": "warn",
			"import/named": "off",
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
