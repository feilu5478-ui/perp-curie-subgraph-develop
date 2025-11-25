import DependenciesOptimismGoerli from "@perp/curie-deployments/optimism-goerli/core/dependencies.json"
import MetadataOptimismGoerli from "@perp/curie-deployments/optimism-goerli/core/metadata.json"
import DependenciesOptimism from "@perp/curie-deployments/optimism/core/dependencies.json"
import MetadataOptimism from "@perp/curie-deployments/optimism/core/metadata.json"

import DependenciesOptimismGoerliPeriphery from "@perp/curie-deployments/optimism-goerli/periphery/dependencies.json"
import MetadataOptimismGoerliPeriphery from "@perp/curie-deployments/optimism-goerli/periphery/metadata.json"
import DependenciesOptimismPeriphery from "@perp/curie-deployments/optimism/periphery/dependencies.json"
import MetadataOptimismPeriphery from "@perp/curie-deployments/optimism/periphery/metadata.json"

import fs from "fs"

async function main(): Promise<void> {
    const configs = [
        {
            name: "sepolia",
            network: "sepolia",
            core: {
                chainId: 11155111,
                collaterals: [
                    {
                        "address": "0x51Fd3eB1325A8d9091Ed32D1412B159e095558b0",
                        "decimals": 18,
                        "name": "Wrapped Ether",
                        "priceFeedAddress": "0x0AF5C70D0eb85e40C1E6D670778A35A5b0ff8CE9",
                        "symbol": "WETH"
                    },
                    {
                        "address": "0xda1210833989DbE389CDF71c27E6CADaf757CAB9",
                        "decimals": 8,
                        "name": "Wrapped Bitcoin",
                        "priceFeedAddress": "0x0AF5C70D0eb85e40C1E6D670778A35A5b0ff8CE9",
                        "symbol": "WBTC"
                    }
                ],
                contracts: {
                    "AccountBalance": {
                        "address": "0x8Eae24D537b9EC2535EC1F2AB8D1C54F481dC7e1",
                        "createdBlockNumber": 9695360,
                        "name": "contracts/AccountBalance.sol:AccountBalance"
                    },
                    "ClearingHouse": {
                        "address": "0xcdEa7bEF2E550eC317E4FEc80Fc59B00AE271fa3",
                        "createdBlockNumber": 9695467,
                        "name": "contracts/ClearingHouse.sol:ClearingHouse"
                    },
                    "ClearingHouseConfig": {
                        "address": "0x9199f6848b189024807987Ee6Ab45EC905856B52",
                        "createdBlockNumber": 9528793,
                        "name": "contracts/ClearingHouseConfig.sol:ClearingHouseConfig"
                    },
                    "CollateralManager": {
                        "address": "0x4f6300619e0a0c2e7af6cb67F024f28955B844d9",
                        "createdBlockNumber": 9695365,
                        "name": "contracts/CollateralManager.sol:CollateralManager"
                    },
                    "DelegateApproval": {
                        "address": "0xd5B7D8C4a14875E619c23CcE1f2990aF1467F444",
                        "createdBlockNumber": 9695369,
                        "name": "contracts/DelegateApproval.sol:DelegateApproval"
                    },
                    "ETHUSDChainlinkPriceFeedV2": {
                        "address": "0x4aB0123054Cc53909818d4bBC356c14A29fcd65B",
                        "createdBlockNumber": 9499880,
                        "name": "contracts/ChainlinkPriceFeedV2.sol:ChainlinkPriceFeedV2"
                    },
                    "Exchange": {
                        "address": "0x4EEe99beA14d52515A94463ca4D1d739Ad2a0F5F",
                        "createdBlockNumber": 9695358,
                        "name": "contracts/Exchange.sol:Exchange"
                    },
                    "InsuranceFund": {
                        "address": "0xc37F218018F024CdDa1A5d97a4EeEd7c062D7D0a",
                        "createdBlockNumber": 9695362,
                        "name": "contracts/InsuranceFund.sol:InsuranceFund"
                    },
                    "MarketRegistry": {
                        "address": "0x2911377369fA73F97125eF1816Ac6475cADea3b6",
                        "createdBlockNumber": 9695355,
                        "name": "contracts/MarketRegistry.sol:MarketRegistry"
                    },
                    "OrderBook": {
                        "address": "0xBD7647440788BE523e7B9740D7f23B17b28c36a0",
                        "createdBlockNumber": 9695357,
                        "name": "contracts/OrderBook.sol:OrderBook"
                    },
                    "QuoteToken": {
                        "address": "0xB736Ce12ee74345600aeDFb9c27B6A8822D4C892",
                        "createdBlockNumber": 9695353,
                        "name": "contracts/QuoteToken.sol:QuoteToken"
                    },
                    "Vault": {
                        "address": "0x42F2202120Af3217868fdB356F98d87c3ED0c123",
                        "createdBlockNumber": 9695363,
                        "name": "contracts/Vault.sol:Vault"
                    },
                    "vETH": {
                        "address": "0x14aA73eB98C623C8712c445847873AD0D29BD834",
                        "createdBlockNumber": 9695354,
                        "name": "contracts/BaseToken.sol:BaseToken"
                    }
                },
                externalContracts: {
                    "USDC": "0x727e7D4CaF9F7D89E8425458A2A1FbF06a35F65e",
                    "UniswapV3Factory": "0xCbaec1555707dFAff3303ed6123Db16Eb67F1791",
                    "WETH9": "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"
                },
                pools: [
                    {
                        "address": "0x2d7ad7a7b7021e681b697cdf955169c710c95cb1",
                        "baseAddress": "0x14aA73eB98C623C8712c445847873AD0D29BD834",
                        "baseSymbol": "vETH",
                        "quoteAddress": "0xB736Ce12ee74345600aeDFb9c27B6A8822D4C892",
                        "quoteSymbol": "vUSDC"
                    }
                ],
                version: "2.4.3"
            }
        },
        {
            name: "optimismGoerli",
            network: "optimism-goerli",
            core: {
                ...MetadataOptimismGoerli,
                ...{ version: DependenciesOptimismGoerli["@perp/curie-contract"] },
            },
            periphery: {
                ...MetadataOptimismGoerliPeriphery,
                ...{ version: DependenciesOptimismGoerliPeriphery["@perp/curie-periphery-contract"] },
            },
        },
        {
            name: "optimism",
            network: "optimism",
            core: {
                ...MetadataOptimism,
                ...{ version: DependenciesOptimism["@perp/curie-contract"] },
            },
            periphery: {
                ...MetadataOptimismPeriphery,
                ...{ version: DependenciesOptimismPeriphery["@perp/curie-periphery-contract"] },
            },
            // NOTE: subgraph id exists in The Graph might not exist in Satsuma,
            // so we might need to set different graft.base
            // disable graft if you need to do a full re-index
            // To fetch the subgraph IDs:
            //     curl --location 'https://your/healthcheck/endpoint' \
            //         --header 'Content-Type: application/json' \
            //         --header 'Accept: application/json' \
            //         --data '{"query":"{\n  indexingStatusForCurrentVersion(subgraphName: \"perpetual-protocol/perpetual-v2-optimism\") {\n    subgraph\n  }\n}","variables":{}}'
            //
            // Healthcheck endpoints for each deployment target can be found in the README.
            // For Satsuma-based subgraph, log in to https://app.satsuma.xyz/
            //   -> choose target subgraph
            //   -> find "Deployment ID"
            graft: {
                base: "QmVyf7ovnBMjNJioxg2Z8h22JHSgrEZd58wCwqLhV9AdG8",
                baseForSatsuma: "QmVyf7ovnBMjNJioxg2Z8h22JHSgrEZd58wCwqLhV9AdG8",
                // The block number to restore and start re-syncing from.
                block: 113120599,
            },
        },
    ]

    for (const config of configs) {
        const configJson = JSON.stringify(config, null, 4)
        await fs.promises.writeFile(`configs/${config.name}.json`, configJson, "utf8")
    }
}

if (require.main === module) {
    main()
}
