# Resume Studio 使用说明

Resume Studio 是一个本地优先的网页端简历工作台，用于导入简历、优化内容、在线排版、处理头像、生成面试 PPT 页面，并辅助填写招聘网站投递表单。

## 当前能力

- 直接打开：可双击 `index.html` 直接使用，也可双击 `open-resume-studio.bat` 以本地网页模式打开。
- 简历导入：支持 `.txt`、`.md`、`.markdown`、`.json`、`.csv`、`.pdf`、`.docx`、`.rtf`、`.html` 等文件导入，也可以直接粘贴全文。
- 内容编辑：姓名、岗位、联系方式、摘要、技能、经历、项目和教育信息均可在线编辑。
- 岗位优化：可选择 AI/算法、前端、产品、数据、增长运营、通用商务等方向。
- AI API 优化：支持 OpenAI Responses API、DeepSeek、通义千问兼容模式、智谱 GLM、Kimi/Moonshot，以及自定义 Chat Completions 兼容接口。
- 排版预览：提供专业双栏、紧凑单页、作品展示、ATS 纯文本模式。
- 模块管理：可在侧端添加荣誉奖项、语言能力、证书资质、论文/专利、开源/社区、志愿经历和自定义模块。
- 头像优化：上传人脸头像后可调整缩放、亮度、对比度和背景色，并应用到简历。
- 投递填表：根据简历生成可复制脚本，用于在招聘网站页面中自动填入常见字段。
- PPT 页面：可按简历内容生成 2-8 页 16:9 面试介绍/作品集页面，并在线编辑。
- 本地保存：可保存到当前浏览器的 `localStorage`，也可以点击 `另存为` 选择本地保存位置。

## 用户安装与本地运行

Resume Studio 当前是本地网页应用，不需要安装数据库、后端服务或浏览器插件。每个用户只需要拿到完整的 `resume-studio` 文件夹，就可以在自己的电脑上运行。

## 公开发布安全说明

这个文件夹可以公开发布，但请只发布应用文件，不要把个人数据一起发布。

- 项目文件中不应包含任何真实 API Key、账号密码、身份证号、手机号、真实简历或投递记录。
- 公开版的 API Key 只在当前浏览器页面运行时使用，不会写入 `localStorage`，也不会写入导出的 `.resume.json`。
- 即使导入的 `.resume.json` 中包含 API Key，页面也会在读取时自动清空。
- 发布前请不要把自己的 `.resume.json`、PDF 简历、Word 简历、截图、浏览器缓存或测试投递记录放进公开压缩包。
- 示例中的姓名、邮箱、电话和经历均应保持为演示数据；如果改成真实信息，请在发布前替换回示例数据。

建议公开发布时只包含：

```text
resume-studio/
  index.html
  app.js
  styles.css
  README.md
  read.md
  open-resume-studio.bat
  vendor/
    pdf.min.js
    pdf.worker.min.js
    pdf.min.mjs
    pdf.worker.min.mjs
```

### 文件夹内容

请保持这些文件在同一个文件夹内：

```text
resume-studio/
  index.html
  app.js
  styles.css
  README.md
  open-resume-studio.bat
  vendor/
    pdf.min.js
    pdf.worker.min.js
```

不要只复制 `index.html`，否则样式、功能脚本和 PDF 解析文件会丢失。

### Windows 用户

推荐方式：

1. 解压或复制整个 `resume-studio` 文件夹到本地电脑。
2. 双击 `open-resume-studio.bat`。
3. 浏览器会打开 `http://127.0.0.1:8765/index.html`。
4. 保持弹出的命令窗口不要关闭；关闭后网页服务会停止。
5. 使用完成后，关闭浏览器页面和命令窗口即可。

备用方式：

1. 直接双击 `index.html`。
2. 页面会以 `file://` 方式打开。
3. MD、TXT、JSON、RTF、DOCX 等功能可正常使用；PDF 会使用基础抽取器，复杂 PDF 建议用推荐方式打开。

### macOS / Linux 用户

方式一：直接打开。

1. 复制整个 `resume-studio` 文件夹到本地电脑。
2. 用浏览器打开 `index.html`。
3. 适合编辑、排版、保存、导入 MD/TXT/JSON/DOCX 等文件。

方式二：用本地网页服务打开。

在 `resume-studio` 文件夹中打开终端，运行：

```bash
python3 -m http.server 8765
```

然后在浏览器访问：

```text
http://127.0.0.1:8765/index.html
```

如果电脑没有 Python，也可以使用任意本地静态服务器，只要能打开 `index.html` 即可。

### 多用户分发

给其他用户使用时，直接发送或打包整个 `resume-studio` 文件夹。每个用户的数据默认保存在自己的浏览器或自己选择的本地文件中，互相不会共享。

建议每个用户第一次使用时执行：

1. 打开页面。
2. 点击 `样例` 熟悉界面。
3. 点击 `另存为` 保存一个自己的 `.resume.json` 文件。
4. 后续可通过 `导入` 重新打开该 JSON 文件继续编辑。

## 快速开始

1. 打开 `index.html`，或在 Windows 上双击 `open-resume-studio.bat`。
2. 点击顶部 `样例` 查看完整演示数据。
3. 点击顶部 `导入`，选择 PDF、MD、DOCX、RTF、TXT 或 JSON 简历；也可以在 `简历` 面板中直接粘贴全文。
4. 在 `优化` 面板中选择目标岗位方向，并粘贴招聘 JD。
5. 点击 `本地优化` 或配置 API 后点击 `AI优化`。
6. 检查 `优化建议稿`，确认后点击 `应用到简历`。
7. 在 `版式` 面板调整模板、主题色、字号、行距和显示模块；需要新增模块时在 `侧端模块` 区添加。
8. 点击顶部 `保存` 可保存到浏览器；点击 `另存为` 可选择本地文件保存位置。
9. 点击顶部 `打印/PDF`，使用浏览器打印功能导出 PDF。

## 文件导入说明

- `.md`、`.txt`、`.csv`、`.html`：直接读取文本。
- `.json`：读取 Resume Studio 保存的结构化简历文件。
- `.pdf`：本地网页模式下优先使用内置 pdf.js；直接双击 HTML 时使用基础 PDF 抽取器。
- `.docx`：使用内置 ZIP/XML 抽取器读取 Word 正文；少数复杂 DOCX 会尝试 Mammoth 兜底。
- `.rtf`：进行基础去格式处理后抽取文本。
- `.doc`：旧版 Word 二进制格式在浏览器中无法稳定解析，页面会尝试基础文本抽取；如果失败，请先在 Word/WPS 中另存为 `.docx` 或 PDF。

推荐用 `open-resume-studio.bat` 打开，这样 PDF 解析更完整；MD、TXT、JSON、RTF 和基础 DOCX 抽取不依赖联网。

## 本地保存位置

- `保存`：保存到当前浏览器的本地存储，适合临时继续编辑。
- `读取`：读取浏览器本地存储中的上一版。
- `另存为`：在支持 File System Access API 的浏览器中弹出本地保存位置选择器；不支持时自动回退为下载 `.resume.json` 文件。
- 之后可再次通过 `导入` 读取这个 JSON 文件继续编辑。

## AI API 配置

在 `优化` 面板的 `AI API 设置` 中填写：

- 服务商：可选择 OpenAI、DeepSeek、通义千问兼容、智谱 GLM、Kimi/Moonshot 或自定义。
- 接口类型：默认 `OpenAI Responses`。
- 接口地址：默认 `https://api.openai.com/v1/responses`。
- 模型：默认 `gpt-5.5`，可改成你的账号可用模型。
- API Key：填入你的密钥。
- 公开版不保存密钥：API Key 只用于当前页面调用，刷新或导出后不会保留。
- 失败时使用本地优化：API 调用失败时自动回退到规则优化。

Responses API 请求会发送类似结构：

```json
{
  "model": "gpt-5.5",
  "instructions": "你是资深招聘顾问和简历编辑器...",
  "input": "目标方向、岗位JD、当前简历和输出要求..."
}
```

Chat Completions 兼容模式会发送类似结构：

```json
{
  "model": "your-model",
  "messages": [
    { "role": "system", "content": "你是资深招聘顾问和简历编辑器..." },
    { "role": "user", "content": "目标方向、岗位JD、当前简历和输出要求..." }
  ],
  "temperature": 0.3
}
```

DeepSeek 预设：

```text
服务商：DeepSeek
接口类型：Chat Completions 兼容
接口地址：https://api.deepseek.com/chat/completions
模型：deepseek-v4-flash
```

官方参考：

- [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses/create)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [DeepSeek API 文档](https://api-docs.deepseek.com/)

## 生产环境建议

当前版本是静态网页原型，适合个人本地试用。若要部署给多人使用，建议增加后端代理：

1. 前端只请求自己的后端接口，例如 `/api/resume-optimize`。
2. 后端从环境变量读取模型服务密钥，例如 `MODEL_API_KEY`。
3. 后端再调用 OpenAI、DeepSeek 或其他兼容模型服务。
4. 前端不保存、不展示真实 API Key。

这样可以避免 API Key 暴露在浏览器、日志或共享电脑中。

## 自动填表使用

1. 在 `投递` 面板补充姓名拆分、LinkedIn、期望岗位和求职信摘要。
2. 点击 `生成脚本`。
3. 点击 `复制脚本`。
4. 打开招聘网站的投递页面。
5. 在浏览器开发者工具 Console 中粘贴运行脚本。
6. 检查每个字段后再手动提交。

注意：不同招聘网站字段命名差异很大，脚本只会匹配常见字段。涉及隐私、授权、验证码、登录和提交按钮的步骤应由用户自行确认。

## PPT 页面使用

1. 进入 `PPT` 面板。
2. 选择页数和用途。
3. 点击 `生成页面`。
4. 在每一页的编辑框中修改眉题、标题和要点。
5. 切换右侧预览到 `PPT`。
6. 点击 `打印PPT` 或 `复制大纲`。

## 数据与隐私

- 简历内容默认只存在浏览器内存中。
- 点击 `保存` 后，内容会保存到当前浏览器的 `localStorage`。
- 点击 `另存为` 后，会由浏览器写入你选择的本地文件。
- API 调用会把当前简历、岗位 JD 和优化要求发送到你配置的接口。
- 默认不会保存 API Key；公开版已禁用密钥持久化。
- 自动填表脚本不会自动提交申请，提交前需要人工核对。

## 后续可扩展方向

- 增加真实后端代理和用户账号体系。
- 增加简历版本管理与多岗位投递记录。
- 增加头像背景分割、人脸居中和证件照尺寸导出。
- 增加 PPTX 文件导出。
- 增加浏览器插件，让投递页面自动识别字段并填充。
