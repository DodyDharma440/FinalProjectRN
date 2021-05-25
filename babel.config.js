module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            assets: "./assets",
            components: "./src/components",
            screen: "./src/screen",
            router: "./src/router",
            hooks: "./src/hooks",
            utils: "./src/utils",
            "my-redux": "./src/redux",
            api: "./src/api",
          },
        },
      ],
    ],
  };
};
