# CircleCI

## Table of Contents

- [Pre requirement](#pre-requirement)
- [Usage](#usage)
- [To do](#to-do)

### Pre requirement

1. Create a slack channel with the project name -deploy (for example: `2373-cos-de-digital-activation-deploy`).
2. Get the channel ID and save it (going to be used on the next step [Usage](#usage)).
3. Add CircleCI-Experience-Monks bot to the channel as integration app.

### Usage

1. This project needs to following CircleCI Environment Variables:

```
AWS_REGION = us-east-1

AWS_ACCESS_KEY_ID_DEV = XXXXXXXXXXX
AWS_ACCESS_KEY_ID_STAGE = XXXXXXXXXXX
AWS_ACCESS_KEY_ID_PROD = XXXXXXXXXXX
AWS_SECRET_ACCESS_KEY_DEV = XXXXXXXXXXX
AWS_SECRET_ACCESS_KEY_STAGE = XXXXXXXXXXX
AWS_SECRET_ACCESS_KEY_PROD = XXXXXXXXXXX

ENVIRONMENT_DOMAIN_DEV = xxx.xxx.com (without the protocol)
ENVIRONMENT_DOMAIN_STAGE = xxx.xxx.com (without the protocol)
ENVIRONMENT_DOMAIN_PROD = xxx.xxx.com (without the protocol)

S3_ORIGIN_DEV = experience-monks-xxx-xxx-xxx-xxx-origin
S3_ORIGIN_STAGE = experience-monks-xxx-xxx-xxx-xxx-origin
S3_ORIGIN_PROD = experience-monks-xxx-xxx-xxx-xxx-origin

CLOUDFRONT_ID_DEV = XXXXXXXXXXX
CLOUDFRONT_ID_STAGE = XXXXXXXXXXX
CLOUDFRONT_ID_PROD = XXXXXXXXXXX

// for auto tagging
GITHUB_PROJECT = github.com/Experience-Monks/xxxxx

// for sending a slack notification
SLACK_CHANNEL_ID = XXXXXXXXXXX

// Other tools:
// To include a SAST, please use SonarCloud directly
```

2. Apply for an appropriate workflow between trunk based and git flow. By default, `enable-trunk-based` is set to `true` and `enable-git-flow-based` is `false`. Please set this parameter accordingly.

### To do

To do list has moved to the issues page [CircleCI](https://github.com/Experience-Monks/nextjs-boilerplate/issues/254#issue-1328652952)
