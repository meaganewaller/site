import Link from 'next/link'
import { HeaderNav } from '@/components/HeaderNav'
import HeaderTitle from '@/components/HeaderTitle'
import type { MenuItem } from '@/types'

export default async function Header() {
  const converted = [
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
        key: 'meagan',
        title: 'Meagan',
        order: 2,
        path: '#',
        url: '#',
        parentId: null,
        children: [
          {
            key: 'about',
            title: 'About',
            order: 1,
            path: '/meagan',
            url: '/meagan',
            parentId: 'meagan',
            children: [],
          },
          {
            key: 'now',
            title: 'Now',
            order: 2,
            path: '/now',
            url: '/now',
            parentId: 'meagan',
            children: [],
          },
          {
            key: 'uses',
            title: 'Uses',
            order: 3,
            path: '/uses',
            url: '/uses',
            parentId: 'meagan',
            children: [],
          }
        ]
      },
      {
        key: 'posts',
        title: 'Posts',
        order: 3,
        path: '/posts',
        url: '/posts',
        parentId: null,
        children: [],
      },
      {
        key: 'projects',
        title: 'Projects',
        order: 4,
        path: '/projects',
        url: '/projects',
        parentId: null,
        children: [
          {
            key: 'gauge-calculator',
            title: 'Gauge Calculator',
            order: 1,
            path: '/projects/gauge-calculator',
            url: '/projects/gauge-calculator',
            parentId: 'projects',
            children: [],
          },
          {
            key: 'dotfiles',
            title: 'Dotfiles',
            order: 2,
            path: '/projects/dotfiles',
            url: '/projects/dotfiles',
            parentId: 'projects',
            children: [],
          },
          {
            key: 'all-projects',
            title: 'All Projects',
            order: 3,
            path: '/projects',
            url: '/projects',
            parentId: 'projects',
            children: [],
          }
        ],
      },
      {
        title: 'For You',
        key: 'for-you',
        order: 5,
        path: '/for-you',
        url: '/for-you',
        parentId: null,
        children: [
          {
            key: 'newsletter',
            title: 'Newsletter',
            order: 1,
            path: '/newsletter',
            url: '/newsletter',
            parentId: 'for-you',
            children: [],
          },
          {
            key: 'snippets',
            title: 'Snippets',
            order: 2,
            path: '/snippets',
            url: '/snippets',
            parentId: 'for-you',
            children: [],
          },
          {
            key: 'resources',
            title: 'Resources',
            order: 3,
            path: '/resources',
            url: '/resources',
            parentId: 'for-you',
            children: [],
          }
        ],
      }
  ] as MenuItem[]

  return (
    <>
      <header className="layout-header">
        <div className="header-title">
          <Link href="/">
            <HeaderTitle />
          </Link>
        </div>
      </header>
      <HeaderNav menu={converted} />
    </>
  )
}
