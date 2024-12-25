const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

const ProductDetail = sequelize.define('product_details', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product, // Liên kết với bảng products
            key: 'id',
        },
    },
    description: {
        type: DataTypes.TEXT,
    },
    manufacturer: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: false,
});

module.exports = ProductDetail;
