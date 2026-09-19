# 如何添加 / 删除玄学知识页（仅站长）

访客只能阅读，不能改内容。只有 GitHub 仓库协作者能发布。

## 方法 A：GitHub 网页直接改（最稳）

1. 打开仓库 → `content/articles/`
2. **新增文章**：Add file → Create new file  
   - 文件名：`my-topic.md`（英文短横线，不要空格）
   - 内容模板：

```markdown
---
title: 文章标题
date: 2026-09-19
summary: 一句话简介
cover: /content/uploads/example.jpg
---

正文 Markdown，可插图：

![说明](/content/uploads/example.jpg)
```

3. **加图片**：上传到 `content/uploads/`，正文里用 `/content/uploads/文件名`
4. **删文章**：删掉对应 `.md` 即可
5. 推送到 `main` 后，GitHub Action 会自动重建 `content/articles/index.json`，知识页就会更新

## 方法 B：网页后台 Decap CMS

1. 打开：`https://vivianewan.github.io/bazi/admin/`
2. 用 GitHub 登录（必须是本仓库 collaborator）
3. 在 **Knowledge Articles** 里增删改、上传图片

> 首次若登录失败：需要在 GitHub 创建 OAuth App，或继续用方法 A。  
> Decap 默认使用 `https://api.decap-cms.org` 作为社区 OAuth 代理。

## 本地预览

```bash
python3 -m http.server 8765
```

打开 `http://127.0.0.1:8765/knowledge.html`
