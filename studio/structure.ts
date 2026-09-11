import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Woninginstellingen')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Woninginstellingen'),
        ),
      // S.divider(),
      // S.listItem()
      //   .title('Beschikbaarheidsperiodes')
      //   .child(
      //     S.documentTypeList('availabilityPeriod')
      //       .title('Beschikbaarheidsperiodes')
      //       .menuItems(S.documentTypeList('availabilityPeriod').getMenuItems()),
      //   ),
    ])
