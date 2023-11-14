import config from '@/data/config.json'

import log from '@/utils/log'
import { getRuntimeEnv } from '@/utils/runtime-env'

export type GTMEvent = {
  category: string
  action: string
  label: string
}

class Service {
  tracking = false

  gtmId: string
  gtmParams: string

  constructor() {
    const env = getRuntimeEnv()
    this.gtmId = config.analytics.gtmIds[env] || ''
    this.gtmParams = config.analytics.gtmParams[env] || ''
  }

  start = () => {
    if (typeof window !== 'undefined' && !this.tracking) {
      this.tracking = true

      if (this.gtmId) {
        window.dataLayer ||= []
        const script = document.createElement('script')
        script.id = 'gtm-container'
        script.text = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${this.gtmParams}';
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${this.gtmId}');
        `
        document.head.append(script)
        log('Analytics', 'GTM initialized')
      }
    }
  }

  trackGtm(payload: GTMEvent): void {
    if (this.gtmId && this.tracking) {
      const data = { event: 'gtm-event', payload }
      window.dataLayer.push(data)
      log('Analytics', `GTM: ${JSON.stringify(data)}`)
    }
  }
}

const AnalyticsService = new Service()

export default AnalyticsService
