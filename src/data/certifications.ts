import { assetUrl } from '@/lib/assetUrl'

export type Certification = {
  title: string
  issuer?: string
  date?: string
  fileUrl?: string
  previewUrl?: string
  verificationUrl?: string
}

// Add certificate files to public/certificates/ and entries here when ready.
export const certifications: Certification[] = [
  {
    title: 'BSIT 413 Series Training: Artificial Intelligence for Innovation of Capstone Project',
    issuer: 'Davao del Norte State College · Institute of Computing',
    date: 'September 29, 2026',
    fileUrl: assetUrl('/certificates/bsit-413-ai-capstone-training.png'),
    previewUrl: assetUrl('/certificates/bsit-413-ai-capstone-training.png'),
  },
  {
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Davao del Norte State College · Cisco Networking Academy',
    date: 'December 3, 2025',
    fileUrl: assetUrl('/certificates/ccna-switching-routing-wireless-essentials.png'),
    previewUrl: assetUrl('/certificates/ccna-switching-routing-wireless-essentials.png'),
  },
]
