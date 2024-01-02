const { getZkEvmClient, from, zkEvm } = require('../utils_zkevm');

const execute = async () => {
    const client = await getZkEvmClient();

    const isRolloutExitable = await client.isRolloutExitable('0x3ce9d872a615ee7c1e78a528d9c3a75bbd4969ce5c4329e665736331fd307f15');

    console.log("isRolloutExitable", isRolloutExitable);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})