import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Create a payment intent on your server
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(/* Include any necessary data */),
        });

        const { clientSecret } = await response.json();

        // Confirm the payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                // Include other payment method details if necessary
            },
        });

        if (result.error) {
            console.error(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            // Payment succeeded
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card details
                <CardElement />
            </label>

            <button type="submit">Pay</button>
        </form>
    );
}
