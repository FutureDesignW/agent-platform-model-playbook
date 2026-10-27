const task = await taskSpace(1)
const page = task.page("p1")
await page.goto("https://www.liblib.tv/", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))

const routes = await page.evaluate(() => {
  const set = new Set()
  ;[...document.querySelectorAll("a[href]")].forEach(a => set.add(a.getAttribute("href")))
  return [...set].slice(0, 40)
})
console.log("路由:", routes.join(" , "))

const clickText = async (t) => page.evaluate((label) => {
  const all = [...document.querySelectorAll("div,span,button,a,li")]
    .filter(e => (e.textContent || "").trim() === label)
  const el = all[all.length - 1]; if (!el) return "miss"; el.click(); return "ok"
}, t)

console.log("点 新建画布创作:", await clickText("新建画布创作"))
await new Promise(r => setTimeout(r, 6000))
console.log("URL:", await page.url())
const t = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("画布页(" + t.length + "): " + t.slice(0, 60).join(" | "))
await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/libtv-canvas.png" })
