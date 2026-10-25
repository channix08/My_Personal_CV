import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react'
import { ArrowRight, ArrowUpRight, Certificate, FolderOpen, X } from '@/components/slab'
import { certifications } from '@/data/certifications'

export default function CertificatesFolder() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const openGallery = () => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.classList.remove('is-closing')
    dialog.showModal()
  }

  const closeGallery = () => {
    const dialog = dialogRef.current
    if (!dialog?.open || dialog.classList.contains('is-closing')) return
    dialog.classList.add('is-closing')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    closeTimer.current = window.setTimeout(() => {
      dialog.close()
      dialog.classList.remove('is-closing')
    }, reduceMotion ? 0 : 200)
  }

  const closeFromBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeGallery()
  }

  return (
    <section className="cv-card cv-card--certificates" aria-labelledby="certifications-title">
      <div className="cv-card__heading">
        <span className="cv-card__icon"><Certificate size={23} weight="duotone" aria-hidden="true" /></span>
        <div>
          <span className="pgrid__eyebrow">Credentials</span>
          <h2 id="certifications-title">Certifications</h2>
        </div>
      </div>

      {certifications.length === 0 ? (
        <p className="cv-card__empty">Certificates will be added here.</p>
      ) : (
        <>
          <button
            ref={triggerRef}
            className="cv-folder"
            type="button"
            onClick={openGallery}
            aria-haspopup="dialog"
            aria-controls="certificates-dialog"
          >
            <span className="cv-folder__mark" aria-hidden="true">
              <span className="cv-folder__sheet cv-folder__sheet--back" />
              <span className="cv-folder__sheet cv-folder__sheet--front" />
              <FolderOpen size={34} weight="duotone" />
            </span>
            <span className="cv-folder__text">
              <strong>Certificate folder</strong>
              <span>{certifications.length} {certifications.length === 1 ? 'certificate' : 'certificates'} · Click to view all</span>
            </span>
            <ArrowRight className="cv-folder__arrow" size={19} weight="bold" aria-hidden="true" />
          </button>

          <dialog
            ref={dialogRef}
            id="certificates-dialog"
            className="cv-cert-dialog"
            aria-labelledby="certificates-dialog-title"
            onClick={closeFromBackdrop}
            onCancel={(event) => { event.preventDefault(); closeGallery() }}
            onClose={() => triggerRef.current?.focus()}
          >
            <div className="cv-cert-dialog__head">
              <div>
                <span className="pgrid__eyebrow">My credentials · {certifications.length} total</span>
                <h2 id="certificates-dialog-title">Certificates</h2>
                <p>Course completions and training certificates.</p>
              </div>
              <button type="button" className="cv-cert-dialog__close" onClick={closeGallery} aria-label="Close certificates">
                <X size={21} weight="bold" aria-hidden="true" />
              </button>
            </div>
            <div className="cv-cert-dialog__scroll">
              <ul className="cv-certifications" role="list">
                {certifications.map((certificate, index) => (
                  <li key={`${certificate.title}-${certificate.issuer ?? ''}`} style={{ '--item-index': index } as CSSProperties}>
                    {certificate.previewUrl && (
                      <a className="cv-certifications__preview-link" href={certificate.fileUrl ?? certificate.previewUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${certificate.title} certificate`}>
                        <img className="cv-certifications__preview" src={certificate.previewUrl} alt={`${certificate.title} certificate`} loading="lazy" decoding="async" />
                      </a>
                    )}
                    <strong>{certificate.title}</strong>
                    {(certificate.issuer || certificate.date) && <span>{[certificate.issuer, certificate.date].filter(Boolean).join(' · ')}</span>}
                    <div className="cv-certifications__links">
                      {certificate.fileUrl && <a href={certificate.fileUrl} target="_blank" rel="noopener noreferrer">View certificate <ArrowUpRight size={15} aria-hidden="true" /></a>}
                      {certificate.verificationUrl && <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">Verify <ArrowUpRight size={15} aria-hidden="true" /></a>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </dialog>
        </>
      )}
    </section>
  )
}
