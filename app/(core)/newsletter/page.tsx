import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter - Meagan Waller',
  description: 'Learn more about Meagan Waller, a software engineer with a passion for building impactful products and sharing knowledge.',
  openGraph: {
    title: 'Newsletter - Meagan Waller',
    description: 'Learn more about Meagan Waller, a software engineer with a passion for building impactful products and sharing knowledge.',
    url: 'https://meaganwaller.com/newsletter',
    siteName: 'Meagan Waller',
    images: [
      {
        url: 'https://meaganwaller.com/images/newsletter-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Photo of Meagan Waller',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function NewsletterPage() {
  return (
    <article
      id="page-content"
      className="prose xl:prose-2xl lg:prose-xl md:prose-lg mx-auto"
    >
      <div>
        <h1>newsletter</h1>
      </div>
    </article>
  )
}
