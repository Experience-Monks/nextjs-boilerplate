import log from '@/utils/log';

export enum GTMActions {
  ProductEngagementFallback = 'product engagement fallback',
  ExperienceInstructions = 'experience instructions',
  GeneralEngagement = 'general engagement',
  ProductDetailLoad = 'product detail load',
  ProductEngagement = 'product engagement',
  VideoConsumption = 'video consumption',
  GettingStarted = 'getting started',
  ModelSelection = 'model selection'
}

export interface GTMEvent {
  category?: string;
  action: GTMActions;
  label: string;
}
class Service {
  tracking = false;

  start = () => {
    if (process.env.NEXT_PUBLIC_GTM_ID && typeof window !== 'undefined' && !this.tracking) {
      this.tracking = true;
      window.dataLayer = window.dataLayer || [];
      const script = document.createElement('script');
      script.id = 'gtm-container';
      script.text = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${process.env.NEXT_PUBLIC_GTM_PARAMS || ''}';
        f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');
      `;
      document.head.appendChild(script);
    }
    log('GTM', 'Initialized');
  };

  trackEvent(e: GTMEvent): void {
    if (process.env.NEXT_PUBLIC_GTM_ID && e) {
      const event = {
        event: 'jam3',
        payload: {
          category: e.category || window.location.pathname.split('/').filter(Boolean)[0] || '/',
          action: e.action.toLowerCase(),
          label: e.label.toLowerCase()
        }
      };

      if (this.tracking) {
        window.dataLayer.push(event);
      }

      if (this.tracking || process.env.STORYBOOK) {
        log('GTM Event', JSON.stringify(event));
      }
    }
  }
}

const AnalyticsService = new Service();

export default AnalyticsService;
