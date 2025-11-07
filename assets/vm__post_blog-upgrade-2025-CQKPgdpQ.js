import{S as e,T as t,_ as n,c as r,d as i,f as a,m as o,n as s,p as c,u as l}from"./app-GFqn-Fd9.js";import{n as u,t as d}from"./meta-info-D2biWlOG.js";import{t as f}from"./use-page-title-CrTiPUAy.js";import{t as p}from"./comment-CeikYjEj.js";var m={key:0,class:`mt-10`},h=o({name:`Article`,__name:`vm:_post_blog-upgrade-2025`,setup(o){f({title:`2025 博客升级`,description:`博客升级 2025`});let h=JSON.parse(`{"isDraft":false,"title":"2025 博客升级","id":"blog-upgrade-2025","date":"2025-11-03T20:00:31.000Z","description":"博客升级 2025","tags":["Blog"],"sort":0,"comments":true}`);return(o,f)=>(n(),i(`article`,null,[r(`header`,null,[f[0]||=r(`h1`,{class:`text-foreground text-3xl font-bold mb-4`},` 2025 博客升级 `,-1),c(d,{meta:t(h)},null,8,[`meta`])]),c(u,{class:`mt-6`},{default:e(()=>[f[13]||=r(`p`,null,`最近突然想把网站改一改，一看都有两年多没更新，也太鸽了......`,-1),f[14]||=r(`p`,null,`趁着改版，写一篇记录一下这一历史进程。`,-1),f[15]||=r(`a`,{href:`#more`,class:`hidden`},null,-1),f[16]||=r(`h2`,{id:`缘由`},[a(`缘由`),r(`a`,{name:`缘由`,class:`headerlink`,href:`#缘由`})],-1),f[17]||=r(`p`,null,`其实这一次改版我是想尽可能用现成的东西，毕竟开源维护的系统、界面设计都会比之前自己组装的好，也省心一点。`,-1),r(`p`,null,[f[3]||=a(`加上我想坚持使用 Vue，于是就想到了 `,-1),c(s,{target:`_blank`,href:`https://vitepress.dev/zh/`},{default:e(()=>[...f[1]||=[a(`Vitepress`,-1)]]),_:1}),f[4]||=a(`。但在 Vitepress 里只能通过`,-1),c(s,{target:`_blank`,href:`https://vitepress.dev/zh/guide/data-loading`},{default:e(()=>[...f[2]||=[a(`数据加载`,-1)]]),_:1}),f[5]||=a(`来实现博客分页功能时，而这实际上会一次性加载所有文章的元数据，实际上是在前端做假分页。对于这个点我的强迫症莫名地强烈 `,-1),f[6]||=r(`del`,null,`（虽然全量加载我也没多少数据）`,-1),f[7]||=a(`，因此放弃了 Vitepress。`,-1)]),f[18]||=r(`p`,null,`考虑了一下，即使还有一些其他优秀的博客系统，但最终还是决定自己主导实现，毕竟我想要的功能并不复杂，也能借此学习实践一些新的东西。`,-1),f[19]||=r(`h2`,{id:`原理`},[a(`原理`),r(`a`,{name:`原理`,class:`headerlink`,href:`#原理`})],-1),f[20]||=r(`p`,null,`先大概画下旧版的逻辑，整体采用 Vue App（壳）+ Fetch Json Data（数据）的思路，取动态路由的参数，匹配相应的数据 Data，结合后即单个页面的渲染：`,-1),f[21]||=r(`pre`,{class:`mermaid`},`sequenceDiagram
  participant Browser
  participant Markdown@{ "type" : "database" }
  participant ViteAsMiddleware
  participant ExpressApp

  Markdown->>ExpressApp: fs read -> memory db
  ViteAsMiddleware->>ExpressApp: render vue app on server

  Browser->>ExpressApp: request page /post/:id
  activate ExpressApp
  ExpressApp->>ExpressApp: fetch markdown data with /api/hashed(post/:id).json
  ExpressApp-->>Browser: send server side rendered page html
  deactivate ExpressApp

  Browser->>Browser: route change /tags/:tag
  activate Browser

  Browser->>ExpressApp: fetch markdown data with /api/hashed(tags/:tag).json
  activate ExpressApp
  ExpressApp-->>Browser: send page data: title, content, etc.
  deactivate ExpressApp

  Browser-->>Browser: render vue app on client
  deactivate Browser`,-1),f[22]||=r(`p`,null,`而新版的一个改变，是尽可能使用现成的库和工具，减少自己的工作量，所以整体逻辑包装成了一个 Vite Plugin，再借助 Vite SSG，免去了自行实现 server、ssg 的工作，将来升级换代的工作也少了（自己做得少、适配的工作也就少了）。`,-1),f[23]||=r(`p`,null,`实现思路也不同，把 Markdown 解析后的内容转换为 Vue 组件、最终打包进 JS，不再使用动态路由，而是枚举注册所有的页面路由，通过路由懒加载实现数据拆分。这样做还带来了一些其他好处：`,-1),f[24]||=r(`ul`,null,[r(`li`,null,`直接就能使用 Vite 的热更新，文章编辑实时预览`),r(`li`,null,`Markdown 内可编写 Vue 代码、使用 Vue 组件`)],-1),f[25]||=r(`pre`,{class:`mermaid`},[a(`sequenceDiagram
  participant Browser
  participant Markdown@{ "type" : "database" }
  participant VitePlugin
  participant Vite

  Markdown->>VitePlugin: fs read -> memory db`),r(`br`),a(` -> calc routes`),r(`br`),a(` -> gen vue component as virtual module
  VitePlugin->>Vite:

  Browser->>Vite: request page /post/:id
  activate Vite
  Vite-->>Browser: vue app html, js, if dev then csr else ssg
  deactivate Vite`)],-1),f[26]||=r(`p`,null,`最终 ssg build 时依次渲染所有路由，生成静态页面，结束。`,-1),f[27]||=r(`h2`,{id:`主题`},[a(`主题`),r(`a`,{name:`主题`,class:`headerlink`,href:`#主题`})],-1),r(`p`,null,[f[10]||=a(`缺乏设计能力，所以样式方面整体抄了 `,-1),c(s,{target:`_blank`,href:`https://astro-paper.pages.dev/`},{default:e(()=>[...f[8]||=[a(`AstroPaper`,-1)]]),_:1}),f[11]||=a(`，也同时借助了 `,-1),c(s,{target:`_blank`,href:`https://astro-pure.js.org/`},{default:e(()=>[...f[9]||=[a(`Astro Theme Pure`,-1)]]),_:1}),f[12]||=a(` 的部分元素。`,-1)]),f[28]||=r(`h2`,{id:`功能`},[a(`功能`),r(`a`,{name:`功能`,class:`headerlink`,href:`#功能`})],-1),f[29]||=r(`p`,null,[a(`具备了 Markdown 转 Vue 的能力后，可以更容易实现一些有趣的功能了。之前做过的卡片链接也不需要去手动写 HTML 了，可以直接把 Markdown 的链接转换为内置的 `),r(`code`,null,`ALink`),a(` 组件，用组件来做灵活的形态变换就更简单优雅了。`)],-1),f[30]||=r(`p`,null,`后续也会参考 Vitepress，实现一些自定义的 Markdown 语法扩展。但会考虑尽可能保持简洁通用，以免后续迁移系统、导致这些方言语法无法被支持。`,-1),f[31]||=r(`h2`,{id:`结语`},[a(`结语`),r(`a`,{name:`结语`,class:`headerlink`,href:`#结语`})],-1),f[32]||=r(`p`,null,`目前还有一些功能没迁移完，但无伤大雅，先发一版了，后续再慢慢完善吧。顺带一提，迁移之后，把“分类”去掉了，只使用标签来组织文章，两者共存有点重复了。`,-1),f[33]||=r(`p`,null,`最后截图留念一下旧版界面：`,-1),f[34]||=r(`p`,null,[r(`img`,{alt:`旧版首页`,loading:`lazy`,title:`旧版首页`,class:`post-image`,src:`/assets/old-home-nnSVTGjt.jpg`,onerror:`this.onerror=null;this.src='/images/image-error.jpg';`})],-1),f[35]||=r(`p`,null,[r(`img`,{alt:`文章详情`,loading:`lazy`,title:`文章详情`,class:`post-image`,src:`/assets/PixPin_2025-11-04_11-25-55-A7eGHnnq.jpg`,onerror:`this.onerror=null;this.src='/images/image-error.jpg';`})],-1)]),_:1}),f[36]||=r(`hr`,{class:`border-border mt-10`},null,-1),t(h).comments?(n(),i(`div`,m,[c(p)])):l(``,!0)]))}});export{h as default};