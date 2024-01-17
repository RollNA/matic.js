const { getZkEvmClient, from, zkEvm } = require('../utils_zkevm');

const execute = async () => {
    const client = await getZkEvmClient();

    const isExited = await client.isExited('0x7d9321097f73d64a9fecfaea653ea95423a7a4b19703e7e0bb357ce707fca4c1');

    console.log("isExited", isExited);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})