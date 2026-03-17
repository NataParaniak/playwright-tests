export async function getAllProductPricesValue(
    products: {
        getPriceValue(): Promise<number>;
    }[],
): Promise<number[]> {
    return Promise.all(products.map(p => p.getPriceValue()));
}
