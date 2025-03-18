export default {
  allowEmptyInput: true,
  extends: ["stylelint-config-standard-scss", "stylelint-config-hudochenkov/full", "stylelint-config-rational-order"],
  ignoreFiles: [
    "src/styles/vendor/*.scss",
    "src/styles/vendor/*.css",
    "src/styles/base/common.scss",
    "src/styles/base/variables.scss",
    "src/styles/style.scss",
    "**/*.js",
    "**/+.scss",
  ],
  overrides: [
    {
      files: ["src/**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  plugins: [
    "stylelint-scss",
    "stylelint-order",
    "stylelint-config-rational-order/plugin",
    "stylelint-selector-bem-pattern",
  ],
  rules: {
    "at-rule-empty-line-before": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "/^at-/",
          "/^use/",
          "/^mixin/",
          "/^extend/",
          "/^include/",
          "/^if/",
          "/^else/",
          "/^function/",
          "/^return/",
          "/^each/",
          "/^while/",
        ],
      },
    ],
    "comment-word-disallowed-list": [
      ["/((Х|х)+уй|(Х|х)уе|(Х|х)уё|(Б|б)ляд|(М|м)уда|(П|п)идо|(П|п)еди|(П|п)еде|(^|)+(Б|б)ля)/"],
      {
        message: "Комментарий оскорбительный при себе оставь",
      },
    ],
    "declaration-empty-line-before": [
      "always",
      {
        except: ["after-comment", "first-nested"],
        ignore: ["after-comment", "after-declaration", "first-nested", "inside-single-line-block"],
      },
    ],
    "function-no-unknown": null,
    "import-notation": "string",
    "media-query-no-invalid": null,
    "no-duplicate-selectors": null,
    "order/order": [
      "dollar-variables",
      "custom-properties",
      {
        type: "at-rule",
        name: "include",
      },
      "declarations",
      {
        type: "at-rule",
        name: "media",
      },
      {
        type: "rule",
        selector: "^&:\\w+$",
      },
      {
        type: "rule",
        selector: "^&--[-a-z0-9]+",
      },
      {
        type: "rule",
        selector: "^\\.[-_a-zA-Z0-9]+",
      },
      {
        type: "rule",
        selector: "^&__[-a-z0-9]+",
      },
    ],
    "order/properties-order": [
      [],
      {
        severity: "error",
      },
    ],
    "plugin/rational-order": [
      true,
      {
        "border-in-box-model": false,
        "empty-line-between-groups": true,
      },
    ],
    "plugin/selector-bem-pattern": [
      {
        implicitComponents: true,
        componentName: "[a-z]+",
        componentSelectors: {
          initial: "^(\\.{componentName}(__[a-z]+|--[-a-z0-9]+|__[-a-z]+--[-a-z0-9]+|.[-a-z]+|__[a-z]+.[-a-z]+)?)$",
          combined: "^.+$",
        },
        ignoreSelectors: [
          "^.(no-)?js(-modal-open)?$",
          "a([[a-z]+|:[a-z]+)?",
          "h[1-6]",
          "pre",
          "blockquote",
          "thead",
          "tr",
          "img",
          "p",
          "table",
          "^&:empty",
          "#{$[-a-z]+}__[-a-z]+",
          "^\\*$",
          "$$.*$$",
        ],
      },
      {
        severity: "warning",
        message: "Селектор не из имени файла или БЭМ-ошибка",
      },
    ],
    "property-no-vendor-prefix": null,
    "scss/comment-no-empty": null,
    "scss/double-slash-comment-empty-line-before": null,
    "scss/double-slash-comment-whitespace-inside": null,
  },
};
