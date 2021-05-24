import postcss from 'rollup-plugin-postcss'

const distPath = 'dist/'

const config = [
  {
    input: 'src/Movinwords.js',
    output: [
      {
        file: `${distPath}movinwords.cjs.js`,
        format: 'cjs'
      },
      {
        file: `${distPath}movinwords.esm.js`,
        format: 'esm'
      },
      {
        name: 'Movinwords',
        file: `${distPath}movinwords.min.js`,
        format: 'iife'
      }
    ]
  }
]

export default config
