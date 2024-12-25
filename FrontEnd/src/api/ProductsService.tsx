import axiosClient from "./axiosClient.ts";

const getAllProducts = async (): Promise<{ data: IProduct[] }> => {
  const result = await axiosClient.get("/products");
  return result.data;
};

const getProductDetail = async (id: string) => {
  const result = await axiosClient.get(`/products/${id}`);
  return result.data;
};

const createProduct = async (data: IProduct) => {
  const result = await axiosClient.post("/products", data);
  return result.data;
};

const updateProduct = async (data: IProduct) => {
  const result = await axiosClient.put("/products", data);
  return result.data;
};

const deleteProduct = async (id: string) => {
  const result = await axiosClient.delete(`/products/${id}`);
  return result.data;
};

export {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductDetail,
  deleteProduct,
};
