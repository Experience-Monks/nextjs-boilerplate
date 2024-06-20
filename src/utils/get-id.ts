let id = 0

export function getId(): string {
  return (id++ % Number.MAX_SAFE_INTEGER).toString()
}
