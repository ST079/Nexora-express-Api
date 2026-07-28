import paymentModel from "../models/Payment.js";

const checkPaymentStatus = async (paymentId) => {
  return await paymentModel.findById(paymentId);
};

export default {
  checkPaymentStatus,
};
