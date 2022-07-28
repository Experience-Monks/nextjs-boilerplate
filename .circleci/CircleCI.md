# CircleCI

## Table of Contents

- [Usage](#usage)
- [To do](#to-do)

### Usage

1. This project needs to following CircleCI Environment Variables:

```
AWS_REGION = us-ease-1

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

// for auto tagging
GITHUB_PROJECT = github.com/jam3/xxxxx

// for sending a slack notification
SLACK_CHANNEL_ID = XXXXXXXXXXX

// Other tools:
// To include a SAST, please use SonarCloud directly
```

2. Apply for an appropriate workflow between trunk based and git flow. By default, `enable-trunk-based` is set to `true` and `enable-git-flow-based` is `false`. Please set this parameter accordingly.

### To do

1. [Issue] Workflows on the main branch do not cancel each other out and run in parallel. Sometimes there are old workflows waiting to be approved when most recent ones have been merged already.

2. [Improve] Multiple git commits to the same pull request creates multiple preview environments. Ideally, a single one should exist per PR that’s up to date to latest commit.

3. [Improve] Divide config.yml file into modules, and support several pipelines (github flow, trunk based)

4. [Improve] Recycle artifacts between PR and Pipeline

5. [Improve] Remove old artifact

6. [Feature] Integrate Ursus

7. [Feature] Store artifacts in S3

8. [Feature] Smart invalidations, just invalidate the routes are needed. This will boost the performance for heavy traffic sites after new deployments.

9. [Feature] Integrate Tools

10. [Improve] Review how to reduce npm ci time, even cached, it's taking too long
