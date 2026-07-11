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
      sourceSidebarWidth: 245,
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
      applyUrl: "",
      firstName: "知夏",
      lastName: "林",
      linkedin: "https://linkedin.com/in/zhixia-lin",
      role: "AI 产品与前端工程候选人",
      cover: "您好，我关注到贵司正在招聘 AI 工具型产品相关岗位。我的经验覆盖用户研究、前端工程、Prompt/RAG 应用和在线编辑器交付，能够快速把复杂流程做成可验证、可复用的产品能力。",
      pageFields: "",
      smartMapText: ""
    },
    slides: []
  };

  function markdownTemplateSampleState() {
    const sample = clone(defaultState);
    const raw = `# 新建简历 2f9f4f

## 基本信息

### 宋哈娜
高级前端工程师
- 状态: 离职
- 生日: 2025-01
- 邮箱: zhangsan@example.com
- 电话: 13800138000
- 地址: 北京市朝阳区
- 个人网站: https://zhangsan.dev

## 专业技能

- 前端框架：熟悉 React、Vue.js，熟悉 Next.js、Nuxt.js 等 SSR 框架
- 开发语言：TypeScript、JavaScript(ES6+)、HTML5、CSS3
- UI/样式：熟悉 TailwindCSS、Sass/Less、CSS Module、Styled-components
- 状态管理：Redux、Vuex、Zustand、Jotai、React Query
- 工程化工具：Webpack、Vite、Rollup、Babel、ESLint
- 测试工具：Jest、React Testing Library、Cypress
- 性能优化：熟悉浏览器渲染原理、性能指标监控、代码分割、懒加载等优化技术
- 版本控制：Git、SVN
- 技术管理：具备团队管理经验，主导过多个大型项目的技术选型和架构设计

## 工作经验

### 字节跳动 | 高级前端工程师

_2021.07 - 2024.12_

- 负责抖音创作者平台的开发与维护，主导多个核心功能的技术方案设计
- 优化项目工程化配置，将构建时间从 8 分钟优化至 2 分钟，提升团队开发效率
- 设计并实现组件库，提升代码复用率达 70%，显著减少开发时间
- 主导性能优化项目，使平台首屏加载时间减少 50%，接入 APM 监控系统
- 指导初级工程师，组织技术分享会，提升团队整体技术水平

## 项目经历

### 抖音创作者中台

_前端负责人 | 2022.06 - 2023.12_

- 基于 React 开发的创作者数据分析和内容管理平台，服务百万级创作者群体
- 包含数据分析、内容管理、收益管理等多个子系统
- 使用 Redux 进行状态管理，实现复杂数据流的高效处理
- 采用 Ant Design 组件库，确保界面设计的一致性和用户体验
- 实施代码分割和懒加载策略，优化大规模应用的加载性能

### 微信小程序开发者工具

_核心开发者 | 2020.03 - 2021.06_

- 为开发者提供小程序开发、调试和发布的一站式解决方案
- 基于 Electron 构建的跨平台桌面应用
- 支持多平台开发，包括 Windows、macOS 和 Linux
- 提供实时的错误日志和性能分析工具
- 集成第三方插件和 SDK，支持开发者自定义功能

### 前端监控平台

_技术负责人 | 2021.09 - 2022.03_

- 一个完整的前端监控解决方案，包含错误监控、性能监控、用户行为分析等功能。
- 基于 Vue 和 Element UI 构建，提供实时的监控数据和可视化分析工具。
- 支持多种监控指标，包括错误日志、性能指标、用户行为分析等。
- 提供详细的错误日志和性能分析工具，帮助开发者定位和优化问题。
- 集成第三方插件和 SDK，支持开发者自定义功能。

## 教育经历

### 北京大学 | 计算机科学与技术

_2013-09 - 2017-06_

- 主修课程：数据结构、算法设计、操作系统、计算机网络、Web开发技术
- 专业排名前 5%，连续三年获得一等奖学金
- 担任计算机协会技术部部长，组织多次技术分享会
- 参与开源项目贡献，获得 GitHub Campus Expert 认证`;

    sample.profile = {
      name: "宋哈娜",
      title: "高级前端工程师",
      email: "zhangsan@example.com",
      phone: "13800138000",
      location: "北京市朝阳区",
      link: "https://zhangsan.dev",
      avatar: ""
    };
    sample.raw = raw;
    sample.summary = "高级前端工程师，长期负责大型前端平台、组件库、性能优化和工程化体系建设，熟悉 React、Vue、SSR、状态管理与团队技术管理。";
    sample.skills = "前端框架：熟悉 React、Vue.js，熟悉 Next.js、Nuxt.js 等 SSR 框架\n开发语言：TypeScript、JavaScript(ES6+)、HTML5、CSS3\nUI/样式：熟悉 TailwindCSS、Sass/Less、CSS Module、Styled-components\n状态管理：Redux、Vuex、Zustand、Jotai、React Query\n工程化工具：Webpack、Vite、Rollup、Babel、ESLint\n测试工具：Jest、React Testing Library、Cypress\n性能优化：熟悉浏览器渲染原理、性能指标监控、代码分割、懒加载等优化技术\n版本控制：Git、SVN\n技术管理：具备团队管理经验，主导过多个大型项目的技术选型和架构设计";
    sample.experience = "高级前端工程师 @ 字节跳动 | 2021.07 - 2024.12\n- 负责抖音创作者平台的开发与维护，主导多个核心功能的技术方案设计\n- 优化项目工程化配置，将构建时间从 8 分钟优化至 2 分钟，提升团队开发效率\n- 设计并实现组件库，提升代码复用率达 70%，显著减少开发时间\n- 主导性能优化项目，使平台首屏加载时间减少 50%，接入 APM 监控系统\n- 指导初级工程师，组织技术分享会，提升团队整体技术水平";
    sample.projects = "前端负责人 @ 抖音创作者中台 | 2022.06 - 2023.12\n- 基于 React 开发的创作者数据分析和内容管理平台，服务百万级创作者群体\n- 包含数据分析、内容管理、收益管理等多个子系统\n- 使用 Redux 进行状态管理，实现复杂数据流的高效处理\n- 采用 Ant Design 组件库，确保界面设计的一致性和用户体验\n- 实施代码分割和懒加载策略，优化大规模应用的加载性能\n\n核心开发者 @ 微信小程序开发者工具 | 2020.03 - 2021.06\n- 为开发者提供小程序开发、调试和发布的一站式解决方案\n- 基于 Electron 构建的跨平台桌面应用\n- 支持多平台开发，包括 Windows、macOS 和 Linux\n- 提供实时的错误日志和性能分析工具\n- 集成第三方插件和 SDK，支持开发者自定义功能\n\n技术负责人 @ 前端监控平台 | 2021.09 - 2022.03\n- 一个完整的前端监控解决方案，包含错误监控、性能监控、用户行为分析等功能\n- 基于 Vue 和 Element UI 构建，提供实时的监控数据和可视化分析工具\n- 支持多种监控指标，包括错误日志、性能指标、用户行为分析等\n- 提供详细的错误日志和性能分析工具，帮助开发者定位和优化问题\n- 集成第三方插件和 SDK，支持开发者自定义功能";
    sample.education = "北京大学 | 计算机科学与技术 | 2013-09 - 2017-06\n- 主修课程：数据结构、算法设计、操作系统、计算机网络、Web开发技术\n- 专业排名前 5%，连续三年获得一等奖学金\n- 担任计算机协会技术部部长，组织多次技术分享会\n- 参与开源项目贡献，获得 GitHub Campus Expert 认证";
    sample.jd = "目标岗位：高级前端工程师 / 前端负责人。要求熟悉 React、Vue、TypeScript、工程化、性能优化、组件库建设和团队技术管理。";
    sample.direction = "frontend";
    sample.seniority = "senior";
    sample.layout = {
      ...sample.layout,
      template: "markdown",
      theme: "ink",
      fontScale: 100,
      densityScale: 100,
      showAvatar: false,
      showProjects: true,
      showEducation: true,
      showSkills: true,
      pageMode: "auto",
      tone: "balanced"
    };
    sample.modules = [];
    sample.avatar = { ...sample.avatar, src: "" };
    sample.autofill = {
      ...sample.autofill,
      firstName: "哈娜",
      lastName: "宋",
      linkedin: "https://zhangsan.dev",
      role: "高级前端工程师",
      cover: "您好，我具备大型前端平台、组件库、工程化和性能优化经验，熟悉 React/Vue/TypeScript 技术栈，也有团队技术管理和项目推进经验。"
    };
    sample.slides = [];
    return sample;
  }

  function linesToBullets(text) {
    return String(text || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^[-•*]\s*/, ""))
      .map((line) => `- ${line}`)
      .join("\n");
  }

  function rawFromSampleSpec(spec) {
    const profile = spec.profile || {};
    const contact = [
      profile.email ? `- 邮箱: ${profile.email}` : "",
      profile.phone ? `- 电话: ${profile.phone}` : "",
      profile.location ? `- 城市: ${profile.location}` : "",
      profile.link ? `- 主页: ${profile.link}` : ""
    ].filter(Boolean).join("\n");

    return [
      `# ${profile.name || "样例简历"}`,
      `## 基本信息\n\n### ${profile.name || "姓名"}\n${profile.title || "目标岗位"}\n${contact}`,
      `## 职业摘要\n\n${spec.summary || ""}`,
      `## 专业技能\n\n${linesToBullets(spec.skills)}`,
      `## 工作经验\n\n${spec.experience || ""}`,
      `## 项目经历\n\n${spec.projects || ""}`,
      `## 教育经历\n\n${spec.education || ""}`
    ].join("\n\n").trim();
  }

  function sampleStateFromSpec(spec) {
    const sample = clone(defaultState);
    sample.profile = {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      link: "",
      avatar: "",
      ...(spec.profile || {})
    };
    sample.raw = spec.raw || rawFromSampleSpec(spec);
    sample.summary = spec.summary || "";
    sample.skills = spec.skills || "";
    sample.experience = spec.experience || "";
    sample.projects = spec.projects || "";
    sample.education = spec.education || "";
    sample.jd = spec.jd || "";
    sample.direction = spec.direction || "general";
    sample.seniority = spec.seniority || "experienced";
    sample.layout = {
      ...sample.layout,
      ...(spec.layout || {})
    };
    sample.modules = spec.modules || [];
    sample.avatar = { ...sample.avatar, src: "", ...(spec.avatar || {}) };
    sample.autofill = {
      ...sample.autofill,
      firstName: spec.autofill?.firstName || "",
      lastName: spec.autofill?.lastName || "",
      linkedin: spec.profile?.link || "",
      role: spec.profile?.title || "",
      cover: spec.autofill?.cover || ""
    };
    sample.slides = [];
    return sample;
  }

  function embeddedLinuxSampleState() {
    return sampleStateFromSpec({
      profile: {
        name: "周明远",
        title: "嵌入式 Linux 工程师",
        email: "mingyuan.zhou@example.com",
        phone: "13900001234",
        location: "深圳",
        link: "github.com/mingyuan-embedded"
      },
      summary: "5 年嵌入式 Linux 与物联网网关开发经验，熟悉 Linux BSP、驱动调试、设备树、U-Boot、Yocto 构建和多协议通信，能独立推进从硬件 bring-up 到量产问题闭环。",
      skills: "嵌入式 Linux、C/C++、Shell、Python\nU-Boot、Linux Kernel、Device Tree、Yocto、Buildroot\nUART、I2C、SPI、CAN、RS485、GPIO、PWM\nMQTT、TCP/IP、HTTP、Modbus、Zigbee\nGDB、perf、strace、logic analyzer、oscilloscope\n量产测试、故障定位、技术文档、跨团队协作",
      experience: "嵌入式 Linux 工程师 @ 华辰智能硬件 | 2022.04 - 至今\n- 负责 ARM Linux 网关 BSP 适配，完成 U-Boot 启动链路、设备树和内核裁剪，启动时间缩短 28%。\n- 开发 RS485、CAN、GPIO 扩展板驱动和用户态诊断工具，支撑 3 条产品线复用。\n- 建立量产测试脚本和日志采集流程，将现场问题定位平均时间从 2 天缩短到 4 小时。\n\n嵌入式软件工程师 @ 星澜物联 | 2019.07 - 2022.03\n- 参与 Zigbee 网关和边缘采集设备开发，负责通信协议适配、OTA 升级和异常恢复机制。\n- 优化 MQTT 消息缓存和断线重连策略，弱网环境下数据补传成功率提升至 99%。\n- 与硬件团队联调电源、串口和传感器模块，输出 bring-up 检查清单和调试文档。",
      projects: "工业边缘网关量产平台 | 负责人 | 2023.03 - 2024.06\n- 基于 Buildroot 定制系统镜像，集成驱动、守护进程、远程日志和一键恢复能力。\n- 设计产测流程，覆盖串口、网口、CAN、存储、RTC 和传感器链路，减少人工测试步骤 60%。\n\n多协议数据采集终端 | 核心开发 | 2021.02 - 2022.01\n- 实现 Modbus RTU/TCP、MQTT 和本地缓存队列，支持断网续传和远程参数配置。\n- 通过内存泄漏检测和压力测试，将长期运行稳定性提升到 30 天无异常重启。",
      education: "电子科技大学 | 电子信息工程 | 2015 - 2019\n证书：Linux 基金会 LFCS，CET-6",
      jd: "目标岗位：嵌入式 Linux 工程师。要求熟悉 C/C++、Linux Kernel、驱动、设备树、U-Boot、Buildroot/Yocto、通信协议和量产调试。",
      direction: "general",
      seniority: "experienced",
      layout: {
        template: "executive",
        theme: "teal",
        fontScale: 98,
        densityScale: 96,
        showAvatar: true,
        pageMode: "auto",
        tone: "direct"
      },
      modules: [
        {
          id: "embedded-cert-1",
          title: "证书与工具",
          content: "LFCS\n熟悉示波器、逻辑分析仪、J-Link、串口抓包工具",
          enabled: true
        }
      ],
      autofill: {
        firstName: "明远",
        lastName: "周",
        cover: "您好，我具备嵌入式 Linux BSP、驱动调试、通信协议和量产问题闭环经验，能够快速参与硬件 bring-up、系统裁剪和现场问题定位。"
      }
    });
  }

  function aiProductSampleState() {
    return sampleStateFromSpec({
      profile: {
        name: "林知夏",
        title: "AI 产品与前端工程候选人",
        email: "zhixia.lin@example.com",
        phone: "+86 138 0000 2026",
        location: "上海",
        link: "portfolio.example.com"
      },
      summary: "3 年 AI 产品与 Web 应用经验，熟悉从用户需求、原型设计到前端交付的完整流程。擅长把复杂业务拆解为可编辑、可验证的工具型产品，并通过数据反馈持续优化体验。",
      skills: "React、TypeScript、Prompt Engineering、RAG\nPython、数据分析、产品原型、用户研究\n在线编辑器、A/B 测试、埋点分析、跨团队协作",
      experience: "AI 应用产品工程师 @ 星河智能 | 2024.03 - 至今\n- 负责招聘场景 AI 简历优化工具，从需求调研、交互原型到前端交付，首月服务 1200+ 名候选人。\n- 构建岗位关键词匹配与简历段落改写流程，将简历初筛通过率提升 28%。\n- 设计在线编辑、PDF 打印和表单填充助手，减少用户重复录入时间 60%。\n\n前端工程师 @ 云启科技 | 2021.07 - 2024.02\n- 使用 React 与 TypeScript 重构运营后台核心模块，页面加载时间下降 35%。\n- 封装表单、表格和文档预览组件，支撑 6 条业务线复用。\n- 与产品、设计和算法团队协作落地多轮 A/B 测试，推动关键转化率提升 15%。",
      projects: "智能简历工作台 | 2026\n- 支持简历全文导入、岗位方向选择、内容改写、头像优化、PPT 生成和投递填表辅助。\n- 采用本地优先设计，用户可在浏览器内编辑、预览、保存与打印。\n\n面试作品集生成器 | 2025\n- 将项目经历自动转为 16:9 展示页，支持页面级编辑和讲稿备注。",
      education: "复旦大学 | 软件工程本科 | 2017 - 2021\n证书：PMP，Google UX Design Certificate",
      jd: "我们正在寻找能够独立负责 AI 工具型产品落地的候选人，要求熟悉前端工程、Prompt Engineering、RAG、用户研究、数据分析和跨团队协作。",
      direction: "ai",
      seniority: "experienced",
      layout: {
        template: "executive",
        theme: "teal",
        fontScale: 100,
        densityScale: 100,
        showAvatar: true,
        pageMode: "auto",
        tone: "direct"
      },
      modules: [
        {
          id: "ai-cert-1",
          title: "证书资质",
          content: "PMP\nGoogle UX Design Certificate",
          enabled: true
        }
      ],
      autofill: {
        firstName: "知夏",
        lastName: "林",
        cover: "您好，我关注到贵司正在招聘 AI 工具型产品相关岗位。我的经验覆盖用户研究、前端工程、Prompt/RAG 应用和在线编辑器交付。"
      }
    });
  }

  function productManagerSampleState() {
    return sampleStateFromSpec({
      profile: {
        name: "顾清和",
        title: "B 端产品经理",
        email: "qinghe.gu@example.com",
        phone: "13600007890",
        location: "杭州",
        link: "qinghe.pm"
      },
      summary: "4 年 B 端 SaaS 产品经验，覆盖 CRM、审批流、权限体系和数据看板。擅长从业务流程梳理、需求优先级、原型方案到上线复盘，能推动复杂系统在销售、运营和研发之间达成共识。",
      skills: "需求调研、流程建模、PRD、原型设计、竞品分析\nCRM、权限体系、审批流、数据看板、低代码配置\nSQL、埋点分析、A/B 测试、项目管理、跨部门沟通",
      experience: "高级产品经理 @ 云帆科技 | 2022.06 - 至今\n- 负责企业 CRM 线索、商机、合同和回款模块，支持 400+ 销售团队日常使用。\n- 重构线索分配和跟进提醒机制，销售首次响应时长下降 42%，线索转商机率提升 18%。\n- 搭建权限和审批配置后台，使 70% 常见流程无需研发介入即可配置上线。\n\n产品经理 @ 蓝鲸软件 | 2020.07 - 2022.05\n- 负责运营后台、工单系统和数据看板，沉淀 30+ 通用组件和页面模板。\n- 与实施团队共建客户需求分级机制，将定制需求交付周期缩短 25%。",
      projects: "企业 CRM 经营看板 | 产品负责人 | 2023.04 - 2024.02\n- 建立销售漏斗、目标达成、客户分层和回款预测指标体系，支持管理层周度复盘。\n- 将多表导出流程改为可配置看板，运营报表准备时间从 3 小时缩短到 20 分钟。\n\n低代码审批配置中心 | 核心产品 | 2022.09 - 2023.03\n- 支持节点、条件、角色和通知模板配置，覆盖合同、折扣、退款等 12 类审批场景。",
      education: "浙江大学 | 信息管理与信息系统 | 2016 - 2020\n荣誉：校级优秀毕业生，产品设计竞赛一等奖",
      jd: "目标岗位：B 端产品经理。要求熟悉 SaaS、CRM、业务流程、数据分析、PRD、跨团队推进和上线复盘。",
      direction: "product",
      seniority: "experienced",
      layout: {
        template: "creative",
        theme: "coral",
        fontScale: 101,
        densityScale: 100,
        showAvatar: true,
        pageMode: "auto",
        tone: "balanced"
      },
      modules: [
        {
          id: "product-award-1",
          title: "方法与工具",
          content: "Axure / Figma / 墨刀\nSQL / 神策 / 飞书多维表格\nScrum / OKR / 用户访谈",
          enabled: true
        }
      ],
      autofill: {
        firstName: "清和",
        lastName: "顾",
        cover: "您好，我长期负责 B 端 SaaS 产品，熟悉 CRM、审批流、权限配置和数据看板，能够把复杂业务流程转化为可落地、可复盘的产品方案。"
      }
    });
  }

  function dataAnalystSampleState() {
    return sampleStateFromSpec({
      profile: {
        name: "沈若宁",
        title: "数据分析师",
        email: "ruoning.shen@example.com",
        phone: "13700005678",
        location: "北京",
        link: "github.com/ruoning-data"
      },
      summary: "3 年互联网数据分析经验，熟悉指标体系、SQL 取数、用户分群、转化漏斗和实验分析。能够将业务问题拆成可验证假设，并用自动化看板和专题分析支持增长决策。",
      skills: "SQL、Python、Pandas、NumPy、Tableau、Power BI\n指标体系、漏斗分析、留存分析、A/B 测试、用户分群\nHive、ClickHouse、Excel、数据治理、可视化汇报",
      experience: "数据分析师 @ 轻舟出行 | 2022.08 - 至今\n- 负责用户增长和会员业务分析，搭建拉新、激活、留存、付费指标体系。\n- 设计新用户首单转化漏斗，定位注册后流失节点，推动首单转化率提升 9.6%。\n- 建立周度经营看板和异常预警，减少运营手工取数 80%。\n\n商业分析专员 @ 乐橙电商 | 2021.04 - 2022.07\n- 分析活动投放、商品转化和复购表现，输出价格带和品类组合建议。\n- 使用 Python 自动化清洗多渠道数据，报表出数时间从 1 天缩短到 2 小时。",
      projects: "会员留存提升专项 | 数据负责人 | 2023.05 - 2023.11\n- 基于 RFM 和行为路径构建会员分层，识别高价值沉默用户并设计召回策略。\n- 通过实验分组验证权益包方案，会员 30 日留存提升 7.2 个百分点。\n\n增长渠道归因看板 | 核心分析 | 2022.11 - 2023.03\n- 打通投放、注册、首单和复购链路，建立渠道 ROI 和质量评分模型。",
      education: "中国人民大学 | 统计学 | 2017 - 2021\n课程：回归分析、数据挖掘、统计建模、数据库系统",
      jd: "目标岗位：数据分析师。要求熟悉 SQL、Python、指标体系、A/B 测试、数据可视化和业务专题分析。",
      direction: "data",
      seniority: "experienced",
      layout: {
        template: "compact",
        theme: "gold",
        fontScale: 96,
        densityScale: 92,
        showAvatar: false,
        pageMode: "one",
        tone: "direct"
      },
      modules: [
        {
          id: "data-tool-1",
          title: "工具栈",
          content: "Hive / ClickHouse / MySQL\nTableau / Power BI / Excel\nPython / Pandas / Jupyter",
          enabled: true
        }
      ],
      autofill: {
        firstName: "若宁",
        lastName: "沈",
        cover: "您好，我具备增长、会员和经营分析经验，熟悉 SQL、Python、指标体系、实验分析和可视化看板，能够为业务决策提供清晰的数据依据。"
      }
    });
  }

  function campusBackendSampleState() {
    return sampleStateFromSpec({
      profile: {
        name: "陈一诺",
        title: "Java 后端开发工程师（校招）",
        email: "yinuo.chen@example.com",
        phone: "13500004321",
        location: "成都",
        link: "github.com/yinuo-backend"
      },
      summary: "计算机科学本科应届生，基础扎实，熟悉 Java、Spring Boot、MySQL、Redis 和常见数据结构算法。完成过课程项目和实习项目，重视代码规范、接口文档和问题复盘。",
      skills: "Java、Spring Boot、MyBatis、RESTful API\nMySQL、Redis、RabbitMQ、Linux、Docker\n数据结构、算法、计算机网络、操作系统、Git\nJUnit、接口文档、日志排查、基础性能优化",
      experience: "后端开发实习生 @ 启点云 | 2025.07 - 2025.10\n- 参与内部工单系统后端开发，负责用户标签、筛选查询和导出接口。\n- 使用 Redis 缓存热点配置，接口平均响应时间从 420ms 降低到 160ms。\n- 补充单元测试和 Swagger 接口文档，降低前后端联调成本。",
      projects: "校园二手交易平台 | 后端负责人 | 2025.02 - 2025.06\n- 使用 Spring Boot、MyBatis、MySQL 实现用户、商品、订单和消息模块。\n- 设计商品搜索和分页接口，引入 Redis 缓存热门商品列表。\n- 使用 Docker Compose 部署测试环境，输出接口文档和部署说明。\n\n在线题库系统 | 课程项目 | 2024.09 - 2024.12\n- 实现题目管理、提交记录、排行榜和错题本功能，支持基础权限控制。",
      education: "四川大学 | 计算机科学与技术 | 2022 - 2026\nGPA：3.7/4.0\n奖项：校级二等奖学金，蓝桥杯省赛二等奖",
      jd: "目标岗位：Java 后端开发工程师校招。要求熟悉 Java、Spring Boot、数据库、缓存、计算机基础和项目实践。",
      direction: "general",
      seniority: "entry",
      layout: {
        template: "ats",
        theme: "ink",
        fontScale: 96,
        densityScale: 94,
        showAvatar: false,
        pageMode: "one",
        tone: "concise"
      },
      modules: [
        {
          id: "campus-award-1",
          title: "竞赛与荣誉",
          content: "蓝桥杯省赛二等奖\n校级二等奖学金\n优秀学生干部",
          enabled: true
        }
      ],
      autofill: {
        firstName: "一诺",
        lastName: "陈",
        cover: "您好，我是计算机科学专业应届生，熟悉 Java、Spring Boot、MySQL、Redis 和基础后端开发流程，希望应聘 Java 后端开发工程师校招岗位。"
      }
    });
  }

  const sampleCatalog = [
    { id: "frontend-markdown", label: "前端高级 · Markdown单栏", factory: markdownTemplateSampleState },
    { id: "embedded-linux", label: "嵌入式 Linux · 专业双栏", factory: embeddedLinuxSampleState },
    { id: "ai-product", label: "AI 产品工程 · 专业双栏", factory: aiProductSampleState },
    { id: "product-manager", label: "B 端产品经理 · 作品展示", factory: productManagerSampleState },
    { id: "data-analyst", label: "数据分析师 · 紧凑单页", factory: dataAnalystSampleState },
    { id: "campus-backend", label: "校招后端 · ATS纯文本", factory: campusBackendSampleState }
  ];

  function sampleById(id) {
    return sampleCatalog.find((sample) => sample.id === id) || sampleCatalog[0];
  }

  let state = sampleById("frontend-markdown").factory();
  let avatarImage = null;
  let toastTimer = null;
  let currentFileHandle = null;
  let currentFileName = "";
  let pendingPdfImportStyle = null;

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
    applyUrl: "#applyUrlField",
    cover: "#coverField",
    pageFields: "#pageFieldsInput",
    smartMapText: "#smartApplyOutput"
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

  function scrubSensitiveState(target) {
    const safe = target || state;
    if (safe.api) {
      safe.api.key = "";
      safe.api.rememberKey = false;
    }
    return safe;
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

  function serializeEntries(entries, fallbackTitle) {
    return entries
      .map((entry) => {
        const title = entry.title.trim() || fallbackTitle;
        const head = [
          entry.org.trim() ? `${title} @ ${entry.org.trim()}` : title,
          entry.period.trim()
        ].filter(Boolean).join(" | ");
        const bullets = entry.bullets
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => `- ${line}`);
        return [head, ...bullets].join("\n");
      })
      .filter(Boolean)
      .join("\n\n");
  }

  function editAttrs(field, mode = "single") {
    return `contenteditable="true" spellcheck="false" data-edit-field="${field}" data-edit-mode="${mode}" title="点击直接修改"`;
  }

  function listEditAttrs(field) {
    return `contenteditable="true" spellcheck="false" data-edit-list="${field}" data-edit-mode="single" title="点击直接修改"`;
  }

  function entryEditAttrs(field, index, part, mode = "single") {
    return `contenteditable="true" spellcheck="false" data-edit-entry="${field}" data-entry-index="${index}" data-entry-part="${part}" data-edit-mode="${mode}" title="点击直接修改"`;
  }

  function moduleEditAttrs(index, part, mode = "single") {
    return `contenteditable="true" spellcheck="false" data-edit-module="${index}" data-module-part="${part}" data-edit-mode="${mode}" title="点击直接修改"`;
  }

  function parseResumeText(text, options = {}) {
    const rawLines = String(text || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const lines = rawLines
      .map((line) => line.replace(/^#{1,6}\s*/, "").replace(/^\*\*(.*)\*\*$/, "$1").trim())
      .filter(Boolean);
    if (!lines.length) return;

    const next = clone(state);
    if (options.replaceContent) {
      next.profile = {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        link: "",
        avatar: state.profile.avatar || ""
      };
      next.summary = "";
      next.skills = "";
      next.experience = "";
      next.projects = "";
      next.education = "";
      next.raw = "";
    }
    const all = lines.join("\n");
    const email = all.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phone = all.match(/(?:\+?\d[\d\s-]{7,}\d)/);
    const url = all.match(/(?:https?:\/\/|www\.)[^\s，,；;]+/i);
    const headingName = rawLines.find((line) => /^#\s+/.test(line))?.replace(/^#\s+/, "").trim();
    const sectionHeadingPattern = /(个人简历|简历|基本|教育|经历|项目|技能|邮箱|电话|求职|工程师|经理|分析师|候选人|岗位|运营|产品|证书|荣誉|优点|负责|参与|搭建|使用|开发|优化|系统|驱动|协议|模块|公司|有限公司|时间|Linux|Zigbee|MQTT|Times New Roman|Arial|Unicode|Calibri|SimSun|Segoe|宋体|黑体|微软雅黑|personal resume|resume|contact|contacts|email|phone|mobile|skills|education|experience|work|project|projects|summary|profile|objective|certification|certifications|award|awards|language|languages)/i;
    const nameLine = headingName || lines.find((line) => isLikelyNameLine(line, sectionHeadingPattern));
    const nameIndex = nameLine ? lines.indexOf(nameLine) : -1;
    const titleCandidate = nameIndex >= 0 ? lines[nameIndex + 1] : "";

    next.profile.name = nameLine || next.profile.name;
    if (titleCandidate && titleCandidate.length <= 28 && !/[@\d]|摘要|技能|经历|项目|教育|个人简历|简历|personal resume|resume|contact|skills|profile|summary/i.test(titleCandidate)) {
      next.profile.title = titleCandidate;
    }
    if (email) next.profile.email = email[0];
    if (phone) next.profile.phone = phone[0];
    if (url) next.profile.link = url[0];

    const sectionEndPattern = /(教育|工作|项目|技能|证书|自我|个人|摘要|经历|contact|contacts|profile|summary|objective|skills|experience|work|employment|project|projects|portfolio|education|certification|certifications|awards|languages)/i;
    const findSection = (names) => {
      const index = lines.findIndex((line) => names.some((name) => line.includes(name)));
      if (index < 0) return "";
      const end = lines.findIndex((line, i) => i > index && sectionEndPattern.test(line) && line.length < 28);
      return lines.slice(index + 1, end > index ? end : lines.length).join("\n");
    };

    const fallbackSummary = lines
      .filter((line) => !sectionHeadingPattern.test(line))
      .filter((line) => !/^\d{1,4}$/.test(line))
      .slice(0, 5)
      .join(" ");
    next.summary = findSection(["摘要", "个人优势", "自我评价", "SUMMARY", "Summary", "PROFILE", "Profile", "OBJECTIVE", "Objective"]) || fallbackSummary;
    next.skills = findSection(["技能", "专业能力", "SKILLS", "Skills", "CORE SKILLS", "Core Skills"]) || next.skills;
    next.experience = findSection(["工作经历", "实习经历", "经历", "EXPERIENCE", "Experience", "WORK EXPERIENCE", "Work Experience", "EMPLOYMENT", "Employment"]) || next.experience;
    next.projects = findSection(["项目", "作品", "PROJECTS", "Projects", "PORTFOLIO", "Portfolio"]) || next.projects;
    next.education = findSection(["教育", "证书", "EDUCATION", "Education", "CERTIFICATIONS", "Certifications"]) || next.education;
    next.raw = text;
    state = next;
    syncInputsFromState();
    renderAll();
    toast("已从全文提取主要内容");
  }

  function isLikelyNameLine(line, sectionHeadingPattern) {
    const value = String(line || "").trim();
    if (!/^[\u4e00-\u9fa5A-Za-z\s]{2,28}$/.test(value)) return false;
    if (sectionHeadingPattern.test(value)) return false;
    if (/[。；,，:：@|/\d]/.test(value)) return false;

    const hasChinese = /[\u4e00-\u9fa5]/.test(value);
    const hasLatin = /[A-Za-z]/.test(value);
    if (hasChinese && hasLatin) return false;
    if (hasChinese && value.replace(/\s/g, "").length > 6) return false;
    if (hasLatin) {
      const words = value.split(/\s+/).filter(Boolean);
      const letters = value.replace(/\s/g, "");
      if (words.length > 4 || letters.length < 4) return false;
      if (letters === letters.toLowerCase()) return false;
    }
    return true;
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
      const pdfjsLib = await loadScript("./vendor/pdf.classic.js", "pdfjsLib");
      if (!window.pdfjsWorker?.WorkerMessageHandler) {
        await loadScript("./vendor/pdf.worker.classic.js", "pdfjsWorker");
      }
      return pdfjsLib;
    }
    try {
      return await import(new URL("./vendor/pdf.min.js", window.location.href).href);
    } catch {
      return import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs");
    }
  }

  async function extractPdfText(arrayBuffer) {
    try {
      pendingPdfImportStyle = null;
      const pdfjsLib = await loadPdfModule();
      const isFileMode = window.location.protocol === "file:";
      if (!isFileMode) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("./vendor/pdf.worker.min.js", window.location.href).href;
      }
      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        disableWorker: isFileMode,
        verbosity: pdfjsLib.VerbosityLevel?.ERRORS ?? 0
      }).promise;
      const pages = [];
      const analyses = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const content = await page.getTextContent();
        const analysis = analyzePdfPageItems(content.items, viewport.width, viewport.height);
        analyses.push(analysis);
        pages.push(analysis.text);
      }
      pendingPdfImportStyle = inferStyleFromPdfAnalysis(analyses, pages.join("\n\n"));
      return pages.join("\n\n");
    } catch {
      pendingPdfImportStyle = null;
      const fallbackText = await extractPdfTextBasic(arrayBuffer);
      if (fallbackText.trim().length > 20) return fallbackText;
      throw new Error("PDF 文本抽取失败，请尝试另存为文本、MD 或 DOCX 后导入。");
    }
  }

  function analyzePdfPageItems(items, pageWidth = 595, pageHeight = 842) {
    const positioned = items
      .map((item) => {
        const text = String(item.str || "").replace(/\s+/g, " ").trim();
        if (!text || !Array.isArray(item.transform)) return null;
        const [a, b, c, d, x, y] = item.transform;
        const fontSize = Math.max(6, Math.min(36, Number(item.height) || Math.hypot(c || 0, d || 0) || Math.hypot(a || 0, b || 0) || 10));
        const width = Math.max(Number(item.width) || text.length * fontSize * 0.48, fontSize * 0.6);
        return {
          text,
          x: Number(x) || 0,
          y: Number(y) || 0,
          width,
          endX: (Number(x) || 0) + width,
          fontSize
        };
      })
      .filter(Boolean)
      .sort((a, b) => Math.abs(b.y - a.y) > 2 ? b.y - a.y : a.x - b.x);

    const rows = [];
    positioned.forEach((item) => {
      const last = rows[rows.length - 1];
      const tolerance = Math.max(2.6, item.fontSize * 0.45);
      if (last && Math.abs(last.y - item.y) <= tolerance) {
        last.items.push(item);
        last.y = (last.y * (last.items.length - 1) + item.y) / last.items.length;
        last.fontSize = Math.max(last.fontSize, item.fontSize);
      } else {
        rows.push({ y: item.y, fontSize: item.fontSize, items: [item] });
      }
    });

    const splitGap = Math.max(42, pageWidth * 0.11);
    const lines = rows.flatMap((row) => {
      const rowItems = row.items.sort((a, b) => a.x - b.x);
      const segments = [];
      let segment = [];
      rowItems.forEach((item) => {
        const previous = segment[segment.length - 1];
        if (previous && item.x - previous.endX > splitGap) {
          segments.push(segment);
          segment = [];
        }
        segment.push(item);
      });
      if (segment.length) segments.push(segment);
      return segments.map((segmentItems) => makePdfLine(segmentItems, row.y, row.fontSize));
    });

    const columnInfo = estimatePdfColumns(lines, pageWidth);
    return {
      text: pdfLinesToText(lines, columnInfo, pageHeight),
      lines,
      pageWidth,
      pageHeight,
      ...columnInfo,
      avgFontSize: average(lines.map((line) => line.fontSize)) || 10,
      lineCount: lines.length
    };
  }

  function makePdfLine(items, y, rowFontSize) {
    const sorted = items.sort((a, b) => a.x - b.x);
    const text = sorted.map((item) => item.text).join(" ").replace(/\s+/g, " ").trim();
    const minX = Math.min(...sorted.map((item) => item.x));
    const maxX = Math.max(...sorted.map((item) => item.endX));
    return {
      text,
      y,
      minX,
      maxX,
      center: (minX + maxX) / 2,
      fontSize: Math.max(rowFontSize, ...sorted.map((item) => item.fontSize))
    };
  }

  function estimatePdfColumns(lines, pageWidth) {
    const usable = lines.filter((line) => line.text.length > 1 && line.maxX - line.minX < pageWidth * 0.88);
    const starts = usable.map((line) => line.minX).sort((a, b) => a - b);
    let bestGap = 0;
    let splitX = null;

    for (let index = 1; index < starts.length; index += 1) {
      const gap = starts[index] - starts[index - 1];
      const leftCount = starts.filter((value) => value <= starts[index - 1]).length;
      const rightCount = starts.length - leftCount;
      if (gap > bestGap && leftCount >= 4 && rightCount >= 4) {
        bestGap = gap;
        splitX = (starts[index] + starts[index - 1]) / 2;
      }
    }

    const leftLines = splitX ? usable.filter((line) => line.center < splitX) : [];
    const rightLines = splitX ? usable.filter((line) => line.center >= splitX) : [];
    const twoColumn = Boolean(
      splitX &&
      bestGap > pageWidth * 0.13 &&
      starts[starts.length - 1] - starts[0] > pageWidth * 0.25 &&
      starts[starts.length - 1] > pageWidth * 0.32 &&
      leftLines.length / Math.max(usable.length, 1) > 0.22 &&
      rightLines.length / Math.max(usable.length, 1) > 0.22
    );

    return {
      twoColumn,
      splitX: twoColumn ? splitX : null,
      sidebarRatio: twoColumn ? Math.max(0.22, Math.min(0.42, splitX / pageWidth)) : null
    };
  }

  function pdfLinesToText(lines, columnInfo, pageHeight) {
    const sorted = [...lines].sort(pdfVisualLineSort);
    if (!columnInfo.twoColumn) {
      return sorted.map((line) => line.text).join("\n");
    }

    const averageFont = average(lines.map((line) => line.fontSize)) || 10;
    const maxY = Math.max(...lines.map((line) => line.y));
    const headerBand = Math.max(70, pageHeight * 0.12);
    const headers = sorted.filter((line) => (
      line.y > maxY - headerBand &&
      line.center >= columnInfo.splitX &&
      (line.fontSize > averageFont * 1.06 || line.y > maxY - 45)
    ));
    const headerSet = new Set(headers);
    const left = sorted.filter((line) => !headerSet.has(line) && line.center < columnInfo.splitX);
    const right = sorted.filter((line) => !headerSet.has(line) && line.center >= columnInfo.splitX);

    return [
      ...headers.map((line) => line.text),
      headers.length ? "" : null,
      ...left.map((line) => line.text),
      left.length && right.length ? "" : null,
      ...right.map((line) => line.text)
    ].filter((line) => line !== null).join("\n");
  }

  function pdfVisualLineSort(a, b) {
    return Math.abs(b.y - a.y) > 2 ? b.y - a.y : a.minX - b.minX;
  }

  function average(values) {
    const clean = values.filter((value) => Number.isFinite(value));
    return clean.length ? clean.reduce((sum, value) => sum + value, 0) / clean.length : 0;
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

  async function extractWordDocText(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    if (isZipArchive(bytes)) {
      return extractDocxText(arrayBuffer);
    }
    if (!isOleCompoundFile(bytes)) {
      const extracted = roughBinaryText(arrayBuffer);
      if (looksLikeReadableResumeText(extracted)) return extracted;
      throw new Error("无法识别该 .doc 文件结构，请在 Word/WPS 中另存为 .docx 后导入。");
    }

    const utfCandidates = [
      decodeLegacyDocCandidate(bytes, "utf-16le", 0),
      decodeLegacyDocCandidate(bytes, "utf-16le", 1)
    ].filter(Boolean);
    const bestUtf = bestLegacyDocCandidate(utfCandidates);
    if (looksLikeReadableResumeText(bestUtf)) return bestUtf;

    const fallbackCandidates = [
      decodeLegacyDocCandidate(bytes, "gb18030", 0),
      decodeLegacyDocCandidate(bytes, "gbk", 0)
    ].filter(Boolean);
    const best = bestLegacyDocCandidate(fallbackCandidates);

    if (looksLikeReadableResumeText(best)) return best;
    throw new Error("旧版 .doc 文本抽取失败，请在 Word/WPS 中另存为 .docx 或 PDF 后导入。");
  }

  function bestLegacyDocCandidate(candidates) {
    return candidates
      .map((text) => ({ text, score: scoreLegacyDocText(text) }))
      .sort((a, b) => b.score - a.score)[0]?.text || "";
  }

  function isZipArchive(bytes) {
    return bytes[0] === 0x50 && bytes[1] === 0x4b;
  }

  function isOleCompoundFile(bytes) {
    return (
      bytes[0] === 0xd0 &&
      bytes[1] === 0xcf &&
      bytes[2] === 0x11 &&
      bytes[3] === 0xe0 &&
      bytes[4] === 0xa1 &&
      bytes[5] === 0xb1 &&
      bytes[6] === 0x1a &&
      bytes[7] === 0xe1
    );
  }

  function decodeLegacyDocCandidate(bytes, encoding, offset = 0) {
    try {
      const decoded = new TextDecoder(encoding, { fatal: false }).decode(bytes.slice(offset));
      return cleanLegacyDocText(decoded);
    } catch {
      return "";
    }
  }

  function cleanLegacyDocText(text) {
    const sectionWords = [
      "个人简历", "Personal resume", "基本", "教育背景", "报考信息", "实习经验", "工作经历",
      "专业技能", "项目经验", "项目经历", "荣誉奖项", "证书", "个人优点", "CONTACT", "SKILLS",
      "PROFILE", "SUMMARY", "EXPERIENCE", "PROJECTS", "EDUCATION"
    ];
    const sectionPattern = new RegExp(`(${sectionWords.map(escapeRegExp).join("|")})`, "gi");
    const cleaned = String(text || "")
      .replace(/\u0000/g, "")
      .replace(/[\u0001-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, "\n")
      .replace(sectionPattern, "\n$1\n")
      .replace(/[^\u4e00-\u9fa5A-Za-z0-9@+.,，。；;:：|/\\\-_\s%()（）【】《》、·&/#\r\n]/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n");

    const metadataPattern = /^(Root Entry|Summary|Information|SummaryInformation|Document|DocumentSummaryInformation|WordDocument|WPS Office.*|KSOProductBuildVer|WpsCustomData|Data|0Table|1Table|Normal|Normal\.dotm?|Microsoft|ICV|KSKS|Times New Roman|Arial.*|Calibri|SimSun|Segoe UI|宋体|黑体|微软雅黑)$/i;
    const guidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
    const hashPattern = /^[0-9A-F]{24,}$/i;
    const lines = cleaned
      .split(/\n+/)
      .map((line) => line.replace(/\s{2,}/g, " ").trim())
      .filter((line) => line.length >= 2)
      .filter((line) => !metadataPattern.test(line))
      .filter((line) => !guidPattern.test(line))
      .filter((line) => !hashPattern.test(line))
      .filter((line) => !/^[\W_]+$/.test(line))
      .filter((line) => !/^[A-Z0-9]{16,}$/.test(line));

    const primaryStart = lines.findIndex((line) => /(个人简历|Personal resume|基本|教育背景|报考信息|实习经验|工作经历|专业技能|项目经验|项目经历)/i.test(line));
    const fallbackStart = lines.findIndex((line) => /^(CONTACT|PROFILE|SKILLS|EXPERIENCE|EDUCATION)$/i.test(line));
    const startIndex = primaryStart >= 0 ? primaryStart : fallbackStart;
    const usefulLines = startIndex >= 0 ? lines.slice(startIndex) : lines;
    return dedupeConsecutiveLines(usefulLines).join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function dedupeConsecutiveLines(lines) {
    const result = [];
    lines.forEach((line) => {
      if (line && line !== result[result.length - 1]) result.push(line);
    });
    return result;
  }

  function scoreLegacyDocText(text) {
    const raw = String(text || "");
    const chinese = Math.min((raw.match(/[\u4e00-\u9fa5]/g) || []).length, 2000);
    const resumeTerms = (raw.match(/个人简历|教育背景|实习经验|工作经历|专业技能|项目经验|Linux|嵌入式|CONTACT|SKILLS|EXPERIENCE/gi) || []).length;
    const contactHits = (raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\+?\d[\d\s-]{7,}\d/gi) || []).length;
    const lines = raw.split(/\n/).filter((line) => line.trim().length > 1).length;
    return chinese * 0.6 + resumeTerms * 220 + contactHits * 80 + lines * 3 - Math.max(0, raw.length - 14000) / 6;
  }

  function looksLikeReadableResumeText(text) {
    const raw = String(text || "").trim();
    const chinese = (raw.match(/[\u4e00-\u9fa5]/g) || []).length;
    const latinWords = (raw.match(/[A-Za-z]{3,}/g) || []).length;
    const resumeTerms = /(个人简历|教育背景|实习经验|工作经历|专业技能|项目经验|Linux|嵌入式|CONTACT|SKILLS|EXPERIENCE|PROJECTS)/i.test(raw);
    return raw.length > 80 && (chinese > 20 || latinWords > 20 || resumeTerms);
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
      await loadStateFromJsonText(text, file.name);
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
      return extractWordDocText(arrayBuffer);
    }

    return roughBinaryText(arrayBuffer);
  }

  async function loadStateFromJsonText(text, sourceName = "本地工作文件", handle = null, toastMessage = "") {
    const imported = JSON.parse(text);
    state = scrubSensitiveState(mergeState(clone(defaultState), imported));
    currentFileHandle = handle;
    currentFileName = handle?.name || sourceName || "";
    avatarImage = null;
    if (state.avatar?.src) await loadAvatar(state.avatar.src);
    syncInputsFromState();
    renderSlideEditor();
    renderAll();

    const style = styleFromSavedResume(imported);
    if (style) {
      updateStyleImportUi(style, `已从 ${sourceName} 恢复上次保存的内容、版式和模块结构。`, "已恢复");
    }

    toast(toastMessage || (handle ? "已打开本地工作文件" : "JSON简历已导入"));
    setStatus(`${sourceName} 已打开，可继续编辑`);
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
    $("#rememberApiKey").checked = false;
    $("#rememberApiKey").disabled = true;
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
    $("#applyUrlField").value = state.autofill.applyUrl || "";
    $("#coverField").value = state.autofill.cover;
    $("#pageFieldsInput").value = state.autofill.pageFields || "";
    $("#smartApplyOutput").value = state.autofill.smartMapText || "";
    renderModuleManager();
    renderApplyPreview();
    renderSmartApplyPreview();
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
    state.api.rememberKey = false;
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
    state.autofill.applyUrl = $("#applyUrlField").value.trim();
    state.autofill.cover = $("#coverField").value.trim();
    state.autofill.pageFields = $("#pageFieldsInput").value;
    state.autofill.smartMapText = $("#smartApplyOutput").value;
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

  async function importStyleFromFile(file) {
    const ext = extensionOf(file.name);
    let style = null;
    let summary = "";

    if (ext === "json") {
      const imported = JSON.parse(await file.text());
      style = styleFromSavedResume(imported);
      summary = "已从 Resume Studio JSON 精准导入模板、主题色、字号、行距和模块结构。";
    } else {
      const text = ["pdf", "docx", "doc", "rtf"].includes(ext) ? await readResumeFileAsTextOnly(file) : await file.text();
      style = inferStyleFromText(text, file.name);
      summary = style.summary;
    }

    if (!style) throw new Error("没有识别到可用的风格信息");
    applyImportedStyle(style);
    updateStyleImportUi(style, summary, "已应用");
    syncInputsFromState();
    renderAll();
    toast("已套用他人简历风格");
  }

  function applyStyleFromImportedResume(file, text) {
    const ext = extensionOf(file.name);
    if (ext === "json" || !String(text || "").trim()) return;

    let style = ext === "pdf" && pendingPdfImportStyle
      ? pendingPdfImportStyle
      : inferStyleFromText(text, file.name);
    pendingPdfImportStyle = null;
    if (!style) return;
    style = normalizeStyleForResumeImport(style, file, text);

    applyImportedStyle(style);
    updateStyleImportUi(style, `已根据 ${file.name} 进入原简历风格编辑模式，未使用系统自带样例模板。`, "随简历应用");
  }

  function normalizeStyleForResumeImport(style, file, text) {
    const normalized = clone(style);
    const layout = normalized.layout || {};
    const ext = extensionOf(file.name);
    const lower = `${file.name}\n${text || ""}`.toLowerCase();
    const explicitAts = /ats|applicant tracking|plain|纯文本/.test(lower);
    const explicitCompact = /compact|one.?page|一页|紧凑/.test(lower);
    const explicitCreative = /portfolio|creative|case study|作品集|作品展示|视觉设计|设计师|产品设计|ui\/ux|ui designer/.test(lower);

    if (layout.template === "executive" || !layout.template) {
      layout.template = explicitAts ? "ats" : explicitCompact ? "compact" : explicitCreative ? "creative" : "imported";
    }
    if (layout.template === "creative" && !explicitCreative) {
      layout.template = "imported";
    }
    if (!["imported", "markdown", "ats", "compact", "creative"].includes(layout.template)) {
      layout.template = "imported";
    }

    if (layout.template === "imported") {
      layout.theme = layout.theme === "teal" ? "ink" : layout.theme || "ink";
      layout.sourceSidebarWidth = Number(layout.sourceSidebarWidth || (["doc", "docx", "rtf"].includes(ext) ? 220 : 245));
    }

    layout.showAvatar = false;
    layout.showProjects = layout.showProjects !== false;
    layout.showEducation = layout.showEducation !== false;
    layout.showSkills = layout.showSkills !== false;
    normalized.layout = layout;
    normalized.modules = null;
    normalized.summary = "已按导入文件建立原简历风格编辑模式，并关闭系统默认头像与样例视觉。";
    return normalized;
  }

  function updateStyleImportUi(style, summary = "", status = "已应用") {
    $("#styleImportStatus").textContent = status;
    $("#styleImportStatus").classList.add("ok");
    $("#styleImportStatus").classList.remove("error");
    $("#styleImportSummary").textContent = summaryTextFromStyle(style, summary);
  }

  async function readResumeFileAsTextOnly(file) {
    const ext = extensionOf(file.name);
    if (["txt", "md", "markdown", "csv", "html", "htm", "css"].includes(ext)) return file.text();
    if (ext === "rtf") return stripRtf(await file.text());
    const arrayBuffer = await file.arrayBuffer();
    if (ext === "pdf") return extractPdfText(arrayBuffer);
    if (ext === "docx") return extractDocxText(arrayBuffer);
    if (ext === "doc") return extractWordDocText(arrayBuffer);
    return roughBinaryText(arrayBuffer);
  }

  function styleFromSavedResume(imported) {
    const source = imported && typeof imported === "object" ? imported : {};
    const layout = source.layout || source.resume?.layout;
    if (!layout) return inferStyleFromText(JSON.stringify(source), "resume.json");
    return {
      layout: {
        template: layout.template || "executive",
        theme: layout.theme || "teal",
        fontScale: Number(layout.fontScale || 100),
        densityScale: Number(layout.densityScale || 100),
        sourceSidebarWidth: Number(layout.sourceSidebarWidth || 245),
        showAvatar: layout.showAvatar !== false,
        showProjects: layout.showProjects !== false,
        showEducation: layout.showEducation !== false,
        showSkills: layout.showSkills !== false,
        pageMode: layout.pageMode || "auto",
        tone: layout.tone || "direct"
      },
      modules: Array.isArray(source.modules) ? source.modules.map((module, index) => ({
        id: `style-module-${Date.now()}-${index}`,
        title: module.title || "自定义模块",
        content: "",
        enabled: Boolean(module.enabled)
      })) : null,
      source: "json"
    };
  }

  function inferStyleFromPdfAnalysis(analyses, text) {
    if (!Array.isArray(analyses) || !analyses.length) return null;

    const first = analyses[0];
    const textStyle = inferStyleFromText(text, "imported.pdf");
    const twoColumn = analyses.some((page) => page.twoColumn);
    const avgFontSize = average(analyses.map((page) => page.avgFontSize)) || 10;
    const lineCount = analyses.reduce((sum, page) => sum + page.lineCount, 0);
    const sidebarRatio = first.sidebarRatio || 0.3;
    const sidebarWidth = Math.round(clampNumber(850 * sidebarRatio, 205, 330));
    const compact = lineCount > analyses.length * 42 || avgFontSize < 9.2;
    const spacious = lineCount < analyses.length * 26 && avgFontSize > 11.5;
    const lower = String(text || "").toLowerCase();
    const creative = /portfolio|creative|case study|作品集|作品展示|视觉设计|设计师|产品设计|ui\/ux|ui designer/.test(lower);

    const layout = {
      ...textStyle.layout,
      template: twoColumn ? "imported" : creative ? "creative" : compact ? "compact" : textStyle.layout.template,
      theme: textStyle.layout.theme === "teal" ? "ink" : textStyle.layout.theme,
      sourceSidebarWidth: sidebarWidth,
      fontScale: compact ? 92 : spacious ? 106 : Math.round(clampNumber(avgFontSize * 9.4, 92, 108)),
      densityScale: compact ? 88 : spacious ? 108 : 96,
      showAvatar: /photo|avatar|头像|照片/.test(lower) ? textStyle.layout.showAvatar : false,
      pageMode: analyses.length > 1 ? "two" : compact ? "one" : "auto"
    };

    return {
      layout,
      modules: null,
      summary: twoColumn
        ? "已根据 PDF 文本坐标识别为左右栏/侧栏简历，并按原 PDF 栏宽、字号和紧凑度建立版式。"
        : "已根据 PDF 文本坐标和页面密度推断原简历版式。"
    };
  }

  function inferStyleFromText(text, fileName = "") {
    const raw = String(text || "");
    const lower = `${fileName}\n${raw}`.toLowerCase();
    const colors = raw.match(/#[0-9a-fA-F]{6}\b/g) || [];
    const theme = colors.length ? nearestTheme(colors[0]) : inferThemeByWords(lower);
    let template = "executive";
    if (/\.md|\.markdown|markdown/.test(lower) && /##\s*(基本信息|专业技能|工作经验|项目经历|教育经历)|###\s*\S+/.test(raw)) template = "markdown";
    if (/ats|applicant tracking|plain|single.?column|单栏|纯文本|极简|简洁/.test(lower)) template = "ats";
    if (/compact|one.?page|一页|紧凑/.test(lower)) template = "compact";
    if (/portfolio|creative|case study|作品集|作品展示|视觉设计|设计师|产品设计|ui\/ux|ui designer/.test(lower)) template = "creative";
    if (/sidebar|two.?column|双栏|侧栏|left column|aside/.test(lower)) template = "executive";

    const fontScale = /large|大字号|展示|presentation/.test(lower) ? 108 : /compact|紧凑|one.?page|一页/.test(lower) ? 92 : 100;
    const densityScale = /compact|紧凑|dense|one.?page|一页/.test(lower) ? 90 : /spacious|留白|大气/.test(lower) ? 110 : 100;
    const modules = [];
    Object.entries(modulePresets).forEach(([key, preset]) => {
      if (key !== "custom" && lower.includes(preset.title.toLowerCase())) {
        modules.push({
          id: `style-${key}-${Date.now()}`,
          title: preset.title,
          content: "",
          enabled: true
        });
      }
    });

    return {
      layout: {
        template,
        theme,
        fontScale,
        densityScale,
        sourceSidebarWidth: 245,
        showAvatar: !/no.?photo|无头像|不放照片|ats/.test(lower),
        showProjects: !/no.?project|隐藏项目/.test(lower),
        showEducation: !/no.?education|隐藏教育/.test(lower),
        showSkills: !/no.?skill|隐藏技能/.test(lower),
        pageMode: /two.?page|两页/.test(lower) ? "two" : /one.?page|一页/.test(lower) ? "one" : "auto",
        tone: /concise|简洁|精简/.test(lower) ? "concise" : /balanced|完整|稳健/.test(lower) ? "balanced" : "direct"
      },
      modules: modules.length ? modules : null,
      summary: "已根据上传文件中的颜色、栏目关键词、ATS/作品集/单页等特征推断风格。"
    };
  }

  function inferThemeByWords(lower) {
    if (/coral|red|orange|珊瑚|红|橙|暖色/.test(lower)) return "coral";
    if (/gold|yellow|金|黄|商务/.test(lower)) return "gold";
    if (/black|gray|grey|mono|黑|灰|极简/.test(lower)) return "ink";
    return "teal";
  }

  function nearestTheme(hex) {
    const rgb = hexToRgb(hex);
    const themes = {
      teal: [24, 115, 95],
      coral: [195, 92, 70],
      ink: [44, 52, 49],
      gold: [176, 123, 23]
    };
    return Object.entries(themes)
      .map(([theme, value]) => [theme, colorDistance(rgb, value)])
      .sort((a, b) => a[1] - b[1])[0][0];
  }

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16)
    ];
  }

  function colorDistance(a, b) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
  }

  function clampNumber(value, min, max) {
    return Math.max(min, Math.min(max, Number(value) || min));
  }

  function applyImportedStyle(style) {
    state.layout = mergeState(state.layout, style.layout || {});
    if (Array.isArray(style.modules)) {
      state.modules = style.modules.map((module) => ({
        id: module.id || `style-module-${Date.now()}`,
        title: module.title || "自定义模块",
        content: module.content || "",
        enabled: module.enabled !== false
      }));
    }
  }

  function summaryTextFromStyle(style, prefix = "") {
    const layout = style.layout || state.layout;
    const templateName = {
      executive: "专业双栏",
      imported: "原简历风格",
      markdown: "Markdown单栏",
      compact: "紧凑单页",
      creative: "作品展示",
      ats: "ATS纯文本"
    }[layout.template] || layout.template;
    const themeName = {
      teal: "墨绿",
      coral: "珊瑚",
      ink: "雅黑",
      gold: "金色"
    }[layout.theme] || layout.theme;
    return [
      prefix,
      `模板：${templateName}`,
      `主题色：${themeName}`,
      `字号：${layout.fontScale}`,
      `行距：${layout.densityScale}`,
      style.modules ? `模块结构：${style.modules.map((module) => module.title).join("、") || "无"}` : "模块结构：保留当前模块"
    ].filter(Boolean).join(" | ");
  }

  function resetStyle() {
    state.layout = clone(defaultState.layout);
    syncInputsFromState();
    renderAll();
    $("#styleImportStatus").textContent = "已恢复";
    $("#styleImportSummary").textContent = "已恢复默认专业双栏风格。";
    toast("已恢复默认风格");
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
    const customModules = (state.modules || [])
      .map((module, index) => ({ ...module, _index: index }))
      .filter((module) => module.enabled && module.title.trim() && module.content.trim());
    const avatar = state.avatar.src
      ? `<img src="${state.avatar.src}" alt="${escapeHtml(state.profile.name)}头像" />`
      : `<div class="fallback-avatar">${escapeHtml(initials(state.profile.name))}</div>`;

    page.className = `resume-page theme-${state.layout.theme} template-${state.layout.template}`;
    page.style.setProperty("--font-scale", state.layout.fontScale / 100);
    page.style.setProperty("--density-scale", state.layout.densityScale / 100);
    page.style.setProperty("--source-sidebar-width", `${state.layout.sourceSidebarWidth || 245}px`);

    const contact = [
      state.profile.email,
      state.profile.phone,
      state.profile.location,
      state.profile.link
    ].filter(Boolean);

    if (state.layout.template === "markdown") {
      renderMarkdownResume(page, { contact, skills, experiences, projects, education, customModules });
      return;
    }

    page.innerHTML = `
      <aside class="resume-sidebar">
        ${state.layout.showAvatar ? `<div class="avatar-wrap">${avatar}</div>` : ""}
        ${contact.length ? `
          <section class="resume-section">
            <h3>Contact</h3>
            <ul class="contact-list">${[
              ["profile.email", state.profile.email],
              ["profile.phone", state.profile.phone],
              ["profile.location", state.profile.location],
              ["profile.link", state.profile.link]
            ].filter(([, value]) => value).map(([field, value]) => `<li ${editAttrs(field)}>${escapeHtml(value)}</li>`).join("")}</ul>
          </section>
        ` : ""}
        ${state.layout.showSkills && skills.length ? `
          <section class="resume-section">
            <h3>Skills</h3>
            <div class="skill-stack">${skills.map((item) => `<span class="skill-chip" ${listEditAttrs("skills")}>${escapeHtml(item)}</span>`).join("")}</div>
          </section>
        ` : ""}
        ${state.layout.showEducation && education.length ? `
          <section class="resume-section">
            <h3>Education</h3>
            <ul class="plain-list">${education.map((item) => `<li ${listEditAttrs("education")}>${escapeHtml(item)}</li>`).join("")}</ul>
          </section>
        ` : ""}
      </aside>
      <main class="resume-main">
        <header class="resume-head">
          <h2 class="resume-name" ${editAttrs("profile.name")}>${escapeHtml(state.profile.name || "姓名")}</h2>
          <p class="resume-title" ${editAttrs("profile.title")}>${escapeHtml(state.profile.title || "目标岗位")}</p>
        </header>
        ${state.summary.trim() ? `<section class="resume-section">
          <h3>Profile</h3>
          <p class="summary-text" ${editAttrs("summary", "multi")}>${escapeHtml(state.summary)}</p>
        </section>` : ""}
        ${experiences.length ? `<section class="resume-section">
          <h3>Experience</h3>
          ${experiences.map((entry, index) => renderEntry(entry, "experience", index)).join("")}
        </section>` : ""}
        ${state.layout.showProjects && projects.length ? `
          <section class="resume-section">
            <h3>Projects</h3>
            ${projects.map((entry, index) => renderEntry(entry, "projects", index)).join("")}
          </section>
        ` : ""}
        ${customModules.map(renderCustomModule).join("")}
      </main>
    `;
  }

  function renderMarkdownResume(page, { contact, skills, experiences, projects, education, customModules }) {
    const section = (title, body) => body ? `
      <section class="resume-section markdown-section">
        <h3>${escapeHtml(title)}</h3>
        ${body}
      </section>
    ` : "";

    page.innerHTML = `
      <main class="markdown-resume-main">
        <header class="markdown-head">
          <h2 class="resume-name" ${editAttrs("profile.name")}>${escapeHtml(state.profile.name || "姓名")}</h2>
          <p class="resume-title" ${editAttrs("profile.title")}>${escapeHtml(state.profile.title || "目标岗位")}</p>
          ${contact.length ? `<ul class="markdown-contact">${[
            ["profile.email", state.profile.email],
            ["profile.phone", state.profile.phone],
            ["profile.location", state.profile.location],
            ["profile.link", state.profile.link]
          ].filter(([, value]) => value).map(([field, value]) => `<li ${editAttrs(field)}>${escapeHtml(value)}</li>`).join("")}</ul>` : ""}
        </header>
        ${state.summary.trim() ? section("职业摘要", `<p class="summary-text" ${editAttrs("summary", "multi")}>${escapeHtml(state.summary)}</p>`) : ""}
        ${state.layout.showSkills && skills.length ? section("专业技能", `<ul class="markdown-list">${skills.map((item) => `<li ${listEditAttrs("skills")}>${escapeHtml(item)}</li>`).join("")}</ul>`) : ""}
        ${experiences.length ? section("工作经验", experiences.map((entry, index) => renderEntry(entry, "experience", index)).join("")) : ""}
        ${state.layout.showProjects && projects.length ? section("项目经历", projects.map((entry, index) => renderEntry(entry, "projects", index)).join("")) : ""}
        ${state.layout.showEducation && education.length ? section("教育经历", `<ul class="markdown-list">${education.map((item) => `<li ${listEditAttrs("education")}>${escapeHtml(item)}</li>`).join("")}</ul>`) : ""}
        ${customModules.map(renderCustomModule).join("")}
      </main>
    `;
  }

  function renderEntry(entry, field, index) {
    const bullets = entry.bullets.length ? entry.bullets : [entry.title];
    const editable = field ? {
      title: entryEditAttrs(field, index, "title"),
      org: entryEditAttrs(field, index, "org"),
      period: entryEditAttrs(field, index, "period"),
      bullets: entryEditAttrs(field, index, "bullets", "multi")
    } : null;
    return `
      <article class="entry">
        <div class="entry-head">
          <div>
            <div class="entry-title" ${editable ? editable.title : ""}>${escapeHtml(entry.title)}</div>
            ${entry.org ? `<div class="entry-sub" ${editable ? editable.org : ""}>${escapeHtml(entry.org)}</div>` : ""}
          </div>
          ${entry.period ? `<div class="entry-meta" ${editable ? editable.period : ""}>${escapeHtml(entry.period)}</div>` : ""}
        </div>
        <ul ${editable ? editable.bullets : ""}>${bullets.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      </article>
    `;
  }

  function renderCustomModule(module) {
    const lines = module.content.split("\n").map((line) => line.trim()).filter(Boolean);
    return `
      <section class="resume-section">
        <h3 ${moduleEditAttrs(module._index, "title")}>${escapeHtml(module.title)}</h3>
        <ul class="plain-list" ${moduleEditAttrs(module._index, "content", "multi")}>${lines.map((line) => `<li>${escapeHtml(line.replace(/^[-•*]\s*/, ""))}</li>`).join("")}</ul>
      </section>
    `;
  }

  function previewEditableText(element) {
    return String(element.innerText || element.textContent || "")
      .replace(/\u00a0/g, " ")
      .replace(/\r/g, "")
      .trim();
  }

  function editableLinesFromElement(element) {
    const listItems = Array.from(element.querySelectorAll("li"));
    const rawLines = listItems.length
      ? listItems.map(previewEditableText)
      : previewEditableText(element).split(/\n+/);
    return rawLines
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean);
  }

  function setPreviewField(path, value) {
    const text = String(value || "").trim();
    if (path.startsWith("profile.")) {
      const key = path.split(".")[1];
      if (Object.prototype.hasOwnProperty.call(state.profile, key)) {
        state.profile[key] = text;
        return true;
      }
    }

    if (path === "summary") {
      state.summary = text;
      return true;
    }

    return false;
  }

  function updatePreviewList(field) {
    if (!["skills", "education"].includes(field)) return false;
    const items = Array.from($("#resumePreview").querySelectorAll("[data-edit-list]"))
      .filter((item) => item.dataset.editList === field)
      .map(previewEditableText)
      .filter(Boolean);
    state[field] = items.join("\n");
    return true;
  }

  function updatePreviewEntry(element) {
    const field = element.dataset.editEntry;
    if (!["experience", "projects"].includes(field)) return false;

    const index = Number(element.dataset.entryIndex);
    const part = element.dataset.entryPart;
    if (!Number.isInteger(index) || index < 0 || !part) return false;

    const fallbackTitle = field === "projects" ? "项目" : "工作经历";
    const entries = parseEntries(state[field], fallbackTitle);
    while (entries.length <= index) {
      entries.push({ title: fallbackTitle, org: "", period: "", bullets: [] });
    }

    if (part === "bullets") {
      entries[index].bullets = editableLinesFromElement(element);
    } else if (["title", "org", "period"].includes(part)) {
      entries[index][part] = previewEditableText(element);
    } else {
      return false;
    }

    state[field] = serializeEntries(entries, fallbackTitle);
    return true;
  }

  function updatePreviewModule(element) {
    const index = Number(element.dataset.editModule);
    const part = element.dataset.modulePart;
    if (!Number.isInteger(index) || index < 0 || !state.modules[index]) return false;

    if (part === "title") {
      state.modules[index].title = previewEditableText(element) || "自定义模块";
      return true;
    }

    if (part === "content") {
      state.modules[index].content = editableLinesFromElement(element).join("\n");
      return true;
    }

    return false;
  }

  function syncAfterPreviewEdit() {
    syncInputsFromState();
    renderOptimizationStats();
    generateSlides();
    renderSlides();
    toast("已同步预览修改");
  }

  function applyPreviewEdit(element, options = {}) {
    let changed = false;

    if (element.dataset.editField) {
      changed = setPreviewField(element.dataset.editField, previewEditableText(element));
    } else if (element.dataset.editList) {
      changed = updatePreviewList(element.dataset.editList);
    } else if (element.dataset.editEntry) {
      changed = updatePreviewEntry(element);
    } else if (element.dataset.editModule) {
      changed = updatePreviewModule(element);
    }

    if (!changed) return;
    if (options.live) {
      syncInputsFromState();
      return;
    }
    syncAfterPreviewEdit();
  }

  function bindPreviewDirectEdit() {
    const preview = $("#resumePreview");
    preview.addEventListener("focusin", (event) => {
      const editable = event.target.closest("[contenteditable='true']");
      if (editable && preview.contains(editable)) editable.classList.add("is-editing");
    });

    preview.addEventListener("focusout", (event) => {
      const editable = event.target.closest("[contenteditable='true']");
      if (!editable || !preview.contains(editable)) return;
      editable.classList.remove("is-editing");
      applyPreviewEdit(editable);
    });

    preview.addEventListener("input", (event) => {
      const editable = event.target.closest("[contenteditable='true']");
      if (!editable || !preview.contains(editable)) return;
      applyPreviewEdit(editable, { live: true });
    });

    preview.addEventListener("keydown", (event) => {
      const editable = event.target.closest("[contenteditable='true']");
      if (!editable || !preview.contains(editable)) return;

      if (event.key === "Enter" && editable.dataset.editMode !== "multi") {
        event.preventDefault();
        editable.blur();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        renderResume();
      }
    });

    preview.addEventListener("paste", (event) => {
      const editable = event.target.closest("[contenteditable='true']");
      if (!editable || !preview.contains(editable)) return;
      const text = event.clipboardData?.getData("text/plain");
      if (!text) return;
      event.preventDefault();
      document.execCommand("insertText", false, text);
    });
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

  function textLength(value) {
    return String(value || "").replace(/\s+/g, "").length;
  }

  function allResumeBullets() {
    return [
      ...parseEntries(state.experience, "工作经历"),
      ...parseEntries(state.projects, "项目")
    ].flatMap((entry) => entry.bullets || []);
  }

  function metricRatio(lines) {
    if (!lines.length) return 0;
    const metricCount = lines.filter((line) => /\d|%|倍|小时|天|周|月|年|人|次|万|k|K|ms|秒/.test(line)).length;
    return Math.round((metricCount / lines.length) * 100);
  }

  function maturityStatus(ok, warn) {
    if (ok) return "ok";
    if (warn) return "warn";
    return "risk";
  }

  function analyzeResumeMaturity() {
    const contactHits = [
      state.profile.name,
      state.profile.title,
      state.profile.email,
      state.profile.phone,
      state.profile.location
    ].filter(Boolean).length;
    const summaryLen = textLength(state.summary);
    const skills = splitList(state.skills);
    const experiences = parseEntries(state.experience, "工作经历");
    const projects = parseEntries(state.projects, "项目");
    const bullets = allResumeBullets();
    const ratio = metricRatio(bullets);
    const educationLines = state.education.split("\n").map((line) => line.trim()).filter(Boolean);
    const enabledModules = (state.modules || []).filter((module) => module.enabled && module.title.trim() && module.content.trim());
    const actionVerbCount = bullets.filter((line) => /^(负责|主导|设计|开发|搭建|优化|推动|实现|建立|参与|重构|制定|分析|完成|落地|提升|降低|减少|支持|协同|管理)/.test(line.trim())).length;

    const items = [
      {
        key: "contact",
        label: "基础信息",
        score: contactHits >= 5 ? 100 : contactHits >= 4 ? 76 : 48,
        status: maturityStatus(contactHits >= 5, contactHits >= 4),
        detail: `${contactHits}/5 项完整`
      },
      {
        key: "summary",
        label: "职业摘要",
        score: summaryLen >= 60 && summaryLen <= 180 ? 100 : summaryLen >= 35 && summaryLen <= 240 ? 76 : 45,
        status: maturityStatus(summaryLen >= 60 && summaryLen <= 180, summaryLen >= 35 && summaryLen <= 240),
        detail: `${summaryLen} 字`
      },
      {
        key: "skills",
        label: "技能结构",
        score: skills.length >= 8 && skills.length <= 18 ? 100 : skills.length >= 5 ? 72 : 42,
        status: maturityStatus(skills.length >= 8 && skills.length <= 18, skills.length >= 5),
        detail: `${skills.length} 项技能`
      },
      {
        key: "experience",
        label: "经历成果",
        score: bullets.length >= 8 && ratio >= 35 ? 100 : bullets.length >= 5 && ratio >= 20 ? 76 : bullets.length >= 3 ? 58 : 36,
        status: maturityStatus(bullets.length >= 8 && ratio >= 35, bullets.length >= 5 && ratio >= 20),
        detail: `${bullets.length} 条，量化 ${ratio}%`
      },
      {
        key: "projects",
        label: "项目支撑",
        score: projects.length >= 2 ? 100 : projects.length === 1 ? 72 : 36,
        status: maturityStatus(projects.length >= 2, projects.length === 1),
        detail: `${projects.length} 个项目`
      },
      {
        key: "education",
        label: "教育证书",
        score: educationLines.length >= 2 || enabledModules.length ? 100 : educationLines.length ? 70 : 36,
        status: maturityStatus(educationLines.length >= 2 || enabledModules.length, educationLines.length > 0),
        detail: `${educationLines.length} 行，模块 ${enabledModules.length}`
      }
    ];

    const total = Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length);
    const tips = [];
    if (contactHits < 5) tips.push("补全姓名、岗位、邮箱、电话和城市。");
    if (summaryLen < 60 || summaryLen > 180) tips.push("摘要建议控制在 60-180 字，突出年限、方向、核心能力和结果。");
    if (skills.length < 8) tips.push("技能建议拆成 8-18 个可检索关键词。");
    if (ratio < 35) tips.push("经历和项目中建议增加比例、规模、时长、人数、性能等可验证结果。");
    if (actionVerbCount < Math.max(3, Math.ceil(bullets.length * 0.45))) tips.push("bullet 开头尽量使用负责、主导、设计、优化、推动等动作词。");
    if (!projects.length) tips.push("成熟简历通常保留 1-3 个能支撑目标岗位的代表项目。");

    return { total, items, tips: tips.slice(0, 5), bullets, skills };
  }

  function renderResumeEditorAssist() {
    const grid = $("#resumeMaturityGrid");
    const scoreNode = $("#resumeMaturityScore");
    const tipsNode = $("#resumeMaturityTips");
    const navigator = $("#sectionNavigator");
    if (!grid || !scoreNode || !tipsNode || !navigator) return;

    const analysis = analyzeResumeMaturity();
    scoreNode.textContent = `${analysis.total} 分`;
    scoreNode.classList.toggle("ok", analysis.total >= 82);
    scoreNode.classList.toggle("error", analysis.total < 62);

    grid.innerHTML = analysis.items.map((item) => `
      <button class="maturity-item ${item.status}" type="button" data-focus-target="${sectionFocusTarget(item.key)}">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.detail)}</span>
      </button>
    `).join("");

    tipsNode.innerHTML = analysis.tips.length
      ? analysis.tips.map((tip) => `<div>${escapeHtml(tip)}</div>`).join("")
      : "<div>结构完整，重点检查岗位关键词和最终排版。</div>";

    const sections = [
      ["基础信息", "nameInput", state.profile.name && state.profile.title],
      ["职业摘要", "summaryInput", textLength(state.summary) >= 60],
      ["技能", "skillsInput", analysis.skills.length >= 8],
      ["工作经历", "experienceInput", parseEntries(state.experience, "工作经历").length],
      ["项目", "projectsInput", parseEntries(state.projects, "项目").length],
      ["教育证书", "educationInput", state.education.trim()]
    ];
    navigator.innerHTML = sections.map(([label, target, ok]) => `
      <button class="section-nav-btn ${ok ? "ok" : "warn"}" type="button" data-focus-target="${target}">
        <span>${escapeHtml(label)}</span>
        <small>${ok ? "已填" : "待补"}</small>
      </button>
    `).join("");
  }

  function sectionFocusTarget(key) {
    return {
      contact: "nameInput",
      summary: "summaryInput",
      skills: "skillsInput",
      experience: "experienceInput",
      projects: "projectsInput",
      education: "educationInput"
    }[key] || "summaryInput";
  }

  function focusEditorTarget(targetId) {
    const node = document.getElementById(targetId);
    if (!node) return;
    node.focus();
    if (typeof node.select === "function") node.select();
    node.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function uniqueCleanList(items) {
    const seen = new Set();
    return items
      .map((item) => String(item || "").replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean)
      .filter((item) => {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function compactText(value, maxLength) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (text.length <= maxLength) return text;
    return `${text.slice(0, Math.max(20, maxLength - 1)).replace(/[，,；;、\s]+$/g, "")}…`;
  }

  function cleanEntryBullet(line) {
    return String(line || "")
      .replace(/^[-•*]\s*/, "")
      .replace(/\s+/g, " ")
      .replace(/[。；;]+$/g, "")
      .trim();
  }

  function formatEntryCollection(text, fallbackTitle, bulletLimit = 5) {
    return parseEntries(text, fallbackTitle).map((entry) => ({
      ...entry,
      title: entry.title.trim() || fallbackTitle,
      org: entry.org.trim(),
      period: entry.period.trim(),
      bullets: uniqueCleanList(entry.bullets.map(cleanEntryBullet))
        .map((line) => compactText(line, 120))
        .slice(0, bulletLimit)
    })).filter((entry) => entry.title || entry.bullets.length);
  }

  function polishSummary() {
    syncStateFromInputs();
    const pack = rolePacks[state.direction] || rolePacks.general;
    const skills = uniqueCleanList([...extractKeywords().slice(0, 8), ...splitList(state.skills)]).slice(0, 8);
    const bullets = allResumeBullets();
    const metricExamples = bullets
      .filter((line) => /\d|%|倍|小时|天|周|月|年|人|次|万|k|K|ms|秒/.test(line))
      .slice(0, 2)
      .map((line) => compactText(cleanEntryBullet(line), 34));
    const role = state.profile.title || pack.label;
    const ability = skills.length ? `经验覆盖${skills.slice(0, 5).join("、")}` : `经验覆盖${pack.keywords.slice(0, 4).join("、")}`;
    const result = metricExamples.length ? `，具备${metricExamples.join("；")}等可验证成果` : "";
    state.summary = compactText(`面向${role}岗位，${ability}。擅长围绕${pack.impact}拆解问题、推进交付并沉淀复用方法${result}。`, 180);
    syncInputsFromState();
    renderAll();
    toast("已整理职业摘要");
  }

  function formatSkills() {
    syncStateFromInputs();
    const keywords = extractKeywords().slice(0, 10);
    const skills = uniqueCleanList([...keywords, ...splitList(state.skills)]).slice(0, 18);
    state.skills = skills.join("\n");
    syncInputsFromState();
    renderAll();
    toast("已规范技能关键词");
  }

  function formatExperienceContent() {
    syncStateFromInputs();
    const experience = formatEntryCollection(state.experience, "工作经历", 5);
    const projects = formatEntryCollection(state.projects, "项目", 4);
    state.experience = serializeEntries(experience, "工作经历") || state.experience;
    state.projects = serializeEntries(projects, "项目") || state.projects;
    syncInputsFromState();
    renderAll();
    toast("已整理经历格式");
  }

  function compactResumeForOnePage() {
    syncStateFromInputs();
    state.summary = compactText(state.summary, 150);
    state.skills = uniqueCleanList(splitList(state.skills)).slice(0, 14).join("\n");
    state.experience = serializeEntries(formatEntryCollection(state.experience, "工作经历", 4), "工作经历") || state.experience;
    state.projects = serializeEntries(formatEntryCollection(state.projects, "项目", 3).slice(0, 2), "项目") || state.projects;
    state.layout.pageMode = "one";
    state.layout.fontScale = Math.min(Number(state.layout.fontScale) || 100, 96);
    state.layout.densityScale = Math.min(Number(state.layout.densityScale) || 100, 92);
    syncInputsFromState();
    renderAll();
    toast("已按一页简历压缩");
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

  function enabledModuleText(pattern) {
    return (state.modules || [])
      .filter((module) => module.enabled && pattern.test(`${module.title}\n${module.content}`))
      .map((module) => `${module.title}\n${module.content}`)
      .join("\n\n");
  }

  function applySectionLibrary() {
    const awards = enabledModuleText(/荣誉|奖|获奖|竞赛|比赛|award|honor/i);
    const certificates = enabledModuleText(/证书|资质|认证|certificate|certification/i);
    const languages = enabledModuleText(/语言|英语|CET|IELTS|TOEFL|language/i);
    const extraModules = (state.modules || [])
      .filter((module) => module.enabled && module.title.trim() && module.content.trim())
      .map((module) => `${module.title}\n${module.content}`)
      .join("\n\n");

    return {
      name: state.profile.name,
      firstName: state.autofill.firstName || state.profile.name.slice(1) || state.profile.name,
      lastName: state.autofill.lastName || state.profile.name.slice(0, 1),
      email: state.profile.email,
      phone: state.profile.phone,
      location: state.profile.location,
      portfolio: state.profile.link,
      linkedin: state.autofill.linkedin,
      role: state.autofill.role || state.profile.title,
      coverLetter: state.autofill.cover || state.summary,
      summary: state.summary,
      skills: state.skills,
      experience: state.experience,
      projects: state.projects,
      education: state.education,
      awards: awards || certificates,
      certificates: certificates || awards,
      languages,
      extraModules,
      resumeText: markdownFromState()
    };
  }

  function normalizeLabel(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[：:：*＊（）()[\]{}【】]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseJsonFromText(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed);
    } catch {
      const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
      if (fenced) {
        try {
          return JSON.parse(fenced[1].trim());
        } catch {}
      }
      const arrayMatch = trimmed.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        try {
          return JSON.parse(arrayMatch[0]);
        } catch {}
      }
      const objectMatch = trimmed.match(/\{[\s\S]*\}/);
      if (objectMatch) {
        try {
          return JSON.parse(objectMatch[0]);
        } catch {}
      }
    }
    return null;
  }

  function parsePageFieldsInput(text) {
    const parsed = parseJsonFromText(text);
    const fromObject = (item) => {
      if (typeof item === "string") return item;
      if (!item || typeof item !== "object") return "";
      return [
        item.label,
        item.name,
        item.placeholder,
        item.type,
        item.required ? "必填" : "",
        item.nearby
      ].filter(Boolean).join(" | ");
    };

    if (Array.isArray(parsed)) {
      return parsed.map(fromObject).map((line) => line.trim()).filter(Boolean);
    }

    if (parsed && typeof parsed === "object") {
      const values = Array.isArray(parsed.fields) ? parsed.fields : Object.entries(parsed).map(([key, value]) => `${key}: ${fromObject(value) || value}`);
      return values.map(fromObject).map((line) => line.trim()).filter(Boolean);
    }

    return String(text || "")
      .split(/\r?\n|[；;]/)
      .map((line) => line.replace(/^\s*[-*•\d.、]+\s*/, "").trim())
      .filter((line) => line.length > 1);
  }

  function inferApplyKey(label) {
    const text = normalizeLabel(label);
    const rules = [
      ["firstName", /first.?name|given.?name|名(?!称|字)|名字/],
      ["lastName", /last.?name|family.?name|surname|姓氏|^姓$/],
      ["name", /full.?name|candidate.?name|applicant.?name|真实姓名|姓名|你的名字|name/],
      ["email", /e-?mail|邮箱|电子邮件|mail/],
      ["phone", /phone|mobile|tel|电话|手机|联系方式|联系电话/],
      ["location", /location|city|address|城市|所在地|现居地|居住地|地址/],
      ["portfolio", /portfolio|website|homepage|github|个人网站|主页|作品链接|项目链接/],
      ["linkedin", /linkedin|linked.?in|领英/],
      ["role", /position|role|job.?title|desired.?job|岗位|职位|申请职位|求职意向|应聘职位/],
      ["projects", /project|portfolio|case|项目经历|项目经验|代表项目|项目描述|项目介绍|项目成果|项目案例|作品|案例/],
      ["awards", /award|honou?r|prize|competition|荣誉|奖项|获奖|奖励|竞赛|比赛|表彰/],
      ["certificates", /certificate|certification|license|证书|资质|认证|资格/],
      ["experience", /experience|employment|work history|工作经历|工作经验|实习经历|任职经历|职业经历|实践经历/],
      ["education", /education|school|degree|学历|教育经历|教育背景|学校|院校|专业/],
      ["skills", /skills?|skill.?set|技术栈|能力|技能|专长|工具/],
      ["summary", /summary|profile|bio|about|个人简介|职业摘要|个人优势|自我评价|个人介绍/],
      ["coverLetter", /cover.?letter|motivation|personal.?statement|why|求职信|申请理由|自我介绍|补充说明|为什么申请/],
      ["languages", /language|语言能力|英语|外语|CET|IELTS|TOEFL/]
    ];
    return rules.find(([, pattern]) => pattern.test(text))?.[0] || "summary";
  }

  function limitApplyContent(value, label) {
    const text = String(value || "").trim();
    if (!text) return "";
    const limitMatch = String(label || "").match(/(\d{2,5})\s*(字|字符|以内|以下|word|words)/i);
    const limit = limitMatch ? Number(limitMatch[1]) : 2000;
    if (text.length <= limit) return text;
    return `${text.slice(0, Math.max(20, limit - 1)).replace(/[，,；;、\s]+$/g, "")}…`;
  }

  function buildSmartApplyItems(fields) {
    const sections = applySectionLibrary();
    return fields.map((label) => {
      const key = inferApplyKey(label);
      const fallback = sections[key] || sections.summary || sections.resumeText;
      return {
        label,
        key,
        value: limitApplyContent(fallback, label),
        reason: `按“${label}”识别为 ${key}`
      };
    }).filter((item) => item.label && item.value);
  }

  function parseSmartMapText(text) {
    const parsed = parseJsonFromText(text);
    if (!parsed) return [];
    const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed.fields) ? parsed.fields : [];
    return list
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const label = item.label || item.field || item.title || item.name || "";
        const value = item.value || item.content || item.answer || "";
        if (!label || !value) return null;
        return {
          label: String(label).trim(),
          key: item.key || inferApplyKey(label),
          value: String(value).trim(),
          reason: item.reason || ""
        };
      })
      .filter(Boolean);
  }

  function stringifySmartApplyItems(items) {
    return JSON.stringify(items.map((item) => ({
      label: item.label,
      key: item.key,
      value: item.value,
      reason: item.reason || ""
    })), null, 2);
  }

  function renderSmartApplyPreview() {
    const host = $("#smartApplyPreview");
    if (!host) return;
    const items = parseSmartMapText($("#smartApplyOutput").value || state.autofill.smartMapText || "");
    const status = $("#smartApplyStatus");
    if (status) {
      status.textContent = items.length ? `${items.length} 项` : "可选";
      status.classList.toggle("ok", Boolean(items.length));
    }
    host.innerHTML = items.slice(0, 8).map((item) => `
      <div class="field-preview-item">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value.slice(0, 120) || "未生成")}${item.value.length > 120 ? "..." : ""}</strong>
      </div>
    `).join("");
  }

  function smartApplyText() {
    const items = parseSmartMapText($("#smartApplyOutput").value || state.autofill.smartMapText || "");
    if (!items.length) return $("#smartApplyOutput").value || "";
    return items.map((item) => [
      `【${item.label}】`,
      item.value
    ].join("\n")).join("\n\n");
  }

  function buildLocalSmartApply() {
    syncStateFromInputs();
    const fields = parsePageFieldsInput(state.autofill.pageFields);
    if (!fields.length) {
      toast("先粘贴投递页字段标题");
      return;
    }
    const items = buildSmartApplyItems(fields);
    state.autofill.smartMapText = stringifySmartApplyItems(items);
    $("#smartApplyOutput").value = state.autofill.smartMapText;
    renderSmartApplyPreview();
    buildAutofillScript();
    toast(`已本地匹配 ${items.length} 个字段`);
  }

  function buildFieldCollectorScript() {
    return `(() => {
  const cssEscape = (value) => window.CSS && CSS.escape ? CSS.escape(value) : String(value).replace(/"/g, '\\\\"');
  const visible = (el) => {
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
  };
  const labelText = (el) => {
    const labelFor = el.id ? document.querySelector('label[for="' + cssEscape(el.id) + '"]') : null;
    const ownLabel = el.closest('label');
    const parent = el.parentElement;
    const prev = el.previousElementSibling;
    return [
      labelFor && labelFor.textContent,
      ownLabel && ownLabel.textContent,
      el.getAttribute('aria-label'),
      el.placeholder,
      el.name,
      el.id,
      prev && prev.textContent,
      parent && parent.textContent && parent.textContent.slice(0, 120)
    ].filter(Boolean).join(' ').replace(/\\s+/g, ' ').trim();
  };
  const fields = [...document.querySelectorAll('input, textarea, select, [contenteditable="true"]')]
    .filter((el) => !el.disabled && !el.readOnly && visible(el))
    .filter((el) => !['hidden','file','button','submit','reset','password','checkbox','radio'].includes((el.type || '').toLowerCase()))
    .map((el) => ({ label: labelText(el), name: el.name || '', placeholder: el.placeholder || '', type: el.tagName.toLowerCase() === 'input' ? el.type : el.tagName.toLowerCase(), required: Boolean(el.required) }))
    .filter((item) => item.label);
  const output = JSON.stringify(fields, null, 2);
  const done = () => alert('已复制 ' + fields.length + ' 个字段，请回到 Resume Studio 粘贴到“投递页字段 / 小标题”。');
  const fallback = () => {
    console.log('Resume Studio 字段 JSON:', output);
    window.prompt('浏览器没有允许自动复制，请全选复制下面的字段 JSON：', output);
  };
  if (typeof copy === 'function') {
    copy(output);
    done();
  } else if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(output).then(done).catch(fallback);
  } else {
    fallback();
  }
})();`;
  }

  async function callAiSmartApply() {
    syncStateFromInputs();
    const fields = parsePageFieldsInput(state.autofill.pageFields);
    if (!fields.length) {
      toast("先粘贴投递页字段标题");
      return;
    }

    if (!state.api.endpoint || !state.api.model) {
      toast("请先填写 API 接口地址和模型");
      setApiStatus("配置不完整", "error");
      return;
    }

    if (state.api.provider !== "custom" && !state.api.key) {
      toast(`${apiPresets[state.api.provider]?.note || "该接口"}需要 API Key`);
      setApiStatus("缺少密钥", "error");
      return;
    }

    const button = $("#aiSmartApplyBtn");
    const instructions = "你是招聘投递表单填写助手。你必须根据用户简历事实和网页字段标题生成中文填表内容，不编造公司、学校、项目、奖项或证书。只返回 JSON。";
    const prompt = [
      "请根据投递页面字段标题和简历内容，为每个字段生成适合粘贴/填入招聘网站的内容。",
      "要求：",
      "1. 只返回 JSON 数组，不要 Markdown，不要解释。",
      "2. 数组每项包含 label、key、value、reason。",
      "3. key 从 name, firstName, lastName, email, phone, location, portfolio, linkedin, role, coverLetter, summary, skills, experience, projects, education, awards, certificates, languages 中选择。",
      "4. 如果字段标题是项目/代表项目/项目经验，value 应优先使用简历项目经历并按网页标题改写。",
      "5. 如果字段标题是获奖/荣誉/竞赛，value 应优先使用获奖、证书、教育中的真实内容；没有事实时写“简历中未提供相关获奖信息”。",
      "6. 保留中文表达，简洁准确，适合直接填入网页。",
      "",
      "投递页面字段：",
      fields.map((field, index) => `${index + 1}. ${field}`).join("\n"),
      "",
      "简历内容：",
      markdownFromState()
    ].join("\n");
    const headers = { "Content-Type": "application/json" };
    if (state.api.key) headers.Authorization = `Bearer ${state.api.key}`;
    const body = state.api.type === "chat"
      ? {
          model: state.api.model,
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: prompt }
          ],
          temperature: 0.2
        }
      : {
          model: state.api.model,
          instructions,
          input: prompt
        };

    try {
      button.disabled = true;
      setApiStatus("投递匹配中...");
      const response = await fetch(state.api.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = payload?.error?.message || payload?.message || response.statusText;
        throw new Error(detail);
      }
      const text = extractAiText(payload);
      const parsed = parseSmartMapText(text);
      if (!parsed.length) throw new Error("模型未返回可用 JSON");
      state.autofill.smartMapText = stringifySmartApplyItems(parsed);
      $("#smartApplyOutput").value = state.autofill.smartMapText;
      renderSmartApplyPreview();
      buildAutofillScript();
      setApiStatus("已完成", "ok");
      toast(`AI已匹配 ${parsed.length} 个字段`);
    } catch (error) {
      setApiStatus("调用失败", "error");
      buildLocalSmartApply();
      toast(`AI匹配失败，已使用本地匹配：${error.message}`);
    } finally {
      button.disabled = false;
    }
  }

  function buildAutofillPayload() {
    const fullName = state.profile.name.trim();
    const sections = applySectionLibrary();
    const smartFields = parseSmartMapText(state.autofill.smartMapText || $("#smartApplyOutput")?.value || "");
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
      applyUrl: state.autofill.applyUrl || "",
      coverLetter: state.autofill.cover || state.summary,
      summary: state.summary,
      skills: state.skills,
      experience: state.experience,
      projects: state.projects,
      education: state.education,
      awards: sections.awards,
      certificates: sections.certificates,
      languages: sections.languages,
      extraModules: sections.extraModules,
      smartFields
    };
    return payload;
  }

  function autofillSource(bookmarklet = false) {
    const payload = buildAutofillPayload();
    const source = `(() => {
  const data = ${JSON.stringify(payload)};
  const escapePattern = (value) => String(value || '').replace(/[.*+?^$(){}|[\\]\\\\]/g, '\\\\$&');
  const smartType = (key, value) => /coverLetter|summary|skills|experience|projects|education|awards|certificates|languages|extraModules/i.test(key) || String(value || '').length > 80 ? 'textarea' : 'text';
  const smartDefs = (data.smartFields || [])
    .filter((item) => item && item.label && item.value)
    .map((item, index) => ({
      key: 'smart_' + index,
      sourceKey: item.key || '',
      label: item.label,
      value: item.value,
      patterns: [escapePattern(item.label), escapePattern(item.key || '')].filter(Boolean),
      type: smartType(item.key || '', item.value),
      smart: true
    }));
  const defs = [
    ...smartDefs,
    { key: 'firstName', label: '名', value: data.firstName, patterns: ['first.?name','given.?name','forename','名(?!字)','名字','first'], type: 'text' },
    { key: 'lastName', label: '姓', value: data.lastName, patterns: ['last.?name','family.?name','surname','姓氏','^姓$','last'], type: 'text' },
    { key: 'name', label: '姓名', value: data.name, patterns: ['full.?name','姓名','真实姓名','your.?name','candidate.?name','applicant.?name','name'], type: 'text' },
    { key: 'email', label: '邮箱', value: data.email, patterns: ['e-?mail','邮箱','电子邮件','mail'], type: 'email' },
    { key: 'phone', label: '电话', value: data.phone, patterns: ['phone','mobile','tel','电话','手机','联系方式','联系电话'], type: 'tel' },
    { key: 'location', label: '城市', value: data.location, patterns: ['location','city','current.?city','address','城市','所在地','地址','现居地','居住地'], type: 'text' },
    { key: 'portfolio', label: '作品/主页', value: data.portfolio, patterns: ['portfolio','website','homepage','github','personal.?site','作品','主页','个人网站','项目链接'], type: 'url' },
    { key: 'linkedin', label: 'LinkedIn', value: data.linkedin, patterns: ['linkedin','linked.?in','领英'], type: 'url' },
    { key: 'role', label: '期望岗位', value: data.role, patterns: ['position','role','job.?title','desired.?job','岗位','职位','申请职位','求职意向','应聘职位'], type: 'text' },
    { key: 'coverLetter', label: '求职信', value: data.coverLetter, patterns: ['cover.?letter','motivation','personal.?statement','summary','介绍','求职信','自我介绍','自我评价','补充说明','why.*apply'], type: 'textarea' },
    { key: 'summary', label: '个人摘要', value: data.summary, patterns: ['bio','profile','summary','个人简介','职业摘要','个人优势'], type: 'textarea' },
    { key: 'skills', label: '技能', value: data.skills, patterns: ['skills','skill.?set','能力','技能','专长','技术栈','工具'], type: 'textarea' },
    { key: 'experience', label: '工作经历', value: data.experience, patterns: ['experience','employment','work.?history','工作经历','工作经验','实习经历','任职经历','职业经历','实践经历'], type: 'textarea' },
    { key: 'projects', label: '项目经历', value: data.projects, patterns: ['project','projects','portfolio','case','项目经历','项目经验','代表项目','项目描述','项目介绍','项目成果','项目案例','作品','案例'], type: 'textarea' },
    { key: 'education', label: '教育经历', value: data.education, patterns: ['education','school','degree','学历','教育经历','教育背景','学校','院校','专业'], type: 'textarea' },
    { key: 'awards', label: '获奖荣誉', value: data.awards, patterns: ['award','honou?r','prize','competition','荣誉','奖项','获奖','奖励','竞赛','比赛','表彰'], type: 'textarea' },
    { key: 'certificates', label: '证书资质', value: data.certificates, patterns: ['certificate','certification','license','证书','资质','认证','资格'], type: 'textarea' },
    { key: 'languages', label: '语言能力', value: data.languages, patterns: ['language','languages','语言能力','英语','外语','CET','IELTS','TOEFL'], type: 'textarea' },
    { key: 'extraModules', label: '其他模块', value: data.extraModules, patterns: ['other','additional','附加信息','其他信息','补充经历','其他经历'], type: 'textarea' }
  ].filter((item) => item.value);

  const isHidden = (el) => {
    const style = window.getComputedStyle(el);
    return style.display === 'none' || style.visibility === 'hidden' || el.closest('[hidden], [aria-hidden="true"]');
  };
  const cssEscape = (value) => window.CSS && CSS.escape ? CSS.escape(value) : String(value).replace(/"/g, '\\\\"');
  const nearbyText = (el) => {
    const labelFor = el.id ? document.querySelector('label[for="' + cssEscape(el.id) + '"]') : null;
    const ownLabel = el.closest('label');
    const fieldset = el.closest('fieldset');
    const parent = el.parentElement;
    const previous = el.previousElementSibling;
    const next = el.nextElementSibling;
    return [
      el.name, el.id, el.className, el.placeholder, el.autocomplete, el.type,
      el.getAttribute('aria-label'), el.getAttribute('title'), el.getAttribute('data-testid'),
      labelFor && labelFor.textContent,
      ownLabel && ownLabel.textContent,
      fieldset && fieldset.querySelector('legend') && fieldset.querySelector('legend').textContent,
      previous && previous.textContent,
      next && next.textContent,
      parent && parent.textContent && parent.textContent.slice(0, 180)
    ].filter(Boolean).join(' ').replace(/\\s+/g, ' ').toLowerCase();
  };
  const score = (def, el, text) => {
    let value = 0;
    if (def.smart) {
      const label = String(def.label || '').toLowerCase().replace(/\\s+/g, ' ').trim();
      const sourceKey = String(def.sourceKey || '').toLowerCase();
      if (label && (text.includes(label) || label.includes(text.slice(0, 60)))) value += 36;
      if (sourceKey && text.includes(sourceKey)) value += 14;
      value += 8;
    }
    def.patterns.forEach((pattern) => {
      try {
        if (new RegExp(pattern, 'i').test(text)) value += 8;
      } catch {}
    });
    if (el.autocomplete && new RegExp(def.key.replace('Name', ' name'), 'i').test(el.autocomplete)) value += 10;
    if (def.type === 'email' && el.type === 'email') value += 14;
    if (def.type === 'tel' && ['tel', 'phone'].includes(el.type)) value += 14;
    if (def.type === 'url' && el.type === 'url') value += 8;
    if (def.type === 'textarea' && el.tagName === 'TEXTAREA') value += 10;
    if (/company|employer|学校|公司名称|推荐人|referrer|password|密码|captcha|验证码/.test(text)) value -= 20;
    if (def.key === 'name' && /first|last|given|family|surname|姓|名/.test(text)) value -= 10;
    return value;
  };
  const nativeSet = (el, value) => {
    if (el.isContentEditable) {
      el.focus();
      el.textContent = value;
      el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value }));
      return true;
    }
    if (el.tagName === 'SELECT') {
      const lower = String(value).toLowerCase();
      const option = [...el.options].find((item) => {
        const text = (item.textContent + ' ' + item.value).toLowerCase();
        return text.includes(lower) || lower.includes(text.trim());
      });
      if (option) el.value = option.value;
      else return false;
    } else {
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      el.focus();
      if (setter) setter.call(el, value);
      else el.value = value;
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
    return true;
  };
  const controls = [...document.querySelectorAll('input, textarea, select, [contenteditable="true"]')]
    .filter((el) => !el.disabled && !el.readOnly && !isHidden(el))
    .filter((el) => !['hidden','file','button','submit','reset','password','checkbox','radio'].includes((el.type || '').toLowerCase()));
  const filled = [];
  const skippedFile = document.querySelectorAll('input[type="file"]').length;
  controls.forEach((el) => {
    const text = nearbyText(el);
    const ranked = defs
      .map((def) => ({ def, points: score(def, el, text) }))
      .sort((a, b) => b.points - a.points);
    const winner = ranked[0];
    if (winner && winner.points >= 10 && nativeSet(el, winner.def.value)) {
      filled.push(winner.def.label);
    }
  });
  alert('Resume Studio 已尝试填入 ' + filled.length + ' 个字段：' + [...new Set(filled)].join('、') + (skippedFile ? '\\n检测到附件上传字段，请手动上传 PDF 简历。' : '') + '\\n请逐项核对后再提交。');
})();`;
    if (!bookmarklet) return source;
    return `javascript:${encodeURIComponent(source)}`;
  }

  function buildAutofillScript() {
    syncStateFromInputs();
    const script = autofillSource(false);
    $("#autofillScript").value = script;
    updateBookmarkletLink();
    renderApplyPreview();
    toast("已生成自动填表脚本");
  }

  function renderApplyPreview() {
    const host = $("#applyFieldPreview");
    if (!host) return;
    const data = buildAutofillPayload();
    const fields = [
      ["姓名", data.name],
      ["姓/名", `${data.lastName || ""} / ${data.firstName || ""}`],
      ["邮箱", data.email],
      ["电话", data.phone],
      ["城市", data.location],
      ["作品主页", data.portfolio],
      ["LinkedIn", data.linkedin],
      ["期望岗位", data.role]
    ];
    host.innerHTML = fields.map(([label, value]) => `
      <div class="field-preview-item">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value || "未填写")}</strong>
      </div>
    `).join("");
    const missing = fields.filter(([, value]) => !value).length;
    const status = $("#applyReadyStatus");
    if (status) {
      status.textContent = missing ? `缺 ${missing} 项` : "可投递";
      status.classList.toggle("ok", !missing);
      status.classList.toggle("error", Boolean(missing));
    }
  }

  function updateBookmarkletLink() {
    const link = $("#bookmarkletLink");
    if (!link) return;
    link.href = autofillSource(true);
    link.title = "把这个链接拖到浏览器书签栏，在投递页面点击即可尝试自动填表";
  }

  function prepareApplication() {
    syncStateFromInputs();
    buildAutofillScript();
    toast("投递信息已准备好");
  }

  function openApplyPage() {
    syncStateFromInputs();
    const url = state.autofill.applyUrl;
    if (!url) {
      toast("先填写投递页面地址");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function applyInfoText() {
    const data = buildAutofillPayload();
    return [
      `姓名：${data.name}`,
      `姓/名：${data.lastName} / ${data.firstName}`,
      `邮箱：${data.email}`,
      `电话：${data.phone}`,
      `城市：${data.location}`,
      `作品/主页：${data.portfolio}`,
      `LinkedIn：${data.linkedin}`,
      `期望岗位：${data.role}`,
      "",
      "求职信摘要：",
      data.coverLetter
    ].join("\n");
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
    renderResumeEditorAssist();
    renderOptimizationStats();
    renderSlides();
    $("#previewMeta").textContent = $("#slidesPreviewWrap").classList.contains("hidden") ? "A4预览" : "16:9预览";
  }

  async function saveState() {
    syncStateFromInputs();
    if (currentFileHandle) {
      try {
        await writeStateToHandle(currentFileHandle);
        toast(`已保存到 ${currentFileName || "当前文件"}`);
        setStatus(`${currentFileName || "当前文件"} 已保存，可下次直接打开继续修改`);
        return;
      } catch (error) {
        toast("当前文件写入失败，请使用另存为重新选择位置");
      }
    }

    localStorage.setItem("resume-studio-state", serializeState());
    toast("已保存到本机浏览器；如需本地文件请点另存为");
  }

  function serializeState() {
    const savedState = clone(state);
    scrubSensitiveState(savedState);
    return JSON.stringify(savedState, null, 2);
  }

  async function saveStateAsFile() {
    syncStateFromInputs();
    const fileName = `${state.profile.name || "resume-studio"}.resume.json`;

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
        await writeStateToHandle(handle);
        currentFileHandle = handle;
        currentFileName = handle.name || fileName;
        toast("已选择本地位置并保存，之后点击保存会写回该文件");
        setStatus(`${currentFileName} 已保存，可下次打开继续修改`);
        return;
      } catch (error) {
        if (error.name === "AbortError") {
          toast("已取消另存为");
          return;
        }
      }
    }

    const blob = stateBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
    toast("浏览器已下载简历文件");
  }

  function stateBlob() {
    return new Blob([serializeState()], { type: "application/json;charset=utf-8" });
  }

  async function writeStateToHandle(handle) {
    const writable = await handle.createWritable();
    await writable.write(stateBlob());
    await writable.close();
  }

  async function loadState() {
    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [
            {
              description: "Resume Studio JSON",
              accept: { "application/json": [".json"] }
            }
          ],
          multiple: false
        });
        const file = await handle.getFile();
        await loadStateFromJsonText(await file.text(), file.name, handle);
        return;
      } catch (error) {
        if (error.name === "AbortError") {
          toast("已取消打开文件");
          return;
        }
        toast(error.message || "本地文件打开失败");
      }
    }

    const saved = localStorage.getItem("resume-studio-state");
    if (!saved) {
      toast("没有找到本地保存");
      return;
    }
    await loadStateFromJsonText(saved, "浏览器本地版本", null, "已读取浏览器本地版本");
  }

  function setSample() {
    const selected = sampleById($("#sampleSelect")?.value || "frontend-markdown");
    state = selected.factory();
    avatarImage = null;
    currentFileHandle = null;
    currentFileName = "";
    syncInputsFromState();
    generateSlides();
    renderAll();
    toast(`已载入 ${selected.label} 样例`);
  }

  function bindEvents() {
    bindPreviewDirectEdit();

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
    ].filter((input) => !["resumeFile", "avatarFile", "styleFile"].includes(input.id));

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
        currentFileHandle = null;
        currentFileName = "";
        applyStyleFromImportedResume(file, text);
        $("#rawInput").value = text;
        state.raw = text;
        parseResumeText(text, { replaceContent: true });
        setStatus(`${file.name} 读取完成，已按导入简历风格建立版式`);
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

    $("#styleFile").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        await importStyleFromFile(file);
      } catch (error) {
        $("#styleImportStatus").textContent = "导入失败";
        $("#styleImportStatus").classList.add("error");
        $("#styleImportStatus").classList.remove("ok");
        toast(error.message || "风格导入失败");
      } finally {
        event.target.value = "";
      }
    });

    $("#sampleBtn").addEventListener("click", setSample);
    $("#saveAsBtn").addEventListener("click", saveStateAsFile);
    $("#apiProviderSelect").addEventListener("change", (event) => {
      applyApiPreset(event.target.value);
      renderOptimizationStats();
    });
    $("#addModuleBtn").addEventListener("click", addModuleFromPreset);
    $("#resetStyleBtn").addEventListener("click", resetStyle);
    $("#copyStyleSummaryBtn").addEventListener("click", () => copyText($("#styleImportSummary").textContent, "风格摘要"));
    $("#parseBtn").addEventListener("click", () => parseResumeText($("#rawInput").value));
    $("#polishSummaryBtn").addEventListener("click", polishSummary);
    $("#formatSkillsBtn").addEventListener("click", formatSkills);
    $("#formatExperienceBtn").addEventListener("click", formatExperienceContent);
    $("#compactResumeBtn").addEventListener("click", compactResumeForOnePage);
    $("#resumePanel").addEventListener("click", (event) => {
      const target = event.target.closest("[data-focus-target]");
      if (!target) return;
      focusEditorTarget(target.dataset.focusTarget);
    });
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
    $("#prepareApplyBtn").addEventListener("click", prepareApplication);
    $("#openApplyPageBtn").addEventListener("click", openApplyPage);
    $("#fieldCollectorBtn").addEventListener("click", async () => {
      await copyText(buildFieldCollectorScript(), "字段采集脚本");
      toast("已复制：Console 失败时用 Sources > Snippets 运行");
    });
    $("#localSmartApplyBtn").addEventListener("click", buildLocalSmartApply);
    $("#aiSmartApplyBtn").addEventListener("click", callAiSmartApply);
    $("#copySmartApplyBtn").addEventListener("click", () => {
      syncStateFromInputs();
      copyText(smartApplyText(), "智能匹配内容");
    });
    $("#smartApplyOutput").addEventListener("input", () => {
      syncStateFromInputs();
      renderSmartApplyPreview();
      updateBookmarkletLink();
      renderApplyPreview();
    });
    $("#copyApplyInfoBtn").addEventListener("click", () => {
      syncStateFromInputs();
      copyText(applyInfoText(), "投递信息");
    });
    $("#copyScriptBtn").addEventListener("click", () => {
      buildAutofillScript();
      copyText($("#autofillScript").value, "自动填表脚本");
    });
    $("#copyBookmarkBtn").addEventListener("click", () => copyText(autofillSource(true), "书签脚本"));
    $("#copyCoverBtn").addEventListener("click", () => {
      syncStateFromInputs();
      copyText(buildAutofillPayload().coverLetter, "求职信");
    });
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
