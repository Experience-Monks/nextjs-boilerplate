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
        guestRoleArn: 'arn:aws:iam::319077079874:role/RUM-Monitor-us-east-2-319077079874-9590424274961-Unauth',
        identityPoolId: 'us-east-2:22b9cadb-77d7-4345-9b6c-88d161a3ea82',
        endpoint: 'https://dataplane.rum.us-east-2.amazonaws.com',
        telemetries: ['performance', 'errors', 'http'],
        allowCookies: cookieConsent,
        enableXRay: false,
        disableAutoPageView: true
      }

      const APPLICATION_ID = 'c1d58c9f-d7f1-4f63-944c-9a939f3562e9'
      const APPLICATION_VERSION = '1.0.0'
      const APPLICATION_REGION = 'us-east-2'

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
