export const articlecommentFormComponents = {
	formId: 'articlecomment',
	title: 'Articlecomment',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill articlecomment title',
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
					value: 'fill articlecomment description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
