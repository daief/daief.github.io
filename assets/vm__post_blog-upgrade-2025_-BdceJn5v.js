import{L as e,R as t,T as n,c as r,f as i,h as a,j as o,m as s,n as c,o as l,p as u,t as d,u as f}from"./app-DvX1Smg_.js";import"./isObject-STXFNBUz.js";import"./isSymbol-CUbBZ03s.js";import"./toNumber-CiYTsHHK.js";import"./now-BXsIGwzm.js";import{n as p,t as m}from"./toc-DNILfFl5.js";import{n as h,t as g}from"./meta-info-C-tMy3g2.js";import{t as _}from"./use-page-title-CHxbaOlI.js";var v={class:`relative`},y={key:0,class:`mt-10`},b=l(Object.assign({name:`Article`},{__name:`vm:_post_blog-upgrade-2025_`,setup(l){_({title:`2025 博客升级`,description:`博客升级 2025`});let{meta:b,toc:x}={meta:{title:`2025 博客升级`,id:`blog-upgrade-2025`,date:`2025-11-03T20:00:31.000Z`,description:`博客升级 2025`,tags:[`Blog`],sort:0,comments:!0,draft:!1},toc:[{id:`%E7%BC%98%E7%94%B1`,text:`缘由`,level:2,children:[],parent:``},{id:`%E5%8E%9F%E7%90%86`,text:`原理`,level:2,children:[],parent:``},{id:`%E4%B8%BB%E9%A2%98`,text:`主题`,level:2,children:[],parent:``},{id:`%E5%8A%9F%E8%83%BD`,text:`功能`,level:2,children:[],parent:``},{id:`%E7%BB%93%E8%AF%AD`,text:`结语`,level:2,children:[],parent:``}]},{appState:S}=d();return(l,d)=>(n(),u(r,null,[f(`div`,v,[f(`article`,null,[f(`header`,null,[d[1]||=f(`h1`,{class:`text-foreground text-3xl font-bold mb-4`},` 2025 博客升级 `,-1),a(g,{meta:e(b)},null,8,[`meta`])]),a(h,{class:`mt-6`},{default:o(()=>[d[14]||=f(`p`,null,`最近突然想把网站改一改，一看都有两年多没更新，也太鸽了......`,-1),d[15]||=f(`p`,null,`趁着改版，写一篇记录一下这一历史进程。`,-1),d[16]||=f(`a`,{id:`more`,href:`#more`,class:`block`},null,-1),d[17]||=f(`h2`,{id:`%E7%BC%98%E7%94%B1`},[s(`缘由`),f(`a`,{name:`%E7%BC%98%E7%94%B1`,class:`headerlink`,href:`#%E7%BC%98%E7%94%B1`})],-1),d[18]||=f(`p`,null,`其实这一次改版我是想尽可能用现成的东西，毕竟开源维护的系统、界面设计都会比之前自己组装的好，也省心一点。`,-1),f(`p`,null,[d[4]||=s(`加上我想坚持使用 Vue，于是就想到了 `,-1),a(c,{target:`_blank`,href:`https://vitepress.dev/zh/`},{default:o(()=>[...d[2]||=[s(`Vitepress`,-1)]]),_:1}),d[5]||=s(`。但在 Vitepress 里只能通过`,-1),a(c,{target:`_blank`,href:`https://vitepress.dev/zh/guide/data-loading`},{default:o(()=>[...d[3]||=[s(`数据加载`,-1)]]),_:1}),d[6]||=s(`来实现博客分页功能时，而这实际上会一次性加载所有文章的元数据，实际上是在前端做假分页。对于这个点我的强迫症莫名地强烈 `,-1),d[7]||=f(`del`,null,`（虽然全量加载我也没多少数据）`,-1),d[8]||=s(`，因此放弃了 Vitepress。`,-1)]),d[19]||=f(`p`,null,`考虑了一下，即使还有一些其他优秀的博客系统，但最终还是决定自己主导实现，毕竟我想要的功能并不复杂，也能借此学习实践一些新的东西。`,-1),d[20]||=f(`h2`,{id:`%E5%8E%9F%E7%90%86`},[s(`原理`),f(`a`,{name:`%E5%8E%9F%E7%90%86`,class:`headerlink`,href:`#%E5%8E%9F%E7%90%86`})],-1),d[21]||=f(`p`,null,`先大概画下旧版的逻辑，整体采用 Vue App（壳）+ Fetch Json Data（数据）的思路，取动态路由的参数，匹配相应的数据 Data，结合后即单个页面的渲染：`,-1),d[22]||=f(`pre`,{class:`mermaid`},`sequenceDiagram
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
  deactivate Browser`,-1),d[23]||=f(`p`,null,`而新版的一个改变，是尽可能使用现成的库和工具，减少自己的工作量，所以整体逻辑包装成了一个 Vite Plugin，再借助 Vite SSG，免去了自行实现 server、ssg 的工作，将来升级换代的工作也少了（自己做得少、适配的工作也就少了）。`,-1),d[24]||=f(`p`,null,`实现思路也不同，把 Markdown 解析后的内容转换为 Vue 组件、最终打包进 JS，不再使用动态路由，而是枚举注册所有的页面路由，通过路由懒加载实现数据拆分。这样做还带来了一些其他好处：`,-1),d[25]||=f(`ul`,null,[f(`li`,null,`直接就能使用 Vite 的热更新，文章编辑实时预览`),f(`li`,null,`Markdown 内可编写 Vue 代码、使用 Vue 组件`)],-1),d[26]||=f(`pre`,{class:`mermaid`},[s(`sequenceDiagram
  participant Browser
  participant Markdown@{ "type" : "database" }
  participant VitePlugin
  participant Vite

  Markdown->>VitePlugin: fs read -> memory db`),f(`br`),s(` -> calc routes`),f(`br`),s(` -> gen vue component as virtual module
  VitePlugin->>Vite:

  Browser->>Vite: request page /post/:id
  activate Vite
  Vite-->>Browser: vue app html, js, if dev then csr else ssg
  deactivate Vite`)],-1),d[27]||=f(`p`,null,`最终 ssg build 时依次渲染所有路由，生成静态页面，结束。`,-1),d[28]||=f(`h2`,{id:`%E4%B8%BB%E9%A2%98`},[s(`主题`),f(`a`,{name:`%E4%B8%BB%E9%A2%98`,class:`headerlink`,href:`#%E4%B8%BB%E9%A2%98`})],-1),f(`p`,null,[d[11]||=s(`缺乏设计能力，所以样式方面整体抄了 `,-1),a(c,{target:`_blank`,href:`https://astro-paper.pages.dev/`},{default:o(()=>[...d[9]||=[s(`AstroPaper`,-1)]]),_:1}),d[12]||=s(`，也同时借助了 `,-1),a(c,{target:`_blank`,href:`https://astro-pure.js.org/`},{default:o(()=>[...d[10]||=[s(`Astro Theme Pure`,-1)]]),_:1}),d[13]||=s(` 的部分元素。`,-1)]),d[29]||=f(`h2`,{id:`%E5%8A%9F%E8%83%BD`},[s(`功能`),f(`a`,{name:`%E5%8A%9F%E8%83%BD`,class:`headerlink`,href:`#%E5%8A%9F%E8%83%BD`})],-1),d[30]||=f(`p`,null,[s(`具备了 Markdown 转 Vue 的能力后，可以更容易实现一些有趣的功能了。之前做过的卡片链接也不需要去手动写 HTML 了，可以直接把 Markdown 的链接转换为内置的 `),f(`code`,null,`ALink`),s(` 组件，用组件来做灵活的形态变换就更简单优雅了。`)],-1),d[31]||=f(`p`,null,`后续也会参考 Vitepress，实现一些自定义的 Markdown 语法扩展。但会考虑尽可能保持简洁通用，以免后续迁移系统、导致这些方言语法无法被支持。`,-1),d[32]||=f(`h2`,{id:`%E7%BB%93%E8%AF%AD`},[s(`结语`),f(`a`,{name:`%E7%BB%93%E8%AF%AD`,class:`headerlink`,href:`#%E7%BB%93%E8%AF%AD`})],-1),d[33]||=f(`p`,null,`目前还有一些功能没迁移完，但无伤大雅，先发一版了，后续再慢慢完善吧。顺带一提，迁移之后，把“分类”去掉了，只使用标签来组织文章，两者共存有点重复了。`,-1),d[34]||=f(`p`,null,`最后截图留念一下旧版界面：`,-1),d[35]||=f(`p`,null,[f(`img`,{alt:`旧版首页`,loading:`lazy`,title:`旧版首页`,class:`post-image`,src:`/assets/old-home-nnSVTGjt.jpg`,onerror:`this.onerror=null;this.src='/images/image-error.jpg';`})],-1),d[36]||=f(`p`,null,[f(`img`,{alt:`文章详情`,loading:`lazy`,title:`文章详情`,class:`post-image`,src:`/assets/PixPin_2025-11-04_11-25-55-A7eGHnnq.jpg`,onerror:`this.onerror=null;this.src='/images/image-error.jpg';`})],-1)]),_:1})]),e(x).length?(n(),u(`aside`,{key:0,class:t([e(S).showIndexSidebar?`bg-[#00000080]`:`pointer-events-none`,`fixed z-20 top-0 w-full h-full left-0 overscroll-contain transition-300`,`lg:pointer-events-auto`,`lg:absolute lg:w-auto lg:bg-transparent lg:left-[calc(100%+clamp(6px,17.1875vw-176px,50px))]`]),onClick:d[0]||=(...e)=>l.hideIndexSidebar&&l.hideIndexSidebar(...e)},[f(`nav`,{class:t([`overflow-y-auto text-foreground overscroll-contain bg-background`,`w-74 max-w-4/5 h-full py-8 px-6 rounded-tl-xl rounded-bl-xl`,`absolute top-0 transition-300 right-0`,e(S).showIndexSidebar?`translate-x-0`:`translate-x-full`,`lg:p-0 lg:max-w-44 xl:max-w-50 lg:h-auto lg:max-h-[calc(100vh-130px)] lg:rounded-none`,`lg:sticky lg:top-10 lg:right-auto lg:translate-x-0 lg:bg-transparent lg:ml-0`])},[d[37]||=f(`h2`,{class:`mb-2 font-bold lg:hidden`},`TABLE OF CONTENTS`,-1),a(m,{toc:e(x)},null,8,[`toc`])],2)],2)):i(``,!0)]),d[38]||=f(`hr`,{class:`border-border mt-10`},null,-1),e(b).comments?(n(),u(`div`,y,[a(p)])):i(``,!0)],64))}}),[[`__scopeId`,`data-v-a322f699`]]);export{b as default};