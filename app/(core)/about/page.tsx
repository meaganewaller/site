import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me - Meagan Waller',
  description: 'Learn more about Meagan Waller, a software engineer with a passion for building impactful products and sharing knowledge.',
  openGraph: {
    title: 'About Me - Meagan Waller',
    description: 'Learn more about Meagan Waller, a software engineer with a passion for building impactful products and sharing knowledge.',
    url: 'https://meaganwaller.com/about',
    siteName: 'Meagan Waller',
    images: [
      {
        url: 'https://meaganwaller.com/images/about-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Photo of Meagan Waller',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <article
      id="page-content"
      className="prose xl:prose-2xl lg:prose-xl md:prose-lg mx-auto"
    >
      <div>
        <h1>about the site</h1>
      </div>
    </article>
  )
}
