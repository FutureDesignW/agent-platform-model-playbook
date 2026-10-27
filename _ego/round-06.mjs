const task = await taskSpace(1)
const page = task.page("p1")

await page.goto("https://jimeng.jianying.com/ai-tool/generate?type=video", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))

// 关掉短剧工作室弹窗
await page.evaluate(() => {
  const btn = document.querySelector('[aria-label="关闭"], .close, [class*="close"]')
  if (btn) btn.click()
})
await new Promise(r => setTimeout(r, 1200))

// 点开模型选择器，找 Seedance 2.5
const clickInfo = await page.evaluate(() => {
  const nodes = [...document.querySelectorAll("div,span,button")]
  const target = nodes.reverse().find(e => (e.textContent || "").trim() === "即梦 Seedance 2.0 mini")
  if (!target) return "model-btn-not-found"
  let el = target
  for (let i = 0; i < 4 && el.parentElement; i++) el = el.parentElement
  el.click()
  return "clicked:" + el.tagName
})
console.log("模型按钮:", clickInfo)
await new Promise(r => setTimeout(r, 2000))

const panel = await page.evaluate(() => {
  const t = document.body ? document.body.innerText : ""
  return t.split("\n").map(s => s.trim()).filter(Boolean).slice(0, 120)
})
console.log("---- 面板文本 ----")
console.log(panel.join(" | "))

await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/jimeng-model.png" })
console.log("shot ok")
