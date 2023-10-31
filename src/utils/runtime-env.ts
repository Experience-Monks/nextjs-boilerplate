export type RuntimeEnv = 'local' | 'dev' | 'stage' | 'prod'

let result: RuntimeEnv | undefined = typeof window === 'undefined' ? 'local' : undefined

export function getRuntimeEnv(): RuntimeEnv {
  if (result) return result
  if (process.env.STORYBOOK) return 'local'

  const prefix = window.location.hostname.split('.')[0]

  if (/^(localhost|\d)/i.test(prefix)) {
    result = 'local';
  } else if (/^(uat|prd|prod|www|or-the-project-subdomain)/i.test(prefix)) {
    result = 'prod';
  } else if (/^(stag|stg)/i.test(prefix)) {
    result = 'stage';
  } else if (/^(dev)/i.test(prefix)) {
    result = 'dev';
  } else {
    result = prefix as RuntimeEnv;
  }

  return result
}

export function isDevEnv(): boolean {
  const env = getRuntimeEnv()
  return /^(preview|local|dev|stag|stg|\d)/i.test(env)
}
