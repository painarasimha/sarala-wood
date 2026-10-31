import { site } from '@/content/site'

export type EnquiryDraft = {
  interest?: string
  space?: string
  timeline?: string
  name?: string
  phone?: string
  email?: string
  place?: string
  message?: string
}

/**
 * Builds a wa.me deep link with the enquiry pre-filled, so a visitor who would
 * rather message than fill in a form arrives in the workshop's inbox already
 * having said what they want.
 */
export function whatsappLink(draft: EnquiryDraft = {}): string {
  const lines = ['Hello Sarala Wood Industries,', '']

  if (draft.interest) lines.push(`I'd like to enquire about: ${draft.interest}`)
  else lines.push("I'd like to enquire about a commission.")

  if (draft.space) lines.push(`Space: ${draft.space}`)
  if (draft.place) lines.push(`Location: ${draft.place}`)
  if (draft.timeline) lines.push(`Timeline: ${draft.timeline}`)
  if (draft.message) lines.push('', draft.message)

  const signature = [draft.name, draft.phone, draft.email].filter(Boolean).join(' · ')
  if (signature) lines.push('', signature)

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
}
