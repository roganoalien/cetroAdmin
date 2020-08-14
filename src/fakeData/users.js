const users = [
	{
		id: '1',
		name: 'Janice',
		lastname: 'Zavala',
		email: 'JaniceMZavala@armyspy.com',
		fb_id: '10',
		interested_in: [
			'alimentos, wellness',
			'entrenamiento',
			'fitness',
			'moda y estilo',
		],
	},
	{
		id: '2',
		name: 'Erwin',
		lastname: 'Gonzales',
		email: 'ErwinCasanovaGonzales@jourrapide.com',
		fb_id: '165',
		interested_in: [
			'viajes',
			'tecnología',
			'autos',
			'productos innovadores',
		],
	},
	{
		id: '3',
		name: 'Ade',
		lastname: 'Rosas',
		email: 'AdeBenavidesRosas@dayrep.com ',
		fb_id: '845',
		interested_in: [
			'viajes',
			'tecnología',
			'autos',
			'productos innovadores',
		],
	},
];

const users_data = [
	{
		id: '1',
		name: 'Janice',
		lastname: 'Zavala',
		phone: '6093818416',
		birthday: '15/10/1963',
		email: 'JaniceMZavala@armyspy.com',
		fb_id: '10',
		interested_in: [
			'alimentos, wellness',
			'entrenamiento',
			'fitness',
			'moda y estilo',
		],
		address: {
			street: 'Lake Road',
			number: '357',
			colony: 'Sullivan',
			city: 'Camden',
			state: 'New Jersey',
			country: 'United States',
			postal_code: '22310',
		},
	},
	{
		id: '2',
		name: 'Erwin',
		lastname: 'Gonzales',
		phone: '697100132',
		birthday: '07/08/1984',
		email: 'ErwinCasanovaGonzales@jourrapide.com',
		fb_id: '165',
		interested_in: [
			'viajes',
			'tecnología',
			'autos',
			'productos innovadores',
		],
		address: {
			street: 'Reyes Católicos',
			number: '89',
			colony: 'Olson',
			city: 'Oña',
			state: 'Burgos',
			country: 'Spain',
			postal_code: '09530',
		},
	},
	{
		id: '3',
		name: 'Ade',
		lastname: 'Rosas',
		phone: '786235328',
		birthday: '07/08/1984',
		email: 'AdeBenavidesRosas@dayrep.com ',
		fb_id: '845',
		interested_in: [
			'viajes',
			'tecnología',
			'autos',
			'productos innovadores',
		],
		address: {
			street: 'Fuente del Gallo',
			number: '4',
			colony: 'Encina',
			city: 'Colmenar de Montemayor',
			state: 'Salamanca',
			country: 'Spain',
			postal_code: '37711',
		},
	},
];

exports.users = users;
exports.users_data = users_data;
