module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader", // Injects CSS into the DOM
            "css-loader",   // Interprets @import and url() in CSS
            "postcss-loader", // Processes CSS with PostCSS
          ],
        },
        // Other rules (e.g., for JS/JSX) go here
      ],
    },
  };