const task = await taskSpace(1)
const page = task.page("p1")

await page.goto("https://jimeng.jianying.com/ai-tool/generate?type=video", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))
try { await page.keyboard.press("Escape") } catch (e) {}

const clickText = async (t) => page.evaluate((label) => {
  const all = [...document.querySelectorAll("div,span,button,li")]
    .filter(e => (e.textContent || "").trim() === label)
  const el = all[all.length - 1]
  if (!el) return "miss"
  el.click(); return "ok"
}, t)

await clickText("720P"); await new Promise(r => setTimeout(r, 1200))
await clickText("1080P"); await new Promise(r => setTimeout(r, 1500))
await clickText("4s"); await new Promise(r => setTimeout(r, 1200))

const setRes = await page.evaluate(() => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set
  const ranges = [...document.querySelectorAll('input[type="range"]')]
  if (!ranges.length) return "no-range"
  const r = ranges[ranges.length - 1]
  setter.call(r, "30")
  r.dispatchEvent(new Event("input", { bubbles: true }))
  r.dispatchEvent(new Event("change", { bubbles: true }))
  return "range-max=" + r.max + " now=" + r.value
})
console.log("滑块:", setRes)
await new Promise(r => setTimeout(r, 2000))

try { await page.keyboard.press("Escape") } catch (e) {}
await new Promise(r => setTimeout(r, 1000))

const lines = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
const idx = lines.findIndex(l => l.includes("Seedance 2.5"))
console.log("摘要行:", lines.slice(Math.max(0, idx - 4), idx + 16).join(" | "))
console.log("尾部:", lines.slice(-10).join(" | "))
await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/jimeng-30s.png" })
