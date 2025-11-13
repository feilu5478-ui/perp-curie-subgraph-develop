# [根目录](../../CLAUDE.md) > [src](../) > **hard-fixed-data**

## 模块职责

hard-fixed-data 模块存储各网络的硬编码配置数据，包含合约地址、代币信息、价格馈送地址等关键参数。这些数据在合约部署时确定，不会频繁变化，但需要根据网络升级进行更新。

## 入口与启动

本模块为数据模块，通过 `mustache` 模板引擎在构建时生成 `src/constants/index.ts` 文件：
```bash
# 生成常量文件
npm run generate-constants:optimism
npm run generate-constants:sepolia
```

生成的常量文件会被映射代码直接导入使用。

## 对外接口

### 网络支持
| 网络 | 文件 | Chain ID | 版本 |
|------|------|----------|------|
| **Optimism** | optimism.ts | 10 | 2.4.3 |
| **Sepolia** | sepolia.ts | 11155111 | 2.4.3 |

### 主要数据类型

#### 1. 合约地址信息
```typescript
interface ContractInfo {
    address: string        // 合约地址
    createdBlockNumber: number  // 创建区块号
    name: string          // 合约完整名称
}
```

**核心合约列表**:
- MarketRegistry: 市场注册表
- ClearingHouse: 清算所
- Vault: 金库
- AccountBalance: 账户余额
- Exchange: 交易所
- InsuranceFund: 保险基金
- CollateralManager: 抵押品管理
- DelegateApproval: 委托授权
- OrderBook: 订单簿
- PriceFeed: 价格馈送

#### 2. 抵押品配置
```typescript
interface Collateral {
    address: string           // 代币地址
    decimals: number          // 代币精度
    name: string             // 代币名称
    symbol: string           // 代币符号
    priceFeedAddress: string // 价格预言机地址
}
```

#### 3. 交易对配置
```typescript
interface Pool {
    address: string     // 池合约地址
    baseAddress: string // 基础代币地址
    baseSymbol: string  // 基础代币符号
    quoteAddress: string // 计价代币地址
    quoteSymbol: string  // 计价代币符号
}
```

## 关键依赖与配置

### 外部依赖
- `@graphprotocol/graph-ts`: TypedMap 类型
- `../constants/index.ts`: 常量定义

### 内部依赖
- types.ts: 类型定义
- 其他网络配置文件（无直接依赖）

### 数据来源
- **主网数据**: 来自 `@perp/curie-deployments` npm 包
- **测试网数据**: 手动配置或部署脚本生成

## 数据模型

### 数据结构
```typescript
// TypedMap 嵌套结构
TypedMap<Address, TypedMap<string, string>>
// 第一层：代币地址
// 第二层：属性名 ("name", "symbol", "decimals")
```

### 地址类型
- **主网 (Optimism)**: 20+ 交易对，支持 WETH、FRAX、OP、USDT 等
- **测试网 (Sepolia)**: 2个交易对（WETH、WBTC）

### 版本管理
- **当前版本**: 2.4.3
- **版本升级**: 需要更新合约地址和配置参数

## 使用场景

### 1. 映射代码中引用
```typescript
// src/mappings/clearingHouse.ts
import { hardFixedDataMap as hardFixedDataMapOP } from "../hard-fixed-data/optimism"
import { hardFixedDataMap as hardFixedDataMapSEPOLIA } from "../hard-fixed-data/sepolia"

// 根据网络选择配置
const map = new TypedMap<string, HardFixedDataMap>()
map.set("optimism", hardFixedDataMapOP)
map.set("sepolia", hardFixedDataMapSEPOLIA)
const hardFixedDataMap = map.get(Network)
```

### 2. 代币信息获取
```typescript
// src/utils/token.ts
import { collateralMap } from "../constants"

export function fetchTokenSymbol(tokenAddress: Address): string {
    const erc20 = collateralMap.get(tokenAddress)
    if (!erc20) return "unknown"
    return erc20.get("symbol")!
}
```

## 测试与质量

### 当前状态
- **无验证机制**: 地址格式和类型无自动检查
- **无版本控制**: 手动更新，容易出错
- **建议**: 添加合约地址有效性验证

### 质量建议
1. 验证所有地址格式正确
2. 检查 decimals 取值范围 (0-18)
3. 确认合约名称与地址匹配
4. 定期同步主包更新

## 常见问题 (FAQ)

### Q: 合约升级后如何更新？
A:
1. 更新 `configs/` 中的合约地址
2. 更新对应的 `hard-fixed-data/` 文件
3. 重新生成常量文件
4. 测试映射逻辑
5. 重新部署子图

### Q: 如何添加新的交易对？
A:
1. 在 `configs/<network>.json` 的 `pools` 数组中添加
2. 如果是新代币，在 `collaterals` 数组中添加
3. 重新生成 manifest 和常量文件
4. 验证地址有效性

### Q: 代币精度如何确定？
A:
- **ETH/WETH**: 18 decimals
- **USDC/USDT**: 6 decimals
- **WBTC**: 8 decimals
- 参考 ERC20 标准或合约定义

### Q: 价格馈送地址用途？
A: 用于获取代币价格，支持风险管理和清算计算。地址指向 Chainlink 或其他预言机合约。

## 相关文件清单

### 文件列表
```
src/hard-fixed-data/
├── types.ts        # TypeScript 类型定义
├── optimism.ts     # Optimism 网络配置 (~500行)
├── sepolia.ts      # Sepolia 网络配置 (~150行)
└── CLAUDE.md       # 本文档
```

### 配置示例 (Sepolia)
```typescript
export const collateralMap = new TypedMap<Address, TypedMap<string, string>>()

export const WETH = new TypedMap<string, string>()
WETH.set("name", "Wrapped Ether")
WETH.set("symbol", "WETH")
WETH.set("decimals", "18")
collateralMap.set(Address.fromString("0x51F..."), WETH)
```

## 变更记录 (Changelog)

### [2.0.0] - 2025-11-12
- 初始化硬编码数据模块文档
- 记录各网络配置结构和字段定义
- 添加数据更新流程说明
