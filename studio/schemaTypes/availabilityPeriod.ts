import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'availabilityPeriod',
  title: 'Niet-beschikbare periode',
  type: 'document',
  fields: [
    defineField({
      name: 'property',
      title: 'Woning',
      type: 'string',
      options: {
        list: [
          {title: 'Kleine woning', value: 'small-house'},
          {title: 'Grote woning', value: 'large-house'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateFrom',
      title: 'Van',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateTo',
      title: 'Tot',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Opmerking',
      type: 'text',
      rows: 3,
      description:
        'Optioneel: waarom deze periode niet beschikbaar is (enkel voor jezelf zichtbaar).',
    }),
  ],
  preview: {
    select: {
      property: 'property',
      from: 'dateFrom',
      to: 'dateTo',
    },
    prepare({property, from, to}) {
      const title =
        property === 'small-house'
          ? 'Kleine woning'
          : property === 'large-house'
            ? 'Grote woning'
            : 'Woning'

      return {
        title,
        subtitle: `${from ?? 'Begin'} t/m ${to ?? 'Einde'}`,
      }
    },
  },
})
