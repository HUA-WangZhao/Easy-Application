(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const rolePacks = {
    ai: {
      label: "AI/算法工程师",
      keywords: ["Python", "PyTorch", "TensorFlow", "LLM", "RAG", "机器学习", "深度学习", "模型评估", "数据处理", "部署", "MLOps", "向量检索"],
      verbs: ["构建", "训练", "优化", "部署", "评估", "压缩", "落地"],
      impact: "模型效果、工程落地和可复现实验"
    },
    frontend: {
      label: "前端工程师",
      keywords: ["React", "Vue", "TypeScript", "性能优化", "组件化", "工程化", "可访问性", "状态管理", "测试", "低代码", "可视化"],
      verbs: ["重构", "抽象", "交付", "优化", "封装", "治理", "联调"],
      impact: "用户体验、性能指标和工程效率"
    },
    product: {
      label: "产品经理",
      keywords: ["用户研究", "需求分析", "PRD", "数据分析", "A/B测试", "增长", "商业化", "路线图", "跨团队协作", "指标体系"],
      verbs: ["定义", "推动", "验证", "拆解", "协调", "复盘", "提升"],
      impact: "业务指标、用户价值和跨团队推进"
    },
    data: {
      label: "数据分析师",
      keywords: ["SQL", "Python", "BI", "指标体系", "数据建模", "可视化", "归因分析", "漏斗分析", "统计", "实验分析"],
      verbs: ["搭建", "分析", "定位", "验证", "沉淀", "监控", "提升"],
      impact: "指标解释、业务洞察和决策支持"
    },
    marketing: {
      label: "增长/市场运营",
      keywords: ["增长", "投放", "内容运营", "用户分层", "转化率", "私域", "活动策划", "CRM", "渠道", "留存"],
      verbs: ["策划", "投放", "转化", "运营", "拉新", "沉淀", "复盘"],
      impact: "获客效率、转化漏斗和用户留存"
    },
    general: {
      label: "通用商务岗位",
      keywords: ["项目管理", "沟通", "执行", "数据分析", "流程优化", "客户", "方案", "协作", "交付", "复盘"],
      verbs: ["推动", "协调", "交付", "优化", "管理", "解决", "提升"],
      impact: "业务结果、执行效率和协作质量"
    }
  };

  const apiPresets = {
    openai: {
      type: "responses",
      endpoint: "https://api.openai.com/v1/responses",
      model: "gpt-5.5",
      note: "OpenAI Responses API"
    },
    deepseek: {
      type: "chat",
      endpoint: "https://api.deepseek.com/chat/completions",
      model: "deepseek-v4-flash",
      note: "DeepSeek OpenAI 兼容接口"
    },
    qwen: {
      type: "chat",
      endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      model: "qwen-plus",
      note: "通义千问兼容模式"
    },
    zhipu: {
      type: "chat",
      endpoint: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
      model: "glm-4-plus",
      note: "智谱 GLM 兼容接口"
    },
    kimi: {
      type: "chat",
      endpoint: "https://api.moonshot.cn/v1/chat/completions",
      model: "moonshot-v1-8k",
      note: "Kimi / Moonshot 兼容接口"
    },
    custom: {
      type: "chat",
      endpoint: "",
      model: "",
      note: "自定义 OpenAI 兼容代理"
    }
  };

  const modulePresets = {
    awards: {
      title: "荣誉奖项",
      content: "2025 年度优秀项目奖\n校级一等奖学金"
    },
    languages: {
      title: "语言能力",
      content: "中文：母语\n英语：可作为工作语言"
    },
    certifications: {
      title: "证书资质",
      content: "PMP\nGoogle UX Design Certificate"
    },
    publications: {
      title: "论文/专利",
      content: "一种面向招聘场景的智能简历优化方法，发明专利撰写中"
    },
    openSource: {
      title: "开源/社区",
      content: "维护个人前端组件库，累计 300+ stars\n参与 AI 工具链开源项目文档贡献"
    },
    volunteer: {
      title: "志愿经历",
      content: "技术志愿者 @ 开源社区活动 | 2024\n- 负责报名表单、议程页面和现场支持"
    },
    custom: {
      title: "自定义模块",
      content: "在这里填写你想加入简历的模块内容"
    }
  };

  const defaultState = {
    profile: {
      name: "林知夏",
      title: "AI 产品与前端工程候选人",
      email: "zhixia.lin@example.com",
      phone: "+86 138 0000 2026",
      location: "上海",
      link: "portfolio.example.com",
      avatar: ""
    },
    raw: "",
    summary: "3 年 AI 产品与 Web 应用经验，熟悉从用户需求、原型设计到前端交付的完整流程。擅长把复杂业务拆解为可编辑、可验证的工具型产品，并通过数据反馈持续优化体验。",
    skills: "React, TypeScript, Prompt Engineering, RAG, Python, 数据分析, 产品原型, 用户研究, 简历优化, 在线编辑器",
    experience: "AI 应用产品工程师 @ 星河智能 | 2024.03 - 至今\n- 负责招聘场景的 AI 简历优化工具，从需求调研、交互原型到前端交付，首月服务 1200+ 名候选人。\n- 构建岗位关键词匹配与简历段落改写流程，将简历初筛通过率提升 28%。\n- 设计在线编辑、PDF 打印和表单填充助手，减少用户重复录入时间 60%。\n\n前端工程师 @ 云启科技 | 2021.07 - 2024.02\n- 使用 React 与 TypeScript 重构运营后台核心模块，页面加载时间下降 35%。\n- 封装表单、表格和文档预览组件，支撑 6 条业务线复用。\n- 与产品、设计和算法团队协作落地多轮 A/B 测试，推动关键转化率提升 15%。",
    projects: "智能简历工作台 | 2026\n- 支持简历全文导入、岗位方向选择、内容改写、头像优化、PPT 生成和投递填表辅助。\n- 采用本地优先设计，用户可在浏览器内编辑、预览、保存与打印。\n\n面试作品集生成器 | 2025\n- 将项目经历自动转为 16:9 展示页，支持页面级编辑和讲稿备注。",
    education: "复旦大学 | 软件工程本科 | 2017 - 2021\n证书：PMP，Google UX Design Certificate",
    jd: "我们正在寻找能够独立负责 AI 工具型产品落地的候选人，要求熟悉前端工程、Prompt Engineering、RAG、用户研究、数据分析和跨团队协作。",
    direction: "ai",
    seniority: "experienced",
    api: {
      provider: "openai",
      type: "responses",
      endpoint: "https://api.openai.com/v1/responses",
      model: "gpt-5.5",
      key: "",
      rememberKey: false,
      fallback: true
    },
    layout: {
      template: "executive",
      theme: "teal",
      fontScale: 100,
      densityScale: 100,
      showAvatar: true,
      showProjects: true,
      showEducation: true,
      showSkills: true,
      pageMode: "auto",
      tone: "direct"
    },
    modules: [
      {
        id: "certifications-1",
        title: "证书资质",
        content: "PMP\nGoogle UX Design Certificate",
        enabled: false
      }
    ],
    avatar: {
      src: "",
      zoom: 100,
      brightness: 104,
      contrast: 108,
      bg: "#f7fbfa"
    },
    autofill: {
      firstName: "知夏",
      lastName: "林",
      linkedin: "https://linkedin.com/in/zhixia-lin",
      role: "AI 产品与前端工程候选人",
      cover: "您好，我关注到贵司正在招聘 AI 工具型产品相关岗位。我的经验覆盖用户研究、前端工程、Prompt/RAG 应用和在线编辑器交付，能够快速把复杂流程做成可验证、可复用的产品能力。"
    },
    slides: []
  };

  let state = structuredClone(defaultState);
  let avatarImage = null;
  let toastTimer = null;

  const ids = {
    name: "#nameInput",
    title: "#titleInput",
    email: "#emailInput",
    phone: "#phoneInput",
    location: "#locationInput",
    link: "#linkInput",
    raw: "#rawInput",
    summary: "#summaryInput",
    skills: "#skillsInput",
    experience: "#experienceInput",
    projects: "#projectsInput",
    education: "#educationInput",
    jd: "#jdInput",
    direction: "#directionSelect",
    seniority: "#senioritySelect",
    apiProvider: "#apiProviderSelect",
    apiType: "#apiTypeSelect",
    apiEndpoint: "#apiEndpointInput",
    apiModel: "#apiModelInput",
    apiKey: "#apiKeyInput",
    rememberApiKey: "#rememberApiKey",
    useApiFallback: "#useApiFallback",
    template: "#templateSelect",
    theme: "#themeSelect",
    fontScale: "#fontScale",
    densityScale: "#densityScale",
    showAvatar: "#showAvatar",
    showProjects: "#showProjects",
    showEducation: "#showEducation",
    showSkills: "#showSkills",
    pageMode: "#pageMode",
    tone: "#toneSelect",
    avatarZoom: "#avatarZoom",
    avatarBrightness: "#avatarBrightness",
    avatarContrast: "#avatarContrast",
    avatarBg: "#avatarBg",
    firstName: "#firstNameField",
    lastName: "#lastNameField",
    linkedin: "#linkedinField",
    applyRole: "#applyRoleField",
    cover: "#coverField"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeState(base, incoming) {
    if (!incoming || typeof incoming !== "object") return base;
    Object.entries(incoming).forEach(([key, value]) => {
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        base[key] &&
        typeof base[key] === "object" &&
        !Array.isArray(base[key])
      ) {
        base[key] = mergeState(base[key], value);
      } else {
        base[key] = value;
      }
    });
    return base;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toast(message) {
    const node = $("#toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 1800);
  }

  function splitList(text) {
    return String(text || "")
      .split(/[,，;；、\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function splitBlocks(text) {
    return String(text || "")
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);
  }

  function parseEntries(text, fallbackTitle) {
    const blocks = splitBlocks(text);
    if (!blocks.length && text.trim()) {
      return [{ title: fallbackTitle, org: "", period: "", bullets: text.split("\n").filter(Boolean) }];
    }

    return blocks.map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const first = lines.shift() || fallbackTitle;
      const parts = first.split("|").map((part) => part.trim());
      const head = parts[0] || fallbackTitle;
      const period = parts.slice(1).join(" | ");
      let title = head;
      let org = "";

      if (head.includes("@")) {
        [title, org] = head.split("@").map((part) => part.trim());
      } else if (head.includes(" - ")) {
        [title, org] = head.split(" - ").map((part) => part.trim());
      }

      const bullets = lines
        .map((line) => line.replace(/^[-•*]\s*/, "").trim())
        .filter(Boolean);

      return { title, org, period, bullets };
    });
  }

  function parseResumeText(text) {
    const rawLines = String(text || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const lines = rawLines
      .map((line) => line.replace(/^#{1,6}\s*/, "").replace(/^\*\*(.*)\*\*$/, "$1").trim())
      .filter(Boolean);
    if (!lines.length) return;

    const next = clone(state);
    const all = lines.join("\n");
    const email = all.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phone = all.match(/(?:\+?\d[\d\s-]{7,}\d)/);
    const url = all.match(/(?:https?:\/\/|www\.)[^\s，,；;]+/i);
    const headingName = rawLines.find((line) => /^#\s+/.test(line))?.replace(/^#\s+/, "").trim();
    const nameLine = headingName || lines.find((line) => /^[\u4e00-\u9fa5A-Za-z\s]{2,18}$/.test(line) && !/(教育|经历|项目|技能|邮箱|电话|求职|工程师|经理|分析师|候选人|岗位|运营|产品)/.test(line));
    const nameIndex = nameLine ? lines.indexOf(nameLine) : -1;
    const titleCandidate = nameIndex >= 0 ? lines[nameIndex + 1] : "";

    next.profile.name = nameLine || next.profile.name;
    if (titleCandidate && titleCandidate.length <= 28 && !/[@\d]|摘要|技能|经历|项目|教育/.test(titleCandidate)) {
      next.profile.title = titleCandidate;
    }
    if (email) next.profile.email = email[0];
    if (phone) next.profile.phone = phone[0];
    if (url) next.profile.link = url[0];

    const findSection = (names) => {
      const index = lines.findIndex((line) => names.some((name) => line.includes(name)));
      if (index < 0) return "";
      const end = lines.findIndex((line, i) => i > index && /(教育|工作|项目|技能|证书|自我|个人|摘要|经历)/.test(line) && line.length < 12);
      return lines.slice(index + 1, end > index ? end : lines.length).join("\n");
    };

    next.summary = findSection(["摘要", "个人优势", "自我评价"]) || lines.slice(0, 5).join(" ");
    next.skills = findSection(["技能", "专业能力"]) || next.skills;
    next.experience = findSection(["工作经历", "实习经历", "经历"]) || next.experience;
    next.projects = findSection(["项目", "作品"]) || next.projects;
    next.education = findSection(["教育", "证书"]) || next.education;
    next.raw = text;
    state = next;
    syncInputsFromState();
    renderAll();
    toast("已从全文提取主要内容");
  }

  function extensionOf(fileName) {
    return (fileName.split(".").pop() || "").toLowerCase();
  }

  function setStatus(message) {
    $("#statusText").textContent = message;
  }

  function loadScript(src, globalName) {
    if (window[globalName]) return Promise.resolve(window[globalName]);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const timer = setTimeout(() => {
        script.remove();
        reject(new Error(`解析库加载超时：${src}`));
      }, 12000);
      script.src = src;
      script.async = true;
      script.onload = () => {
        clearTimeout(timer);
        resolve(window[globalName]);
      };
      script.onerror = () => {
        clearTimeout(timer);
        reject(new Error(`无法加载解析库：${src}`));
      };
      document.head.appendChild(script);
    });
  }

  async function loadPdfModule() {
    if (window.pdfjsLib) return window.pdfjsLib;
    if (window.location.protocol === "file:") {
      throw new Error("file:// 页面不能加载 pdf.js 模块，使用内置 PDF 抽取器");
    }
    try {
      return await import(new URL("./vendor/pdf.min.js", window.location.href).href);
    } catch {
      return import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs");
    }
  }

  async function extractPdfText(arrayBuffer) {
    try {
      const pdfjsLib = await loadPdfModule();
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("./vendor/pdf.worker.min.js", window.location.href).href;
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      const pages = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const text = content.items.map((item) => item.str).join(" ");
        pages.push(text);
      }
      return pages.join("\n\n");
    } catch {
      const fallbackText = await extractPdfTextBasic(arrayBuffer);
      if (fallbackText.trim().length > 20) return fallbackText;
      throw new Error("PDF 文本抽取失败，请尝试另存为文本、MD 或 DOCX 后导入。");
    }
  }

  async function extractPdfTextBasic(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const latin = bytesToLatin1(bytes);
    const chunks = [];
    let searchFrom = 0;

    while (searchFrom < latin.length) {
      const streamIndex = latin.indexOf("stream", searchFrom);
      if (streamIndex < 0) break;
      let dataStart = streamIndex + 6;
      if (latin[dataStart] === "\r" && latin[dataStart + 1] === "\n") dataStart += 2;
      else if (latin[dataStart] === "\n") dataStart += 1;
      const endIndex = latin.indexOf("endstream", dataStart);
      if (endIndex < 0) break;

      const header = latin.slice(Math.max(0, streamIndex - 500), streamIndex);
      const raw = bytes.slice(dataStart, endIndex);
      let contentBytes = raw;
      if (/\/ASCII85Decode/.test(header)) {
        contentBytes = decodeAscii85(contentBytes);
      }
      if (/\/Filter\s*\/FlateDecode/.test(header)) {
        contentBytes = await inflateZlib(raw).catch(() => raw);
      } else if (/\/FlateDecode/.test(header)) {
        contentBytes = await inflateZlib(contentBytes).catch(() => contentBytes);
      }
      const content = decodePdfBytes(contentBytes);
      const text = extractPdfTextOperators(content);
      if (text) chunks.push(text);
      searchFrom = endIndex + 9;
    }

    return chunks.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function decodeAscii85(bytes) {
    const text = bytesToLatin1(bytes).replace(/\s+/g, "").replace(/~>$/, "");
    const out = [];
    let group = [];

    for (const char of text) {
      if (char === "z" && group.length === 0) {
        out.push(0, 0, 0, 0);
        continue;
      }
      const code = char.charCodeAt(0);
      if (code < 33 || code > 117) continue;
      group.push(code - 33);
      if (group.length === 5) {
        let value = 0;
        group.forEach((digit) => {
          value = value * 85 + digit;
        });
        out.push((value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255);
        group = [];
      }
    }

    if (group.length) {
      const missing = 5 - group.length;
      for (let index = 0; index < missing; index += 1) group.push(84);
      let value = 0;
      group.forEach((digit) => {
        value = value * 85 + digit;
      });
      const decoded = [(value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255];
      out.push(...decoded.slice(0, 4 - missing));
    }

    return new Uint8Array(out);
  }

  function bytesToLatin1(bytes) {
    const chunkSize = 0x8000;
    let result = "";
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      result += String.fromCharCode(...bytes.slice(offset, offset + chunkSize));
    }
    return result;
  }

  function decodePdfBytes(bytes) {
    const utf8 = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    return utf8.includes("\uFFFD") ? bytesToLatin1(bytes) : utf8;
  }

  async function inflateZlib(bytes) {
    if (!("DecompressionStream" in window)) throw new Error("当前浏览器不支持 PDF 解压");
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  function extractPdfTextOperators(content) {
    const hits = [];
    const literalPattern = /\((?:\\.|[^\\)])*\)\s*Tj|\[(.*?)\]\s*TJ/gms;
    let match;
    while ((match = literalPattern.exec(content))) {
      const segment = match[0];
      const strings = segment.match(/\((?:\\.|[^\\)])*\)/g) || [];
      strings.forEach((value) => hits.push(unescapePdfLiteral(value.slice(1, -1))));
    }
    const hexPattern = /<([0-9A-Fa-f\s]{4,})>\s*Tj/g;
    while ((match = hexPattern.exec(content))) {
      hits.push(decodePdfHex(match[1]));
    }
    return hits.join(" ").replace(/\s{2,}/g, " ").trim();
  }

  function unescapePdfLiteral(value) {
    return value
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\b/g, "\b")
      .replace(/\\f/g, "\f")
      .replace(/\\([()\\])/g, "$1")
      .replace(/\\([0-7]{1,3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)));
  }

  function decodePdfHex(hex) {
    const clean = hex.replace(/\s+/g, "");
    const bytes = [];
    for (let index = 0; index < clean.length; index += 2) {
      bytes.push(parseInt(clean.slice(index, index + 2), 16));
    }
    const array = new Uint8Array(bytes);
    if (array[0] === 0xfe && array[1] === 0xff) {
      let text = "";
      for (let index = 2; index + 1 < array.length; index += 2) {
        text += String.fromCharCode((array[index] << 8) | array[index + 1]);
      }
      return text;
    }
    return decodePdfBytes(array);
  }

  async function extractDocxText(arrayBuffer) {
    try {
      const text = await extractDocxTextBasic(arrayBuffer);
      if (text.trim().length > 20) return text;
    } catch {
      // Fall through to Mammoth if the browser cannot inflate this DOCX.
    }
    const mammoth = await loadScript("https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js", "mammoth");
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || "";
  }

  async function extractDocxTextBasic(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const view = new DataView(arrayBuffer);
    const eocdOffset = findZipSignature(view, 0x06054b50, Math.max(0, bytes.length - 66000));
    if (eocdOffset < 0) throw new Error("无法识别 DOCX 压缩结构");
    const entryCount = view.getUint16(eocdOffset + 10, true);
    let pointer = view.getUint32(eocdOffset + 16, true);

    for (let index = 0; index < entryCount; index += 1) {
      if (view.getUint32(pointer, true) !== 0x02014b50) break;
      const compression = view.getUint16(pointer + 10, true);
      const compressedSize = view.getUint32(pointer + 20, true);
      const fileNameLength = view.getUint16(pointer + 28, true);
      const extraLength = view.getUint16(pointer + 30, true);
      const commentLength = view.getUint16(pointer + 32, true);
      const localHeaderOffset = view.getUint32(pointer + 42, true);
      const fileName = new TextDecoder().decode(bytes.slice(pointer + 46, pointer + 46 + fileNameLength));

      if (fileName === "word/document.xml") {
        const localNameLength = view.getUint16(localHeaderOffset + 26, true);
        const localExtraLength = view.getUint16(localHeaderOffset + 28, true);
        const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
        const compressed = bytes.slice(dataStart, dataStart + compressedSize);
        const xmlBytes = compression === 0 ? compressed : await inflateRaw(compressed);
        const xml = new TextDecoder("utf-8").decode(xmlBytes);
        return xmlToPlainText(xml);
      }

      pointer += 46 + fileNameLength + extraLength + commentLength;
    }

    throw new Error("DOCX 中没有找到正文内容");
  }

  function findZipSignature(view, signature, start) {
    for (let offset = view.byteLength - 4; offset >= start; offset -= 1) {
      if (view.getUint32(offset, true) === signature) return offset;
    }
    return -1;
  }

  async function inflateRaw(bytes) {
    if (!("DecompressionStream" in window)) throw new Error("当前浏览器不支持 DOCX 解压");
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  function xmlToPlainText(xml) {
    const text = xml
      .replace(/<w:tab\s*\/>/g, "\t")
      .replace(/<\/w:p>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  function stripRtf(text) {
    return text
      .replace(/\\'[0-9a-fA-F]{2}/g, "")
      .replace(/\\par[d]?/g, "\n")
      .replace(/\\[a-zA-Z]+\d* ?/g, "")
      .replace(/[{}]/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function roughBinaryText(arrayBuffer) {
    const text = new TextDecoder("utf-8", { fatal: false }).decode(arrayBuffer);
    return text
      .replace(/[^\S\r\n]+/g, " ")
      .replace(/[^\u4e00-\u9fa5A-Za-z0-9@+.,，。；;:：|/\\\-\s%()（）]/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  async function readResumeFile(file) {
    const ext = extensionOf(file.name);
    setStatus(`正在读取 ${file.name}`);

    if (ext === "json") {
      const text = await file.text();
      state = mergeState(clone(defaultState), JSON.parse(text));
      syncInputsFromState();
      renderAll();
      toast("JSON简历已导入");
      setStatus("JSON 导入完成");
      return;
    }

    if (["txt", "md", "markdown", "csv", "html", "htm"].includes(ext)) {
      return file.text();
    }

    if (ext === "rtf") {
      return stripRtf(await file.text());
    }

    const arrayBuffer = await file.arrayBuffer();
    if (ext === "pdf") return extractPdfText(arrayBuffer);
    if (ext === "docx") return extractDocxText(arrayBuffer);
    if (ext === "doc") {
      const extracted = roughBinaryText(arrayBuffer);
      if (extracted.length > 80) return extracted;
      throw new Error("旧版 .doc 在浏览器中无法稳定解析，请另存为 .docx 或 PDF 后导入。");
    }

    return roughBinaryText(arrayBuffer);
  }

  function syncInputsFromState() {
    $("#nameInput").value = state.profile.name;
    $("#titleInput").value = state.profile.title;
    $("#emailInput").value = state.profile.email;
    $("#phoneInput").value = state.profile.phone;
    $("#locationInput").value = state.profile.location;
    $("#linkInput").value = state.profile.link;
    $("#rawInput").value = state.raw;
    $("#summaryInput").value = state.summary;
    $("#skillsInput").value = state.skills;
    $("#experienceInput").value = state.experience;
    $("#projectsInput").value = state.projects;
    $("#educationInput").value = state.education;
    $("#jdInput").value = state.jd;
    $("#directionSelect").value = state.direction;
    $("#senioritySelect").value = state.seniority;
    $("#apiProviderSelect").value = state.api.provider || "custom";
    $("#apiTypeSelect").value = state.api.type;
    $("#apiEndpointInput").value = state.api.endpoint;
    $("#apiModelInput").value = state.api.model;
    $("#apiKeyInput").value = state.api.key || "";
    $("#rememberApiKey").checked = state.api.rememberKey;
    $("#useApiFallback").checked = state.api.fallback;
    $("#templateSelect").value = state.layout.template;
    $("#themeSelect").value = state.layout.theme;
    $("#fontScale").value = state.layout.fontScale;
    $("#densityScale").value = state.layout.densityScale;
    $("#showAvatar").checked = state.layout.showAvatar;
    $("#showProjects").checked = state.layout.showProjects;
    $("#showEducation").checked = state.layout.showEducation;
    $("#showSkills").checked = state.layout.showSkills;
    $("#pageMode").value = state.layout.pageMode;
    $("#toneSelect").value = state.layout.tone;
    $("#avatarZoom").value = state.avatar.zoom;
    $("#avatarBrightness").value = state.avatar.brightness;
    $("#avatarContrast").value = state.avatar.contrast;
    $("#avatarBg").value = state.avatar.bg;
    $("#firstNameField").value = state.autofill.firstName;
    $("#lastNameField").value = state.autofill.lastName;
    $("#linkedinField").value = state.autofill.linkedin;
    $("#applyRoleField").value = state.autofill.role;
    $("#coverField").value = state.autofill.cover;
    renderModuleManager();
  }

  function syncStateFromInputs() {
    state.profile.name = $("#nameInput").value.trim();
    state.profile.title = $("#titleInput").value.trim();
    state.profile.email = $("#emailInput").value.trim();
    state.profile.phone = $("#phoneInput").value.trim();
    state.profile.location = $("#locationInput").value.trim();
    state.profile.link = $("#linkInput").value.trim();
    state.raw = $("#rawInput").value;
    state.summary = $("#summaryInput").value;
    state.skills = $("#skillsInput").value;
    state.experience = $("#experienceInput").value;
    state.projects = $("#projectsInput").value;
    state.education = $("#educationInput").value;
    state.jd = $("#jdInput").value;
    state.direction = $("#directionSelect").value;
    state.seniority = $("#senioritySelect").value;
    state.api.provider = $("#apiProviderSelect").value;
    state.api.type = $("#apiTypeSelect").value;
    state.api.endpoint = $("#apiEndpointInput").value.trim();
    state.api.model = $("#apiModelInput").value.trim();
    state.api.key = $("#apiKeyInput").value.trim();
    state.api.rememberKey = $("#rememberApiKey").checked;
    state.api.fallback = $("#useApiFallback").checked;
    state.layout.template = $("#templateSelect").value;
    state.layout.theme = $("#themeSelect").value;
    state.layout.fontScale = Number($("#fontScale").value);
    state.layout.densityScale = Number($("#densityScale").value);
    state.layout.showAvatar = $("#showAvatar").checked;
    state.layout.showProjects = $("#showProjects").checked;
    state.layout.showEducation = $("#showEducation").checked;
    state.layout.showSkills = $("#showSkills").checked;
    state.layout.pageMode = $("#pageMode").value;
    state.layout.tone = $("#toneSelect").value;
    state.avatar.zoom = Number($("#avatarZoom").value);
    state.avatar.brightness = Number($("#avatarBrightness").value);
    state.avatar.contrast = Number($("#avatarContrast").value);
    state.avatar.bg = $("#avatarBg").value;
    state.autofill.firstName = $("#firstNameField").value.trim();
    state.autofill.lastName = $("#lastNameField").value.trim();
    state.autofill.linkedin = $("#linkedinField").value.trim();
    state.autofill.role = $("#applyRoleField").value.trim();
    state.autofill.cover = $("#coverField").value.trim();
  }

  function renderModuleManager() {
    const host = $("#moduleList");
    if (!host) return;
    host.innerHTML = (state.modules || []).map((module, index) => `
      <div class="module-item" data-module-index="${index}">
        <div class="module-item-head">
          <input data-module-field="enabled" type="checkbox" ${module.enabled ? "checked" : ""} aria-label="启用模块" />
          <input data-module-field="title" type="text" value="${escapeHtml(module.title)}" aria-label="模块标题" />
          <button class="module-remove" type="button" title="删除模块">删</button>
        </div>
        <textarea data-module-field="content" rows="4" aria-label="模块内容">${escapeHtml(module.content)}</textarea>
      </div>
    `).join("");

    host.querySelectorAll("[data-module-field]").forEach((input) => {
      input.addEventListener("input", updateModuleFromInput);
      input.addEventListener("change", updateModuleFromInput);
    });
    host.querySelectorAll(".module-remove").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".module-item");
        state.modules.splice(Number(item.dataset.moduleIndex), 1);
        renderModuleManager();
        renderResume();
        toast("模块已删除");
      });
    });
  }

  function updateModuleFromInput(event) {
    const item = event.target.closest(".module-item");
    const index = Number(item.dataset.moduleIndex);
    const field = event.target.dataset.moduleField;
    state.modules[index][field] = field === "enabled" ? event.target.checked : event.target.value;
    renderResume();
  }

  function addModuleFromPreset() {
    const key = $("#modulePresetSelect").value;
    const preset = modulePresets[key] || modulePresets.custom;
    const count = state.modules.filter((module) => module.title === preset.title).length + 1;
    state.modules.push({
      id: `${key}-${Date.now()}`,
      title: count > 1 ? `${preset.title} ${count}` : preset.title,
      content: preset.content,
      enabled: true
    });
    renderModuleManager();
    renderResume();
    toast("模块已添加到简历");
  }

  function initials(name) {
    const trimmed = String(name || "RS").trim();
    if (/[\u4e00-\u9fa5]/.test(trimmed)) return trimmed.slice(0, 2);
    return trimmed
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function renderResume() {
    const page = $("#resumePreview");
    const skills = splitList(state.skills);
    const experiences = parseEntries(state.experience, "工作经历");
    const projects = parseEntries(state.projects, "项目");
    const education = state.education.split("\n").map((line) => line.trim()).filter(Boolean);
    const customModules = (state.modules || []).filter((module) => module.enabled && module.title.trim() && module.content.trim());
    const avatar = state.avatar.src
      ? `<img src="${state.avatar.src}" alt="${escapeHtml(state.profile.name)}头像" />`
      : `<div class="fallback-avatar">${escapeHtml(initials(state.profile.name))}</div>`;

    page.className = `resume-page theme-${state.layout.theme} template-${state.layout.template}`;
    page.style.setProperty("--font-scale", state.layout.fontScale / 100);
    page.style.setProperty("--density-scale", state.layout.densityScale / 100);

    const contact = [
      state.profile.email,
      state.profile.phone,
      state.profile.location,
      state.profile.link
    ].filter(Boolean);

    page.innerHTML = `
      <aside class="resume-sidebar">
        ${state.layout.showAvatar ? `<div class="avatar-wrap">${avatar}</div>` : ""}
        <section class="resume-section">
          <h3>Contact</h3>
          <ul class="contact-list">${contact.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        ${state.layout.showSkills ? `
          <section class="resume-section">
            <h3>Skills</h3>
            <div class="skill-stack">${skills.map((item) => `<span class="skill-chip">${escapeHtml(item)}</span>`).join("")}</div>
          </section>
        ` : ""}
        ${state.layout.showEducation ? `
          <section class="resume-section">
            <h3>Education</h3>
            <ul class="plain-list">${education.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </section>
        ` : ""}
      </aside>
      <main class="resume-main">
        <header class="resume-head">
          <h2 class="resume-name">${escapeHtml(state.profile.name || "姓名")}</h2>
          <p class="resume-title">${escapeHtml(state.profile.title || "目标岗位")}</p>
        </header>
        <section class="resume-section">
          <h3>Profile</h3>
          <p class="summary-text">${escapeHtml(state.summary)}</p>
        </section>
        <section class="resume-section">
          <h3>Experience</h3>
          ${experiences.map(renderEntry).join("")}
        </section>
        ${state.layout.showProjects ? `
          <section class="resume-section">
            <h3>Projects</h3>
            ${projects.map(renderEntry).join("")}
          </section>
        ` : ""}
        ${customModules.map(renderCustomModule).join("")}
      </main>
    `;
  }

  function renderEntry(entry) {
    const bullets = entry.bullets.length ? entry.bullets : [entry.title];
    return `
      <article class="entry">
        <div class="entry-head">
          <div>
            <div class="entry-title">${escapeHtml(entry.title)}</div>
            ${entry.org ? `<div class="entry-sub">${escapeHtml(entry.org)}</div>` : ""}
          </div>
          ${entry.period ? `<div class="entry-meta">${escapeHtml(entry.period)}</div>` : ""}
        </div>
        <ul>${bullets.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      </article>
    `;
  }

  function renderCustomModule(module) {
    const lines = module.content.split("\n").map((line) => line.trim()).filter(Boolean);
    return `
      <section class="resume-section">
        <h3>${escapeHtml(module.title)}</h3>
        <ul class="plain-list">${lines.map((line) => `<li>${escapeHtml(line.replace(/^[-•*]\s*/, ""))}</li>`).join("")}</ul>
      </section>
    `;
  }

  function extractKeywords() {
    const pack = rolePacks[state.direction] || rolePacks.general;
    const jdWords = (state.jd.match(/[A-Za-z][A-Za-z+#.]{1,}|[\u4e00-\u9fa5]{2,}/g) || [])
      .map((word) => word.trim())
      .filter((word) => word.length > 1);
    const banned = new Set(["我们", "岗位", "要求", "负责", "相关", "能力", "经验", "熟悉", "能够", "进行", "以及", "the", "and", "with", "for"]);
    const ranked = new Map();
    [...pack.keywords, ...jdWords].forEach((word) => {
      const key = word.replace(/[，。；,.]/g, "");
      if (!key || banned.has(key.toLowerCase())) return;
      ranked.set(key, (ranked.get(key) || 0) + (pack.keywords.includes(key) ? 3 : 1));
    });
    return [...ranked.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word)
      .slice(0, 18);
  }

  function computeScore(keywords) {
    const resumeText = [
      state.profile.title,
      state.summary,
      state.skills,
      state.experience,
      state.projects,
      state.education
    ].join(" ").toLowerCase();
    const hits = keywords.filter((word) => resumeText.includes(word.toLowerCase()));
    const score = keywords.length ? Math.round((hits.length / keywords.length) * 100) : 0;
    return { score, hits };
  }

  function renderOptimizationStats() {
    const keywords = extractKeywords();
    const { score } = computeScore(keywords);
    const resumeText = `${state.summary}\n${state.experience}\n${state.projects}`;
    const verbs = rolePacks[state.direction].verbs;
    const verbCount = verbs.filter((verb) => resumeText.includes(verb)).length;
    $("#matchScore").textContent = `${score}%`;
    $("#keywordCount").textContent = String(keywords.length);
    $("#verbCount").textContent = String(verbCount);
    $("#keywordCloud").innerHTML = keywords.map((word) => `<span>${escapeHtml(word)}</span>`).join("");
  }

  function setApiStatus(message, mode = "") {
    const node = $("#apiStatus");
    node.textContent = message;
    node.classList.remove("ok", "error");
    if (mode) node.classList.add(mode);
  }

  function applyApiPreset(provider) {
    const preset = apiPresets[provider] || apiPresets.custom;
    state.api.provider = provider;
    state.api.type = preset.type;
    state.api.endpoint = preset.endpoint;
    state.api.model = preset.model;
    $("#apiProviderSelect").value = provider;
    $("#apiTypeSelect").value = preset.type;
    $("#apiEndpointInput").value = preset.endpoint;
    $("#apiModelInput").value = preset.model;
    setApiStatus(preset.note);
  }

  function buildAiPrompt() {
    const keywords = extractKeywords();
    const pack = rolePacks[state.direction] || rolePacks.general;
    return [
      `目标方向：${pack.label}`,
      `目标职级：${state.seniority}`,
      `岗位JD：${state.jd || "未提供"}`,
      `建议关键词：${keywords.join("、")}`,
      "",
      "当前简历：",
      markdownFromState(),
      "",
      "请优化这份简历，要求：",
      "1. 只返回 Markdown，不要解释过程。",
      "2. 必须包含以下二级标题：职业摘要、核心技能、工作经历、项目/作品、教育/证书。",
      "3. 工作经历和项目要改成量化、结果导向的中文 bullet。",
      "4. 不要编造学校、公司、年份、证书；如果缺少数据，用更稳妥的表述保留原意。",
      "5. 优先贴合目标岗位 JD 和关键词，同时保持 ATS 友好。"
    ].join("\n");
  }

  function extractAiText(data) {
    if (typeof data === "string") return data;
    if (data?.output_text) return data.output_text;
    if (data?.choices?.[0]?.message?.content) return data.choices[0].message.content;
    if (Array.isArray(data?.output)) {
      return data.output
        .flatMap((item) => item.content || [])
        .map((content) => content.text || content.output_text || "")
        .filter(Boolean)
        .join("\n");
    }
    return "";
  }

  function normalizeAiDraft(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return "";
    if (trimmed.includes("## 职业摘要")) return trimmed;

    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === "object" && parsed) {
        return [
          "## 职业摘要",
          parsed.summary || parsed.profile || state.summary,
          "",
          "## 核心技能",
          Array.isArray(parsed.skills) ? parsed.skills.join("，") : parsed.skills || state.skills,
          "",
          "## 工作经历",
          parsed.experience || state.experience,
          "",
          "## 项目/作品",
          parsed.projects || state.projects,
          "",
          "## 教育/证书",
          parsed.education || state.education
        ].join("\n");
      }
    } catch {
      // Plain Markdown is the expected format; JSON parsing is only a convenience.
    }

    return [
      "## 职业摘要",
      trimmed,
      "",
      "## 核心技能",
      state.skills,
      "",
      "## 工作经历",
      state.experience,
      "",
      "## 项目/作品",
      state.projects,
      "",
      "## 教育/证书",
      state.education
    ].join("\n");
  }

  async function callAiOptimize() {
    syncStateFromInputs();
    const endpoint = state.api.endpoint;
    const model = state.api.model;
    const button = $("#apiOptimizeBtn");

    if (!endpoint || !model) {
      toast("请先填写接口地址和模型");
      setApiStatus("配置不完整", "error");
      return;
    }

    if (state.api.provider !== "custom" && !state.api.key) {
      toast(`${apiPresets[state.api.provider]?.note || "该接口"}需要 API Key`);
      setApiStatus("缺少密钥", "error");
      return;
    }

    const instructions = "你是资深招聘顾问和简历编辑器，擅长根据岗位 JD 优化中文简历。你必须忠实保留用户事实，不编造经历。";
    const prompt = buildAiPrompt();
    const headers = { "Content-Type": "application/json" };
    if (state.api.key) headers.Authorization = `Bearer ${state.api.key}`;
    const body = state.api.type === "chat"
      ? {
          model,
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: prompt }
          ],
          temperature: 0.3
        }
      : {
          model,
          instructions,
          input: prompt
        };

    try {
      button.disabled = true;
      setApiStatus("调用中...");
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = payload?.error?.message || payload?.message || response.statusText;
        throw new Error(detail);
      }
      const text = normalizeAiDraft(extractAiText(payload));
      if (!text) throw new Error("模型未返回可用文本");
      $("#optimizedOutput").value = text;
      renderOptimizationStats();
      setApiStatus("已完成", "ok");
      toast("AI优化建议已生成");
    } catch (error) {
      setApiStatus("调用失败", "error");
      if (state.api.fallback) {
        buildOptimizedDraft();
        toast("AI调用失败，已使用本地优化");
      } else {
        toast(`AI调用失败：${error.message}`);
      }
    } finally {
      button.disabled = false;
    }
  }

  function buildOptimizedDraft() {
    syncStateFromInputs();
    const pack = rolePacks[state.direction] || rolePacks.general;
    const keywords = extractKeywords();
    const currentSkills = splitList(state.skills);
    const mergedSkills = [...new Set([...keywords.slice(0, 10), ...currentSkills])].slice(0, 18);
    const entries = parseEntries(state.experience, "工作经历");
    const projects = parseEntries(state.projects, "项目");
    const seniorityMap = {
      entry: "具备快速学习与高执行力",
      experienced: "能够独立推进从需求到交付的完整链路",
      senior: "能够牵引复杂项目、制定标准并带动团队交付"
    };
    const impact = pack.impact;
    const mainKeywords = keywords.slice(0, 5).join("、");

    const summary = `面向${pack.label}岗位，${seniorityMap[state.seniority]}，经验覆盖${mainKeywords || "业务分析、项目交付和跨团队协作"}。擅长围绕${impact}建立可量化目标，并将复杂问题拆解为可落地的方案、流程和工具。`;
    const improvedExperience = entries.map((entry, index) => {
      const verb = pack.verbs[index % pack.verbs.length];
      const key = keywords[index % Math.max(keywords.length, 1)] || pack.label;
      const bullets = entry.bullets.slice(0, 4).map((bullet, bulletIndex) => {
        const hasMetric = /\d|%|倍|小时|天|周|月/.test(bullet);
        const metric = hasMetric ? "" : bulletIndex % 2 === 0 ? "，并用关键指标跟踪效果" : "，沉淀为可复用方法";
        return `${verb}${bullet.replace(/^[，,。.\s]+/, "")}，突出${key}相关能力${metric}`;
      });
      if (!bullets.length) bullets.push(`${verb}${entry.title}相关工作，围绕${impact}交付可验证成果。`);
      return `${entry.title}${entry.org ? ` @ ${entry.org}` : ""}${entry.period ? ` | ${entry.period}` : ""}\n${bullets.map((line) => `- ${line}`).join("\n")}`;
    }).join("\n\n");

    const improvedProjects = projects.map((entry, index) => {
      const key = keywords[(index + 3) % Math.max(keywords.length, 1)] || pack.label;
      const bullets = entry.bullets.slice(0, 3).map((bullet) => `- 围绕${key}优化：${bullet}`);
      return `${entry.title}${entry.org ? ` @ ${entry.org}` : ""}${entry.period ? ` | ${entry.period}` : ""}\n${bullets.join("\n")}`;
    }).join("\n\n");

    const markdown = [
      `# ${state.profile.name} - ${state.profile.title || pack.label}`,
      "",
      "## 职业摘要",
      summary,
      "",
      "## 核心技能",
      mergedSkills.join("，"),
      "",
      "## 工作经历",
      improvedExperience,
      "",
      "## 项目/作品",
      improvedProjects || state.projects,
      "",
      "## 教育/证书",
      state.education
    ].join("\n");

    $("#optimizedOutput").value = markdown;
    renderOptimizationStats();
    toast("已生成岗位优化建议");
  }

  function applyOptimizedDraft() {
    const draft = $("#optimizedOutput").value.trim();
    if (!draft) {
      toast("先生成优化建议稿");
      return;
    }

    const grab = (title) => {
      const pattern = new RegExp(`## ${title}\\n([\\s\\S]*?)(?=\\n## |$)`);
      const match = draft.match(pattern);
      return match ? match[1].trim() : "";
    };

    state.summary = grab("职业摘要") || state.summary;
    state.skills = grab("核心技能") || state.skills;
    state.experience = grab("工作经历") || state.experience;
    state.projects = grab("项目/作品") || state.projects;
    state.education = grab("教育/证书") || state.education;
    syncInputsFromState();
    renderAll();
    toast("优化稿已应用");
  }

  function markdownFromState() {
    const modules = (state.modules || [])
      .filter((module) => module.enabled && module.title.trim() && module.content.trim())
      .flatMap((module) => ["", `## ${module.title}`, module.content]);
    return [
      `# ${state.profile.name}`,
      "",
      `**${state.profile.title}**`,
      "",
      [state.profile.email, state.profile.phone, state.profile.location, state.profile.link].filter(Boolean).join(" | "),
      "",
      "## 摘要",
      state.summary,
      "",
      "## 技能",
      state.skills,
      "",
      "## 工作经历",
      state.experience,
      "",
      "## 项目/作品",
      state.projects,
      "",
      "## 教育/证书",
      state.education,
      ...modules
    ].join("\n");
  }

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${label}已复制`);
    } catch {
      const helper = document.createElement("textarea");
      helper.value = text;
      document.body.appendChild(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
      toast(`${label}已复制`);
    }
  }

  function drawAvatar() {
    const canvas = $("#avatarCanvas");
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = state.avatar.bg;
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.43, 0, Math.PI * 2);
    ctx.clip();

    if (avatarImage) {
      const scale = state.avatar.zoom / 100;
      const imageRatio = avatarImage.width / avatarImage.height;
      let drawW = size * scale;
      let drawH = drawW / imageRatio;
      if (drawH < size * scale) {
        drawH = size * scale;
        drawW = drawH * imageRatio;
      }
      ctx.filter = `brightness(${state.avatar.brightness}%) contrast(${state.avatar.contrast}%) saturate(105%)`;
      ctx.drawImage(avatarImage, (size - drawW) / 2, (size - drawH) / 2, drawW, drawH);
    } else {
      ctx.fillStyle = "rgba(24,115,95,0.14)";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#18735f";
      ctx.font = "700 84px Segoe UI, Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(initials(state.profile.name), size / 2, size / 2);
    }
    ctx.restore();

    ctx.strokeStyle = "rgba(24,115,95,0.28)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.43, 0, Math.PI * 2);
    ctx.stroke();

    state.avatar.src = canvas.toDataURL("image/png");
  }

  function loadAvatar(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        avatarImage = image;
        resolve();
      };
      image.src = src;
    });
  }

  function buildAutofillPayload() {
    const fullName = state.profile.name.trim();
    const payload = {
      firstName: state.autofill.firstName || fullName.slice(1) || fullName,
      lastName: state.autofill.lastName || fullName.slice(0, 1),
      name: fullName,
      email: state.profile.email,
      phone: state.profile.phone,
      location: state.profile.location,
      portfolio: state.profile.link,
      linkedin: state.autofill.linkedin,
      role: state.autofill.role || state.profile.title,
      coverLetter: state.autofill.cover || state.summary,
      summary: state.summary,
      skills: state.skills
    };
    return payload;
  }

  function autofillSource(bookmarklet = false) {
    const payload = buildAutofillPayload();
    const source = `(() => {
  const data = ${JSON.stringify(payload, null, 2)};
  const pairs = [
    [/first|given|名(?!字)/i, data.firstName],
    [/last|family|surname|姓/i, data.lastName],
    [/full.?name|姓名|name/i, data.name],
    [/e-?mail|邮箱|email/i, data.email],
    [/phone|mobile|tel|电话|手机/i, data.phone],
    [/location|city|城市|地址/i, data.location],
    [/portfolio|website|homepage|作品|主页|github/i, data.portfolio],
    [/linkedin/i, data.linkedin],
    [/position|role|job|岗位|职位/i, data.role],
    [/cover|letter|summary|介绍|求职信|自我评价/i, data.coverLetter]
  ];
  const labelText = (el) => {
    const label = el.id ? document.querySelector('label[for="' + CSS.escape(el.id) + '"]') : null;
    return [el.name, el.id, el.placeholder, el.getAttribute('aria-label'), label && label.textContent]
      .filter(Boolean)
      .join(' ');
  };
  const setValue = (el, value) => {
    if (!value || el.type === 'file' || el.disabled || el.readOnly) return false;
    el.focus();
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  };
  let filled = 0;
  document.querySelectorAll('input, textarea, select').forEach((el) => {
    const text = labelText(el);
    const found = pairs.find(([pattern]) => pattern.test(text));
    if (found && setValue(el, found[1])) filled += 1;
  });
  alert('Resume Studio 已填入 ' + filled + ' 个字段，请核对后提交。');
})();`;
    if (!bookmarklet) return source;
    return `javascript:${encodeURIComponent(source)}`;
  }

  function buildAutofillScript() {
    syncStateFromInputs();
    const script = autofillSource(false);
    $("#autofillScript").value = script;
    toast("已生成自动填表脚本");
  }

  function fillDemoForm() {
    syncStateFromInputs();
    const data = buildAutofillPayload();
    const form = $("#demoForm");
    form.elements.first_name.value = data.firstName;
    form.elements.last_name.value = data.lastName;
    form.elements.email.value = data.email;
    form.elements.phone.value = data.phone;
    form.elements.location.value = data.location;
    form.elements.portfolio.value = data.portfolio;
    form.elements.cover_letter.value = data.coverLetter;
    toast("已填入模拟表单");
  }

  function slideBulletsFrom(text, limit = 4) {
    return text
      .split("\n")
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .filter((line) => line && !line.includes("@") && !line.includes("|"))
      .slice(0, limit);
  }

  function generateSlides() {
    syncStateFromInputs();
    const count = Math.max(2, Math.min(8, Number($("#slideCount").value) || 5));
    const skills = splitList(state.skills).slice(0, 8);
    const expBullets = slideBulletsFrom(state.experience, 5);
    const projectBullets = slideBulletsFrom(state.projects, 5);
    const base = [
      {
        kicker: state.profile.title || "Candidate Profile",
        title: `${state.profile.name} | 岗位匹配介绍`,
        bullets: [state.summary, `目标方向：${rolePacks[state.direction].label}`, `联系方式：${state.profile.email || state.profile.phone}`]
      },
      {
        kicker: "Core Fit",
        title: "核心能力与岗位关键词",
        bullets: skills.length ? skills : extractKeywords().slice(0, 6)
      },
      {
        kicker: "Experience",
        title: "关键经历与可量化成果",
        bullets: expBullets
      },
      {
        kicker: "Portfolio",
        title: "项目/作品亮点",
        bullets: projectBullets
      },
      {
        kicker: "Next Step",
        title: "可立即贡献的方向",
        bullets: [
          `围绕${rolePacks[state.direction].impact}建立短期目标`,
          "快速梳理现有流程中的高频重复任务并产品化",
          "用可观测指标验证优化效果并沉淀复用方案"
        ]
      },
      {
        kicker: "Method",
        title: "工作方法",
        bullets: ["需求拆解", "原型验证", "小步交付", "数据复盘"]
      },
      {
        kicker: "Collaboration",
        title: "协作方式",
        bullets: ["明确目标与边界", "同步风险与依赖", "交付可检查产物", "复盘并迭代"]
      },
      {
        kicker: "Contact",
        title: "联系与补充材料",
        bullets: [state.profile.email, state.profile.phone, state.profile.link].filter(Boolean)
      }
    ];

    state.slides = base.slice(0, count);
    renderSlideEditor();
    renderSlides();
    toast("PPT页面已生成");
  }

  function renderSlideEditor() {
    const host = $("#slideEditor");
    host.innerHTML = state.slides.map((slide, index) => `
      <div class="slide-edit-item" data-slide="${index}">
        <h3>第 ${index + 1} 页</h3>
        <label><span>眉题</span><input data-slide-field="kicker" value="${escapeHtml(slide.kicker)}" /></label>
        <label><span>标题</span><input data-slide-field="title" value="${escapeHtml(slide.title)}" /></label>
        <label><span>要点</span><textarea data-slide-field="bullets" rows="4">${escapeHtml(slide.bullets.join("\n"))}</textarea></label>
      </div>
    `).join("");

    host.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        const item = input.closest(".slide-edit-item");
        const index = Number(item.dataset.slide);
        const field = input.dataset.slideField;
        state.slides[index][field] = field === "bullets"
          ? input.value.split("\n").map((line) => line.trim()).filter(Boolean)
          : input.value;
        renderSlides();
      });
    });
  }

  function renderSlides() {
    const host = $("#slidesPreview");
    if (!state.slides.length) generateSlides();
    host.innerHTML = state.slides.map((slide, index) => `
      <article class="slide-page">
        <aside class="slide-aside">
          <span class="slide-no">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <p class="slide-kicker">${escapeHtml(slide.kicker)}</p>
            <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          </div>
          <span>${escapeHtml(state.profile.name)}</span>
        </aside>
        <section class="slide-body">
          <ul>${slide.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      </article>
    `).join("");
  }

  function slidesOutline() {
    return state.slides
      .map((slide, index) => [
        `${index + 1}. ${slide.title}`,
        `   ${slide.kicker}`,
        ...slide.bullets.map((bullet) => `   - ${bullet}`)
      ].join("\n"))
      .join("\n\n");
  }

  function renderAll() {
    drawAvatar();
    renderResume();
    renderOptimizationStats();
    renderSlides();
    $("#previewMeta").textContent = $("#slidesPreviewWrap").classList.contains("hidden") ? "A4预览" : "16:9预览";
  }

  function saveState() {
    syncStateFromInputs();
    localStorage.setItem("resume-studio-state", serializeState());
    toast("已保存到本机浏览器");
  }

  function serializeState() {
    const savedState = clone(state);
    if (!savedState.api.rememberKey) savedState.api.key = "";
    return JSON.stringify(savedState, null, 2);
  }

  async function saveStateAsFile() {
    syncStateFromInputs();
    const content = serializeState();
    const fileName = `${state.profile.name || "resume-studio"}.resume.json`;
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });

    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "Resume Studio JSON",
              accept: { "application/json": [".json"] }
            }
          ]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        toast("已选择位置并保存文件");
        return;
      } catch (error) {
        if (error.name === "AbortError") {
          toast("已取消另存为");
          return;
        }
      }
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
    toast("浏览器已下载简历文件");
  }

  async function loadState() {
    const saved = localStorage.getItem("resume-studio-state");
    if (!saved) {
      toast("没有找到本地保存");
      return;
    }
    state = mergeState(clone(defaultState), JSON.parse(saved));
    if (state.avatar?.src) await loadAvatar(state.avatar.src);
    syncInputsFromState();
    renderSlideEditor();
    renderAll();
    toast("已读取本地版本");
  }

  function setSample() {
    state = clone(defaultState);
    avatarImage = null;
    syncInputsFromState();
    generateSlides();
    renderAll();
    toast("已载入样例简历");
  }

  function bindEvents() {
    $$(".rail-btn").forEach((button) => {
      button.addEventListener("click", () => {
        $$(".rail-btn").forEach((item) => item.classList.remove("active"));
        $$(".panel").forEach((panel) => panel.classList.remove("active"));
        button.classList.add("active");
        $(`#${button.dataset.panel}`).classList.add("active");
      });
    });

    const liveInputs = [
      ...$$("input"),
      ...$$("textarea"),
      ...$$("select")
    ].filter((input) => !["resumeFile", "avatarFile"].includes(input.id));

    liveInputs.forEach((input) => {
      input.addEventListener("input", () => {
        syncStateFromInputs();
        renderAll();
      });
      input.addEventListener("change", () => {
        syncStateFromInputs();
        renderAll();
      });
    });

    $("#resumeFile").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const text = await readResumeFile(file);
        if (!text) return;
        $("#rawInput").value = text;
        state.raw = text;
        parseResumeText(text);
        setStatus(`${file.name} 读取完成`);
      } catch (error) {
        setStatus("读取失败");
        toast(error.message || "文件读取失败");
      } finally {
        event.target.value = "";
      }
    });

    $("#avatarFile").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        await loadAvatar(reader.result);
        drawAvatar();
        renderResume();
        toast("头像已优化并应用");
      };
      reader.readAsDataURL(file);
    });

    $("#sampleBtn").addEventListener("click", setSample);
    $("#saveAsBtn").addEventListener("click", saveStateAsFile);
    $("#apiProviderSelect").addEventListener("change", (event) => {
      applyApiPreset(event.target.value);
      renderOptimizationStats();
    });
    $("#addModuleBtn").addEventListener("click", addModuleFromPreset);
    $("#parseBtn").addEventListener("click", () => parseResumeText($("#rawInput").value));
    $("#optimizeBtn").addEventListener("click", buildOptimizedDraft);
    $("#apiOptimizeBtn").addEventListener("click", callAiOptimize);
    $("#applyOptimizedBtn").addEventListener("click", applyOptimizedDraft);
    $("#copyMdBtn").addEventListener("click", () => copyText(markdownFromState(), "Markdown"));
    $("#atsBtn").addEventListener("click", () => {
      state.layout.template = "ats";
      state.layout.showAvatar = false;
      state.layout.fontScale = 96;
      state.layout.densityScale = 94;
      syncInputsFromState();
      renderAll();
      toast("已切换 ATS 模式");
    });
    $("#autoAvatarBtn").addEventListener("click", () => {
      state.avatar.zoom = 112;
      state.avatar.brightness = 108;
      state.avatar.contrast = 112;
      syncInputsFromState();
      renderAll();
      toast("已应用头像优化参数");
    });
    $("#clearAvatarBtn").addEventListener("click", () => {
      avatarImage = null;
      state.avatar.src = "";
      renderAll();
      toast("头像已移除");
    });
    $("#downloadAvatarBtn").addEventListener("click", () => {
      drawAvatar();
      const link = document.createElement("a");
      link.download = "resume-avatar.png";
      link.href = state.avatar.src;
      link.click();
    });
    $("#buildScriptBtn").addEventListener("click", buildAutofillScript);
    $("#copyScriptBtn").addEventListener("click", () => {
      buildAutofillScript();
      copyText($("#autofillScript").value, "自动填表脚本");
    });
    $("#copyBookmarkBtn").addEventListener("click", () => copyText(autofillSource(true), "书签脚本"));
    $("#fillDemoBtn").addEventListener("click", fillDemoForm);
    $("#generateSlidesBtn").addEventListener("click", generateSlides);
    $("#copySlidesBtn").addEventListener("click", () => copyText(slidesOutline(), "PPT大纲"));
    $("#printSlidesBtn").addEventListener("click", () => {
      $("#resumePreviewWrap").classList.add("hidden");
      $("#slidesPreviewWrap").classList.remove("hidden");
      window.print();
    });
    $("#printBtn").addEventListener("click", () => window.print());
    $("#saveBtn").addEventListener("click", saveState);
    $("#loadBtn").addEventListener("click", loadState);
    $("#resumeViewBtn").addEventListener("click", () => {
      $("#resumeViewBtn").classList.add("active");
      $("#slidesViewBtn").classList.remove("active");
      $("#resumePreviewWrap").classList.remove("hidden");
      $("#slidesPreviewWrap").classList.add("hidden");
      $("#previewMeta").textContent = "A4预览";
    });
    $("#slidesViewBtn").addEventListener("click", () => {
      $("#slidesViewBtn").classList.add("active");
      $("#resumeViewBtn").classList.remove("active");
      $("#slidesPreviewWrap").classList.remove("hidden");
      $("#resumePreviewWrap").classList.add("hidden");
      $("#previewMeta").textContent = "16:9预览";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    syncInputsFromState();
    generateSlides();
    buildAutofillScript();
    renderAll();
  });
})();
