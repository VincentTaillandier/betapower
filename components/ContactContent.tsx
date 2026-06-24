'use client'

import { useEffect, useRef, useState } from 'react'
import { offresData } from '@/lib/offres'
import PageHero from '@/components/PageHero'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

// Single source of truth — derived from offresData at module load time
const offreOptions = [
  ...offresData.operer.offres,
  ...offresData.former.offres,
  ...offresData.digitaliser.offres,
].map(o => ({ value: o.id, label: o.title }))

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface Fields {
  prenom: string
  nom: string
  entreprise: string
  poste: string
  email: string
  offre: string
  message: string
  honeypot: string
  consentement: boolean
}

const EMPTY: Fields = {
  prenom: '',
  nom: '',
  entreprise: '',
  poste: '',
  email: '',
  offre: '',
  message: '',
  honeypot: '',
  consentement: false,
}

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-betapower-azure focus:border-transparent ' +
  'placeholder:text-gray-400'

export default function ContactContent() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [fields, setFields] = useState<Fields>(EMPTY)

  useEffect(() => {
    let script: HTMLScriptElement | null = null

    const initWidget = () => {
      if (!turnstileRef.current || !window.turnstile) return
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
        callback: (token: string) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
        theme: 'light',
      })
    }

    if (window.turnstile) {
      initWidget()
    } else {
      script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = initWidget
      document.head.appendChild(script)
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current) } catch {}
      }
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFields(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const resetTurnstile = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
    setTurnstileToken('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!fields.consentement) {
      setErrorMsg('Vous devez accepter la politique de confidentialité pour envoyer votre message.')
      return
    }
    if (!turnstileToken) {
      setErrorMsg('Veuillez compléter la vérification anti-spam.')
      return
    }

    setFormState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: fields.prenom,
          nom: fields.nom,
          entreprise: fields.entreprise,
          poste: fields.poste,
          email: fields.email,
          offre: fields.offre,
          message: fields.message,
          honeypot: fields.honeypot,
          turnstileToken,
        }),
      })

      const data: { success?: boolean; error?: string } = await res.json()

      if (res.ok && data.success) {
        setSubmittedEmail(fields.email)
        setFormState('success')
      } else {
        setFormState('error')
        setErrorMsg(data.error ?? 'Une erreur est survenue. Veuillez réessayer.')
        resetTurnstile()
      }
    } catch {
      setFormState('error')
      setErrorMsg('Erreur réseau. Vérifiez votre connexion et réessayez.')
      resetTurnstile()
    }
  }

  if (formState === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100 text-center animate-fade-in-up">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé</h1>
          <p className="text-gray-500 mb-1">Merci pour votre message. Nous vous répondrons sous 48h.</p>
          <p className="text-sm text-gray-400">Un accusé de réception a été envoyé à {submittedEmail}.</p>
        </div>
      </div>
    )
  }

  const isSubmitting = formState === 'submitting'

  return (
    <>
      <PageHero title="Contact" subtitle="Décrivez-nous votre besoin, nous vous répondons sous 48h." />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-5 animate-fade-in-up"
        style={{ animationDelay: '150ms' }}
      >
        {/* Honeypot — hidden from humans, checked server-side */}
        <input
          type="text"
          name="honeypot"
          value={fields.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ display: 'none' }}
        />

        {/* Prénom / Nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              required
              autoComplete="given-name"
              value={fields.prenom}
              onChange={handleChange}
              disabled={isSubmitting}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
              Nom <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              autoComplete="family-name"
              value={fields.nom}
              onChange={handleChange}
              disabled={isSubmitting}
              className={inputClass}
            />
          </div>
        </div>

        {/* Entreprise / Poste */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-1">
              Entreprise <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="entreprise"
              name="entreprise"
              type="text"
              required
              autoComplete="organization"
              value={fields.entreprise}
              onChange={handleChange}
              disabled={isSubmitting}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="poste" className="block text-sm font-medium text-gray-700 mb-1">
              Poste
              <span className="text-gray-400 text-xs font-normal ml-1">(optionnel)</span>
            </label>
            <input
              id="poste"
              name="poste"
              type="text"
              autoComplete="organization-title"
              value={fields.poste}
              onChange={handleChange}
              disabled={isSubmitting}
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email professionnel <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>

        {/* Type d'offre */}
        <div>
          <label htmlFor="offre" className="block text-sm font-medium text-gray-700 mb-1">
            Type d&apos;offre <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="offre"
            name="offre"
            required
            value={fields.offre}
            onChange={handleChange}
            disabled={isSubmitting}
            className={inputClass}
          >
            <option value="">Sélectionnez une offre…</option>
            {offreOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={fields.message}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Décrivez votre besoin, le contexte de votre projet…"
            className={`${inputClass} resize-none`}
          />
          <p className="text-xs text-gray-400 mt-1">
            {fields.message.length}/5000 caractères — minimum 20
          </p>
        </div>

        {/* Turnstile */}
        <div>
          <div ref={turnstileRef} />
        </div>

        {/* Consentement RGPD */}
        <div className="flex items-start gap-3">
          <input
            id="consentement"
            name="consentement"
            type="checkbox"
            required
            checked={fields.consentement}
            onChange={handleChange}
            disabled={isSubmitting}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-betapower-azure cursor-pointer"
          />
          <label htmlFor="consentement" className="text-sm text-gray-600 cursor-pointer">
            J&apos;accepte que BetaPower traite mes données personnelles afin de me recontacter.{' '}
            <a href="/confidentialite" className="text-betapower-azure hover:underline">
              Politique de confidentialité
            </a>
            .{' '}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
        </div>

        {/* Error banner */}
        {errorMsg && (
          <div
            role="alert"
            className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-700"
          >
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary text-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Les champs marqués <span className="text-red-500">*</span> sont obligatoires.
        </p>
      </form>
    </div>
    </>
  )
}
