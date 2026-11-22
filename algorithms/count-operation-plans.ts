
function countWays(a: number[], w: number): bigint {
  let ans = 1n;
  let prev = 0;

  for (const num of a) {
    // 当前元素需要被 +1 的次数
    const cur = w - num;

    // 只能加不能减，且相邻覆盖次数最多相差 1
    if (cur < 0 || Math.abs(cur - prev) > 1) {
      return 0n;
    }

    if (cur === prev) {
      // 覆盖次数不变：
      // 保持原区间，或结束一个旧区间并开启新区间
      ans *= BigInt(prev + 1);
    } else if (cur === prev - 1) {
      // 覆盖次数减少 1：
      // 从 prev 个活跃区间中选一个结束
      ans *= BigInt(prev);
    }
    // cur === prev + 1：
    // 必须开启一个新区间，只有 1 种选择

    prev = cur;
  }

  // 数组结束后不能留下超过 1 个待结束的区间
  if (prev > 1) return 0n;

  return ans;
}

const a = [2, 1, 1, 2];
const w = 3;
console.log(countWays(a, w).toString());
