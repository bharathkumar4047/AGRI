document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form-container');
    const formBackdrop = document.querySelector('.form-backdrop');
    const form = document.getElementById('bioWasteForm');
    const message = document.getElementById('message');

    // Function to open the form
    document.getElementById('becomeSellerButton').addEventListener('click', () => {
        formContainer.style.display = 'block';
        formBackdrop.style.display = 'block';
    });

    // Function to close the form
    formBackdrop.addEventListener('click', () => {
        formContainer.style.display = 'none';
        formBackdrop.style.display = 'none';
    });

    // Form submission and validation
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const mobileNumber = document.getElementById('mobileNumber').value;
        const email = document.getElementById('email').value;
        const panCard = document.getElementById('panCard').value;

        // Regular expressions for validation
        const mobileRegex = /^[6-9]\d{9}$/;
        const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

        // Validate mobile number
        if (!mobileRegex.test(mobileNumber)) {
            message.style.color = 'red';
            message.textContent = 'Invalid mobile number. Please enter a 10-digit number starting with 6-9.';
            return;
        }

        // Validate email
        if (!email.includes('@') || !email.includes('.')) {
            message.style.color = 'red';
            message.textContent = 'Invalid email address. Please enter a valid email.';
            return;
        }

        // Validate PAN card number
        if (!panCardRegex.test(panCard)) {
            message.style.color = 'red';
            message.textContent = 'Invalid PAN card number. Format: ABCDE1234F.';
            return;
        }

        // Success message
        message.style.color = 'green';
        message.textContent = 'Form submitted successfully!';
    });
});
