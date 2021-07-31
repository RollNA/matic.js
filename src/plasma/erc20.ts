import { BaseToken, Web3SideChainClient } from "@/model";
import BN from "bn.js";
import { ITransactionConfig } from "@/interfaces";
import { formatAmount } from "@/utils";
import { createTransactionConfig } from "@/utils/create_tx_config";
import { DepositManager } from "./deposit_manager";

export class ERC20 extends BaseToken {

    constructor(client: Web3SideChainClient, abi: string,
        public depositManager: DepositManager) {
        super(client, abi);
    }

    getBalance(tokenAddress: string, userAddress: string, isParent?: boolean) {
        const contract = this.getContract(tokenAddress, isParent);
        return createTransactionConfig(
            {
                txConfig: {},
                defaultTxConfig: this.parentDefaultConfig,
            }).then(config => {
                console.log("config", config);
                return contract.read<string>("balanceOf", config, userAddress);
            });
    }

    approve(tokenAddress: string, amount: BN | string | number, txConfig?: ITransactionConfig) {
        const contract = this.getContract(tokenAddress, true);
        const methodName = "approve";
        return createTransactionConfig(
            {
                txConfig,
                defaultTxConfig: this.parentDefaultConfig,
                txResult: contract.createTransaction(methodName),
                client: this.client.parent.client,
                isWrite: true
            }).then(config => {
                return contract.write(
                    "approve",
                    config,
                    this.depositManager.contract.address,
                    formatAmount(amount)
                );
            });
    }

}