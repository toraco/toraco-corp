import { z } from 'zod';

import { CONTACT_TYPES } from '@/domains/contact';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'お名前を入力してください'),
  company: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .min(1, 'メールアドレスを入力してください')
    .refine((value) => emailPattern.test(value), {
      message: 'メールアドレスの形式が正しくありません',
    }),
  tel: z.string().trim().optional(),
  type: z.enum(CONTACT_TYPES),
  message: z.string().trim().min(1, 'お問い合わせ内容を入力してください'),
  turnstileToken: z.string().min(1, '認証が完了していません'),
});

export type ContactSchema = z.infer<typeof contactSchema>;
