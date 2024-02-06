const { execSync } = require('node:child_process')
const os = require('node:os')

const isWindows = os.platform() === 'win32'
if (isWindows) {
  try {
    execSync('powershell -File scripts/fix-lfs-hooks.ps1', { stdio: 'inherit' })
  } catch {
    console.error('PowerShell (pwsh) not found, Please install it and run the script again.')
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
} else {
  execSync('sh scripts/fix-lfs-hooks.sh', { stdio: 'inherit' })
}
