'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex items-center py-4 px-6 bg-[#7e8caa]">
      <div className="flex items-center">
        <div className="relative w-16 h-16 mr-2">
          <Image
            src="https://web-assets.same.dev/3261223073/734852065.png"
            alt="EASYME.md Logo"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <h1 className="text-4xl text-white font-rubik">EASYME.md</h1>
      </div>
    </header>
  )
}
