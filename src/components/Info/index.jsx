import { useState } from 'react';
import cl from 'classnames';
import {
  useSpreadABalance,
  useSpreadBBalance,
  useSpreadCBalance,
  useSpreadDBalance,
} from '../../hooks/useSpreadBalacne';
import {
  useSharePriceAContract,
  useSharePriceBContract,
  useSharePriceCContract,
  useSharePriceDContract,
} from '../../hooks/useContract';
import useSpreadTVL from '../../hooks/useSpreadTVL';
import { truncate } from '../../utils';
import { vaultsConfig } from '../vaultsConfig';
import s from './Info.module.scss';

export default function Info({ className }) {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const balance = {};
  balance.A = useSpreadABalance();
  balance.B = useSpreadBBalance();
  balance.C = useSpreadCBalance();
  balance.D = useSpreadDBalance();

  const tvlA = useSpreadTVL(useSharePriceAContract());
  const tvlB = useSpreadTVL(useSharePriceBContract());
  const tvlC = useSpreadTVL(useSharePriceCContract());
  const tvlD = useSpreadTVL(useSharePriceDContract());
  const totalTVL = truncate(tvlA + tvlB + tvlC + tvlD);

  return (
    <div className={cl(className, s.info, { [s.mobileOpen]: isMobileOpen })}>
      <div className={s.header} onClick={() => setIsMobileOpen(!isMobileOpen)}>
        <h2 className={s.title}>Info</h2>
        <div className={s.arrow} />
      </div>
      {vaultsConfig.map(({ id, title }) => (
        <p className={s.balance} key={title}>
          <span className={s.subtitle}>{title}:</span>
          <span className={s.value}>{balance[id] || '..'}</span>
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
