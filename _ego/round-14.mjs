const task = await taskSpace(1)
const page = task.page("p1")
await page.goto("https://xyq.jianying.com/home", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))

const clickText = async (t) => page.evaluate((label) => {
  const all = [...document.querySelectorAll("div,span,button,a,li")]
    .filter(e => (e.textContent || "").trim() === label)
  const el = all[all.length - 1]; if (!el) return "miss"; el.click(); return "ok"
}, t)

console.log("点 视频生成:", await clickText("视频生成"))
await new Promise(r => setTimeout(r, 5000))
console.log("URL:", await page.url())

const lines = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("len", lines.length)
console.log(lines.filter(l => /积分|Seedance|2\.5|1080|720|秒|^[0-9]+s$|个$|消耗/.test(l)).slice(0, 60).join(" | "))
await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/xyq-video.png" })
