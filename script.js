document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                const responseDiv = document.getElementById('formResponse');
                
                if (result.success) {
                    responseDiv.textContent = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.';
                    responseDiv.classList.remove('hidden');
                    contactForm.reset();
                } else {
                    responseDiv.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.';
                    responseDiv.style.background = '#ffd8d8';
                    responseDiv.style.color = '#582525';
                    responseDiv.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});