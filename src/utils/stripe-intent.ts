const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)

const calculateOrderAmount = (itemId: string) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1088
}

export default async function handler(itemId: string) {
  try {
  // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      customer: 'cus_OP0fjcDLMumfvn',
      amount: 1088,
      currency: 'krw',

      payment_method_types: ['card'],
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      // payment_method_options: {
      //   card: {
      //     setup_future_usage: 'off_session',
      //   },
      // },
  
      setup_future_usage: 'off_session',

      // payment_method: 'pm_1NcD54E1PMbDvOF6uoEN3ntY',
      // off_session: true,
      // confirm: true,
    })

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } catch (err) {
    // Error code will be authentication_required if authentication is needed
    console.log('Error code is: ', err.code)

    if (err.code) {
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id)
      console.log('PI retrieved: ', paymentIntentRetrieved.id)
    }
  }

  return {
    clientSecret: undefined,
  }
}