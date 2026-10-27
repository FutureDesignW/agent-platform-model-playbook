const task = await taskSpace(1)
const page = task.page("p1")
await page.goto("https://xyq.jianying.com/home", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))
const clickText = async (t) => page.evaluate((label) => {
  const all = [...document.querySelectorAll("div,span,button,a,li")]
    .filter(e => (e.textContent || "").trim() === label)
  const el = all[all.length - 1]; if (!el) return "miss"; el.click(); return "ok"
}, t)
await clickText("视频生成"); await new Promise(r => setTimeout(r, 5000))
let all = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("全量(" + all.length + "): " + all.join(" | "))
console.log("\n点 720P:", await clickText("720P"))
await new Promise(r => setTimeout(r, 1500))
all = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("720P 后: " + all.join(" | "))
