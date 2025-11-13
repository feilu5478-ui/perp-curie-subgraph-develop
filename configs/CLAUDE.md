# [根目录](../../CLAUDE.md) > **configs**

## 模块职责

configs 模块存储多网络配置文件，定义合约地址、代币信息、池配置等关键参数。这些配置文件与 mustache 模板结合，动态生成 subgraph.yaml 和 TypeScript 常量文件。

## 入口与启动

### 使用方式
```bash
# 生成 manifest
mustache configs/<network>.json subgraph.template.yaml > subgraph.yaml

# 生成常量文件
mustache configs/<network>.json src/constants/index.ts.template > src/constants/index.ts
```

### 支持的网络
- `optimism.json`: Optimism 主网
- `sepolia.json`: Sepolia 测试网
- `optimismGoerli.json`: Optimism Goerli 测试网（已废弃）

## 对外接口

### 配置文件结构

#### 1. 基础信息
```json
{
    "name": "sepolia",
    "network": "sepolia",
    "core": {
        "chainId": 11155111,
        "version": "2.4.3"
    }
}
```

#### 2. 抵押品配置 (core.collaterals)
```json
{
    "address": "0x51F...",      // 代币合约地址
    "decimals": 18,              // 代币精度
    "name": "Wrapped Ether",     // 代币名称
    "symbol": "WETH",            // 代币符号
    "priceFeedAddress": "0x95..." // 价格预言机地址
}
```

#### 3. 合约地址 (core.contracts)
```json
{
    "ContractName": {
        "address": "0x123...",              // 合约地址
        "createdBlockNumber": 9528794,       // 创建区块号
        "name": "contracts/File.sol:ContractName"  // 完整合约名
    }
}
```

**核心合约**:
- MarketRegistry: 市场注册表
- ClearingHouse: 清算所
- Vault: 金库
- AccountBalance: 账户余额
- Exchange: 交易所
- InsuranceFund: 保险基金
- CollateralManager: 抵押品管理
- DelegateApproval: 委托授权
- OrderBook: 订单簿

#### 4. 交易对配置 (core.pools)
```json
{
    "address": "0xc23d...",      // 池合约地址
    "baseAddress": "0x2338...",  // 基础代币地址
    "baseSymbol": "ETH",         // 基础代币符号
    "quoteAddress": "0xe62c...", // 计价代币地址
    "quoteSymbol": "PQUOTE"      // 计价代币符号
}
```

#### 5. 外部合约 (core.externalContracts)
```json
{
    "USDC": "0x727e...",         // USDC 合约地址
    "WETH9": "0xfFf9...",        // WETH9 合约地址
    "UniswapV3Factory": "0xCba..." // Uniswap V3 工厂地址
}
```

#### 6. 外围合约 (periphery)
```json
{
    "contracts": {
        "LimitOrderBook": { /* 合约信息 */ },
        "LimitOrderRewardVault": { /* 合约信息 */ }
    }
}
```

#### 7. 嫁接配置 (graft) - 可选
```json
{
    "graft": {
        "base": "QmVyf...",           // 基础子图 CID
        "baseForSatsuma": "QmVyf...", // Satsuma 基础 CID
        "block": 113120599            // 嫁接区块号
    }
}
```

## 关键依赖与配置

### 外部依赖
- `@perp/curie-deployments`: 合约部署信息源
- mustache: 模板引擎

### 模板文件
- `subgraph.template.yaml`: 子图清单模板
- `src/constants/index.ts.template`: 常量模板

### 生成的文件
- `subgraph.yaml`: 子图清单（不同网络生成不同版本）
- `src/constants/index.ts`: TypeScript 常量文件

## 数据模型

### 网络对比
| 网络 | Chain ID | 交易对数量 | 抵押品数量 | 状态 |
|------|----------|------------|------------|------|
| **Optimism** | 10 | 20+ | 4+ | 主网 |
| **Sepolia** | 11155111 | 1 | 2 | 测试网 |

### 地址格式
- 所有地址使用小写十六进制
- 以 `0x` 开头
- 长度为 42 字符

### 区块号
- 创建区块号：合约部署时的区块
- 用于设置子图起始块，提高索引效率

### Graft 功能
嫁接允许从已存在的子图开始索引：
- `base`: The Graph 的子图 CID
- `baseForSatsuma`: Satsuma 的子图 CID
- `block`: 从哪个区块开始重新索引

## 使用场景

### 1. 生成不同网络的 manifest
```bash
# Optimism
npm run generate-manifest:optimism

# Sepolia
npm run generate-manifest:sepolia
```

### 2. 生成不同网络的常量
```bash
npm run generate-constants:optimism
npm run generate-constants:sepolia
```

### 3. 完整构建流程
```bash
# 构建 Optimism 版本
npm run codegen:optimism

# 构建 Sepolia 版本
npm run codegen:sepolia

# 构建 Satsuma 版本
npm run codegen-satsuma:sepolia
```

## 测试与质量

### 当前状态
- **无验证**: 配置文件格式无自动验证
- **风险**: 地址错误可能导致子图无法同步

### 质量建议
1. **地址校验**: 验证所有地址格式正确
2. **区块号校验**: 确保区块号递增且合理
3. **完整性检查**: 确保所有必需字段都存在
4. **版本对齐**: 不同网络的版本号应保持一致

## 常见问题 (FAQ)

### Q: 如何添加新的网络？
A:
1. 在 `configs/` 下创建 `<network>.json`
2. 定义所有必需字段（contracts、collaterals、pools 等）
3. 更新 `package.json` 添加对应脚本
4. 更新文档和测试

### Q: 合约升级后如何更新？
A:
1. 从部署仓库获取新合约地址
2. 更新 `configs/<network>.json`
3. 更新 `createdBlockNumber`（通常使用当前最新区块）
4. 重新生成 manifest 和常量文件
5. 测试并部署

### Q: Graft 配置的作用？
A:
- 允许从已索引的历史数据开始
- 避免重新索引整个链历史
- 加速新版本部署
- Satsuma 和 The Graph 使用不同的 base CID

### Q: 为什么需要多套配置？
A:
- 不同网络有不同合约地址
- 支持主网和测试网分离
- 便于 A/B 测试和灰度发布
- 符合去中心化应用多链部署模式

## 相关文件清单

### 文件列表
```
configs/
├── optimism.json          # Optimism 主网配置 (~500行)
├── sepolia.json           # Sepolia 测试网配置 (~150行)
├── optimismGoerli.json    # Optimism Goerli 配置 (已废弃)
└── CLAUDE.md             # 本文档
```

### 生成流程
```
输入: configs/<network>.json + subgraph.template.yaml
  ↓ mustache
输出: subgraph.yaml

输入: configs/<network>.json + src/constants/index.ts.template
  ↓ mustache
输出: src/constants/index.ts
```

## 变更记录 (Changelog)

### [2.0.0] - 2025-11-12
- 初始化配置模块文档
- 记录所有网络配置结构
- 添加 graft 配置说明
