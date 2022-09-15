import { defineConfig } from 'umi';

const basePath = '/graphviews-ui/';

export default defineConfig({
  base: basePath,
  favicon: `${basePath}img/favicon.ico`,
  fastRefresh: {},
  nodeModulesTransform: { type: 'none', },
  publicPath: basePath,
  outputPath: `dist${basePath}`,
  routes: [
    {
      path: '/', 
      component: "@/layouts/index",
      routes: [
        { path: "/", exact: true, component: "@/pages/index" },
      ],
    },
  ],
});
