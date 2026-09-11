import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {nlNLLocale} from '@sanity/locale-nl-nl'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'aowmls6r'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: '4windenhof',
  // Serve the Studio under /admin when deployed together with the frontend
  basePath: '/admin',

  projectId,
  dataset,

  plugins: [structureTool({structure}), visionTool(), nlNLLocale()],

  schema: {
    types: schemaTypes,
  },
})
