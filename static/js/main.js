function slidebar() {
    document.getElementById('activate').toggleAttribute('activate')
}

// js for form.html

const form_page = document.querySelector('.body')
const computed_style = getComputedStyle(form_page)
const brand = document.getElementById('brand')
if (computed_style.backgroundColor == 'rgb(245, 245, 245)') {
    const items = document.getElementsByClassName('nav-link')
    for (let item of items) {
        item.style.color = 'rgba(0, 0, 0, 0.9)'
    }
    brand.style.color = 'rgba(0, 0, 0, 0.9)'
}

