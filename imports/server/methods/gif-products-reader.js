/* GIF Product Reader */

console.log('loading gif-product-reader.js');

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');



const reloadSingleProduct = async function (args) {

	try {
		const License = await getContract('License');
		const { productId } = args;
		const product = await License.products(productId);
		const productName = b32s(product.name);

		info(`Found product ${productName}`, { product });

		Products.upsert({name: productName, product_id: productId}, {$set: {
			product_id: productId,
			name: productName,
			owner: product.productOwner,
			address: product.addr,
			policy_flow: b32s(product.policyFlow),
			release: b32s(product.release),
			policy_token: product.policyToken,
			approved: product.approved,
			paused: product.paused
		}})
	} catch (err) {
		error(`Error ReloadSingleProduct, ${err.message}`);
	}
}

const loadProducts = async() => {

	try {
		const License = await getContract('License');
		const productIdIncrement = await License.productIdIncrement();

		info(`License: ${productIdIncrement} products found`);

		for (var productId = 1; productId <= productIdIncrement; productId += 1) {
			await reloadSingleProduct({ productId });
		}
	} catch (err) {
		error(`Error loadProducts, ${err.message}`);
	}

};

const reloadProducts = () => {

	Products.remove({});
	loadProducts();

}

module.exports = { loadProducts, reloadProducts, reloadSingleProduct };

