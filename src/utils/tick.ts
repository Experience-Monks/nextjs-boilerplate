export function tick(): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 0)
  })
}
