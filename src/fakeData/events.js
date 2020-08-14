const events = [
	{
		id: '1',
		name: 'Exposición Arte',
		date: {
			start: '30/07/2020',
			end: '30/07/2020',
		},
		time: {
			start: '09:00',
			end: '20:00',
		},
		type: 'Privado',
		comments: '',
		classification: 'Otro',
		status: 'Pagado',
		space: 'Tres cuartos',
		client: {
			name: 'Tester',
		},
		allowed_guests: 300,
	},
	{
		id: '2',
		name: 'Cinépolis VIP',
		date: {
			start: '25/12/2020',
			end: '26/12/2020',
		},
		time: {
			start: '09:00',
			end: '05:00',
		},
		type: 'Privado',
		comments: '',
		classification: 'Fiesta',
		status: 'Pagado',
		space: 'Tres cuartos',
		client: {
			name: 'Tester',
		},
		allowed_guests: 100,
	},
];

const events_data = [
	{
		id: '1',
		name: 'Exposición Arte',
		date: {
			start: '30/07/2020',
			end: '30/07/2020',
		},
		time: {
			start: '09:00',
			end: '20:00',
		},
		type: 'Privado',
		comments: '',
		classification: 'Otro',
		status: 'Pagado',
		responsable: 'Daniel Montiel',
		space: 'Tres cuartos',
		additional_spaces: ['azotea'],
		services: 'Elite',
		client: {
			name: 'Tester',
			email: 'test@test.com',
			phone: '1234567890',
		},
		allowed_guests: 300,
		the_guests: [
			{
				name: 'Rodrigo',
				lastname: 'Garcia',
				email: 'rodrigo@garcia.com',
			},
			{
				name: 'Daniel',
				lastname: 'Montiel',
				email: 'daniel@montiel.com',
			},
		],
	},
	{
		id: '2',
		name: 'Cinépolis VIP',
		date: {
			start: '25/12/2020',
			end: '26/12/2020',
		},
		time: {
			start: '09:00',
			end: '05:00',
		},
		type: 'Privado',
		comments: '',
		classification: 'Fiesta',
		status: 'Pagado',
		responsable: 'Daniel Montiel',
		space: 'Tres cuartos',
		additional_spaces: ['azotea', 'mirador'],
		services: 'Elite',
		client: {
			name: 'Tester',
			email: 'test@test.com',
			phone: '1234567890',
		},
		allowed_guests: 100,
		the_guests: [],
	},
];

exports.events = events;
exports.events_data = events_data;
