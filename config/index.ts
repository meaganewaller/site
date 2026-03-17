export const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging'
export const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development'
export const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production'
export const isCI = !!process.env.CI

export const CONFIG = {
  siteName: "meagan waller",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteDescription: 'posts about software development, politics, pop culture, and whatever else i feel like writing about',
}
