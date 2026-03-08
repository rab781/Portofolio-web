## 2024-05-01 - DecryptedText Optimization
**Learning:** React component with rapid interval state updates causes high garbage collection pressure when performing `text.split('')` on every tick.
**Action:** Pre-calculate `text.split('')` array in useMemo or outer scope of useEffect where possible.
