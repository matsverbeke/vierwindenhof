import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Woninginstellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'homeAnnouncementEnabled',
      title: 'Melding op homepagina tonen',
      type: 'boolean',
      initialValue: false,
      description: 'Zet dit aan om tijdelijk een belangrijk bericht bovenaan de homepagina te tonen.',
    }),
    defineField({
      name: 'homeAnnouncementText',
      title: 'Melding tekst',
      type: 'text',
      description: 'De volledige boodschap die je tijdelijk op de homepagina wilt tonen.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isEnabled = Boolean(
            (context.parent as {homeAnnouncementEnabled?: boolean} | undefined)
              ?.homeAnnouncementEnabled,
          )

          if (!isEnabled) {
            return true
          }

          return value
            ? true
            : 'Vul de meldingstekst in wanneer de melding op de homepage aan staat.'
        }),
    }),
    defineField({
      name: 'smallHouseGuests',
      title: 'Capaciteit kleine woning',
      type: 'number',
      description: 'Pas hier het aantal personen aan voor de kleine woning.',
      initialValue: 12,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'largeHouseGuests',
      title: 'Capaciteit grote woning',
      type: 'number',
      description: 'Pas hier het aantal personen aan voor de grote woning.',
      initialValue: 20,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'smallHouseKitchenPdf',
      title: 'PDF keukeninventaris kleine woning',
      type: 'file',
      description: 'Upload hier de PDF met de keukeninventaris voor de kleine woning.',
    }),
    defineField({
      name: 'largeHouseKitchenPdf',
      title: 'PDF keukeninventaris grote woning',
      type: 'file',
      description: 'Upload hier de PDF met de keukeninventaris voor de grote woning.',
    }),
    defineField({
      name: 'priceRows',
      title: 'Prijstabel',
      type: 'array',
      description: 'Pas hier de prijzen per periode aan voor beide woningen.',
      initialValue: [
        {period: 'Weekend', smallHousePrice: 890, largeHousePrice: 1480},
        {period: 'Midweek', smallHousePrice: 890, largeHousePrice: 1480},
        {period: 'Week', smallHousePrice: 1200, largeHousePrice: 1950},
        {
          period: 'Extra overnachting',
          smallHousePrice: 120,
          largeHousePrice: 200,
        },
        {period: 'Feestdag-toeslag', smallHousePrice: 200, largeHousePrice: 300},
      ],
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'period',
              title: 'Periode',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'smallHousePrice',
              title: 'Prijs kleine woning',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'largeHousePrice',
              title: 'Prijs grote woning',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: 'period',
              small: 'smallHousePrice',
              large: 'largeHousePrice',
            },
            prepare({title, small, large}) {
              return {
                title: title ?? 'Periode',
                subtitle: `Klein: € ${small ?? 0} | Groot: € ${large ?? 0}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'homeAnnouncementText',
    },
    prepare() {
      return {
        title: 'Instellingen',
      }
    },
  },
})
