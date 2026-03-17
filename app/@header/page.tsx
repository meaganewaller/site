import Link from 'next/link'

import HeaderTitle from '@/components/HeaderTitle'

export default async function Header() {

  return (
    <>
      <header className="layout-header">
        <div className="header-title">
          <Link href="/">
            <HeaderTitle />
          </Link>
        </div>
      </header>
    </>
  )
}
