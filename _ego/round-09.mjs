const task = await taskSpace(1)
const page = task.page("p1")

await page.goto("https://jimeng.jianying.com/ai-tool/generate?type=video", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))
try { await page.keyboard.press("Escape") } catch (e) {}

const clickText = async (t) => page.evaluate((label) => {
  const all = [...document.querySelectorAll("div,span,button,li,label")]
    .filter(e => (e.textContent || "").trim() === label)
  const el = all[all.length - 1]
  if (!el) return "miss"
  el.click(); return "ok"
}, t)
const summary = async () => {
  const lines = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
  const i = lines.findIndex(l => l.includes("Seedance 2.5"))
  return lines.slice(i, i + 9).join(" | ")
}

await clickText("720P"); await new Promise(r => setTimeout(r, 1000))
await clickText("1080P"); await new Promise(r => setTimeout(r, 1200))

// 模式选项
console.log("点 全能参考:", await clickText("全能参考"))
await new Promise(r => setTimeout(r, 1200))
let L = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("模式候选:", L.filter(l => /视频|参考|首尾帧|图生|文生/.test(l) && l.length < 12).slice(0, 15).join(" | "))
console.log("当前:", await summary())

// 时长 30
console.log("点 30:", await clickText("30"))
await new Promise(r => setTimeout(r, 1500))
console.log("30s 后:", await summary())
await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/jimeng-mode.png" })
