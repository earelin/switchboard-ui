export async function fetchGet<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError('Entity not found');
    }
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export class NotFoundError extends Error {}
