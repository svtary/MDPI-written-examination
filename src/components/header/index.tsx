import logoDesktop from '@/assets/header/logo-desktop.svg'
import logoMobile from '@/assets/header/logo-mobile.svg'
import searchDesktop from '@/assets/header/search-desktop.svg'
import searchMobile from '@/assets/header/search-mobile.svg'
import account from '@/assets/header/account.svg'
import menu from '@/assets/header/menu.svg'
import { Dropdown } from '@/components/dropdown'
import './styles.css'

const navigation = ['Title One', 'Title Two', 'Title Three', 'Title Four']

export function Header() {
  return (
    <header className="header">
      <picture className="header-logo">
        <source media="(max-width: 767px)" srcSet={logoMobile} />
        <img src={logoDesktop} width="57" height="30" alt="MDPI" />
      </picture>

      <nav className="header-nav" aria-label="Primary navigation">
        <ul>
          {navigation.map((label) => <li key={label}>{label}</li>)}
        </ul>
      </nav>

      <div className="header-desktop-actions">
        <button type="button" aria-label="Search" disabled>
          <img src={searchDesktop} width="18" height="18" alt="" />
        </button>
        <button type="button" disabled>Log in</button>
        <button type="button" className="header-submit" disabled>Submit</button>
      </div>

      <div className="header-mobile-actions">
        <button type="button" aria-label="Search" disabled>
          <img src={searchMobile} width="24" height="24" alt="" />
        </button>
        <span className="header-divider" aria-hidden="true" />
        <button type="button" aria-label="Account" disabled>
          <img src={account} width="24" height="24" alt="" />
        </button>
        <Dropdown
          label="Navigation menu"
          className="header-menu"
          renderIcon={() => <img src={menu} width="24" height="24" alt="" />}
        >
          <nav aria-label="Primary navigation">
            <ul>
              {navigation.map((label) => <li key={label}>{label}</li>)}
            </ul>
          </nav>
        </Dropdown>
      </div>
    </header>
  )
}
