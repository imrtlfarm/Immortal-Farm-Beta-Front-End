import { useState } from 'react';
import cl from 'classnames';
import Vault from '../Vault';
import Info from '../Info';
import Social from '../Social';
import { vaultsConfig } from '../vaultsConfig';
import s from './Main.module.scss';

const About = ({ isMobile = false }) => (
  <div className={cl(s.about, { [s.mobile]: isMobile })}>
    <p>
      Welcome to Immortal Farm, the platform with the first fully-automated
      structured investment funds on the Fantom Opera Network! What does it do?
    </p>
    <p className={s.accent}>No-Stress Investment!</p>
    <p>
      Want to invest in the FTM ecosystem but don't know where to start? Want to
      invest in a dex but don't know which farm to choose?
    </p>
    <p className={s.accent}>Allow our MultiVaults to do the magic for you.</p>
  </div>
);

export default function Main() {
  const [openVault, setOpenVault] = useState(null);

  return (
    <main className={cl(s.main, 'container')}>
      <div className={s.sidebar}>
        <About />
        <Info className={s.info} />
      </div>
      <div className={s.vaults}>
        {vaultsConfig.map(({ id, title, text }) => (
          <Vault
            key={id}
            className={s.vault}
            id={id}
            title={title}
            text={text}
            isOpen={openVault === id}
            onOpen={() => setOpenVault(id)}
            onClose={() => setOpenVault(null)}
          />
        ))}
      </div>
      <About isMobile />
      <Social className={s.mobile} />
    </main>
  );
}
