import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import productModel from "../models/Product.js";
import promptAi from "../utils/ai.js";
import uploadFiles from "../utils/fileUploader.js";

const getAllProducts = async (payload) => {
  const { category, brands, name, min, max, limit, offset, createdBy } =
    payload;
  const filters = {};
  const sort = payload.sort ? JSON.parse(payload.sort) : {};
  if (category) filters.category = { $regex: category, $options: "i" };
  if (brands) {
    filters.$or = brands.split(",").map((brand) => ({
      brand: {
        $regex: `^${brand.trim()}$`,
        $options: "i",
      },
    }));
  }
  if (name) filters.name = { $regex: name, $options: "i" };
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (createdBy) filters.createdBy = createdBy;

  console.log(brands);
  const productData = await productModel
    .find(filters)
    .sort(sort)
    .limit(limit ? parseInt(limit) : 0)
    .skip(offset ? parseInt(offset) : 0);
  console.log(productData);
  return productData;
};

const getProductById = async (id) => {
  const data = await productModel.findById(id);

  if (!data)
    throw {
      status: 404,
      message: "Product Not Found! ",
    };

  return { data: data, status: 200, message: "Product Found" };
};

const createProduct = async (payload, files, userId) => {
  const uploadedFiles = await uploadFiles(files);
  const imageUrls = uploadedFiles.map((item) => item.url);

  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", payload.name)
    .replace("%s", payload.category)
    .replace("%s", payload.brand);

  const description = payload.description ?? (await promptAi(promptMessage));
  return await productModel.create({
    ...payload,
    description,
    imageUrls,
    createdBy: userId,
  });
};

const updateProduct = async (id, payload, files) => {
  await getProductById(id);

  const updateData = data;

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFiles(files);
    const imageUrls = uploadedFiles.map((item) => item.url);
    updateData.imageUrls = imageUrls;
  }

  //{new:true}-> gives the latest updated payload
  return await productModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteProduct = async (id) => {
  await getProductById(id);
  await productModel.findByIdAndDelete(id);
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
