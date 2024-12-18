document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Ensure the nav links are hidden by default
    navLinks.classList.remove('active');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggle the 'active' class to show/hide the dropdown
    });
});