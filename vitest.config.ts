import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: [
        'src/movinwords.ts'
      ],
      exclude: [
        ...configDefaults.exclude,
        'docs',
        'commitlint.config.js',
      ],
    },
  },
})
