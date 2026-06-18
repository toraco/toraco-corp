/**
 * Markdown 文字列から記法を取り除き、メタディスクリプション等に使える
 * プレーンテキストへ変換する（厳密な parse ではなく軽量な正規表現ベース）。
 */
export const toPlainText = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, '') // コードフェンス
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // 画像
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // リンク → テキスト
    .replace(/^\s{0,3}#{1,6}\s+/gm, '') // 見出し
    .replace(/^\s{0,3}[-*+]\s+/gm, '') // 箇条書き
    .replace(/^\s{0,3}\d+\.\s+/gm, '') // 番号付きリスト
    .replace(/^\s{0,3}>\s?/gm, '') // 引用
    .replace(/[*_`~]/g, '') // 強調・コード・打消し
    .replace(/\s+/g, ' ')
    .trim();
