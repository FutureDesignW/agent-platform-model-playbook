const task = await taskSpace(1)
const page = task.page("p1")

const KW = ["积分", "Seedance", "2.5", "秒", "分辨率", "时长", "消耗", "1080", "720", "生成"]

try {
  await page.goto("https://jimeng.jianying.com/ai-tool/generate?type=video", { waitUntil: "domcontentloaded", timeout: 60000 })
  await new Promise(r => setTimeout(r, 6000))
  console.log("URL:", await page.url())
  const txt = await page.evaluate(() => document.body ? document.body.innerText : "")
  const lines = txt.split("\n").map(s => s.trim()).filter(Boolean)
  console.log("textLen", txt.length)
  console.log("---- 关键词行 ----")
  console.log(lines.filter(l => KW.some(k => l.includes(k))).slice(0, 80).join(" | "))
  await page.screenshot({ path: "E:/AI/样片提示词整理/_playbook/_ego/jimeng-video.png" })
  console.log("shot ok")
} catch (e) {
  console.log("FAILED " + e.message)
}
