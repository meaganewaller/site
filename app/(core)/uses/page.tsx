import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uses - Meagan Waller',
  description: 'Discover the tools and technologies that Meagan Waller uses in her software development workflow, including her favorite programming languages, frameworks, and hardware.',
  openGraph: {
    title: 'Uses - Meagan Waller',
    description: 'Discover the tools and technologies that Meagan Waller uses in her software development workflow, including her favorite programming languages, frameworks, and hardware.',
    url: 'https://meaganwaller.com/uses',
    siteName: 'Meagan Waller',
    images: [
      {
        url: 'https://meaganwaller.com/images/uses-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Photo of Meagan Waller',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function UsesPage() {
  return (
    <article
      id="page-content"
      className="prose xl:prose-2xl lg:prose-xl md:prose-lg mx-auto"
    >
      <div>
        <h1>uses</h1>
      </div>
    </article>
  )
}
