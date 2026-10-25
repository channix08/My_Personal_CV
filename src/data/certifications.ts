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
    fileUrl: '/certificates/bsit-413-ai-capstone-training.png',
    previewUrl: '/certificates/bsit-413-ai-capstone-training.png',
  },
  {
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Davao del Norte State College · Cisco Networking Academy',
    date: 'December 3, 2025',
    fileUrl: '/certificates/ccna-switching-routing-wireless-essentials.png',
    previewUrl: '/certificates/ccna-switching-routing-wireless-essentials.png',
  },
]
