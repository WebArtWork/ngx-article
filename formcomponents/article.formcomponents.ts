export const articleFormComponents = {
	formId: 'article',
	title: 'Article',
	components: [
		{
			name: 'Text',
			key: 'title',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill article title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Text',
			key: 'link',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill article link'
				},
				{
					name: 'Label',
					value: 'Link'
				}
			]
		},
		{
			name: 'Text',
			key: 'video',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill article video'
				},
				{
					name: 'Label',
					value: 'Video'
				}
			]
		},
		{
			name: 'Text',
			key: 'shortDescription',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill articles short description'
				},
				{
					name: 'Label',
					value: 'Short Description'
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Label',
					value: 'Thumb'
				}
			]
		},
		{
			name: 'Html',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill articles description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Date',
			key: 'published',
			fields: [
				{
					name: 'Label',
					value: 'Date'
				}
			]
		},
		{
			name: 'Select',
			key: 'tags',
			fields: [
				{
					name: 'Items',
					value: []
				},
				{
					name: 'Placeholder',
					value: 'Select tags'
				},
				{
					name: 'Label',
					value: 'Tags'
				},
				{
					name: 'Multiple',
					value: true
				}
			]
		},
		{
			name: 'Select',
			key: 'linkCategory',
			fields: [
				{
					name: 'Items',
					value: []
				},
				{
					name: 'Placeholder',
					value: 'Select documents'
				},
				{
					name: 'Label',
					value: 'Documents'
				}
			]
		},
		{
			name: 'Select',
			key: 'linkDoc',
			fields: [
				{
					name: 'Items',
					value: []
				},
				{
					name: 'Placeholder',
					value: 'Select document'
				},
				{
					name: 'Label',
					value: 'Document'
				}
			]
		}
	]
};
