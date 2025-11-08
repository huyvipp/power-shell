import express from "express";
import { exec } from "child_process";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h2>🚀 Railway Web Shell</h2>
    <form method="POST" action="/run">
      <input name="cmd" placeholder="Nhập lệnh..." style="width:300px;" />
      <button type="submit">Chạy</button>
    </form>
  `);
});

app.post("/run", express.urlencoded({ extended: true }), (req, res) => {
  const cmd = req.body.cmd;
  exec(cmd, (error, stdout, stderr) => {
    if (error) return res.send(`<pre>${error.message}</pre>`);
    res.send(`<pre>${stdout || stderr}</pre><a href="/">Quay lại</a>`);
  });
});

app.listen(3000, () => console.log("✅ Web shell đang chạy trên port 3000"));
