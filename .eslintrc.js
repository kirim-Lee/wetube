module.exports = {
    "extends": ["airbnb-base", "plugin:prettier/recommended"],
    "rules": {
        "no-console": "off",
        "indent": [2, 4],
        "ImportDeclaration": "always", 
        "ExportDeclaration": "never" 
    },
    "env": {
        "browser": true // document 가 에러 없이 사용할 수 있게 해줌
    }
};