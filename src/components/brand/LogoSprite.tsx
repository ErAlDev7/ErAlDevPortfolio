import { INK_PATH, BLUE_PATH } from './logoPaths';

/** Defines the logo artwork once per page; every <Logo /> references it with <use>. */
export function LogoSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <g id="eal-logo">
          <path d={INK_PATH} fill="currentColor" fillRule="evenodd" />
          <path d={BLUE_PATH} fill="var(--accent)" fillRule="evenodd" />
        </g>
      </defs>
    </svg>
  );
}
