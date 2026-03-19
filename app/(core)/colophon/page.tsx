import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Colophon - Meagan Waller',
  description: 'Learn more about the tools, technologies, and processes behind Meagan Waller\'s website.',
  openGraph: {
    title: 'Colophon - Meagan Waller',
    description: 'Learn more about Meagan Waller, a software engineer with a passion for building impactful products and sharing knowledge.',
    url: 'https://meaganwaller.com/colophon',
    siteName: 'Meagan Waller',
    images: [
      {
        url: 'https://meaganwaller.com/images/colophon-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Photo of Meagan Waller',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function ColophonPage() {
  return (
    <article
      id="page-content"
      className="prose xl:prose-2xl lg:prose-xl md:prose-lg mx-auto"
    >
      <div>
        <h1>site colophon</h1>
      </div>
    </article>
  )
}
