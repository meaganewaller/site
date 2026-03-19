import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Now Page - Meagan Waller',
  description: 'Learn more about Meagan Waller, a software engineer with a passion for building impactful products and sharing knowledge.',
  openGraph: {
    title: 'About Me - Meagan Waller',
    description: 'Learn more about Meagan Waller, a software engineer with a passion for building impactful products and sharing knowledge.',
    url: 'https://meaganwaller.com/now',
    siteName: 'Meagan Waller',
    images: [
      {
        url: 'https://meaganwaller.com/images/now-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Photo of Meagan Waller',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function NowPage() {
  return (
    <article
      id="page-content"
      className="prose xl:prose-2xl lg:prose-xl md:prose-lg mx-auto"
    >
      <div>
        <h1>now</h1>
      </div>
    </article>
  )
}
