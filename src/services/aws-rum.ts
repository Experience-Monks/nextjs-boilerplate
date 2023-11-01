import { AwsRum, AwsRumConfig } from 'aws-rum-web'

interface AwsRumData {
  guestRoleArn: string
  identityPoolId: string
  endpoint: string
  region: string
  appId: string
  appVersion: string
}

class Service {
  awsRum: AwsRum | null
  cookieConsent: boolean
  awsRumData: AwsRumData | null

  constructor() {
    this.cookieConsent = false
    this.awsRum = null
    this.awsRumData = process.env.NEXT_PUBLIC_AWS_RUM ? JSON.parse(process.env.NEXT_PUBLIC_AWS_RUM) : null
  }

  start = (cookieConsent: boolean) => {
    this.cookieConsent = cookieConsent

    try {
      const config: AwsRumConfig = {
        sessionSampleRate: 1,
        guestRoleArn: this.awsRumData?.guestRoleArn,
        identityPoolId: this.awsRumData?.identityPoolId,
        endpoint: this.awsRumData?.endpoint,
        telemetries: ['http', 'errors', 'performance'],
        allowCookies: this.cookieConsent,
        enableXRay: false
      }

      const APPLICATION_ID = this.awsRumData?.appId || ''
      const APPLICATION_VERSION = this.awsRumData?.appVersion || ''
      const APPLICATION_REGION = this.awsRumData?.region || ''

      this.awsRum = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config)
    } catch (error) {
      // Ignore errors thrown during CloudWatch RUM web client initialization
    }
  }

  recordPageView(location: string) {
    this.awsRum?.recordPageView(location)
  }
}

const AWSRumService = new Service()

export default AWSRumService
