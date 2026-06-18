'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CONTACT_TYPES } from '@/domains/contact';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type ContactResponse = {
  ok: boolean;
  fieldErrors?: Record<string, string>;
};

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const { resolvedTheme } = useTheme();
  const [status, setStatus] = useState<Status>('idle');
  const [token, setToken] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setErrorMessage('');

    if (!token) {
      setErrorMessage('認証を完了してください。');
      return;
    }

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get('name') ?? ''),
      company: String(form.get('company') ?? ''),
      email: String(form.get('email') ?? ''),
      tel: String(form.get('tel') ?? ''),
      type: String(form.get('type') ?? ''),
      message: String(form.get('message') ?? ''),
      turnstileToken: token,
    };

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as ContactResponse;
      if (response.ok && data.ok) {
        setStatus('success');
        return;
      }
      if (data.fieldErrors) setFieldErrors(data.fieldErrors);
      setErrorMessage('送信に失敗しました。入力内容をご確認ください。');
      setStatus('error');
    } catch {
      setErrorMessage(
        '送信中にエラーが発生しました。時間をおいて再度お試しください。'
      );
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-xl border border-success/30 bg-success/10 p-6"
      >
        <p className="font-semibold">お問い合わせありがとうございます。</p>
        <p className="mt-1 text-sm text-muted-foreground">
          担当者より追ってご連絡いたします。確認メールもお送りしました。
        </p>
      </div>
    );
  }

  const selectClass = cn(
    'flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs outline-none transition-colors',
    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <Field id="name" label="お名前" required error={fieldErrors.name}>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
        />
      </Field>

      <Field id="company" label="会社名">
        <Input id="company" name="company" autoComplete="organization" />
      </Field>

      <Field id="email" label="メールアドレス" required error={fieldErrors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
        />
      </Field>

      <Field id="tel" label="電話番号">
        <Input id="tel" name="tel" type="tel" autoComplete="tel" />
      </Field>

      <Field
        id="type"
        label="お問い合わせ種別"
        required
        error={fieldErrors.type}
      >
        <select
          id="type"
          name="type"
          required
          defaultValue=""
          className={selectClass}
          aria-invalid={Boolean(fieldErrors.type)}
        >
          <option value="" disabled>
            選択してください
          </option>
          {CONTACT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label="お問い合わせ内容"
        required
        error={fieldErrors.message}
      >
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(fieldErrors.message)}
        />
      </Field>

      <Turnstile
        siteKey={turnstileSiteKey}
        onSuccess={setToken}
        onExpire={() => setToken('')}
        onError={() => setToken('')}
        options={{ theme: resolvedTheme === 'dark' ? 'dark' : 'light' }}
      />

      {errorMessage && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'} className="w-fit">
        {status === 'submitting' ? '送信中…' : '送信する'}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
