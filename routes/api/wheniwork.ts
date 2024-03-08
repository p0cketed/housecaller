// routes/api/available-slots.ts
import { config } from 'https://deno.land/x/dotenv/mod.ts';

// Load environment variables
const env = config();

// Your WhenIWork account credentials
const EMAIL = 'mmacarew@ucsc.edu';
const PASSWORD = env.WIW_PASSWORD;
const BASE_URL = 'https://api.wheniwork.com/2';

let accessToken = '';

export const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const day = url.searchParams.get('day') || 'Monday';
  //console.log('Day:', day);

  try {
    // Check if the access token is already available
    if (!accessToken) {
      // Log in to the WhenIWork API to obtain the access token
      const loginEndpoint: string = '/login';

      const response = await fetch(`${BASE_URL}${loginEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const { person } = await response.json();
      accessToken = person.token;
    }

    // Use the access token for subsequent API requests
    const userId: string = 'USER_ID'; // Replace with the actual user ID
    const shiftsEndpoint: string = `/shifts?user_id=${userId}&day=${day}`;

    const response = await fetch(`${BASE_URL}${shiftsEndpoint}`, {
      method: 'GET',
      headers: {
        'W-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const shifts = await response.json();

    // Logic to determine available slots based on shifts data
    const availableSlots: string[] = [];
    const startTime: Date = new Date(`${day}T00:00:00`);
    const endTime: Date = new Date(`${day}T23:59:59`);

    let currentTime: Date = startTime;

    while (currentTime < endTime) {
      const endSlotTime: Date = new Date(currentTime.getTime() + 60 * 60 * 1000);

      const availableWorkers = shifts.filter((shift: any) => {
        const shiftStartTime: Date = new Date(shift.start_time);
        const shiftEndTime: Date = new Date(shift.end_time);
        return shiftStartTime <= currentTime && shiftEndTime >= endSlotTime;
      });

      if (availableWorkers.length >= 2) {
        availableSlots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }

      currentTime = endSlotTime;
    }

    return new Response(JSON.stringify(availableSlots), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch shifts:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};