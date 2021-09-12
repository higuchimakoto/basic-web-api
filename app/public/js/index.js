const indexModule = (() => {
	// 検索ボタンを押した時のイベントリスナーを設定
	document.getElementById('search-btn').addEventListener('click', () => {
		return searchModule.searchUsers()
	})

	//userModuleのfetchAllUsersを呼び出す
	return usersModule.fetchAllUsers()
})()
