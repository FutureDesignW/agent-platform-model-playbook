const task = await taskSpace(1)
const page = task.page("p1")
await page.goto("https://www.liblib.tv/", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))

const clickText = async (t) => page.evaluate((label) => {
  const all = [...document.querySelectorAll("div,span,button,a,li")]
    .filter(e => (e.textContent || "").trim() === label)
  const el = all[all.length - 1]; if (!el) return "miss"; el.click(); return "ok"
}, t)

console.log("点 创作:", await clickText("创作"))
await new Promise(r => setTimeout(r, 4000))
console.log("URL:", await page.url())
let t = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("创作页:", t.slice(0, 40).join(" | "))

console.log("点 视频生成:", await clickText("视频生成"))
await new Promise(r => setTimeout(r, 4000))
console.log("URL2:", await page.url())
t = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("视频页:", t.slice(0, 50).join(" | "))
await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/libtv-video.png" })
