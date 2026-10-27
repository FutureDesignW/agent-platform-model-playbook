const task = await taskSpace(1)
const page = task.page("p1")
await page.goto("https://www.oiioii.ai/zh/price", { waitUntil: "networkidle", timeout: 60000 }).catch(() => {})
await new Promise(r => setTimeout(r, 6000))

const out = await page.evaluate(() => {
  const res = { tables: [] }
  ;[...document.querySelectorAll("table")].forEach((tb, ti) => {
    const rows = [...tb.querySelectorAll("tr")].map(tr => [...tr.querySelectorAll("th,td")].map(td => (td.innerText || "").replace(/\s+/g, " ").trim()))
    res.tables.push({ ti, rows: rows.filter(r => r.join("").length > 0) })
  })
  let cfgTxt = ""
  document.querySelectorAll("script").forEach(s => { if ((s.textContent || "").includes("base_points")) cfgTxt = s.textContent })
  const i = cfgTxt.indexOf('"configs"')
  res.cfg = i >= 0 ? cfgTxt.slice(i, i + 1200) : "none"
  return res
})

out.tables.forEach(t => {
  console.log("\n=== TABLE " + t.ti + " (" + t.rows.length + " rows) ===")
  t.rows.slice(0, 30).forEach(r => console.log(r.join(" | ")))
})
console.log("\n=== CFG ===\n" + out.cfg)
