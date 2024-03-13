import { getData } from './services.js'

$(document).ready(function () {
  const unprocessedElements = document.getElementById('get_unprocessed_orders_list')
	
  async function getStockData() {
    const loader = document.getElementById('loader')
    loader.style.display = 'block'
    if (loader.style.display === 'block') {

      // We clear the existing table, and rerun the function to display the new data
      unprocessedElements.textContent = ''  
    }
		try {
			const response = await getData()
			displayUnprocessedOrders(response)
		} catch (error) {
			console.error('Error:', error)
		} finally {
      loader.style.display = 'none'
    }
	}

	function displayUnprocessedOrders(data) {
    // We clear the existing table, and rerun the function to display the new data
    unprocessedElements.textContent = ''

		// Create table
		const table = document.createElement('table')

		// Create table header row
		const headerRow = document.createElement('tr')
		if (data.length > 0) {
			Object.keys(data[0]).forEach((key) => {
				const th = document.createElement('th')
        th.classList.add('table-header')
				th.textContent = key
				headerRow.appendChild(th)
			})
		} else if (data.length === 0) {
      const span = document.createElement('span');
      span.classList.add('no-unprocessed-orders');
      span.textContent = 'No unprocessed orders';
      unprocessedElements.appendChild(span);
    }
		table.appendChild(headerRow)

		// Create table data rows
		data.forEach((item) => {
			const tr = document.createElement('tr')
			Object.values(item).forEach((value) => {
				const td = document.createElement('td')
				td.textContent = value
				tr.appendChild(td)
			})
			table.appendChild(tr)
		})

		unprocessedElements.appendChild(table)
	}

	window.getStockData = getStockData

	// Function to get the tabs
	const tabs = document.querySelectorAll('[data-tab-value]')
	const tabContents = document.querySelectorAll('[data-tab-content]')
	const tab_active = document.querySelectorAll('.tab.tab-stock')

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			const target = document.querySelector(tab.dataset.tabValue)
			tabContents.forEach((tabContent) => {
				tabContent.classList.remove('active')
			})
			target.classList.add('active')
		})
	})

	tab_active.forEach((tab) => {
		tab.addEventListener('click', () => {
			tab_active.forEach((tab) => {
				tab.classList.remove('selected-tab')
			})
			tab.classList.add('selected-tab')
		})
	})
})
