'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { site } from '@/content/site'

const Enquiry = z.object({
  interest: z.string().min(1, 'Tell us what you are after').max(120),
  space: z.string().min(1, 'Tell us where it is going').max(120),
  timeline: z.string().min(1, 'Tell us when you need it').max(120),
  name: z.string().min(2, 'Please give us your name').max(120),
  phone: z
    .string()
    .min(7, 'Please give us a number we can reach you on')
    .max(30)
    .regex(/^[\d+\-() ]+$/, 'Please use digits, spaces and + ( ) - only'),
  email: z.string().email('That email address does not look right').max(160).or(z.literal('')),
  place: z.string().max(160).optional().default(''),
  message: z.string().max(2000).optional().default(''),
  /** Honeypot: a real person never fills this in. */
  website: z.string().max(0).optional().default(''),
})

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  /** Field-level problems, keyed by field name. */
  errors?: Record<string, string>
}

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const parsed = Enquiry.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0])
      errors[key] ??= issue.message
    }
    return { status: 'error', message: 'Please check the highlighted fields.', errors }
  }

  const data = parsed.data

  // Silently accept anything that trips the honeypot — a bot gets no feedback.
  if (data.website) return { status: 'success' }

  const apiKey = process.env.RESEND_API_KEY
  const to = (process.env.ENQUIRY_TO_EMAIL ?? site.emails.join(','))
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
  const from = process.env.ENQUIRY_FROM_EMAIL

  if (!apiKey || !from || to.length === 0) {
    // Without mail configured the form must still tell the truth rather than
    // pretending the enquiry was delivered.
    console.warn('[enquiry] RESEND_API_KEY / ENQUIRY_FROM_EMAIL not set — nothing was sent')
    return {
      status: 'error',
      message:
        'Email is not configured on this deployment yet. Please call or message us on WhatsApp in the meantime.',
    }
  }

  const rows: [string, string][] = [
    ['Looking for', data.interest],
    ['Space', data.space],
    ['Timeline', data.timeline],
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email || '—'],
    ['Location', data.place || '—'],
  ]

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `Commission enquiry — ${data.interest} (${data.name})`,
      text: [
        ...rows.map(([label, value]) => `${label}: ${value}`),
        '',
        data.message || '(no message)',
      ].join('\n'),
      html: `
        <div style="font-family:Georgia,serif;color:#2a1d15;max-width:620px">
          <p style="font:600 11px/1 system-ui;letter-spacing:.24em;text-transform:uppercase;color:#b9814a">
            New commission enquiry
          </p>
          <h1 style="font-size:26px;font-weight:400;margin:10px 0 24px">${escapeHtml(data.interest)}</h1>
          <table style="border-collapse:collapse;width:100%">
            ${rows
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #efe3cf;font:600 10px/1.4 system-ui;letter-spacing:.2em;text-transform:uppercase;color:#6d5745;width:140px;vertical-align:top">${label}</td>
                <td style="padding:8px 0;border-bottom:1px solid #efe3cf;font-size:16px">${escapeHtml(value)}</td>
              </tr>`
              )
              .join('')}
          </table>
          ${
            data.message
              ? `<p style="margin-top:24px;font-size:16px;line-height:1.7;white-space:pre-wrap">${escapeHtml(
                  data.message
                )}</p>`
              : ''
          }
        </div>
      `,
    })

    if (error) {
      console.error('[enquiry] Resend rejected the message', error)
      return {
        status: 'error',
        message: 'We could not send that just now. Please call or message us on WhatsApp.',
      }
    }

    return { status: 'success' }
  } catch (error) {
    console.error('[enquiry] failed to send', error)
    return {
      status: 'error',
      message: 'Something went wrong on our side. Please call or message us on WhatsApp.',
    }
  }
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
