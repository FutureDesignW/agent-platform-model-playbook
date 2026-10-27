const task = await taskSpace(1)
const page = task.page("p1")

async function probe(name, url) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })
    await new Promise(r => setTimeout(r, 5000))
    const info = await page.evaluate(() => {
      const t = document.body ? document.body.innerText : ""
      const lines = t.split("\n").map(s => s.trim()).filter(Boolean)
      const links = [...document.querySelectorAll("a")].map(a => (a.textContent || "").trim().slice(0, 10) + "->" + (a.getAttribute("href") || "")).slice(0, 25)
      return { len: t.length, short: lines.filter(l => l.length <= 8).slice(0, 45), links }
    })
    console.log("\n##### " + name + " | " + (await page.url()) + " len " + info.len)
    console.log("短标签: " + info.short.join(" / "))
    console.log("链接: " + info.links.join(" , "))
  } catch (e) { console.log("\n##### " + name + " FAILED " + e.message) }
}

await probe("小云雀", "https://xyq.jianying.com/home")
await probe("LibTV", "https://libtv.gongke.net/")
