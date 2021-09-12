const usersModule = (() => {
	const BASE_URL = 'http://localhost:3000/api/v1/users'

	// ヘッダーの設定
	const headers = new Headers()
	headers.set('Content-Type', 'application/json')

	// 即時関数なのでこのモジュールが読み込まれたタイミングで実行されるメソッドを定義
	return {
		fetchAllUsers: async () => {
			const res = await fetch(BASE_URL)
			const users = await res.json()

			for (let i = 0; i < users.length; i++) {
				const user = users[i]
				console.log('👉 user', user)
				const body = `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.profile}</td>
                        <td>${user.date_of_birth}</td>
                        <td>${user.created_at}</td>
                        <td>${user.updated_at}</td>
                      </tr>`
				document
					.getElementById('users-list')
					.insertAdjacentHTML('beforeend', body)
			}
		},
		
		createUser: async () => {
			const name = document.getElementById('name').value
			const profile = document.getElementById('profile').value
			const dateOfBirth = document.getElementById('date-of-birth').value

			// リクエスト
			const body = { name: name, profile: profile, date_of_birth: dateOfBirth }

			const res = await fetch(BASE_URL, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(body),
			})
      console.log('👉 res', res)

			const resJson = await res.json()
      console.log('👉 resJson', resJson)

			alert(resJson, message)
			window.location.href('/')
		},
	}
})()
