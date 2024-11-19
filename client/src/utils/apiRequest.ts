export async function apiRequest(
  endpoint: string,
  method: string = 'GET',
  body?: Record<string, unknown>
) {
  console.log('apiRequest:', endpoint, method, body);//line 6
  const apiUrl = process.env.REACT_APP_API_URL || '/choicePage';   
  try {
    const fullUrl = `${apiUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.message || `API Error: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('API Request failed:', error);
    if (error instanceof Error) {
      throw new Error(error.message || 'An error occurred while fetching data from the API.');
    } else {
      throw new Error('An unknown error occurred during the API request.');
    }
  }
}
