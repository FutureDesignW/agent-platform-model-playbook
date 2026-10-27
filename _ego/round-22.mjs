const task = await taskSpace(1)
const page = task.page("p1")
await page.goto("https://www.oiioii.ai/zh/price", { waitUntil: "networkidle", timeout: 60000 }).catch(() => {})
await new Promise(r => setTimeout(r, 6000))

const data = await page.evaluate(() => {
  const tables = [...document.querySelectorAll("table, [class*='table'], [class*='grid']")]
  const rows = []
  document.querySelectorAll("tr, [class*='row']").forEach(tr => {
    const t = (tr.innerText || "").replace(/\s+/g, " ").trim()
    if (/2\.5|2\.0|盒饭/.test(t) && t.length < 200) rows.push(t)
  })
  let cfg = ""
  document.querySelectorAll("script").forEach(s => {
    const t = s.textContent || ""
    if (t.includes("base_points")) cfg = t
  })
  let parsed = null
  try {
    const m = cfg.match(/\{"configs":\[.*?\]\}/)
    if (m) parsed = JSON.parse(m[0]).configs.map(c => ({ k: c.tier_key, cny: c.monthly_price_cny, y_cny: c.yearly_price_cny, pts: c.base_points, bonus: c.bonus_points, days: c.validity_days }))
  } catch (e) { parsed = "parse-fail" }
  return { rows: rows.slice(0, 40), parsed, tables: tables.length }
})

console.log("表格数", data.tables)
console.log("--- 行 ---")
console.log(data.rows.join("\n"))
console.log("--- 套餐 ---")
console.log(JSON.stringify(data.parsed))
