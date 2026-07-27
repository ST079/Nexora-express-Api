import axios from "axios";

import config from "../config/config.js";

const payViaKhalti = async (data) => {
  try {
    const body = {
      return_url: `${config.app_url}/${config.return_url}`,
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

export { payViaKhalti };
