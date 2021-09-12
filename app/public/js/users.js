const usersModule = (() => {
	const BASE_URL = 'http://localhost:3000/api/v1/users'

	// ヘッダーの設定
	const headers = new Headers()
	// リクエストのbodyにjsonを渡すと伝える。
	headers.set('Content-Type', 'application/json')

	const handleError = async (res) => {
		const resJson = await res.json()

		switch (res.status) {
			case 200:
				alert(resJson.message)
				window.location.href = '/'
				break
			case 201:
				alert(resJson.message)
				window.location.href = '/'
				break
			case 400:
				// リクエストのパラメータ間違い
				alert(resJson.error)
				break
			case 404:
				// 指定したリソースが見つからない。
				alert(resJson.error)
				break
			case 500:
				// サーバーの内部エラー
				alert(resJson.error)
				break
			default:
				alert('なんらかのエラーが発生しました。')
				break
		}
	}

	// 即時関数なのでこのモジュールが読み込まれたタイミングで実行されるメソッドを定義
	return {
		fetchAllUsers: async () => {
			const res = await fetch(BASE_URL)
			const users = await res.json()

			for (let i = 0; i < users.length; i++) {
				const user = users[i]
				const body = `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.profile}</td>
                        <td>${user.date_of_birth}</td>
                        <td>${user.created_at}</td>
                        <td>${user.updated_at}</td>
                        <td><a href="edit.html?uid=${user.id}">編集</a></td>
                      </tr>`
				document
					.getElementById('users-list')
					.insertAdjacentHTML('beforeend', body)
			}
		},

		createUser: async () => {
			console.log('処理開始');
			const name = document.getElementById('name').value
			const profile = document.getElementById('profile').value
			const dateOfBirth = document.getElementById('date-of-birth').value

			// リクエスト
			console.log('リクエストbodyを作成します。');
			const body = { name: name, profile: profile, date_of_birth: dateOfBirth }

			console.log('通信を開始してレスポンス結果を待ちます。');
			const res = await fetch(BASE_URL, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(body), //javascriptのオブジェクトをjson文字列に変換
			})
      console.log('👉 res', res)

			return handleError(res)
		},

		setExistingValue: async (uid) => {
			const res = await fetch(BASE_URL + '/' + uid)
			const resJson = await res.json()

			document.getElementById('name').value = resJson.name
			document.getElementById('profile').value = resJson.profile
			document.getElementById('date-of-birth').value = resJson.date_of_birth
		},

		saveUser: async (uid) => {
			console.log('保存ボタンが押されました。');
			const name = document.getElementById('name').value
			const profile = document.getElementById('profile').value
			const dateOfBirth = document.getElementById('date-of-birth').value

			// リクエスト
			const body = { name: name, profile: profile, date_of_birth: dateOfBirth }

			const res = await fetch(BASE_URL + '/' + uid, {
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(body), //javascriptのオブジェクトをjson文字列に変換
			})

			return handleError(res)
		},

		deleteUser: async (uid) => {
			const ret = window.confirm('このユーザーを削除しますか？')

			if (!ret) {
				return
			} else {
				const res = await fetch(BASE_URL + '/' + uid, {
					method: 'DELETE',
					headers: headers,
				})
				return handleError(res)
			}
		},
	}
})()
