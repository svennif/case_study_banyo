/**
 * This script handles the functionality for displaying and filtering unprocessed orders in the stock page.
 * It imports the `getData` function from the `services.js` module and uses it to fetch the data.
 * The fetched data is then displayed in a table, and a search input is provided to filter the data based on order number, store, or product.
 * The table is dynamically updated as the user types in the search input.
 * The script also handles tab navigation for different sections of the stock page.
 */
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
    table.classList.add('sortable')

		// Create table header row
		const headerRow = document.createElement('tr')
		if (data.length > 0) {
			Object.keys(data[0]).forEach((key) => {
				const th = document.createElement('th')
				th.classList.add('table-header')
				th.textContent = key.replace('_', ' ')
				headerRow.appendChild(th)
			})
		} else if (data.length === 0) {
			const span = document.createElement('span')
			span.classList.add('no-unprocessed-orders')
			span.textContent = 'No unprocessed orders'
			unprocessedElements.appendChild(span)
		}
		table.appendChild(headerRow)

		// Create table data rows
		data.forEach((item) => {
      // Create the table rows
			const tr = document.createElement('tr')
			Object.values(item).forEach((value) => {
        // Create the table data cell and add the value to it
				const td = document.createElement('td')
        td.classList.add('table-data')
				td.textContent = value.replace('_', ' ')
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

  // Function to filter data, order number store or product
  const filterInput = document.getElementById('search')

  filterInput.addEventListener('input', (e) => {
    const filter = e.target.value.toUpperCase()
    const table = document.querySelector('table')
    const tr = table.getElementsByTagName('tr')
    const headerRow = tr[0] 
    for (let i = 1; i < tr.length; i++) { 
      const td = tr[i].getElementsByTagName('td')
      let found = false
      for (let j = 0; j < td.length; j++) {
        const cell = td[j]
        if (cell) {
          if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
            found = true
          }
        }
      }
      if (found) {
        tr[i].style.display = ''
      } else {
        tr[i].style.display = 'none'
      }
    }
    headerRow.style.display = ''
  })
})
