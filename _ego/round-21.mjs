const task = await taskSpace(1)
const page = task.page("p1")

async function grab(name, url, patterns) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {})
  await new Promise(r => setTimeout(r, 6000))
  const out = await page.evaluate((pats) => {
    const txt = document.body ? document.body.innerText : ""
    const lines = txt.split("\n").map(s => s.trim()).filter(Boolean)
    const res = {}
    for (const p of pats) {
      const re = new RegExp(p, "i")
      res[p] = lines.filter(l => re.test(l)).slice(0, 12)
    }
    // 结构化数据
    const json = []
    document.querySelectorAll("script").forEach(s => {
      const t = s.textContent || ""
      if (t.includes("盒饭") || t.includes("credit") || t.includes("Seedance")) json.push(t.slice(0, 3000))
    })
    return { res, jsonLen: json.length, json: json.join("\n").slice(0, 2500) }
  }, patterns)
  console.log("\n##### " + name + " ##### " + (await page.url()))
  for (const [k, v] of Object.entries(out.res)) console.log("[" + k + "] " + (v.join(" | ") || "—"))
  if (out.jsonLen) console.log("含关键词的 script 块 " + out.jsonLen + " 个; 样例:\n" + out.json.slice(0, 800))
}

await grab("OiiOii 价格", "https://www.oiioii.ai/zh/price", ["盒饭", "Seedance", "2\\.5", "APEX|STAR|PRO|BASE"])
await grab("Higgsfield 价格", "https://higgsfield.ai/pricing", ["Seedance", "credit", "2\\.5", "Plus|Ultra|Starter"])
