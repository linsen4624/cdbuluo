import { createId } from "@paralleldrive/cuid2";

// ID 前缀枚举
const ID_PREFIXES = {
  user: "usr",
  account: "acc",
  order: "ord",
  subscription: "sub",
  payment: "pay",
  invoice: "inv",
} as const;

type IdPrefix = keyof typeof ID_PREFIXES;

export function generateId(prefix: IdPrefix): string {
  return `${ID_PREFIXES[prefix]}_${createId()}`;
}
