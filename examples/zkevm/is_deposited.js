const { getZkEvmClient, from, zkEvm } = require('../utils_zkevm');

const execute = async () => {
    const client = await getZkEvmClient();

    const isDeposited = await client.isDeposited('0x91d60d848f204d95012a0cea7e0f33712e8ae75c2e8a20d13076d01aa1032b39');

    console.log("isDeposited", isDeposited);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})
