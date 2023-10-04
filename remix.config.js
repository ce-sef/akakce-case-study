/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
    "/": {
    load: () => import("./src/routes/diger-sayfa"), // Yüklemek istediğiniz bileşeni tanımlayın
  },
};
