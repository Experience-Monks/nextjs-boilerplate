import { AwsRum, AwsRumConfig } from 'aws-rum-web'

class Service {
  awsRum: AwsRum | null
  cookieConsent: boolean

  constructor() {
    this.cookieConsent = false
    this.awsRum = null
  }

  start = (cookieConsent: boolean) => {
    this.cookieConsent = cookieConsent

    try {
      const config: AwsRumConfig = {
        sessionSampleRate: 1,
        guestRoleArn: process.env.NEXT_PUBLIC_GUEST_ROLE_ARN,
        identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL,
        endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
        telemetries: ['performance', 'errors', 'http'],
        allowCookies: cookieConsent,
        enableXRay: false,
        disableAutoPageView: true
      }

      const APPLICATION_ID = process.env.NEXT_PUBLIC_APP_ID || ''
      const APPLICATION_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || ''
      const APPLICATION_REGION = process.env.NEXT_PUBLIC_APP_REGION || ''

      this.awsRum = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config)
    } catch (error) {
      // Ignore errors thrown during CloudWatch RUM web client initialization
    }
  }

  RecordPageView() {
    const location = window.location.pathname
    this.awsRum?.recordPageView(location)
  }
}

const AWSRumService = new Service()

export default AWSRumService
