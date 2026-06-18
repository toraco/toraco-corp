// 会社情報のドメインモデル。データは `src/content/company.ts`。

export type CompanyProfileRow = {
  label: string;
  value: string;
};

export type CompanyValue = {
  title: string;
  description: string;
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
