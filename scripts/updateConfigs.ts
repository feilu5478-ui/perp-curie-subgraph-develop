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
                        "priceFeedAddress": "0xd952F3A1638445eda8CA25D093a3FB95b9A10947",
                        "symbol": "WETH"
                    },
                    {
                        "address": "0xda1210833989DbE389CDF71c27E6CADaf757CAB9",
                        "decimals": 8,
                        "name": "Wrapped Bitcoin",
                        "priceFeedAddress": "0xd952F3A1638445eda8CA25D093a3FB95b9A10947",
                        "symbol": "WBTC"
                    }
                ],
                contracts: {
                    "AccountBalance": {
                        "address": "0xD645C301A87255082e74052D449613d2D3A67c15",
                        "createdBlockNumber": 9528797,
                        "name": "contracts/AccountBalance.sol:AccountBalance"
                    },
                    "ClearingHouse": {
                        "address": "0x065536c3e366F28C4378A7939b4c540670ae4E43",
                        "createdBlockNumber": 9528802,
                        "name": "contracts/ClearingHouse.sol:ClearingHouse"
                    },
                    "ClearingHouseConfig": {
                        "address": "0x9199f6848b189024807987Ee6Ab45EC905856B52",
                        "createdBlockNumber": 9528793,
                        "name": "contracts/ClearingHouseConfig.sol:ClearingHouseConfig"
                    },
                    "CollateralManager": {
                        "address": "0x84e1D14Defc6B18bc72b9d5A530c745f400d9Fa0",
                        "createdBlockNumber": 9528800,
                        "name": "contracts/CollateralManager.sol:CollateralManager"
                    },
                    "DelegateApproval": {
                        "address": "0x7b90d369133dC0C65aCcFA5eF20714b3Bc22fEd6",
                        "createdBlockNumber": 9528801,
                        "name": "contracts/DelegateApproval.sol:DelegateApproval"
                    },
                    "ETHUSDChainlinkPriceFeedV2": {
                        "address": "0x77e29d2c02174cb78fa6b505d9668958aa8ef5c1",
                        "createdBlockNumber": 9528687,
                        "name": "contracts/ChainlinkPriceFeedV2.sol:ChainlinkPriceFeedV2"
                    },
                    "Exchange": {
                        "address": "0xc6325545732ab188084BbD35A495c0C42b148BD4",
                        "createdBlockNumber": 9528796,
                        "name": "contracts/Exchange.sol:Exchange"
                    },
                    "InsuranceFund": {
                        "address": "0xEa893901a57543e08787afD5806c32A721C6DadC",
                        "createdBlockNumber": 9528798,
                        "name": "contracts/InsuranceFund.sol:InsuranceFund"
                    },
                    "MarketRegistry": {
                        "address": "0xD0be37F945DdaEBf1Af60F0dE5C78e3A42f1F3cf",
                        "createdBlockNumber": 9528794,
                        "name": "contracts/MarketRegistry.sol:MarketRegistry"
                    },
                    "OrderBook": {
                        "address": "0x8EfE7E3C8153EE8B27d280AF206728FF713d9348",
                        "createdBlockNumber": 9528795,
                        "name": "contracts/OrderBook.sol:OrderBook"
                    },
                    "QuoteToken": {
                        "address": "0xE62CC8B89df2F354D4abB6e3cEFEe2d6fa091f3b",
                        "createdBlockNumber": 9528689,
                        "name": "contracts/QuoteToken.sol:QuoteToken"
                    },
                    "Vault": {
                        "address": "0xa328b300dfEdf4d2062eC712D6BcC2be1c96bcD0",
                        "createdBlockNumber": 9528799,
                        "name": "contracts/Vault.sol:Vault"
                    },
                    "ETH": {
                        "address": "0x23383BA49A2D72fD3b617751A0efD3e7Df58Bf06",
                        "createdBlockNumber": 9528690,
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
                        "address": "0xc23d25eab268fd2099f5199a0c3f22393ccf9a4f",
                        "baseAddress": "0x23383ba49a2d72fd3b617751a0efd3e7df58bf06",
                        "baseSymbol": "ETH",
                        "quoteAddress": "0xe62cc8b89df2f354d4abb6e3cefee2d6fa091f3b",
                        "quoteSymbol": "PQUOTE"
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
