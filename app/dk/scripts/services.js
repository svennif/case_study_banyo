let getBasicServiceURL = function () {
	return 'http://localhost:8080/get-data_sven.php'
}

export async function getData() {
	try {
		const response = await fetch(getBasicServiceURL(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`)
		}
		return response.json()
	} catch (error) {
		console.error('Fetch Error:', error)
		throw error
	}
}
