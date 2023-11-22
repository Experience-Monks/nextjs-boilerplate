import type { AwsRumConfig } from 'aws-rum-web'

import { AwsRum } from 'aws-rum-web'

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
  awsRumData: AwsRumData | null

  constructor() {
    this.awsRum = null
    try {
      this.awsRumData = process.env.NEXT_PUBLIC_AWS_RUM ? JSON.parse(process.env.NEXT_PUBLIC_AWS_RUM) : null
    } catch {
      this.awsRumData = null
    }
  }

  start = () => {
    if (this.awsRumData) {
      try {
        const config: AwsRumConfig = {
          sessionSampleRate: 1,
          guestRoleArn: this.awsRumData?.guestRoleArn,
          identityPoolId: this.awsRumData?.identityPoolId,
          endpoint: this.awsRumData?.endpoint,
          telemetries: ['http', 'errors', 'performance'],
          allowCookies: false,
          enableXRay: false
        }

        const APPLICATION_ID = this.awsRumData?.appId || ''
        const APPLICATION_VERSION = this.awsRumData?.appVersion || ''
        const APPLICATION_REGION = this.awsRumData?.region || ''

        this.awsRum = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config)
      } catch {
        // Ignore errors thrown during CloudWatch RUM web client initialization
      }
    }
  }

  allowCookies = () => {
    if (this.awsRum) this.awsRum.allowCookies(true)
  }

  recordPageView(location: string) {
    this.awsRum?.recordPageView(location)
  }
}

export const AWSRumService = new Service()
