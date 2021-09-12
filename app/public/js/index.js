const indexModule = (() => {
	const path = window.location.pathname

	switch (path) {
		case '/':
			// 検索ボタンを押した時のイベントリスナーを設定
			document.getElementById('search-btn').addEventListener('click', () => {
				return searchModule.searchUsers()
			})

			//userModuleのfetchAllUsersを呼び出す
			return usersModule.fetchAllUsers()

		case '/create.html':
			document.getElementById('save-btn').addEventListener('click', () => {
				return usersModule.createUser()
			})

			document.getElementById('cancel-btn').addEventListener('click', () => {
				return (window.location.href = '/')
			})
			break
		default:
			break
	}
})()
