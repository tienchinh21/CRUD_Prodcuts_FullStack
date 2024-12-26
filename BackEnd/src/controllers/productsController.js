const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../services/poductsService")

module.exports = {
    getProductsCtr: async (req, res) => {
        try {
            let result = await getAllProducts()
            return res.status(200).json({
                EC: 0,
                data: result
            })
        } catch (error) {
            console.log(error);
        }
    },
    getProductDetailCtr: async (req, res) => {
        try {
            const id = req.params.id;
            console.log("id", id);

            if (!id) {
                return res.status(400).json({
                    EC: 1,
                    message: 'Product ID is required',
                });
            }

            const product = await getProductDetail(id);

            return res.status(200).json({
                EC: 0,
                data: product,
            });
        } catch (error) {
            console.error('Error in getProductDetailCtr:', error);
            return res.status(500).json({
                EC: 1,
                message: error.message,
            });
        }
    },
    createProductCtr: async (req, res) => {
        try {
            const { name, price, details } = req.body;
            if (name && price) {
                let result = await createProduct({ name, price, details });
                return res.status(200).json({
                    EC: 0,
                    data: result
                })
            } else {
                return res.status(400).json({
                    EC: 1,
                    data: {
                        message: "Tên và giả sản phẩm không được bỏ trống"
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    updateProductCtr: async (req, res) => {
        try {
            const { id } = req.body;
            let result = await updateProduct(id, req.body);
            return res.status(200).json({
                EC: 0,
                data: result
            })
        } catch (error) {

        }
    },
    deleteProductCtr: async (req, res) => {
        const id = req.params.id
        let result = await deleteProduct(id)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
};