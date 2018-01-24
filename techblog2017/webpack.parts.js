exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|svg)$/,
          include,
          exclude,
          use: {
            loader: "url-loader",
            options,
          },
        },
      ],
    },
});