import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Here - Meagan Waller',
  description: 'Welcome to my personal website! This is the best place to start exploring who I am, what I do, and how we can connect.',
  openGraph: {
    title: 'Start Here - Meagan Waller',
    description: 'Welcome to my personal website! This is the best place to start exploring who I am, what I do, and how we can connect.',
    url: 'https://meaganwaller.com/start-here',
    siteName: 'Meagan Waller',
    images: [
      {
        url: 'https://meaganwaller.com/images/start-here-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Photo of Meagan Waller',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function StartHerePage() {
  return (
    <article
      id="page-content"
      className="prose xl:prose-2xl lg:prose-xl md:prose-lg mx-auto"
    >
      <div>
        <h1>start here</h1>
      </div>
    </article>
  )
}
