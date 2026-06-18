// 会社情報のドメインモデル。データは `src/content/company.ts`。

export type CompanyProfileRow = {
  label: string;
  value: string;
};

export type CompanyValue = {
  title: string;
  description: string;
};

export type RepresentativePhoto = {
  /** 画像パス（public 配下） */
  src: string;
  /** 代替テキスト */
  alt: string;
  /** 元画像の幅（px） */
  width: number;
  /** 元画像の高さ（px） */
  height: number;
};

export type Representative = {
  /** 氏名（漢字） */
  name: string;
  /** ふりがな */
  nameKana: string;
  /** ローマ字表記 */
  nameEn: string;
  /** 役職 */
  title: string;
  /** プロフィール本文（段落の配列） */
  bio: string[];
  /** プロフィール写真（任意） */
  photo?: RepresentativePhoto;
};

export type Company = {
  name: string;
  nameEn: string;
  /** ミッション */
  mission: string;
  /** 価値観 */
  values: CompanyValue[];
  /** 会社概要表 */
  profile: CompanyProfileRow[];
  /** 代表者 */
  representative: Representative;
};
