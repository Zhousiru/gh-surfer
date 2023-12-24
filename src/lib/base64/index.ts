export function base64ToBytes(base64: string): Uint8Array {
  const bin = Array.from(atob(base64))
  return new Uint8Array(bin.map((m) => m.codePointAt(0) as number))
}

export function base64ToString(base64: string): string {
  return new TextDecoder().decode(base64ToBytes(base64))
}
