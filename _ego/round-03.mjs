const task = await taskSpace(1)
const page = task.page("p1")

async function dump(name, url, keys, limit = 60) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 })
    await new Promise(r => setTimeout(r, 3000))
    const real = await page.url()
    const txt = await page.evaluate(() => document.body ? document.body.innerText : "")
    const lines = txt.split("\n").map(s => s.trim()).filter(Boolean)
    const hits = lines.filter(l => keys.some(k => l.includes(k)))
    console.log("\n########## " + name + " ########## " + real + " | len " + txt.length)
    console.log(hits.slice(0, limit).join("\n"))
  } catch (e) {
    console.log("\n########## " + name + " ########## FAILED " + e.message)
  }
}

await dump("LibTV 价格页", "https://libtv.gongke.net/pricing",
  ["Seedance", "2.5", "2.0", "积分", "秒", "模型", "Vidu", "可灵", "万相"], 80)

await dump("小云雀 会员", "https://xyq.jianying.com/member",
  ["Seedance", "2.5", "积分", "秒", "会员", "￥", "折"], 50)

await dump("即梦 会员", "https://jimeng.jianying.com/ai-tool/member",
  ["Seedance", "2.5", "积分", "秒", "会员", "￥", "折"], 50)
