# CircleCI

## Table of Contents

- [Pre requirement](#pre-requirement)
- [Usage](#usage)
- [To do](#to-do)


### Pre requirement

1. Create a slack channel with the project name -deploy (for example: `2373-cos-de-digital-activation-deploy`).
2. Get the channel ID and save it (going to be used on the next step [Usage](#usage)).
3. Add CircleCI-Jam3 bot to the channel as integration app.

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

S3_ORIGIN_DEV = jam3-xxx-xxx-xxx-xxx-origin
S3_ORIGIN_STAGE = jam3-xxx-xxx-xxx-xxx-origin
S3_ORIGIN_PROD = jam3-xxx-xxx-xxx-xxx-origin

CLOUDFRONT_ID_DEV = XXXXXXXXXXX
CLOUDFRONT_ID_STAGE = XXXXXXXXXXX
CLOUDFRONT_ID_PROD = XXXXXXXXXXX

// token to skip basic auth
BASIC_AUTH_TOKEN_DEV = XXXXXXXXXXXX
BASIC_AUTH_TOKEN_STAGE = XXXXXXXXXXXX
BASIC_AUTH_TOKEN_PROD = XXXXXXXXXXXX

// for auto tagging
GITHUB_PROJECT = github.com/jam3/xxxxx

// for sending a slack notification
SLACK_CHANNEL_ID = XXXXXXXXXXX

// Other tools:
// To include a SAST, please use SonarCloud directly
```

2. Apply for an appropriate workflow between trunk based and git flow. By default, `enable-trunk-based` is set to `true` and `enable-git-flow-based` is `false`. Please set this parameter accordingly.

### To do

To do list has moved to the issues page [CircleCI](https://github.com/Jam3/nextjs-boilerplate/issues/254#issue-1328652952)
