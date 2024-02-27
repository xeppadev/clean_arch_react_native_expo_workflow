module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    "overrides": [
        
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["react", "react-hooks", "@typescript-eslint", "prettier"],
    "rules": {
        indent: ["error", 2, { SwitchCase: 1 }],
        quotes: ["error", "double", { avoidEscape: true }],
        semi: ["error", "always"],
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
        "react/display-name": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/no-unescaped-entities": "off",
        "prettier/prettier": "error",
    },
    "settings": {
        react: {
            version: "detect"
        }
    }
};
