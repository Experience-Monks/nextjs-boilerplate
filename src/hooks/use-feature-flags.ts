import type { FeatureFlagId, FeatureFlags } from '@/services/feature-flags.service'

import { useCallback, useEffect, useState } from 'react'

import { FeatureFlagService } from '@/services/feature-flags.service'

export function useFeatureFlags() {
  const [flags, setFlags] = useState(FeatureFlagService.getAll())

  const setFlag = useCallback((name: FeatureFlagId, enabled: boolean) => {
    FeatureFlagService.set(name, enabled)
  }, [])

  useEffect(() => {
    const update = (flgs: FeatureFlags) => setFlags(flgs)
    FeatureFlagService.listen(update)
    return () => {
      FeatureFlagService.dismiss(update)
    }
  }, [])

  return {
    flags,
    setFlag,
    resetFlags: FeatureFlagService.reset
  }
}
