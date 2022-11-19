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

export async function fetchPost<P, T>(url: string, payload: P): Promise<T> {
  return fetchPayload<P, T>(url, 'POST', payload);
}

export async function fetchPut<P, T>(url: string, payload: P): Promise<T> {
  return fetchPayload<P, T>(url, 'PUT', payload);
}

async function fetchPayload<P, T>(
  url: string,
  method: string,
  payload: P
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: method,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${await response.json()}`);
  }
  return response.json();
}

export class NotFoundError extends Error {}
