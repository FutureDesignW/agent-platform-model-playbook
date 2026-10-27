const task = await taskSpace(1)
const page = task.page("p1")
await page.goto("https://jimeng.jianying.com/ai-tool/generate?type=video", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))
try { await page.keyboard.press("Escape") } catch (e) {}
const clickText = async (t) => page.evaluate((label) => {
  const all = [...document.querySelectorAll("div,span,button,li,label")]
    .filter(e => (e.textContent || "").trim() === label)
  const el = all[all.length - 1]; if (!el) return "miss"; el.click(); return "ok"
}, t)
const summary = async () => {
  const lines = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
  const i = lines.findIndex(l => l.includes("Seedance 2.5"))
  return lines.slice(i, i + 8).join(" | ")
}
await clickText("4s"); await new Promise(r => setTimeout(r, 1200))

const geo = await page.evaluate(() => {
  const h = document.querySelector('[role="slider"]')
  if (!h) return null
  const track = h.parentElement.getBoundingClientRect()
  const hr = h.getBoundingClientRect()
  return { tx: track.x, ty: track.y, tw: track.width, th: track.height, hx: hr.x + hr.width / 2, hy: hr.y + hr.height / 2 }
})
console.log("几何:", JSON.stringify(geo))
if (geo) {
  // 直接拖拽 handle → 轨道最右端
  await page.mouse.move(geo.hx, geo.hy)
  await page.mouse.down()
  await page.mouse.move(geo.tx + geo.tw - 1, geo.hy, { steps: 12, label: "拖到 30 秒" })
  await page.mouse.up()
  await new Promise(r => setTimeout(r, 1500))
}
console.log("拖拽后:", await summary())
