import productsData from '../data/products.json';

type Product = {
    name: string;
    description: string;
    price: string;
};

export function getProductByName(name: string): Product {
    const product = productsData.products.find(p => p.name === name);

    if (!product) {
        throw new Error(`Product with name "${name}" not found in test data`);
    }

    return product;
}
