class User {
	// class конструкторду тузуп алдык
	constructor(name, password) {
		this.name = name
		this.password = password
	}
	set name(value) {
		this._name = value // setter для записи name
	}
	set password(value) {
		this._password = value // setter для записи password
	}
}

var usernameRegex = /^[a-zA-Z0-9]+$/ // сортировка написанных в качестве валю
let loading = document.querySelector('.loading') // js div ке киргизебиз
let dataAccept = document.querySelector('.dataAccept')
let error = document.querySelector('.error')
let regexp = document.querySelector('.regexp')
loading.style.display = 'none' // бут значенияларды скрывать этебиз
dataAccept.style.display = 'none'
error.style.display = 'none'
regexp.style.display = 'none'

let form = document.getElementById('formik')
console.log(form)
form.addEventListener('submit', function (e) {
	// анонимный функция мн submit ке событие кощобуз
	e.preventDefault() // остановка перезагрузки страницы
	let input1 = form[0].value // 1 input тун значениясы
	let input2 = form[1].value // 2 input тун значениясы
	let user = new User() // class constructor ду иштетебиз

	if (!input1.match(usernameRegex)) {
		// если в инпут по сортировке не правильно введено
		regexp.style.display = 'block'
		regexp.innerHTML =
			'username must be only alphabet characters and digits' // будет жаловаться что мы должны ввести коректно
		return
	} else if (input2.length < 5) {
		// если пасворд короче 5
		console.log('non valid')
		regexp.style.display = 'block'
		dataAccept.style.display = 'none'
		regexp.innerHTML = 'password too short' // выводим сообщение что пасворд краток
		return
	} else {
		regexp.style.display = 'none'
		user.name = input1
		user.password = input2
	}

	console.log(user)
	dataAccept.style.display = 'none' // dataAccept ти убираем
	loading.style.display = 'block' // loading ти чыгарабыз

	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST', // мы отправляем
		headers: {
			'content-type': 'application/json', // бекендке json форматта жиберебиз дейбиз
		},
		body: JSON.stringify(user), // объектти json го (сапка)айландырабыз
	})
		.then(function (response) {
			if (response.ok) {
				// если отправка успешно
				loading.style.display = 'none' // убираем loading
				dataAccept.style.display = 'block' // dataAccept ти чыгарабыз
			}
			console.log(response.json())
		})
		.catch((err) => {
			// если ошибка
			loading.style.display = 'none' // loading изчезает
			error.style.display = 'block' // работает error
			error.append(err)
		})
})
