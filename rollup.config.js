import { terser } from "rollup-plugin-terser"

const distPath = 'dist/'

const config = [
  {
    input: 'src/movinwords.js',
    output: [
      {
        file: `${distPath}movinwords.js`,
        format: 'cjs'
      },
      {
        file: `${distPath}movinwords.esm.js`,
        format: 'esm'
      },
      {
        name: 'Movinwords',
        file: `${distPath}movinwords.umd.js`,
        format: 'umd'
      },
      {
        name: 'Movinwords',
        file: `${distPath}movinwords.min.js`,
        format: 'iife'
      }
    ],
     plugins: [
       terser({
         keep_classnames: true
       })
     ]
  }
]

export default config
