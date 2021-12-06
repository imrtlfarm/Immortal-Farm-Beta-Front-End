import cl from 'classnames';
import { WalletConnectButton } from '../WalletModal';
import Social from '../Social';
import s from './Header.module.scss';

export default function Header() {
  return (
    <header className={s.header}>
      <div className={cl(s.content, 'container')}>
        <div className={s.caption}>
          <img className={s.logo} src="/images/flower.png" alt="logo" />
          <h1 className={s.title}>Immortal farm</h1>
        </div>
        <Social className={s.socials} />
        <WalletConnectButton className={s.connect} />
      </div>
    </header>
  );
}
