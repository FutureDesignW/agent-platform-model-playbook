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
await clickText("Seedance 2.5"); await new Promise(r => setTimeout(r, 2000))
await clickText("1080P"); await new Promise(r => setTimeout(r, 1500))

const filled = await page.evaluate(() => {
  const ta = document.querySelector("textarea, [contenteditable='true']")
  if (!ta) return "no-input"
  ta.focus()
  if (ta.tagName === "TEXTAREA") {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set
    setter.call(ta, "夜晚霓虹街道，女主回头看向镜头，缓慢推近")
    ta.dispatchEvent(new Event("input", { bubbles: true }))
  } else {
    ta.innerText = "夜晚霓虹街道，女主回头看向镜头，缓慢推近"
    ta.dispatchEvent(new Event("input", { bubbles: true }))
  }
  return "filled:" + ta.tagName
})
console.log("输入:", filled)
await new Promise(r => setTimeout(r, 2500))

const info = await page.evaluate(() => {
  const t = document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean)
  const btn = [...document.querySelectorAll("button")].map(b => (b.textContent || "").trim()).filter(Boolean)
  return { cost: t.filter(l => /积分|消耗|预计/.test(l)).slice(-12), btns: btn.slice(-14) }
})
console.log("消耗行:", info.cost.join(" | "))
console.log("按钮:", info.btns.join(" | "))
await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/xyq-cost.png" })
