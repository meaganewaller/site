import Link from 'next/link'

import AccessCounter from '@/components/AccessCounter'
import { type MenuItem } from '@/types'

export default async function Footer() {
  const footerMenu = [
    {
      key: 'home',
      title: 'Home',
      order: 1,
      path: '/',
      url: '/',
      parentId: null,
      children: [],
    },
    {
      key: 'colophon',
      title: 'Colophon',
      order: 2,
      path: '/colophon',
      url: '/colophon',
      parentId: null,
      children: [],
    },
    {
      key: 'privacy-policy',
      title: 'Privacy Policy',
      order: 3,
      path: '/privacy-policy',
      url: '/privacy-policy',
      parentId: null,
      children: [],
    }
  ] as MenuItem[]

  if (footerMenu && footerMenu.length > 0) {
    return (
      <footer className="layout-footer">
        <section>
          <p>
            &copy; 2013-{new Date().getFullYear()} - Meagan Waller
          </p>
          <AccessCounter />

          {footerMenu.length > 0 && (
            <ul className="footer-menu">
              {footerMenu.map((item) => (
                <li key={item.key}>
                  <Link
                    href={
                      item.path.startsWith('http')
                        ? item.url
                        : `${item.path || ''}`
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </footer>
    )
  }
}
