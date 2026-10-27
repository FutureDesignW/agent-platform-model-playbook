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

const slider = await page.evaluate(() => {
  const els = [...document.querySelectorAll('[role="slider"], [class*="slider"] [class*="handle"], [class*="Slider"]')]
  return els.slice(0, 6).map(e => {
    const r = e.getBoundingClientRect()
    return { tag: e.tagName, role: e.getAttribute("role"), now: e.getAttribute("aria-valuenow"), max: e.getAttribute("aria-valuemax"), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
  })
})
console.log("滑块节点:", JSON.stringify(slider))

const rect = await page.evaluate(() => {
  const el = document.querySelector('[role="slider"]')
  if (!el) return null
  el.focus()
  const r = el.getBoundingClientRect()
  return { x: r.x, y: r.y, w: r.width, h: r.height }
})
if (rect) {
  await page.mouse.click(rect.x + rect.w - 2, rect.y + rect.h / 2)
  await new Promise(r => setTimeout(r, 1500))
  try { await page.keyboard.press("End") } catch (e) {}
  await new Promise(r => setTimeout(r, 1500))
}
console.log("点完滑块:", await summary())
