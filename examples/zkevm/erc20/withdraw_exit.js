const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');
const transactionHash = '0xe2d5130186432f10d9c60534e323ba3dd1e1a8739099816efb9aa5e3a0142b1b';

const execute = async () => {
  const client = await getZkEvmClient();
  const erc20Token = client.erc20(zkEvm.parent.erc20, true);

  const result = await erc20Token.withdrawExit(transactionHash);

  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
