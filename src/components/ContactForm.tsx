'use client';

import { useState, type FormEvent } from 'react';
import { mailto, site } from '@/lib/site';
import styles from './Contact.module.css';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * No backend: the form validates, then opens the visitor's email app with the message filled in.
 * If no mail app is set up, the visitor can copy the address instead.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const kind = String(data.get('kind') ?? '');
    const message = String(data.get('message') ?? '').trim();

    const next: Errors = {};
    if (name.length < 2) next.name = 'Enter your name.';
    if (!emailRe.test(email)) next.email = 'Enter an email address we can reply to, like name@company.com.';
    if (message.length < 20) next.message = 'Write at least a couple of sentences about what you want to build.';
    setErrors(next);
    setOpened(false);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    const body = `${message}\n\n${name}\n${email}${kind ? `\nProject type: ${kind}` : ''}`;
    window.location.href = mailto(`Project enquiry from ${name}`, body);
    setOpened(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard can be blocked; the address is visible on the page */
    }
  };

  const err = (k: keyof Errors) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-error` } : {});

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" autoComplete="name" required {...err('name')} />
        {errors.name ? (
          <p id="name-error" className={styles.error}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Your email</label>
        <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required {...err('email')} />
        {errors.email ? (
          <p id="email-error" className={styles.error}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="kind">What do you need?</label>
        <select id="kind" name="kind" defaultValue="">
          <option value="">Not sure yet</option>
          <option>Website</option>
          <option>Mobile app</option>
          <option>Backend or API</option>
          <option>Website and mobile app</option>
          <option>Something else</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Tell us about it</label>
        <textarea id="message" name="message" rows={6} required {...err('message')} />
        {errors.message ? (
          <p id="message-error" className={styles.error}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Open email to send
        </button>
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? 'Address copied' : 'Copy our email address'}
        </button>
      </div>

      <p className={styles.hint} role="status">
        {opened
          ? 'Your email app should have opened with the message ready to send. If nothing opened, copy our address and write to us from your own mail.'
          : 'This opens your email app with the message filled in. Nothing is sent until you press send there.'}
      </p>
    </form>
  );
}
