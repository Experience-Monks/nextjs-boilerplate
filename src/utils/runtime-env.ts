export type RuntimeEnv = 'local' | 'dev' | 'stage' | 'prod'

let result: RuntimeEnv | undefined = typeof window === 'undefined' ? 'local' : undefined

export function getRuntimeEnv(): RuntimeEnv {
  if (result) return result
  if (process.env.STORYBOOK) return 'local'

  const prefix = window.location.hostname.split('.')[0]

  result = /^(localhost|\d)/i.test(prefix) //
    ? 'local'
    : /^(uat|www|or-the-project-subdomain)/i.test(prefix)
    ? 'prod'
    : /^(stage|staging|stg)/i.test(prefix)
    ? 'stage'
    : (prefix as RuntimeEnv)

  return result
}

export function isDevEnv(): boolean {
  const env = getRuntimeEnv()
  return /^(preview|local|dev|stag|stg|\d)/i.test(env)
}
