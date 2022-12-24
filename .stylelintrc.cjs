module.exports = {
  plugins: [
    'stylelint-order'
  ],
  rules: {
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'order/properties-alphabetical-order': true,
    'string-quotes': 'single',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        'ignorePseudoClasses': ['global']
      }
    ]
  }
}
