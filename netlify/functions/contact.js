/**
 * Netlify Function: contact
 * Endpoint: POST /.netlify/functions/contact
 *
 * Environment variables (set in Netlify dashboard → Site settings → Environment variables):
 *   RESEND_API_KEY          Resend API key       https://resend.com/api-keys
 *   TURNSTILE_SECRET_KEY    Cloudflare secret    https://dash.cloudflare.com → Turnstile
 *   CONTACT_TO_EMAIL        Recipient address    (e.g. vtaillandier@outlook.fr)
 *   CONTACT_FROM_EMAIL      Verified sender      (e.g. contact@betapower.fr)
 *
 * Local dev (.env.local):
 *   TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA  (Cloudflare test key, always passes)
 */

'use strict'

const ALLOWED_OFFRE_IDS = new Set([
  'etudes-reseau',
  'conseil-operationnel',
  'audit-exploitation',
  'formation-operateurs',
  'codes-reseau-conformite',
  'projets-internationaux-due-diligence',
  'ots-ingenierie-scenarios',
  'donnees-cgmes-automatisation',
])

function sanitizeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

async function verifyTurnstile(token, ip) {
  const params = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY || '',
    response: token,
  })
  if (ip) params.set('remoteip', ip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  const data = await res.json()
  return data.success === true
}

async function sendEmail({ from, to, replyTo, subject, html, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY || ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, reply_to: replyTo, subject, html, text }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend API error ${res.status}: ${body}`)
  }
  return res.json()
}

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  // Parse body
  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Corps de requête invalide.' }) }
  }

  const { prenom, nom, entreprise, poste, email, offre, message, turnstileToken, honeypot } = body

  // Honeypot: silent accept to avoid fingerprinting
  if (honeypot) {
    console.log('[contact] Honeypot triggered')
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
  }

  // Server-side validation
  const errors = []
  if (!prenom || String(prenom).trim().length < 2) errors.push('Prénom requis (min 2 caractères).')
  if (!nom || String(nom).trim().length < 2) errors.push('Nom requis (min 2 caractères).')
  if (!entreprise || String(entreprise).trim().length < 2) errors.push('Entreprise requise.')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) errors.push('Email invalide.')
  if (!offre || !ALLOWED_OFFRE_IDS.has(String(offre).trim())) errors.push("Type d'offre invalide.")
  if (!message || String(message).trim().length < 20) errors.push('Message requis (min 20 caractères).')
  if (message && String(message).trim().length > 5000) errors.push('Message trop long (max 5000 caractères).')
  if (!turnstileToken) errors.push('Vérification anti-spam manquante.')

  if (errors.length > 0) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: errors.join(' ') }),
    }
  }

  // Turnstile verification
  const ip =
    (event.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    event.headers['client-ip'] ||
    undefined
  const turnstileOk = await verifyTurnstile(String(turnstileToken), ip)
  if (!turnstileOk) {
    console.log('[contact] Turnstile verification failed')
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Vérification anti-spam échouée. Rechargez la page et réessayez.' }),
    }
  }

  // Sanitize for HTML email body
  const sf = {
    prenom: sanitizeHtml(String(prenom).trim()),
    nom: sanitizeHtml(String(nom).trim()),
    entreprise: sanitizeHtml(String(entreprise).trim()),
    poste: sanitizeHtml(String(poste || '').trim()),
    email: sanitizeHtml(String(email).trim()),
    offre: sanitizeHtml(String(offre).trim()),
    message: sanitizeHtml(String(message).trim()),
  }

  const fromAddr = process.env.CONTACT_FROM_EMAIL || 'contact@betapower.fr'
  const toAddr = process.env.CONTACT_TO_EMAIL || 'vtaillandier@outlook.fr'
  const rawEmail = String(email).trim()
  const rawPrenom = String(prenom).trim()

  const subject = `[BetaPower] ${sf.entreprise} — ${sf.offre}`

  const htmlNotif = `<!DOCTYPE html>
<html lang="fr"><body style="font-family:Arial,sans-serif;color:#374151;max-width:600px;margin:0 auto;padding:24px">
<h2 style="color:#1c2d4b;margin-bottom:24px">Nouveau message de contact — BetaPower</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <tr><td style="padding:6px 0;font-weight:600;width:160px;color:#6B7280">Prénom</td><td style="padding:6px 0">${sf.prenom}</td></tr>
  <tr><td style="padding:6px 0;font-weight:600;color:#6B7280">Nom</td><td style="padding:6px 0">${sf.nom}</td></tr>
  <tr><td style="padding:6px 0;font-weight:600;color:#6B7280">Entreprise</td><td style="padding:6px 0">${sf.entreprise}</td></tr>
  ${sf.poste ? `<tr><td style="padding:6px 0;font-weight:600;color:#6B7280">Poste</td><td style="padding:6px 0">${sf.poste}</td></tr>` : ''}
  <tr><td style="padding:6px 0;font-weight:600;color:#6B7280">Email</td><td style="padding:6px 0"><a href="mailto:${sf.email}" style="color:#407489">${sf.email}</a></td></tr>
  <tr><td style="padding:6px 0;font-weight:600;color:#6B7280">Offre ciblée</td><td style="padding:6px 0">${sf.offre}</td></tr>
</table>
<h3 style="color:#1c2d4b;margin-top:28px;margin-bottom:12px">Message</h3>
<div style="background:#F9FAFB;padding:16px;border-left:4px solid #407489;white-space:pre-wrap;font-size:14px;line-height:1.6">${sf.message}</div>
<hr style="border:none;border-top:1px solid #E5E7EB;margin-top:32px">
<p style="color:#9CA3AF;font-size:12px">Envoyé depuis le formulaire de contact de betapower.fr</p>
</body></html>`

  const textNotif = [
    'Nouveau message de contact — BetaPower',
    '',
    `Prénom     : ${rawPrenom}`,
    `Nom        : ${String(nom).trim()}`,
    `Entreprise : ${String(entreprise).trim()}`,
    poste ? `Poste      : ${String(poste).trim()}` : '',
    `Email      : ${rawEmail}`,
    `Offre      : ${String(offre).trim()}`,
    '',
    'Message :',
    String(message).trim(),
  ].filter(Boolean).join('\n')

  const htmlAck = `<!DOCTYPE html>
<html lang="fr"><body style="font-family:Arial,sans-serif;color:#374151;max-width:600px;margin:0 auto;padding:24px">
<p>Bonjour ${sf.prenom},</p>
<p>Merci pour votre message. Je l'ai bien reçu et vous répondrai dans les 48 heures.</p>
<p style="margin-top:32px">Bien cordialement,<br><strong>Vincent Taillandier</strong><br>BetaPower</p>
<hr style="border:none;border-top:1px solid #E5E7EB;margin-top:32px">
<p style="color:#9CA3AF;font-size:12px"><a href="https://www.betapower.fr" style="color:#9CA3AF">betapower.fr</a> · contact@betapower.fr</p>
</body></html>`

  const textAck = `Bonjour ${rawPrenom},\n\nMerci pour votre message. Je l'ai bien reçu et vous répondrai dans les 48 heures.\n\nBien cordialement,\nVincent Taillandier\nBetaPower\n\nbetapower.fr · contact@betapower.fr`

  try {
    // Main notification to BetaPower
    await sendEmail({
      from: fromAddr,
      to: [toAddr],
      replyTo: rawEmail,
      subject,
      html: htmlNotif,
      text: textNotif,
    })

    // Acknowledgment to the prospect (non-blocking failure)
    try {
      await sendEmail({
        from: fromAddr,
        to: [rawEmail],
        subject: 'Votre message a bien été reçu — BetaPower',
        html: htmlAck,
        text: textAck,
      })
    } catch (ackErr) {
      console.error('[contact] Acknowledgment email failed (non-fatal):', ackErr)
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
  } catch (err) {
    console.error('[contact] Send error:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement à contact@betapower.fr." }),
    }
  }
}
