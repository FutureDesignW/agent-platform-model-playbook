const task = await taskSpace(1)
const page = task.page("p1")

const sites = [
  ["LibTV", "https://libtv.gongke.net/"],
  ["小云雀", "https://xyq.jianying.com/"],
  ["即梦", "https://jimeng.jianying.com/"],
  ["OiiOii", "https://www.oiioii.ai/zh/"],
]

for (const [name, url] of sites) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 })
    await new Promise(r => setTimeout(r, 2500))
    const info = await page.evaluate(() => {
      const t = document.body ? document.body.innerText : ""
      const links = [...document.querySelectorAll("a")].map(a => (a.textContent || "").trim().slice(0, 12) + " -> " + a.href)
        .filter(s => /create|workspace|member|vip|pricing|plan|生成|创作|会员|套餐|home/i.test(s))
      return {
        login: /登录|注册/.test(t), logout: /退出|个人中心|我的/.test(t),
        credits: (t.match(/[\d,]+\s*(积分|点|credits)/gi) || []).slice(0, 5),
        links: links.slice(0, 14),
      }
    })
    console.log("\n===== " + name + " =====")
    console.log("有登录入口:", info.login, "| 有用户态:", info.logout, "| 余额片段:", JSON.stringify(info.credits))
    console.log(info.links.join("\n"))
  } catch (e) {
    console.log("\n===== " + name + " ===== FAILED " + e.message)
  }
}
