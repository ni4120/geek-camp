## AI大喜利 アプリ

開発サーバーを起動する

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いて結果を確認してください。

`app/page.tsx`を編集することでページの内容を変更できます。ファイルを編集するとページは自動的に更新されます（ホットリロード）。

## supabase設定
1. [supabase](https://supabase.com/)にアクセス  
2. `New project`で新規プロジェクトを作成。
3. `Project Name`、`Database Password`、`Region`を設定し、Create new projectを押す。
4. プロジェクトが作成されたら、右上にある緑色のconnectボタンをクリック。
5. ORMsを選択し、`.env`ファイルに`DATABASE_URL`と`DIRECT_URL`をコピー。
6. `[YOUR-PASSWORD]`の部分を先ほど決めた`Database Password`を入力。
prisma migrateを用いて、マイグレーションファイル（initファイル）を適用する。
```bash
npx prisma migrate deploy
```

## Prisma ORM の使い方
参考：[【入門】Prismaを始めるときに押さえておきたいポイントまとめ
](https://zenn.dev/shintaro/articles/e649722e41af4f)

### Prisma Schema
例：[公式 Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema/overview)
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### Prisma Client
Prisma Clientは、Prisma Schemaから自動生成されるTypeScriptライブラリであり、これを使用してアプリケーションからデータベースにアクセスできます。  
``` typescript
import { db } from "@/db"

// ユーザーを作成
const user = await db.user.create({
  data: {
    name: 'kaimu',
  },
})
```
### Prisma Migrate
データベースのスキーマ変更履歴を管理するツールです。
```bash
# マイグレーションファイルを生成
npx prisma migrate dev --name add_user_role

# マイグレーションを適用
npx prisma migrate deploy
```

### Prisma Studio
データベースの内容を視覚的に確認・編集できるGUIツールです。
```bash
npx prisma studio
```

## Vercelでのデプロイ（仮）

Next.jsアプリをデプロイする一番簡単な方法は[Vercel プラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用すること。

詳細は[Next.jsのデプロイに関するドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)
