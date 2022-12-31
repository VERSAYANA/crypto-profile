import Link from 'next/link'

function Footer() {
  return (
    <footer className="flex items-center justify-center bg-neutral py-4 text-neutral-content">
      <Link target={'_blank'} href="/versayana">
        Made by <span className="link">VERSAYANA</span>
      </Link>
    </footer>
  )
}

export default Footer
