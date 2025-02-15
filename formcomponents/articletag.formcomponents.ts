export const articletagFormComponents = {
	formId: 'articletag',
	title: 'Articletag',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill articletag title',
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
					value: 'fill articletag description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
