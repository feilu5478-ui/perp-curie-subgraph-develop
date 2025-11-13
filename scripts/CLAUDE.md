# [根目录](../../CLAUDE.md) > **scripts**

## 模块职责

scripts 模块包含项目的维护脚本和工具程序，用于健康检查、子图管理、数据查询等运维任务。这些脚本帮助开发者和运维人员监控子图状态、排查问题和执行部署操作。

## 入口与启动

### 使用方式
```bash
# 直接执行 TypeScript 脚本
ts-node scripts/<script-name>.ts

# 通过 npm 脚本调用
npm run health-check
npm run list-subgraph-ids
```

### 运行环境
- Node.js + TypeScript
- ts-node: 运行时编译
- node-fetch: HTTP 请求

## 对外接口

### 1. healthCheck.ts - 子图健康检查

**功能**: 检查 The Graph 子图的同步状态和健康度

**执行命令**:
```bash
npm run health-check
```

**检查指标**:
```graphql
{
    indexingStatusForCurrentVersion(subgraphName: "perpetual-protocol/perpetual-v2-optimism") {
        synced              // 是否已同步
        health              // 健康状态 (healthy/failed)
        fatalError {        // 致命错误
            message
            block { number, hash }
            handler
        }
        chains {
            chainHeadBlock { number }    // 链头区块
            latestBlock { number }       // 最新索引区块
        }
    }
}
```

**输出示例**:
```json
{
    "synced": false,
    "health": "healthy",
    "chains": [
        {
            "chainHeadBlock": { "number": "113120599" },
            "latestBlock": { "number": "113100000" }
        }
    ]
}
```

### 2. listSubgraphIds.ts - 子图 ID 列表

**功能**: 列出所有已部署的子图及其状态

**执行命令**:
```bash
npm run list-subgraph-ids
```

**预期功能**:
- 列出不同网络的子图
- 显示部署状态
- 显示最新版本标签

## 关键依赖与配置

### 外部依赖
- `node-fetch`: HTTP 客户端
- TypeScript: 类型支持

### 配置常量
```typescript
// healthCheck.ts
const SUBGRAPH_ENDPOINT = "https://thegraph-hc.perp.fi/graphql"
const SUBGRAPH_NAME = "perpetual-protocol/perpetual-v2-optimism"
```

### 网络端点
- **The Graph Hosted Service**: `https://thegraph-hc.perp.fi/graphql`
- **Satsuma**: 通过 CLI 部署，无 GraphQL 查询端点

## 数据模型

### 子图状态类型
```typescript
interface IndexingStatus {
    synced: boolean              // 同步状态
    health: "healthy" | "failed" // 健康状态
    fatalError?: {               // 错误信息（可选）
        message: string
        block: { number: string, hash: string }
        handler: string
    }
    chains: Array<{              // 链信息
        chainHeadBlock: { number: string }
        latestBlock: { number: string }
    }>
}
```

### 健康检查判定
- **synced = true**: 已同步到最新区块
- **health = "healthy"**: 无错误
- **health = "failed"**: 存在致命错误
- **同步延迟**: chainHeadBlock - latestBlock

## 使用场景

### 1. 部署后验证
```bash
# 部署子图
npm run deploy-satsuma:sepolia

# 等待几分钟让子图开始同步

# 检查健康状态
npm run health-check

# 查看同步进度
# 如果 synced = false，检查 latestBlock 是否在增长
```

### 2. 问题排查
```bash
# 检查是否有致命错误
npm run health-check

# 如果发现错误，记录：
# - 错误消息
# - 错误发生的区块
# - 错误处理器名称
```

### 3. 定期监控
建议设置定期任务执行健康检查：
```bash
# 每小时检查一次
0 * * * * cd /path/to/project && npm run health-check >> health.log 2>&1
```

## 测试与质量

### 当前状态
- **无测试**: 脚本缺乏单元测试
- **建议**: 添加模拟数据和错误场景测试

### 质量建议
1. 添加超时处理
2. 添加重试机制
3. 添加详细日志输出
4. 支持配置化端点

## 常见问题 (FAQ)

### Q: 子图同步很慢怎么办？
A:
- 检查 `latestBlock` 是否在增长
- 如果停滞，可能是合约地址错误或 ABI 不匹配
- 检查 The Graph 节点状态
- 考虑使用 graft 从历史数据开始

### Q: health = "failed" 如何处理？
A:
1. 记录 `fatalError.message`
2. 定位错误区块 `block.number`
3. 检查该区块的事件日志
4. 修复映射逻辑
5. 重新部署子图

### Q: 如何检查 Satsuma 子图状态？
A:
- Satsuma 当前无公开 GraphQL 查询端点
- 通过部署日志和监控面板查看状态
- 使用 The Graph 官方端点检查主网子图

### Q: 脚本执行失败怎么办？
A:
1. 检查 Node.js 和 npm 版本
2. 确保依赖已安装 (`npm install`)
3. 检查网络连接
4. 查看详细错误日志

### Q: 如何添加新的检查指标？
A:
1. 在脚本中添加 GraphQL 查询
2. 添加相应的数据处理逻辑
3. 格式化输出结果
4. 更新文档

## 相关文件清单

### 文件列表
```
scripts/
├── healthCheck.ts         # 子图健康检查脚本 (~60行)
├── listSubgraphIds.ts     # 子图 ID 列表脚本
├── tsconfig.json         # TypeScript 配置
└── CLAUDE.md             # 本文档
```

### 使用示例
```typescript
// 检查子图健康状态
import fetch from "node-fetch"

async function healthCheck() {
    const query = `
    {
        indexingStatusForCurrentVersion(
            subgraphName: "perpetual-protocol/perpetual-v2-optimism"
        ) {
            synced
            health
            chains {
                chainHeadBlock { number }
                latestBlock { number }
            }
        }
    }`

    const resp = await fetch("https://thegraph-hc.perp.fi/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    })

    const data = await resp.json()
    console.log(JSON.stringify(data, null, 2))
}
```

## 变更记录 (Changelog)

### [2.0.0] - 2025-11-12
- 初始化脚本模块文档
- 记录健康检查和监控功能
- 添加故障排查指南
