import { useSignal } from "@preact/signals";


export default function Home() {
  const count = useSignal(3);
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
      </div>
    </div>
  );
}
