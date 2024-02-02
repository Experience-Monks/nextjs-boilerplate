if (-Not (Test-Path ".husky\lfs-hooks")) {
    Remove-Item -Path ".git\hooks" -Recurse -Force
    git config --unset core.hooksPath
    git lfs install
    Move-Item -Path ".git\hooks" -Destination ".husky\lfs-hooks"
    Remove-Item -Path "node_modules\husky" -Recurse -Force
    npm install
    git lfs pull
  }