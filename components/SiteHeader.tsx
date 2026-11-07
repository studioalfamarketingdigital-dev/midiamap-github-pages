'use client';

import { useState } from 'react';

const links = [
  { href: '/espacos/', label: 'Espaços' },
  { href: '/mapa/', label: 'Mapa' },
  { href: '/anunciar/', label: 'Anunciar' },
  { href: '/seja-parceiro/', label: 'Seja parceiro' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/contato/', label: 'Contato' },
  { href: '/faq/', label: 'FAQ' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav">
        <a className="brand" href="/" aria-label="MídiaMap início">Mídia<span>Map</span></a>
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="button button-green" href="/anunciar/">Quero anunciar</a>
          <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
