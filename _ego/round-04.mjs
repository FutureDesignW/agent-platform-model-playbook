const task = await taskSpace(1)
const page = task.page("p1")

async function snap(name, url) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 })
    await new Promise(r => setTimeout(r, 3000))
    const s = await page.snapshot({ scope: "full_page" })
    const txt = typeof s === "string" ? s : JSON.stringify(s)
    console.log("\n########## " + name + " ########## " + (await page.url()) + " snapshotLen " + txt.length)
    console.log(txt.slice(0, 1800))
  } catch (e) {
    console.log("\n########## " + name + " ########## FAILED " + e.message)
  }
}

await snap("即梦 home", "https://jimeng.jianying.com/ai-tool/home")
await snap("小云雀 home", "https://xyq.jianying.com/")
