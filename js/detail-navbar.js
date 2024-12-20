const menuToggle2 = document.querySelector('.menu-toggle2');
const navLinks = document.querySelector('#nav-links');


menuToggle2.addEventListener('click', () => {
    menuToggle2.classList.toggle('open');
    navLinks.classList.toggle('show');
});

