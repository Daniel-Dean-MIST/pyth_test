const { EvmPriceServiceConnection } = require("@pythnetwork/pyth-evm-js");

const connection = new EvmPriceServiceConnection("https://hermes.pyth.network"); // See Hermes endpoints section below for other endpoints

const priceIds = [
  // You can find the ids of prices at https://pyth.network/developers/price-feed-ids#pyth-evm-stable
  "0xd183ffe0155e8a55e7274155a14ea2e8b54059cef471f88fa3f7eb4b5d8dbc24", // ZEN/USD price id
  "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a", // USDC/USD price id
  "0xc9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33", // WBTC/USD price id
  "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // WETH/USD price id
  "0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221", // LINK/USD price id
  "0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd", // DAI/USD price id
  "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b", // USDT/USD price id
];

async function getPriceUpdateData() {
  // In order to use Pyth prices in your protocol you need to submit the price update data to Pyth contract in your target
  // chain. `getPriceFeedsUpdateData` creates the update data which can be submitted to your contract. Then your contract should
  // call the Pyth Contract with this data.
  const priceUpdateData = await connection.getPriceFeedsUpdateData(priceIds);

  return priceUpdateData;
} // getPriceUpdateData

async function getPriceFeedOutput() {
  // In order to use Pyth prices in your protocol you need to submit the price update data to Pyth contract in your target
  // chain. `getPriceFeedsUpdateData` creates the update data which can be submitted to your contract. Then your contract should
  // call the Pyth Contract with this data.
  const priceInfos = await connection.getLatestPriceFeeds(priceIds);

  return priceInfos;
} // getPriceUpdateData

(async () => {
  const priceUpdateData = await getPriceUpdateData();
  console.log(`priceUpdateData:`);
  console.log(priceUpdateData)
  console.log()

  const p_feed = await getPriceFeedOutput();
  
  for (const priceInfo of p_feed) {
    console.log(`Price ID: ${priceInfo.id}`);
    console.log(`Price: ${priceInfo.price.price}`);
    console.log(`Decimals: ${priceInfo.price.expo}`);
    console.log(`Timestamp: ${priceInfo.price.publishTime}`);
    console.log(`-------------------`);
  }

})();
