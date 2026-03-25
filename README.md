# Agentic Coding Hands-on

[![Vietnamese](https://img.shields.io/badge/Vietnamese-green.svg)](https://github.com/sun-asterisk-internal/agentic-coding-hands-on/blob/main/README.md) [![Japanese](https://img.shields.io/badge/Japanese-yellow.svg)](https://github.com/sun-asterisk-internal/agentic-coding-hands-on/blob/main/README_ja.md) [![English](https://img.shields.io/badge/English-blue.svg)](https://github.com/sun-asterisk-internal/agentic-coding-hands-on/blob/main/README_en.md)

Repository phục vụ khóa thực hành **Agentic Coding** nội bộ Sun\*. Học viên sẽ sử dụng **MoMorph + Claude Code** để generate code từ Figma design. Ngoài Claude Code, bạn cũng có thể sử dụng các AI coding agent khác như **Copilot**, **Gemini**, **Windsurf**,... với các bước và cách dùng tương tự. Trong bài thực hành này, chúng tôi giả định bạn dùng **Claude Code**.

## Branches

Repository có 2 branch:

- [**`main`**](https://github.com/sun-asterisk-internal/agentic-coding-hands-on/tree/main) — Source code khởi tạo ban đầu. Học viên clone về và làm trên nhánh này. Cần tự cài đặt MoMorph CLI và chạy `momorph init` để sinh ra các thư mục `.claude`, `.vscode` (chứa prompts) kết nối với MoMorph MCP Server.
- [**`sample`**](https://github.com/sun-asterisk-internal/agentic-coding-hands-on/tree/sample) — Có sẵn các thư mục `.claude`, `.vscode`, `.momorph` chứa specs mẫu của một số màn hình. Dùng để tham khảo khi muốn xem context đầu vào và kết quả mà MoMorph sinh ra trông như thế nào.

## Prerequisites

- Node.js v24.x
- Docker (for running Supabase)
- Yarn v1.22.22 (package manager)
- [MoMorph CLI](https://github.com/momorph/cli)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) hoặc VSCode + MoMorph Extension

### Tech Stack

- **Next.js** – React framework for building full-stack web applications
- **Supabase** – Backend-as-a-Service (BaaS) platform providing database, authentication, and real-time features
- **Cloudflare Workers** – Edge computing platform for deploying and running applications
- **TailwindCSS** – Utility-first CSS framework

## Hướng dẫn thực hành

### Bước 1: Clone repository

```sh
git clone https://github.com/sun-asterisk-internal/agentic-coding-hands-on.git
cd agentic-coding-hands-on
```

### Bước 2: Cài đặt dependencies

```sh
# Tạo file .env:
cp .env.example .env

# Cài đặt packages:
yarn install
```

### Bước 3: Đăng nhập MoMorph Web và kết nối tài khoản GitHub

1. Truy cập [MoMorph Web](https://momorph.ai/) và đăng nhập bằng tài khoản Figma (dùng email `*@sun-asterisk.com`).
2. Điền link file Figma sau để tiếp tục: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/SAA-2025---Internal-Live-Coding
3. Vào **Settings → GitHub → Connect** để kết nối tài khoản GitHub của bạn với MoMorph.

> **Lưu ý:** Repository này đã được connect sẵn với MoMorph và Figma project trên hệ thống. Bạn chỉ cần kết nối tài khoản GitHub cá nhân với MoMorph là có thể sử dụng.

### Bước 4: Đặt git remote trỏ đúng repository

Đảm bảo git remote của repo trên local trỏ tới repository gốc:

```sh
git remote set-url origin https://github.com/sun-asterisk-internal/agentic-coding-hands-on.git
```

Điều này cần thiết để MoMorph VSCode Extension có thể nhận diện repository và hiển thị Figma file đã liên kết.

### Bước 5: Cài đặt MoMorph CLI

Chọn một trong các cách sau:

```sh
# macOS / Linux (Homebrew):
brew install momorph/tap/momorph-cli

# Windows (Chocolatey):
choco install momorph

# Windows (PowerShell):
irm https://raw.githubusercontent.com/momorph/cli/refs/heads/main/scripts/install.ps1 | iex

# Linux / macOS (Bash):
curl -fsSL https://raw.githubusercontent.com/momorph/cli/refs/heads/main/scripts/install.sh | bash
```

Xác nhận cài đặt thành công:

```sh
momorph version
```

### Bước 6: Đăng nhập MoMorph CLI

```sh
momorph login
```

CLI sẽ hiển thị một mã xác thực và link đăng nhập. Nhấn `Enter` để mở link trên trình duyệt, sau đó nhập mã để hoàn tất xác thực.

Kiểm tra thông tin tài khoản:

```sh
momorph whoami
```

### Bước 7: Khởi tạo MoMorph project

Chạy lệnh init để sinh ra các thư mục cấu hình (`.claude`, `.vscode` prompts, kết nối MCP server...):

```sh
# Nếu dùng Claude Code:
momorph init . --ai claude

# Nếu dùng GitHub Copilot:
momorph init . --ai copilot

# Nếu dùng Cursor:
momorph init . --ai cursor
```

Lệnh này sẽ:
- Tải template MoMorph project mới nhất
- Sinh các file cấu hình (`.claude/`, prompt files, workflow scripts...)
- Thiết lập kết nối MCP server cho AI agent đã chọn
- Tự động cài đặt MoMorph VSCode Extension (nếu chưa cài). Sau khi cài đặt, mở source code repo trên VSCode → chạy command "MoMorph: Sign In" → click vào biểu tượng MoMorph trên sidebar → bạn sẽ thấy danh sách frame list của Figma file đã liên kết.

### Bước 8: Bắt đầu generate code

Sử dụng Figma project để thực hành:

**Figma file:** [SAA 2025 - Internal Live Coding](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/SAA-2025---Internal-Live-Coding)

#### Chuẩn bị context: Viết Screen Spec trên MoMorph Web

Thông thường, trước khi bắt đầu generate code, ta cần chuẩn bị đầy đủ *Screen Specifications* trên MoMorph. Nội dung Screen Specifications này có thể được viết manual, hoặc được generate ra bởi AI thông qua các chức năng trên MoMorph Web, MoMorph Figma Plugin (yêu cầu Figma Account - Full Seat), cũng như thông qua các hệ thống Agent (GitHub Copilot, Claude Code) khi kết nối với MoMorph MCP Server.

Screen spec trên server chính là nguồn thông tin gốc (source of truth) cho toàn bộ quy trình generate code phía sau.

> **Lưu ý cho bài thực hành này:** Screen spec của các màn hình đã được chuẩn bị sẵn trên MoMorph server rồi, nên các bạn **không cần tạo lại screen spec** nữa mà có thể **bắt tay vào quy trình generate code ngay từ bước `/momorph.constitution`**. Tuy nhiên các bạn vẫn được khuyến khích tự tìm hiểu sâu hơn về quy trình tạo Screen Spec với MoMorph.
> - Vui lòng tham khảo thêm tài liệu [MoMorph Figma Plugin](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F07S87PSVUN) để tìm hiểu chi tiết hơn về khâu viết Screen Spec.
> - Vui lòng tham khảo thêm tài liệu về [MoMorph CLI Commands](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F0A86NC88SK) sau đó trải nghiệm việc tạo screen specs cho một vài màn hình với command `momorph.specs`.

#### Quy trình generate code với MoMorph

Sau khi đã có screen spec trên MoMorph server, sử dụng các slash commands trong AI agent để generate code:

1. **`/momorph.constitution`** — Khởi tạo coding standards và conventions cho project. Đây là command hầu như bạn chỉ cần dùng một lần ở đầu quy trình để thiết lập các quy tắc phát triển mà AI Agent cần tuân thủ xuyên suốt quá trình generate code sau này.
2. **`/momorph.specify`** — Kéo screen spec và thông tin design Figma về local thông qua MoMorph MCP, tiến hành phân tích và sinh ra các file đặc tả chi tiết (`spec.md`, `design-style.md`). Với mỗi một chức năng/màn hình, chúng ta sẽ bắt đầu từ command này để tạo context ban đầu.
3. **`/momorph.reviewspecify`** — Review và refine spec output (nên chạy 2–3 lần để kết quả tốt hơn)
4. **`/momorph.plan`** — Tạo implementation plan chi tiết
5. **`/momorph.reviewplan`** — Review và refine plan output (nên chạy 2–3 lần để kết quả tốt hơn)
6. **`/momorph.tasks`** — Chia nhỏ plan thành danh sách task thực thi
7. **`/momorph.implement`** — Thực thi tasks, sinh code cũng như test

> **Tại sao đã có spec trên MoMorph rồi mà vẫn cần chạy `/momorph.specify`?**
>
> - **Screen spec trên MoMorph server** là bản mô tả chức năng, behavior, business logic do con người viết và lưu trên nền tảng MoMorph Web. Nó đóng vai trò nguồn thông tin gốc (source of truth).
> - **`/momorph.specify`** sẽ đọc screen spec đó từ server, **kết hợp với thông tin design từ Figma (layout, style, component structure...)**, rồi tổng hợp lại thành các file spec chi tiết, lưu cục bộ ngay trong repo (`spec.md`, `design-style.md`). Các file này chính là context trực tiếp mà AI agent sử dụng trong các bước tiếp theo (plan, tasks, implement).
>
> Nói cách khác: spec trên MoMorph server là **screen spec** theo format của Sun\*, được viết ra để hướng đến con người đọc hiểu và review. Còn output của `/momorph.specify` là một bản **implementation spec** được tổng hợp từ nhiều nguồn, là **context đã được xử lý và làm giàu** để AI Agent có thể hiểu và sinh code chính xác.

#### Ví dụ prompt cho từng command

**1. `/momorph.constitution`** — Tạo các quy tắc phát triển cần tuân thủ trong project:

```
/momorph.constitution Viết clean code, tổ chức source code rõ ràng, ngắn gọn. Áp dụng các best practices với Next.js, Cloudflare Workers, Supabase. Ứng dụng cũng cần được đảm bảo responsive hỗ trợ tương thích với nhiều kích thước màn hình khác nhau, bao gồm từ mobile, tablet cho đến desktop. Ngoài ra, cũng lưu ý tuân thủ các tiêu chuẩn bảo mật secure coding practices owasp.
```

**2. `/momorph.specify`** — Tạo local specs + tổng hợp thông tin về figma design:

```
/momorph.specify Tạo specs cho màn hình Login sau:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

**3. `/momorph.reviewspecify`** — Review spec đã sinh:

```
/momorph.reviewspecify Review specs cho màn hình Login sau:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

> Nên chạy lệnh này 2–3 lần để spec được review kỹ hơn.

**4. `/momorph.plan`** — Tạo implementation plan:

```
/momorph.plan Sử dụng Supabase Auth + Next.js + Cloudflare. Hãy tạo kế hoạch phát triển màn hình Login:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

**5. `/momorph.reviewplan`** — Review plan đã sinh:

```
/momorph.reviewplan Hãy review lại plan của màn hình Login:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

> Nên chạy lệnh này 2–3 lần để plan được review kỹ hơn.

**6. `/momorph.tasks`** — Chia plan thành danh sách tasks:

```
/momorph.tasks Hãy phân chia công việc phát triển màn Login:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

**7. `/momorph.implement`** — Thực thi tasks, sinh code:

```
/momorph.implement Tiến hành phát triển màn Login:
https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/662:14387
```

**8. Fix bug sau khi implement hết các tasks:**

Khuyến nghị tiếp tục sử dụng command `/momorph.implement` để fix bug:
```
/momorph.implement Thêm task fix bug sai font chữ ở footer. Hãy review lại một lượt xem font chữ các các item đã đúng theo design chưa.
```

### Bước 9: Chạy development server

```sh
# Khởi động local containers:
make up

# Chạy dev server:
make dev

# Dừng containers:
make down
```

## Setup hạ tầng & dịch vụ bên ngoài

Dưới đây là tổng hợp các bước cấu hình dịch vụ bên ngoài cần thực hiện trước khi chạy project (local hoặc production).

### 1. Google Cloud Console — Tạo OAuth Credentials

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Tạo project mới (hoặc chọn project có sẵn)
3. Vào **APIs & Services → Credentials → Create Credentials → OAuth client ID**
4. Application type: **Web application**
5. **Authorized redirect URIs** — thêm các URL sau:
   - `http://localhost:54321/auth/v1/callback` (Supabase local)
   - `https://<YOUR_SUPABASE_PROJECT>.supabase.co/auth/v1/callback` (Supabase production)
6. Copy **Client ID** và **Client Secret** → điền vào `.env`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

### 2. Supabase — Tạo project & cấu hình

#### 2.1 Tạo project trên Supabase Dashboard

1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Tạo project mới → chọn region gần nhất
3. Vào **Settings → API** → copy các giá trị sau vào `.env`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project_id>.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<anon_public_key>
   SUPABASE_SECRET_KEY=<service_role_secret_key>
   ```

#### 2.2 Khởi tạo database schema

1. Vào **SQL Editor** trên Supabase Dashboard
2. Chạy nội dung file `supabase/schema.sql` để tạo tables, views, functions, RLS policies
3. Chạy nội dung file `supabase/seed.sql` để tạo dữ liệu mẫu (departments, hashtags, award categories...)

#### 2.3 Cấu hình Authentication

1. Vào **Authentication → Providers → Google**
2. Enable Google provider
3. Điền **Client ID** và **Client Secret** từ Google Cloud Console
4. Vào **Authentication → URL Configuration**:
   - **Site URL**: `https://your-domain.com` (production) hoặc `http://localhost:3000` (local)
   - **Redirect URLs** — thêm tất cả:
     - `http://localhost:3000/**`
     - `https://your-domain.com/**`

#### 2.4 Cấu hình Storage

1. Vào **Storage** → tạo bucket tên `kudo-images`
2. Set bucket policy: **Public** (để hiển thị ảnh trong kudos)

### 3. Vercel — Deploy production

#### 3.1 Tạo project

1. Truy cập [Vercel Dashboard](https://vercel.com) → **Add New Project**
2. Import Git Repository → chọn repo `agentic-coding-hands-on`
3. Framework Preset: **Next.js** (tự detect)

#### 3.2 Environment Variables

Vào **Settings → Environment Variables**, thêm các biến sau:

| Variable | Value | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<project_id>.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `<anon_public_key>` | Production |
| `SUPABASE_SECRET_KEY` | `<service_role_secret_key>` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Production |

> **Lưu ý:** Không cần thêm `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` trên Vercel vì Google OAuth được xử lý bởi Supabase server-side.

#### 3.3 Lưu ý khi build

- Project dùng **yarn** (có `yarn.lock`). Nếu tồn tại cả `package-lock.json`, hãy xóa `package-lock.json` để tránh conflict
- Nếu gặp lỗi `@cloudflare/workerd`, kiểm tra `next.config.ts` không import `@opennextjs/cloudflare` (chỉ cần khi deploy Cloudflare Workers, không cần cho Vercel)

### 4. Cloudflare — Custom domain (tuỳ chọn)

Nếu bạn muốn dùng custom domain thay vì `*.vercel.app`:

#### 4.1 Thêm domain trên Vercel

1. Vào project → sidebar **Domains** → nhập subdomain (ví dụ `kudos.yourdomain.com`)
2. Vercel sẽ hiện DNS records cần cấu hình

#### 4.2 Cấu hình DNS trên Cloudflare

1. Vào domain trên [Cloudflare Dashboard](https://dash.cloudflare.com) → **DNS → Records**
2. Thêm **CNAME record**:
   - Name: `kudos` (tên subdomain)
   - Target: giá trị Vercel cung cấp (dạng `xxxxxxxx.vercel-dns-xxx.com`)
   - Proxy status: **DNS only** (tắt proxy cam → icon xám)
3. Nếu Vercel yêu cầu verify ownership, thêm thêm **TXT record**:
   - Name: `_vercel`
   - Content: giá trị `vc-domain-verify=...` mà Vercel cung cấp
4. Quay lại Vercel nhấn **Refresh** để verify

#### 4.3 Cập nhật redirect URLs

Sau khi có custom domain, nhớ cập nhật:
- **Supabase** → Authentication → URL Configuration → thêm `https://your-custom-domain.com/**`
- **Vercel** → Environment Variables → set `NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com`
- **Google Cloud Console** → OAuth Credentials → thêm redirect URI nếu cần
- Redeploy trên Vercel sau khi đổi env

### 5. Tổng hợp Environment Variables

```bash
# === .env (local development) ===

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project_id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<anon_public_key>
SUPABASE_SECRET_KEY=<service_role_secret_key>

# Site URL (dùng cho OAuth redirect)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Event countdown (tuỳ chọn, có fallback)
NEXT_PUBLIC_EVENT_DATE=2025-12-26T19:00:00+07:00

# Supabase local seeds
SUPABASE_EXTRA_SEEDS=./seeds/dev/*.sql
```

### 6. Checklist setup nhanh

- [ ] Tạo Google OAuth Credentials → có Client ID + Secret
- [ ] Tạo Supabase project → có URL + Anon Key + Secret Key
- [ ] Chạy `schema.sql` + `seed.sql` trên Supabase SQL Editor
- [ ] Enable Google Auth trên Supabase + thêm Redirect URLs
- [ ] Tạo Storage bucket `kudo-images` trên Supabase
- [ ] Điền đầy đủ `.env`
- [ ] `yarn install` + `make up` + `make dev` → chạy local OK
- [ ] (Production) Tạo Vercel project + thêm env vars + deploy
- [ ] (Production) Cấu hình custom domain (Cloudflare DNS + Vercel Domains)
- [ ] (Production) Cập nhật Site URL + Redirect URLs trên Supabase

## Tài liệu tham khảo

- [MoMorph CLI Documentation](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F0A86NC88SK)
- [MoMorph MCP Server](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F0A9HULD5D0)
- [MoMorph VSCode Extension](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F094K2LTV71)
- [MoMorph Web](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F092SAQBXR8)
- [MoMorph Figma Plugin](https://sun-asterisk.enterprise.slack.com/docs/T02CQGZA7MK/F07S87PSVUN)
