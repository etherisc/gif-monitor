/* GIF Product Reader */

console.log('loading gif-product-reader.js');

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');



const loadSingleProduct = async function ({ productId }) {

	try {
		const License = await getContract('License');
		const product = await License.products(productId);
		const productObj = {
			product_id: productId,
			name: b32s(product.name),
			product_contract: product.productContract,
			policy_flow: b32s(product.policyFlow),
			release: b32s(product.release),
			state: product.state
		};

		Products.upsert({name: productObj.name, product_id: productId}, {$set: productObj})

		info(`Found product ${productObj.name}`, { product });

	} catch (err) {
		error(`Error ReloadSingleProduct, ${err.message}`);
	}
}

const loadProducts = async() => {

	try {
		const License = await getContract('License');
		const productCount = await License.productCount();

		info(`License: ${productCount} products found`);

		for (var productId = 1; productId <= productCount; productId += 1) {
			await loadSingleProduct({ productId });
		}
	} catch (err) {
		error(`Error loadProducts, ${err.message}`);
	}

};

const reloadProducts = () => {

	Products.remove({});
	loadProducts();

}

module.exports = { loadProducts, reloadProducts, loadSingleProduct };

