function slidebar() {
    document.getElementById('activate').toggleAttribute('activate')
}

// js for form.html

function course_desc() {
    const wcolor = "you must pay &rupee500"
    let crs = document.querySelector('select').value
    if (crs == 'watercolor') {
        alert(wcolor)
    }
}