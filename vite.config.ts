/**
 * Configs:
 * - packageBuildConfig: Builds the package for Production (package.json, .css, .esm, .js, .umd, min.js and ts types).
 * - docsBuildConfig: Builds the dependencies for the docs playground (.min.js).
 * - docsRunConfig: Runs the docs playground (locally).
*/

import path from 'path'
import { defineConfig } from 'vite'
import progress from 'vite-plugin-progress'
import colors from 'picocolors'
import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'
import { execSync } from 'child_process'

const entry = path.resolve(__dirname, 'src/movinwords.ts')
const name = 'MovinWords'
const minify = 'terser'
const terserOptions = {
  keep_classnames: true
}

/**
 * Vite plugin to run node-sass commands.
 * This plugin executes node-sass to compile SCSS files to CSS during the build process.
 *
 * @param {string} outputDir - Directory where to output the css file.
 * @returns {PluginOption} A Vite plugin object with a name and a closeBundle hook.
 */
function compileScss(outputDir: string): PluginOption {
  return {
    name: 'run-node-sass',
    closeBundle() {
      try {
        console.log('Running node-sass...')
        execSync(`node-sass src/ -o ${outputDir} --output-style compressed`)
        console.log('node-sass processing complete.')
      } catch (error) {
        console.error('Error during node-sass execution', error)
      }
    },
  }
}

// Configuration for building the package
const packageBuildConfig = defineConfig({
  plugins: [
    compileScss('dist/'),
    visualizer() as PluginOption,
    progress({
      format: `Building ${colors.green('[:bar]')} :percent :eta`,
      total: 100,
      width: 60,
    }),
  ],
  build: {
    minify,
    terserOptions,
    reportCompressedSize: true,
    lib: {
      entry,
      name,
      formats: ['es', 'cjs', 'iife', 'umd'],
      fileName: (format) => {
        let filename = 'movinwords'

        switch (format) {
          case 'es':
            filename += '.esm.js'
            break

          case 'cjs':
            filename += '.cjs'
            break

          case 'iife':
            filename += '.min.js'
            break

          case 'umd':
            filename += '.umd.js'
            break
        }

        return filename
      },
    },
  },
})

// Configuration for building the docs
const docsBuildConfig = defineConfig({
  plugins: [
    compileScss('docs/')
  ],
  build: {
    minify,
    terserOptions,
    emptyOutDir: false,
    outDir: path.resolve(__dirname, 'docs'),
    lib: {
      entry,
      name,
      formats: ['iife'],
      fileName: () => 'movinwords.min.js',
    },
  },
})

// Configuration for running the docs
const docsRunConfig = defineConfig({
  root: path.join(__dirname, 'docs'),
})

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return docsRunConfig
  }

  if (process.env.TARGET === 'docs') {
    return docsBuildConfig
  }

  return packageBuildConfig
})
