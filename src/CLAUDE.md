# [根目录](../../CLAUDE.md) > **src**

## 模块职责

src 目录是项目的核心源码目录，包含所有映射逻辑、数据处理和配置定义。本模块负责：
- 将链上事件映射为 GraphQL 实体
- 提供数据处理和计算工具函数
- 存储硬编码的网络配置数据
- 定义全局常量和类型

## 入口与启动

本模块不是可执行程序，而是作为 The Graph 子图的源码部分。通过 `graph codegen` 命令生成类型定义后，部署到子图节点执行。

### 编译命令
```bash
# 生成 manifest
npm run generate-manifest:<network>

# 生成常量文件
npm run generate-constants:<network>

# 代码生成
npm run codegen:<network>
```

## 对外接口

### 主要输出（映射实体）
- **Protocol**: 协议全局状态和统计数据
- **Market**: 市场信息和交易对数据
- **Trader**: 交易者账户和余额
- **Position**: 持仓信息和历史记录
- **LiquidityChanged**: 流动性变化事件
- **FundingUpdated**: 资金费率更新
- **Deposited/Withdrawn**: 存取款事件
- **InsuranceFund**: 保险基金数据
- **ReferralCode**: 推荐码统计

## 关键依赖与配置

### 外部依赖
- `@graphprotocol/graph-ts`: Graph Protocol 类型库
- `@perp/curie-deployments`: 合约部署信息
- AssemblyScript: 映射语言

### 内部依赖关系
```
src/
├── mappings/     → 依赖 utils/ 和 constants/
├── utils/        → 无外部依赖
├── hard-fixed-data/ → 依赖 constants/
└── constants/    → 无外部依赖
```

## 数据模型

### 核心实体关系
- Protocol (1) → (N) Market, TraderDayData, ProtocolTokenBalance
- Market (1) → (N) Position, LiquidityChanged, TraderMarket
- Trader (1) → (N) TraderMarket, TraderTokenBalance, Position
- Token (1) → (N) TraderTokenBalance, ProtocolTokenBalance

### 关键字段
- **ID 格式**: 使用地址或交易哈希作为主键
- **时间戳**: 所有实体记录 block.timestamp
- **数值**: 使用 BigDecimal 处理金额，BigInt 处理整数

## 常见问题 (FAQ)

### Q: 如何添加新的事件处理器？
A: 在 `mappings/` 目录创建新文件，实现 `handle<EventName>` 函数，并在 `subgraph.template.yaml` 中注册事件处理器。

### Q: 如何处理数值精度？
A: 使用 `src/utils/numbers.ts` 中的工具函数：`fromWei()`、`toWei()` 等，确保小数精度正确。

### Q: 如何获取代币信息？
A: 使用 `src/utils/token.ts` 中的函数：`fetchTokenSymbol()`、`fetchTokenName()`、`fetchTokenDecimals()`。

### Q: 合约升级后需要做什么？
A: 更新 `configs/` 中的合约地址，更新 ABI 文件，重新生成 manifest 并部署。

## 相关文件清单

### 目录结构
```
src/
├── mappings/              # 11个事件映射文件
├── utils/                 # 3个工具模块
├── hard-fixed-data/       # 3个网络配置数据
├── constants/             # 全局常量定义
└── CLAUDE.md             # 本文档
```

## 变更记录 (Changelog)

### [2.0.0] - 2025-11-12
- 初始化模块文档
- 记录所有子模块结构和依赖关系
