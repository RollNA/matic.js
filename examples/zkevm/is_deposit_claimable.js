const { getZkEvmClient, from, zkEvm } = require('../utils_zkevm');

const execute = async () => {
    const client = await getZkEvmClient();

    const isDepositClaimable = await client.isDepositClaimable('0x91d60d848f204d95012a0cea7e0f33712e8ae75c2e8a20d13076d01aa1032b39');

    console.log("isDepositClaimable", isDepositClaimable);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})