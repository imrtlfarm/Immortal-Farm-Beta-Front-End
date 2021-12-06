import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faTwitter,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import cl from 'classnames';
import s from './Social.module.scss';

const socials = [
  { url: 'https://twitter.com/immortalfarm', icon: faTwitter },
  { url: 'https://discord.gg/k6cFGB9Vyc', icon: faDiscord },
  { url: 'https://docs.immortal.farm', icon: faBook },
  { url: 'https://t.me/joinchat/Vt2x8QtD1jpkMWEx', icon: faMedium },
];

export default function Social({ className }) {
  return (
    <div className={cl(s.socials, className)}>
      {socials.map(({ url, icon }) => (
        <a
          key={url}
          href={url}
          className={s.social}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon className={s.socialIcon} icon={icon} />
        </a>
      ))}
    </div>
  );
}
