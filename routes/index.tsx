import { useSignal } from "@preact/signals";
import { useState } from 'preact/hooks';

export default function Home() {


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
        <p class="my-4">
          What days are client available?
        </p>
        <select >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        
      </div>
    </div>
  );
}