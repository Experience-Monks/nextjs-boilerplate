# CircleCI

## To do

1. [Issue] Workflows on the main branch do not cancel each other out and run in parallel. Sometimes there are old workflows waiting to be approved when most recent ones have been merged already.

2. [Improve] Multiple git commits to the same pull request creates multiple preview environments. Ideally, a single one should exist per PR that’s up to date to latest commit.

3. [Improve] Refine CircleCI slack with a better message for pause jobs

4. [Improve] Recycle artifacts between PR and Pipeline

5. [Improve] Remove old artifact

6. [Feature] Integrate Ursus

7. [Feature] Store artifacts in S3

8. [Feature] Smart invalidations, just invalidate the routes are needed. This will boost the performance for heavy traffic sites after new deployments.

9. [Feature] Integrate Tools
