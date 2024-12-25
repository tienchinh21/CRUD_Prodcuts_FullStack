const Product = require("../models/product");
const products = require("../models/product");
const ProductDetail = require("../models/productDetails");

const getAllProducts = async () => {
    let result = await products.findAll({
        order: [["created_at", "ASC"]],
    });
    return result;
}

const createProduct = async ({ name, price, details }) => {
    try {
        const product = await Product.create({ name, price });
        if (details) {
            const { description, manufacturer, stock } = details;
            await ProductDetail.create({
                product_id: product.id,
                description,
                manufacturer,
                stock
            });
        }

        return product;
    } catch (error) {
        console.error('Error in createProduct:', error);
        throw error;
    }
}

const updateProduct = async (id, data) => {
    let result = await products.update(data, {
        where: {
            id: id
        }
    })
    return result;
}

const deleteProduct = async (id) => {
    let result = await products.destroy({
        where: {
            id: id
        }
    })
    return result;
}

const getProductDetail = async (productId) => {
    try {
        const product = await Product.findOne({
            where: { id: productId },
            include: [
                {
                    model: ProductDetail,
                    as: 'product_detail',
                },
            ],
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetail
}