const promos = [
	{
		id: '1',
		title: 'Cerveza',
		discount: '25% de descuento',
		img: {
			url:
				'https://images.unsplash.com/photo-1549231482-5cf39d19fba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
		},
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius rerum odit esse a consequuntur aliquam sapiente natus deleniti nihil magnam.',
		valid_until: '10/10/2020',
		keywords: ['alimentos', 'entretenimiento', 'cultura'],
	},
	{
		id: '2',
		title: 'GYM',
		discount: '10% de descuento',
		img: {
			url:
				'https://images.unsplash.com/photo-1526404079162-d93dafdeef3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
		},
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius rerum odit esse a consequuntur aliquam sapiente natus deleniti nihil magnam.',
		valid_until: '02/07/2020',
		keywords: ['wellness', 'fitness'],
	},
];

const promos_data = [
	{
		id: '1',
		title: 'Cerveza',
		discount: '25% de descuento',
		img: {
			url:
				'https://images.unsplash.com/photo-1549231482-5cf39d19fba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
		},
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius rerum odit esse a consequuntur aliquam sapiente natus deleniti nihil magnam.',
		valid_until: '10/10/2020',
		keywords: ['alimentos', 'entretenimiento', 'cultura'],
		brand: {
			name: 'Modelo',
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, soluta!',
		},
	},
	{
		id: '2',
		title: 'GYM',
		discount: '10% de descuento',
		img: {
			url:
				'https://images.unsplash.com/photo-1526404079162-d93dafdeef3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
		},
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius rerum odit esse a consequuntur aliquam sapiente natus deleniti nihil magnam.',
		valid_until: '02/07/2020',
		keywords: ['wellness', 'fitness'],
		brand: {
			name: 'GYMPASS',
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, soluta!',
		},
	},
];

exports.promos = promos;
exports.promos_data = promos_data;
