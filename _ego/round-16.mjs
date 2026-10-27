const task = await taskSpace(1)
const page = task.page("p1")
await page.goto("https://xyq.jianying.com/home", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))
const clickText = async (t) => page.evaluate((label) => {
  const all = [...document.querySelectorAll("div,span,button,a,li")]
    .filter(e => (e.textContent || "").trim() === label)
  const el = all[all.length - 1]; if (!el) return "miss"; el.click(); return "ok"
}, t)

await clickText("视频生成"); await new Promise(r => setTimeout(r, 4500))
console.log("选模型 Seedance 2.5:", await clickText("Seedance 2.5"))
await new Promise(r => setTimeout(r, 2500))
console.log("点 1080P:", await clickText("1080P"))
await new Promise(r => setTimeout(r, 2500))

const snap = await page.evaluate(() => {
  const t = document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean)
  const i = t.findIndex(l => l === "视频生成")
  return { head: t.slice(i, i + 12), tail: t.slice(-40) }
})
console.log("面板:", snap.head.join(" | "))
console.log("底部:", snap.tail.join(" | "))
await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/xyq-1080.png" })
