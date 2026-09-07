import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'vacationProperty',
  title: 'Vakantiewoning',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam van de woning',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ligging',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'maxGuests',
      title: 'Maximaal aantal gasten',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'nightlyRate',
      title: 'Prijs per nacht',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Korte beschrijving',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'mainImage',
      title: 'Hoofdfoto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Galerij',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'amenities',
      title: 'Voorzieningen',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Uitgelichte woning',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
    },
  },
})
