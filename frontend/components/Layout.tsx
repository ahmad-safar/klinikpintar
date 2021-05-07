import { Transition } from '@headlessui/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <Link href="/">
                <a className="flex-shrink-0 flex items-center">
                  <div className="text-white px-3 py-2 rounded-md text-sm font-medium">
                    Klinik Pintar Test
                  </div>
                </a>
              </Link>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/">
                    <a
                      className={` text-white block px-3 py-2 rounded-md text-base font-medium ${
                        router.pathname == '/' ? 'bg-gray-900' : ''
                      }`}
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/new">
                    <a
                      className={` text-white block px-3 py-2 rounded-md text-base font-medium ${
                        router.pathname == '/new' ? 'bg-gray-900' : ''
                      }`}
                    >
                      Create Diseases
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Transition show={isOpen}>
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/">
                <a className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                  Home
                </a>
              </Link>
              <Link href="/new">
                <a className="text-white block px-3 py-2 rounded-md text-base font-medium">
                  New Diseases
                </a>
              </Link>
            </div>
          </div>
        </Transition>
      </nav>
      <main className="mb-auto">{children}</main>
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-start h-16">
            <div className="mr-1">&copy; 2021</div>
            <div>
              Build by
              <a
                className="ml-1 underline"
                href="https://github.com/faropedia/"
                target="_blank"
                rel="noreferrer"
              >
                Ahmad Safar
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
