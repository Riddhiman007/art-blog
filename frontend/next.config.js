/** @type {import('next').NextConfig} */
const { styles } = require('@ckeditor/ckeditor5-dev-utils');



module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [ {
      protocol: "https",
      hostname: "**.unsplash.com",
      port: '',
      pathname: '/**'
    } ]
  },
  experimental: {
    appDir: false
  }
}
//   webpack: (config, options) => {
//     config.module.rules.forEach(function (rule, index, array) {
//       const test = rule.test && rule.test.toString() || ''
//       if (test.includes('css')) {
//         array[ index ] = {
//           ...rule,
//           exclude: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/
//         }
//       } else if (test.includes('svg')) {
//         array[ index ] = {
//           ...rule,
//           exclude: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/
//         }
//       }
//     })

//     config.module.rules.push({
//       test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
//       use: [
//         {
//           loader: 'style-loader',
//           options: {
//             injectType: 'singletonStyleTag'
//           }
//         },
//         {
//           loader: 'postcss-loader',
//           options: styles.getPostCssConfig({
//             themeImporter: {
//               themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
//             },
//             minify: true
//           })
//         }
//       ]
//     })

//     config.module.rules.push({
//       test: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
//       use: [ 'raw-loader' ]
//     })

//     return config
//     // config.module.rules.push({
//     //   test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
//     //   use: [ 'raw-loader' ]
//     // },
//     //   {
//     //     test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
//     //     use: [
//     //       {
//     //         loader: 'style-loader',
//     //         options: {
//     //           injectType: 'singletonStyleTag',
//     //           attributes: {
//     //             'data-cke': true
//     //           }
//     //         }
//     //       },
//     //       'css-loader',
//     //       {
//     //         loader: 'postcss-loader',
//     //         options: {
//     //           postcssOptions: styles.getPostCssConfig({
//     //             themeImporter: {
//     //               themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
//     //             },
//     //             minify: true
//     //           })
//     //         }
//     //       }
//     //     ]
//     //   },
//     // {
//     //   test: cssRegex,
//     //   exclude: [
//     //     cssModuleRegex,
//     //     /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
//     //   ],
//     //   // (...)
//     // },
//     // {
//     //   test: cssModuleRegex,
//     //   exclude: [
//     //     /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
//     //   ],
//     //   // (...)
//     // },
//     // {
//     //   loader: require.resolve('file-loader'),
//     //   options: {
//     //     // Exclude `js` files to keep the "css" loader working as it injects
//     //     // its runtime that would otherwise be processed through the "file" loader.
//     //     // Also exclude `html` and `json` extensions so they get processed
//     //     // by webpack's internal loaders.
//     //     exclude: [
//     //       /\.(js|mjs|jsx|ts|tsx)$/,
//     //       /\.html$/,
//     //       /\.json$/,
//     //       /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
//     //       /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
//     //     ],
//     //     name: 'static/media/[name].[hash:8].[ext]',
//     //   }
//     // })
//     // )
//     // return config;
//   }
// }
