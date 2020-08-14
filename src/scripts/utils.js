const UTILS = (function () {
	const _$alerts = document.getElementById('alerts-holder');

	let notyf = new Notyf({
		duration: 4000,
	});

	const _notyf = () => {
		if (_$alerts) {
			if (_$alerts.classList.contains('multiple')) {
				for (let i = 0; i < _$alerts.childNodes.length; i++) {
					setTimeout(function () {
						_makeAlert(_$alerts.childNodes[i].textContent, false);
					}, 250);
				}
			} else {
				let _success = false;
				if (_$alerts.classList.contains('success')) {
					_success = true;
				}
				_makeAlert(_$alerts.childNodes[0].textContent, _success);
			}
		}
	};

	const _makeAlert = (text, success) => {
		if (!success) {
			notyf.error(text);
		} else {
			notyf.success(text);
		}
	};

	return {
		alert: function () {
			_notyf();
		},
	};
})();
