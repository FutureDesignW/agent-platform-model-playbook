const task = await taskSpace(1)
const page = task.page("p1")

await page.goto("https://jimeng.jianying.com/ai-tool/generate?type=video", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))

try { await page.keyboard.press("Escape") } catch (e) { console.log("esc fail " + e.message) }
await new Promise(r => setTimeout(r, 800))

const clickText = async (t) => {
  const r = await page.evaluate((label) => {
    const all = [...document.querySelectorAll("div,span,button,li")]
      .filter(e => (e.textContent || "").trim() === label)
    const el = all[all.length - 1]
    if (!el) return "miss"
    el.click()
    return "ok"
  }, t)
  return r
}

console.log("点 720P:", await clickText("720P"))
await new Promise(r => setTimeout(r, 1500))
let t1 = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("选项快照:", t1.filter(l => /P$|4K|1080|720|480/.test(l)).slice(0, 20).join(" | "))

console.log("点 1080P:", await clickText("1080P"))
await new Promise(r => setTimeout(r, 1500))

console.log("点 4s:", await clickText("4s"))
await new Promise(r => setTimeout(r, 1500))
let t2 = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
console.log("时长选项:", t2.filter(l => /^\d+s$|^\d+秒$/.test(l)).slice(0, 20).join(" | "))

const tail = t2.slice(-14)
console.log("面板尾部:", tail.join(" | "))
await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/jimeng-1080.png" })
