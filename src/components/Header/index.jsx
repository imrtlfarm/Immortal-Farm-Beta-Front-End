import cl from 'classnames';
import { WalletConnectButton } from '../WalletModal';
import Social from '../Social';
import s from './Header.module.scss';

export default function Header() {
  return (
    <header className={s.header}>
      <div className={cl(s.content, 'container')}>
        <h1 className={s.logo}>
          Imm
          <img className={s.logoImg} src="/images/flower.png" alt="logo" />
          rtal farm
        </h1>
        <Social className={s.socials} />
        <WalletConnectButton className={s.connect} />
      </div>
    </header>
  );
}
