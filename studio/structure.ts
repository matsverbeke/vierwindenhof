import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.document().schemaType('siteSettings').documentId('siteSettings').title('Woninginstellingen')
