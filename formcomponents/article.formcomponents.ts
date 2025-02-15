export const articleFormComponents = {
	formId: 'article',
	title: 'Article',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill article title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill article description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
