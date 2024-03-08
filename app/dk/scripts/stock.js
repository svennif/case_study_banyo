$(document).ready(function () {
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
