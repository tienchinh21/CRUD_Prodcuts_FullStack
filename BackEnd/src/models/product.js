const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const ProductDetail = require('./productDetails');

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: false
});

Product.hasOne(ProductDetail, { foreignKey: 'product_id' });
ProductDetail.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Product;