import { useCallback, useEffect, useState } from 'react'

import FeatureFlagService, { FeatureFlagId, FeatureFlags } from '@/services/feature-flags'

function useFeatureFlags() {
  const [flags, setFlags] = useState(FeatureFlagService.getAll())

  const setFlag = useCallback((name: FeatureFlagId, enabled: boolean) => {
    FeatureFlagService.set(name, enabled)
  }, [])

  useEffect(() => {
    const update = (flags: FeatureFlags) => setFlags(flags)
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

export default useFeatureFlags
