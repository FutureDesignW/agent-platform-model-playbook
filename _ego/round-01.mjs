const task = await taskSpace("平台真实价格-20261027")
console.log("spaceId", task.spaceId, task.ownership)
const page = task.page("p1")

const sites = [
  ["LibTV", "https://libtv.gongke.net/"],
  ["小云雀", "https://xyq.jianying.com/"],
  ["即梦", "https://jimeng.jianying.com/"],
  ["OiiOii", "https://www.oiioii.ai/"],
]

const KW = ["登录", "会员", "积分", "Seedance", "2.5", "秒", "¥", "￥", "套餐", "升级", "余额"]

for (const [name, url] of sites) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 })
    await new Promise(r => setTimeout(r, 3500))
    const real = await page.url()
    const txt = await page.evaluate(() => document.body ? document.body.innerText : "")
    const lines = txt.split("\n").map(s => s.trim()).filter(Boolean)
    const hits = lines.filter(l => KW.some(k => l.includes(k))).slice(0, 35)
    console.log("\n===== " + name + " ===== " + real + " | textLen " + txt.length)
    console.log(hits.join("\n"))
  } catch (e) {
    console.log("\n===== " + name + " ===== FAILED: " + e.message)
  }
}
