// routes/api/available-slots.ts

import { config } from 'https://deno.land/x/dotenv/mod.ts';

// Load environment variables
const env = config();

export async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const day = url.searchParams.get('day') || 'Monday'; // Example: Adjust as needed

  // Use the API key from the .env file
  const apiKey: string = env.WIW_KEY;
  const userId: string = 'USER_ID'; // Adjust as needed
  const baseUrl: string = 'https://api.wheniwork.com/2';
  const shiftsEndpoint: string = `/shifts?user_id=${userId}&day=${day}`; // Adjust the endpoint as needed

  try {
    const response = await fetch(`${baseUrl}${shiftsEndpoint}`, {
      method: 'GET',
      headers: {
        'W-Token': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const shifts = await response.json();
    // Logic to determine available slots based on shifts data goes here

    // For simplicity, this example just returns an example list of available slots
    return new Response(JSON.stringify(['9:00 AM', '11:00 AM', '3:00 PM']), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch shifts:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
