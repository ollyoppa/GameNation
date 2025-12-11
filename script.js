document.getElementById('topUpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the default form submission

    const userId = document.getElementById('userId').value;
    const amount = document.getElementById('amount').value;
    const messageEl = document.getElementById('message');

    // Basic client-side validation
    if (!userId || !amount) {
        messageEl.textContent = 'Please enter a User ID and select an amount.';
        messageEl.className = 'error'; // Assume you add an 'error' style in CSS
        messageEl.style.color = 'red';
        messageEl.classList.remove('hidden');
        return;
    }

    // Prepare data for the server
    const topUpData = {
        userId: userId,
        amount: amount,
        currency: 'USD' // This should be calculated/determined by the back-end
    };

    // --- STEP 1: Send data to your back-end server ---
    fetch('/api/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(topUpData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // --- STEP 2: The back-end returns a redirect URL from the payment gateway ---
            // You would typically redirect the user to the payment gateway's hosted page (e.g., Stripe, PayPal)
            messageEl.textContent = 'Redirecting to payment gateway...';
            messageEl.style.color = 'blue';
            messageEl.classList.remove('hidden');

            // Replace this with the actual redirect:
            // window.location.href = data.redirectUrl; 
            
            // For this example, we'll just log and display a success message
            console.log('Simulated redirect to:', data.redirectUrl);
            messageEl.textContent = `Payment initiated for User ID ${userId} for ${amount} Gems. (Simulated)`;
            messageEl.style.color = 'green';


        } else {
            messageEl.textContent = data.message || 'Payment initiation failed.';
            messageEl.style.color = 'red';
            messageEl.classList.remove('hidden');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        messageEl.textContent = 'An unexpected error occurred. Please try again.';
        messageEl.style.color = 'red';
        messageEl.classList.remove('hidden');
    });
});
