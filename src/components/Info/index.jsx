import { useState } from 'react';
import cl from 'classnames';
import { useVault } from '../../hooks/useVault';
import { truncate } from '../../utils';
import { vaultsConfig } from '../vaultsConfig';
import s from './Info.module.scss';

export default function Info({ className }) {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const vaults = {};
  vaults.A = useVault('A');
  vaults.B = useVault('B');
  vaults.C = useVault('C');
  vaults.D = useVault('D');

  const sum = Object.values(vaults).reduce(
    (prevSum, vaultData) => prevSum + Number(vaultData.totalTVL || 0),
    0,
  );
  const totalTVL = typeof vaults.A.totalTVL === 'number' && truncate(sum);

  return (
    <div className={cl(className, s.info, { [s.mobileOpen]: isMobileOpen })}>
      <div className={s.header} onClick={() => setIsMobileOpen(!isMobileOpen)}>
        <h2 className={s.title}>Info</h2>
        <div className={s.arrow} />
      </div>
      {vaultsConfig.map(({ id, title }) => (
        <p className={s.balance} key={title}>
          <span className={s.subtitle}>{title}:</span>
          <span className={s.value}>{vaults[id].TVL || '..'}</span>
          <span className={s.unit}>FTM</span>
        </p>
      ))}
      <p className={s.totalTVL}>
        <span className={s.subtitle}>Total TVL:</span>
        <span className={s.value}>{totalTVL || '..'}</span>
        <span className={s.unit}>FTM</span>
      </p>
    </div>
  );
}
