'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { submitEnquiry, type EnquiryState } from '@/app/actions/enquiry'
import { whatsappLink } from '@/lib/whatsapp'
import { EASE } from '@/lib/motion'
import { Padma } from '@/components/ornament/Ornaments'

const INTERESTS = [
  'Doors & Windows',
  'Wardrobes',
  'Home & Office Furniture',
  'Modular Kitchens',
  'Temple or pooja work',
  'Something else',
]

const SPACES = ['A home', 'An office or commercial space', 'A place of worship', 'A hotel or restaurant']

const TIMELINES = ['As soon as possible', 'Within three months', 'Three to six months', 'Just planning for now']

const STEPS = [
  { id: 'what', title: 'What are you after?', eyebrow: 'Step one' },
  { id: 'where', title: 'Where is it going?', eyebrow: 'Step two' },
  { id: 'when', title: 'When do you need it?', eyebrow: 'Step three' },
  { id: 'who', title: 'How do we reach you?', eyebrow: 'Step four' },
] as const

const initial: EnquiryState = { status: 'idle' }

export function EnquiryForm() {
  const params = useSearchParams()
  const [state, action] = useActionState(submitEnquiry, initial)
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState({
    interest: '',
    space: '',
    timeline: '',
    name: '',
    phone: '',
    email: '',
    place: '',
    message: '',
  })

  // A collection page can hand us the line the visitor was looking at.
  useEffect(() => {
    const interest = params.get('interest')
    if (!interest) return
    setDraft((d) => (d.interest ? d : { ...d, interest }))
    setStep((s) => (s === 0 ? 1 : s))
  }, [params])

  // A server-side validation failure belongs on the last step, where the
  // contact fields are.
  useEffect(() => {
    if (state.status === 'error' && state.errors) setStep(3)
  }, [state])

  const set = (key: keyof typeof draft) => (value: string) =>
    setDraft((d) => ({ ...d, [key]: value }))

  const canAdvance =
    (step === 0 && draft.interest) ||
    (step === 1 && draft.space) ||
    (step === 2 && draft.timeline) ||
    step === 3

  if (state.status === 'success') {
    return (
      <div className="border border-ink/14 bg-mat p-9 text-center sm:p-12">
        <Padma className="mx-auto h-14 w-14 text-bronze" />
        <h2 className="mt-7 font-serif text-d3 text-ink">Thank you — it has reached us.</h2>
        <p className="mx-auto mt-4 max-w-prose text-small font-light text-ink-2">
          We read every enquiry ourselves and will come back to you on the number you gave us. If it
          is urgent, WhatsApp is the fastest way to reach the workshop.
        </p>
        <a
          href={whatsappLink(draft)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-8 inline-flex"
        >
          Continue on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form
      action={action}
      className="border border-ink/14 bg-mat/[0.04] p-7 backdrop-blur-[2px] sm:p-10"
    >
      {/* Every field travels with the form, whichever step is on screen. */}
      {Object.entries(draft).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        onChange={() => {}}
        value=""
      />

      {/* ---------- Progress ---------- */}
      <ol className="mb-9 flex gap-2" aria-label="Enquiry progress">
        {STEPS.map((s, i) => (
          <li key={s.id} className="flex-1">
            <span className="sr-only">
              {s.title}
              {i === step ? ' (current)' : ''}
            </span>
            <span
              aria-hidden="true"
              className={`block h-px transition-colors duration-800 ease-carve ${
                i <= step ? 'bg-bronze' : 'bg-bronze/20'
              }`}
            />
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={STEPS[step].id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="font-caps text-label uppercase text-bronze">
            {STEPS[step].eyebrow} of four
          </p>
          <h2 className="mt-3 font-serif text-d4 text-ink">{STEPS[step].title}</h2>

          <div className="mt-7">
            {step === 0 && (
              <ChoiceGroup
                legend="What are you after?"
                options={INTERESTS}
                value={draft.interest}
                onChange={set('interest')}
              />
            )}

            {step === 1 && (
              <>
                <ChoiceGroup
                  legend="Where is it going?"
                  options={SPACES}
                  value={draft.space}
                  onChange={set('space')}
                />
                <label className="mt-7 block">
                  <span className="field-label">Town or city (optional)</span>
                  <input
                    className="field-input"
                    value={draft.place}
                    onChange={(e) => set('place')(e.target.value)}
                    placeholder="Udupi, Mangalore, Bengaluru…"
                  />
                </label>
              </>
            )}

            {step === 2 && (
              <>
                <ChoiceGroup
                  legend="When do you need it?"
                  options={TIMELINES}
                  value={draft.timeline}
                  onChange={set('timeline')}
                />
                <label className="mt-7 block">
                  <span className="field-label">Anything else we should know (optional)</span>
                  <textarea
                    className="field-input min-h-[90px] resize-y"
                    value={draft.message}
                    onChange={(e) => set('message')(e.target.value)}
                    placeholder="Sizes, a drawing you can send, the motif you have in mind…"
                  />
                </label>
              </>
            )}

            {step === 3 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Your name"
                  value={draft.name}
                  onChange={set('name')}
                  error={state.errors?.name}
                  autoComplete="name"
                  required
                />
                <Field
                  label="Phone"
                  value={draft.phone}
                  onChange={set('phone')}
                  error={state.errors?.phone}
                  autoComplete="tel"
                  type="tel"
                  required
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Email (optional)"
                    value={draft.email}
                    onChange={set('email')}
                    error={state.errors?.email}
                    autoComplete="email"
                    type="email"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {state.status === 'error' && state.message && (
        <p role="alert" className="mt-7 border-l-2 border-bronze pl-4 text-small text-ink-2">
          {state.message}
        </p>
      )}

      {/* ---------- Controls ---------- */}
      <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-ink/8 pt-7">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="font-caps text-label uppercase text-bronze"
          >
            Back
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance}
            className="btn btn-fill ml-auto disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <div className="ml-auto flex flex-wrap items-center gap-4">
            <a
              href={whatsappLink(draft)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-caps text-label uppercase text-bronze"
            >
              Send on WhatsApp instead
            </a>
            <SubmitButton />
          </div>
        )}
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn btn-fill" disabled={pending}>
      {pending ? 'Sending…' : 'Send enquiry'}
    </button>
  )
}

function ChoiceGroup({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: readonly string[]
  value: string
  onChange: (next: string) => void
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const active = value === option
          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 font-caps text-small transition-colors duration-500 ease-carve ${
                active
                  ? 'border-bronze bg-bronze/10 text-ink'
                  : 'border-ink/14 text-ink-2 hover:border-bronze/50'
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                checked={active}
                onChange={() => onChange(option)}
                name={`choice-${legend}`}
              />
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rotate-45 border transition-colors duration-500 ease-carve ${
                  active ? 'border-bronze bg-bronze' : 'border-ink/25'
                }`}
              />
              {option}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function Field({
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  required,
}: {
  label: string
  value: string
  onChange: (next: string) => void
  error?: string
  type?: string
  autoComplete?: string
  required?: boolean
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`
  return (
    <label htmlFor={id} className="block">
      <span className="field-label">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`field-input ${error ? 'border-b-brass' : ''}`}
      />
      {error && (
        <span id={`${id}-error`} className="mt-2 block text-[0.78rem] text-bronze">
          {error}
        </span>
      )}
    </label>
  )
}
