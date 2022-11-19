export function isBlank(input: string | null | undefined): boolean {
  if (!input) {
    return true;
  }

  return input.trim() === '';
}
