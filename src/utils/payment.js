import axios from "axios";
import config from "../config/config.js";
import Stripe from "stripe";

const payViaKhalti = async (data) => {
  try {
    const body = {
      return_url: `${config.app_url}/${config.khalti.return_url}`,
      website_url: config.app_url,
      amount: data.amount * 100, // Convert to paisa
      purchase_order_id: data.purchase_order_id,
      purchase_order_name: data.purchase_order_name,
      customer_info: {
        name: data.customer_info.name,
        email: data.customer_info.email,
        phone: data.customer_info.phone,
      },
    };

    const response = await axios.post(config.khalti.api_url, body, {
      headers: {
        Authorization: "Key " + config.khalti.api_key,
      },
    });

    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error.message;
  }
};

const payViaStripe = async (data) => {
  const stripe = new Stripe(config.stripe_Secret_Key);

  return await stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency || "npr",
    metadata: {
      name: data.customer_info.name,
      email: data.customer_info.email,
      phone: data.customer_info.phone,
      purchase_order_id: data.purchase_order_id,
      purchase_order_name: data.purchase_order_name,
    },
  });
};

export { payViaKhalti, payViaStripe };
