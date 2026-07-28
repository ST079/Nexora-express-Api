import paymentService from "../services/payment.service.js";
const checkPaymentStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("paymentid", id);
    const payment = await paymentService.checkPaymentStatus(id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json(payment);
  } catch (error) {
    next(error);
  }
};
export default { checkPaymentStatus };
