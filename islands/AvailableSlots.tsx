import { useState } from "preact/hooks";

export function AvailableSlots() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [availableSlots, setAvailableSlots] = useState([]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`/api/available-slots?day=${selectedDay}`);
      const data = await response.json();
      setAvailableSlots(data);
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
    }
  };

  const handleDayChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    setSelectedDay(target.value);
  };

  return (
    <div class="px-4 py-6 mx-auto bg-blue-200">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/wyattface.jpg"
          width="128"
          height="128"
          alt="Wyatt"
        />
        <h1 class="text-4xl font-bold">Housecaller</h1>
        <p class="my-4">days are client available?</p>
        <select value={selectedDay} onChange={handleDayChange}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <button
          class="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
          onClick={fetchAvailableSlots}
        >
          Find Available Slots
        </button>
        {availableSlots.length > 0 && (
          <div class="mt-6">
            <h2 class="text-2xl font-bold">Available Slots:</h2>
            <ul class="list-disc list-inside">
              {availableSlots.map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}