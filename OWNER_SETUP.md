# 站长设置（CMS + Stripe）

## 1. 知识页 CMS

- 访客：`/knowledge.html` 只读
- 你改内容：见 `content/README.md`
- 后台：`/admin/`（Decap CMS，GitHub 登录）

推送到 `main` 后，workflow **Rebuild article index** 会更新文章列表。

## 2. Stripe 收款

1. 注册 [Stripe](https://dashboard.stripe.com/)
2. Developers → API keys → 复制 **Secret key**（测试用 `sk_test_...`）
3. 打开 [Vercel 项目](https://vercel.com) → Settings → Environment Variables  
   添加：
   - `STRIPE_SECRET_KEY` = `sk_test_...`（上线后改成 `sk_live_...`）
   - （可选）`SITE_URL` = `https://vivianewan.github.io/bazi`
4. Redeploy Vercel，让 `api/create-checkout-session.js` 生效
5. 若网站开在 **GitHub Pages**，在 `config.site.js` 里把 API 指到 Vercel：

```js
window.CHECKOUT_API_BASE = 'https://bazi-sigma.vercel.app';
```

购物车点 **Proceed to Checkout** → 跳转 Stripe 付款页 → 成功后到 `success.html`。

手续费约 **2.9% + $0.30** / 笔，无月费。
