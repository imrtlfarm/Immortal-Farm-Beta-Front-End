import cl from 'classnames';
import Spread from '../Spread';
import { useVault } from '../../hooks/useVault';
import s from './Vault.module.scss';

export default function Vault(props) {
  const { id, text, title, isOpen, onOpen, onClose, className } = props;
  const { totalTVL } = useVault(id);
  console.log('render vault')

  return (
    <div
      className={cl(className, s.vault, { [s.active]: isOpen })}
      onClick={!isOpen ? onOpen : undefined}
    >
      <div className={s.header}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.info}>
          <span className={s.infoParam}>TVL:</span>
          <span className={s.infoValue}>{totalTVL || '..'}</span>
          <span className={s.infoUnit}>FTM</span>
        </div>
        {/* uncomment when APY is added */}
        {/* <div className={s.info}>
            <span className={s.infoParam}>APY:</span>
            <span className={s.infoValue}>...</span>
            <span className={s.infoUnit}>%</span>
        </div>  */}
      </div>
      <div className={s.text}>{text}</div>
      <div className={s.arrow} onClick={isOpen ? onClose : undefined} />
      <div className={s.form}><Spread vaultId={id} /></div>
    </div>
  );
}
