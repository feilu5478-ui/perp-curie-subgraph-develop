![image](https://user-images.githubusercontent.com/105896/160323162-cf5b2e70-a9e1-49c8-a84e-da18df6e4f7b.png)

# perp-curie-subgraph

## Changelog

[Changelog](CHANGELOG.md)

## Subgraphs

### The Graph

- Optimism
    - Playground: https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism
    - HTTP: `https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    - WebSocket: `wss://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    - Healthcheck: `https://api.thegraph.com/index-node/graphql`
- Optimism Goerli
    - Playground: https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism-goerli
    - HTTP: `https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli`
    - WebSocket: `wss://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli`
    - Healthcheck: `https://api.thegraph.com/index-node/graphql`

### Satsuma

- Optimism
    - Playground: https://subgraph.satsuma-prod.com/perp/perpetual-v2-optimism/playground
    - HTTP: `https://subgraph.satsuma-prod.com/<SATSUMA_QUERY_KEY>/perp/perpetual-v2-optimism/api`
    - Healthcheck: `https://subgraph.satsuma-prod.com/<SATSUMA_QUERY_KEY>/perp/perpetual-v2-optimism/status`

## Development

### Checklist

- `scripts/updateABIs.ts`
  - when adding new contracts, remember to include the newly added contract names to `abiNames` so it would be pre-processed

## Deployment

### Configure

Update `scripts/updateConfigs.ts` if we're using [graft](https://thegraph.com/docs/en/developing/creating-a-subgraph/#grafting-onto-existing-subgraphs) to speed up indexing.

### Local Deploy

We will automatically trigger deployments in CI, but we can also deploy from a local machine.

```bash
npm i

# deploy to The Graph
npx graph auth --product hosted-service <THE_GRAPH_ACCESS_TOKEN>
# create a subgraph in the graph dashboard first (need GitHub admin permission)
npm run deploy-the-graph:optimism

# deploy to Satsuma
npm run codegen-satsuma:optimism
npx graph deploy perpetual-v2-optimism --version-label $(git rev-parse --short HEAD) --node https://app.satsuma.xyz/api/subgraphs/deploy --ipfs https://api.thegraph.com/ipfs/ --deploy-key <SATSUMA_DEPLOY_KEY>
```

### Post Deploy

Wait until all three subgraphs are synced, then click "Promote to Live" button on the newly deployed version to enable it on Satsuma dashboard. Otherwise, clients might get different results from The Graph and Satsuma.

---

> If any features/functionalities described in the Perpetual Protocol documentation, code comments, marketing, community discussion or announcements, pre-production or testing code, or other non-production-code sources, vary or differ from the code used in production, in case of any dispute, the code used in production shall prevail.

## 部署到Satsuma结果：
```
npm run deploy-satsuma:sepolia

> perp-curie-subgraph@2.0.0 deploy-satsuma:sepolia
> npm run codegen-satsuma:sepolia && graph deploy --version-label v1 --node https://subgraphs.alchemy.com/api/subgraphs/deploy --ipfs https://ipfs.satsuma.xyz --deploy-key 6vVxe0hHhfjXl perp-v2-sepolia


> perp-curie-subgraph@2.0.0 codegen-satsuma:sepolia
> npm run generate-manifest-satsuma:sepolia && npm run generate-constants:sepolia && graph codegen


> perp-curie-subgraph@2.0.0 generate-manifest-satsuma:sepolia
> npm run prepare:sepolia && mustache configs/sepolia.json subgraph.template.yaml > subgraph.yaml


> perp-curie-subgraph@2.0.0 prepare:sepolia
> npm run update-configs && npm run clean


> perp-curie-subgraph@2.0.0 update-configs
> ts-node ./scripts/updateConfigs.ts


> perp-curie-subgraph@2.0.0 clean
> rimraf generated


> perp-curie-subgraph@2.0.0 generate-constants:sepolia
> npm run prepare:sepolia && mustache configs/sepolia.json src/constants/index.ts.template > src/constants/index.ts


> perp-curie-subgraph@2.0.0 prepare:sepolia
> npm run update-configs && npm run clean


> perp-curie-subgraph@2.0.0 update-configs
> ts-node ./scripts/updateConfigs.ts


> perp-curie-subgraph@2.0.0 clean
> rimraf generated

  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
√ Apply migrations
√ Load subgraph from subgraph.yaml
  Load contract ABI from abis\MarketRegistry.json
  Load contract ABI from abis\Vault.json
  Load contract ABI from abis\Exchange.json
  Load contract ABI from abis\ClearingHouse.json
  Load contract ABI from abis\AccountBalance.json
  Load contract ABI from abis\InsuranceFund.json
  Load contract ABI from abis\CollateralManager.json
  Load contract ABI from abis\DelegateApproval.json
√ Load contract ABIs
  Generate types for contract ABI: MarketRegistry (abis\MarketRegistry.json)
  Write types to generated\MarketRegistry\MarketRegistry.ts
  Generate types for contract ABI: Vault (abis\Vault.json)
  Write types to generated\Vault\Vault.ts
  Generate types for contract ABI: Exchange (abis\Exchange.json)
  Write types to generated\Exchange\Exchange.ts
  Generate types for contract ABI: ClearingHouse (abis\ClearingHouse.json)
  Write types to generated\ClearingHouse\ClearingHouse.ts
  Generate types for contract ABI: AccountBalance (abis\AccountBalance.json)
  Write types to generated\AccountBalance\AccountBalance.ts
  Generate types for contract ABI: InsuranceFund (abis\InsuranceFund.json)
  Write types to generated\InsuranceFund\InsuranceFund.ts
  Generate types for contract ABI: CollateralManager (abis\CollateralManager.json)
  Write types to generated\CollateralManager\CollateralManager.ts
  Generate types for contract ABI: DelegateApproval (abis\DelegateApproval.json)
  Write types to generated\DelegateApproval\DelegateApproval.ts
√ Generate types for contract ABIs
√ Generate types for data source templates
√ Load data source template ABIs
√ Generate types for data source template ABIs
√ Load GraphQL schema from schema.graphql
  Write types to generated\schema.ts
√ Generate types for GraphQL schema

Types generated successfully

  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
√ Apply migrations
√ Load subgraph from subgraph.yaml
  Compile data source: MarketRegistry => build\MarketRegistry\MarketRegistry.wasm
  Compile data source: Vault => build\Vault\Vault.wasm

- Compile subgraphINFO AS210: Expression is never 'null'.

  return protocolDayData!
         ~~~~~~~~~~~~~~~
   in src/utils/stores.ts(333,12)

  Compile data source: Exchange => build\Exchange\Exchange.wasm
  Compile data source: ClearingHouse => build\ClearingHouse\ClearingHouse.wasm

- Compile subgraphINFO AS210: Expression is never 'null'.

  return protocolDayData!
         ~~~~~~~~~~~~~~~
   in src/utils/stores.ts(333,12)

INFO AS210: Expression is never 'null'.

     return dayData!
            ~~~~~~~

 in src/utils/stores.ts(268,12)

INFO AS210: Expression is never 'null'.

             const fixedDataMap = baseTokenMap!.get(baseToken)
                                  ~~~~~~~~~~~~

 in src/mappings/clearingHouse.ts(307,34)

INFO AS210: Expression is never 'null'.

     return dayData!
            ~~~~~~~

 in src/utils/stores.ts(303,12)

  Compile data source: AccountBalance => build\AccountBalance\AccountBalance.wasm
  Compile data source: InsuranceFund => build\InsuranceFund\InsuranceFund.wasm
  Compile data source: CollateralManager => build\CollateralManager\CollateralManager.wasm
  Compile data source: DelegateApproval => build\DelegateApproval\DelegateApproval.wasm
√ Compile subgraph
  Copy schema file build\schema.graphql
  Write subgraph file build\MarketRegistry\abis\MarketRegistry.json
  Write subgraph file build\Vault\abis\Vault.json
  Write subgraph file build\Exchange\abis\Exchange.json
  Write subgraph file build\ClearingHouse\abis\ClearingHouse.json
  Write subgraph file build\AccountBalance\abis\AccountBalance.json
  Write subgraph file build\InsuranceFund\abis\InsuranceFund.json
  Write subgraph file build\CollateralManager\abis\CollateralManager.json
  Write subgraph file build\DelegateApproval\abis\DelegateApproval.json
  Write subgraph manifest build\subgraph.yaml
√ Write compiled subgraph to build\
  Add file to IPFS build\schema.graphql
                .. QmeTEnAMNTVNZSeEZATYkhHgEu6rWK6spUmBnC4uNj2DsM
  Add file to IPFS build\MarketRegistry\abis\MarketRegistry.json
                .. QmUs8ogRq7ALtfYXFpkPtaQajJ8T1pPtSSKv9VkxVn3qpG
  Add file to IPFS build\Vault\abis\Vault.json
                .. QmeeovHifWJtTMuJ7ibAhFMHij8DSr5ARwXE9mrno8pFf1
  Add file to IPFS build\Exchange\abis\Exchange.json
                .. QmYcb4KsiCjxgRNDUoLtQdLA4SxtJLSRJTLDBHvF7Nx9oc
  Add file to IPFS build\ClearingHouse\abis\ClearingHouse.json
                .. QmYRK9qCdMbh4q8YB6vxekmCZh2iR5s2x3hQQFb5cQBLHF
  Add file to IPFS build\AccountBalance\abis\AccountBalance.json
                .. QmXMVHJCN32Hb4kmve92ezjrxhNszRNPTMYXmA64CBKXSc
  Add file to IPFS build\InsuranceFund\abis\InsuranceFund.json
                .. QmcPixR2jrGUer9zCPbgksvd6QuQo32cFk1zRmx7E79aW8
  Add file to IPFS build\CollateralManager\abis\CollateralManager.json
                .. QmcpWcQ5qWT7hePNYefEPsDizqXu9DWLNdebuAztp5RnPd
  Add file to IPFS build\DelegateApproval\abis\DelegateApproval.json
                .. QmdwmJxM4iRK2EA7uZKvhCsWLwk7G1jd1fasQ5axKs8CmU
  Add file to IPFS build\MarketRegistry\MarketRegistry.wasm
                .. QmfEobTxPpeYyans4fSnfrZzjp6tV1fQYa7B2DmTomWGdf
  Add file to IPFS build\Vault\Vault.wasm
                .. Qma4eFjiXqryg5LdWgm7x5zvBR9RCBj7VruMJmH4sWCyae
  Add file to IPFS build\Exchange\Exchange.wasm
                .. QmQLuUDdAPY6FjAM9o5wEJoxchsEZMiAhdcPqEPrmciDiB
  Add file to IPFS build\ClearingHouse\ClearingHouse.wasm
                .. QmW6i6uyZg9mePKFpuDrGE8uPTrPBT8SUAQAZNr81F7fUQ
  Add file to IPFS build\AccountBalance\AccountBalance.wasm
                .. Qmahfhj1TCobC8PoetuLDDNGq7PDn9RrRaDyfusZcQmXtX
  Add file to IPFS build\InsuranceFund\InsuranceFund.wasm
                .. QmPGVAo4bkrsozdPpZ5EdZQkKsJQhkDCFXn5XwgfWGAgZy
  Add file to IPFS build\CollateralManager\CollateralManager.wasm
                .. Qma8dMWF7PxbwQVR1RZBDo7hYFVTAe7bvQjPKsCX1DQ54G
  Add file to IPFS build\DelegateApproval\DelegateApproval.wasm
                .. Qmdv3TpHebEUQPSdzSMWHbYYt8TcDnYdEPonzhoi7wchUW
√ Upload subgraph to IPFS

Build completed: QmbXjuKzddjAKbpMaQPikgTDx8Du5FN3gh2qvi4G9DMgvi

Deployed to https://subgraphs.alchemy.com/subgraphs/15325/versions/53413

Subgraph endpoints:
Queries (HTTP):     https://subgraph.satsuma-prod.com/e--s-team--270151/perp-v2-sepolia/version/v1/api
```

