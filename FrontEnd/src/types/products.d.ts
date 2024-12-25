export {};

declare global {
    interface IProduct {
        id: string,
        name: string,
        price: number,
        details?: IProductDetail
    }

    interface IProductDetail {
        id: string,
        product_id: string,
        description: string,
        manufacturer: string,
        stock: number
    }
}

