const closeMenuBtn = document.querySelector('.close-icon');
const openMenuBtn = document.querySelector('.open-icon');
const dropdownMenu = document.querySelector('.navbar-items');
const contactContainer = document.querySelector('.contact-container');


const toggleBtn = document.querySelector('.toggle-icon');


toggleBtn.addEventListener('click', function () {
    console.log('hej');
    openMenuBtn.classList.toggle('show');
    closeMenuBtn.classList.toggle('show');

    dropdownMenu.classList.toggle('show');

    contactContainer.classList.toggle('show');
})