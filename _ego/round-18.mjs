const task = await taskSpace(1)
const page = task.page("p1")

async function open(name, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })
  await new Promise(r => setTimeout(r, 4500))
  const t = await page.evaluate(() => document.body.innerText.split("\n").map(s => s.trim()).filter(Boolean))
  console.log("\n##### " + name + " | " + (await page.url()) + " | lines " + t.length)
  console.log(t.slice(0, 45).join(" | "))
}

// LibTV 应用入口
await open("LibTV 应用", "https://libtv.cgref.cn/s/vzdkj2yn1r")

// OiiOii 定价
await open("OiiOii 定价", "https://www.oiioii.ai/zh/pricing")
