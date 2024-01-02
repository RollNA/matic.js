import { Web3SideChainClient } from ".";
import { BridgeUtil, ZkEvmBridge } from "../zkevm";
import { service } from "../services";
import { IBaseClientConfig } from "..";

export class ZkEvmBridgeClient {

    client: Web3SideChainClient<IBaseClientConfig> = new Web3SideChainClient();
    bridgeUtil: BridgeUtil;
    rootChainBridge: ZkEvmBridge;
    childChainBridge: ZkEvmBridge;


    /**
     * check whether a txHash is synced with child chain
     *
     * @param {string} txHash
     * @returns
     * @memberof ZkEvmBridgeClient
     */
    isRollinClaimable(txHash: string) {
        return Promise.all([this.rootChainBridge.networkID(), this.bridgeUtil.getBridgeLogData(
            txHash, true
        )]).then(result => {
            return service.zkEvmNetwork.getBridgeTransactionDetails(
                this.client.config.network,
                result[0],
                result[1].depositCount
            );
        }).then(details => {
            return details.ready_for_claim;
        });
    }

    /**
     * check whether proof is submitted on parent chain
     *
     * @param {string} txHash
     * @returns
     * @memberof ZkEvmBridgeClient
     */
    isRolloutExitable(txHash: string) {
        return Promise.all([this.childChainBridge.networkID(), this.bridgeUtil.getBridgeLogData(
            txHash, false
        )]).then(result => {
            return service.zkEvmNetwork.getBridgeTransactionDetails(
                this.client.config.network,
                result[0],
                result[1].depositCount
            );
        }).then(details => {
            return details.ready_for_claim;
        });
    }

    /**
     * check whether deposit is completed
     *
     * @param {string} txHash
     * @returns
     * @memberof ZkEvmBridgeClient
     */
    isRollined(txHash: string) {
        return this.bridgeUtil.getBridgeLogData(
            txHash, true
        ).then(result => {
            return this.childChainBridge.isClaimed(result.depositCount);
        });
    }

    /**
     * check whether deposit is completed
     *
     * @param {string} txHash
     * @returns
     * @memberof ZkEvmBridgeClient
     */
    isRollouted(txHash: string) {
        return this.bridgeUtil.getBridgeLogData(
            txHash, false
        ).then(result => {
            return this.rootChainBridge.isClaimed(result.depositCount);
        });
    }

}
