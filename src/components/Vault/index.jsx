import cl from 'classnames';
import { vaultsConfig } from '../../configs';
import Spread from '../Spread';
import { useAPY } from '../../hooks/useAPY';
import s from './Vault.module.scss';

export default function Vault(props) {
  const { id, data, isOpen, onOpen, onClose, className } = props;
  const { totalTVL } = data;
  const { text, title, pools } = vaultsConfig.find((el) => el.id === id);
  const APY = useAPY(id);

  return (
    <div className={cl(className, s.vault, { [s.active]: isOpen })} onClick={!isOpen ? onOpen : undefined}>
      <div className={s.header}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.info}>
          <span className={s.infoParam}>TVL:</span>
          <span className={s.infoValue}>{totalTVL || '..'}</span>
          <span className={s.infoUnit}>FTM</span>
        </div>
        <div className={s.info}>
          <span className={s.infoParam}>APY:</span>
          <span className={s.infoValue}>{APY || '..'}</span>
          <span className={s.infoUnit}>%</span>
        </div>
      </div>
      <div className={s.text}>
        <p>{text}</p>
        <ul>
          {pools.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div className={s.arrow} onClick={isOpen ? onClose : undefined} />
      <div className={s.form}>
        <Spread vaultId={id} data={data} />
      </div>
    </div>
  );
}
