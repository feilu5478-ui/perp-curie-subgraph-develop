import { TypedMap } from "@graphprotocol/graph-ts"
import { BaseTokenMap } from "./types"

export const hardFixedDataMap = new TypedMap<string, BaseTokenMap>()
// 空的映射，因为Sepolia上没有需要修复的数据