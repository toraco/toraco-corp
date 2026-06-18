// News の Markdown（src/content/news/*.md）をビルド時に JSON へ変換する。
//
// 目的: Cloudflare Workers ランタイムには src の .md ファイルが存在せず、
// `fs` での実行時読み込みは失敗する（500）。ビルド時に JSON 化して
// バンドルへインライン化することで、実行時 fs 依存を排除する。
//
// 出力: src/content/news.generated.json（src/content/news.ts が import する）

import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

const NEWS_DIR = path.join(process.cwd(), 'src/content/news');
const OUT_FILE = path.join(process.cwd(), 'src/content/news.generated.json');

const news = fs
  .readdirSync(NEWS_DIR)
  .filter((file) => file.endsWith('.md'))
  .sort() // 決定的な出力にしてビルド差分を安定させる
  .map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(NEWS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug,
      title: String(data.title),
      category: data.category,
      // YAML が日付を Date 化しても文字列へ正規化する。
      publishedAt: String(data.publishedAt),
      body: content.trim(),
    };
  });

fs.writeFileSync(OUT_FILE, `${JSON.stringify(news, null, 2)}\n`);
console.log(`generate-news-data: ${news.length} 件を ${OUT_FILE} へ出力`);
