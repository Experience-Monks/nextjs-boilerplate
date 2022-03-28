import styles from '@/styles/export-vars.module.scss';

export interface Breakpoints {
  readonly mobile: boolean;
  readonly tablet: boolean;
  readonly desktopSm: boolean;
  readonly desktopMd: boolean;
  readonly desktopLg: boolean;
}

export interface BreakpointLayout extends Breakpoints {
  readonly all: Breakpoints;
}

function getLayout(): BreakpointLayout {
  if (typeof window === 'undefined') {
    return {
      mobile: false,
      tablet: false,
      desktopSm: false,
      desktopMd: true,
      desktopLg: false,
      all: { mobile: false, tablet: false, desktopSm: false, desktopMd: false, desktopLg: false }
    };
  }

  const TABLET_MEDIA_QUERY = `(min-width: ${styles.layoutTablet})`;
  const DESKTOP_SM_MEDIA_QUERY = `(min-width: ${styles.layoutDesktopSm})`;
  const DESKTOP_MD_MEDIA_QUERY = `(min-width: ${styles.layoutDesktopMd})`;
  const DESKTOP_LG_MEDIA_QUERY = `(min-width: ${styles.layoutDesktopLg})`;

  const TABLET_MATCH_MEDIA = window.matchMedia(TABLET_MEDIA_QUERY);
  const DESKTOP_SM_MATCH_MEDIA = window.matchMedia(DESKTOP_SM_MEDIA_QUERY);
  const DESKTOP_MD_MATCH_MEDIA = window.matchMedia(DESKTOP_MD_MEDIA_QUERY);
  const DESKTOP_LG_MATCH_MEDIA = window.matchMedia(DESKTOP_LG_MEDIA_QUERY);

  return {
    get mobile() {
      return !this.tablet && !this.desktopSm && !this.desktopMd && !this.desktopLg;
    },
    get tablet() {
      return TABLET_MATCH_MEDIA.matches && !this.desktopSm && !this.desktopMd && !this.desktopLg;
    },
    get desktopSm() {
      return DESKTOP_SM_MATCH_MEDIA.matches && !this.desktopMd && !this.desktopLg;
    },
    get desktopMd() {
      return DESKTOP_MD_MATCH_MEDIA.matches && !this.desktopLg;
    },
    get desktopLg() {
      return DESKTOP_LG_MATCH_MEDIA.matches;
    },
    get all() {
      return {
        mobile: this.mobile,
        tablet: this.tablet,
        desktopSm: this.desktopSm,
        desktopMd: this.desktopMd,
        desktopLg: this.desktopLg
      };
    }
  };
}

export default getLayout();
