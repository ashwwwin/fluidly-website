"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-white h-screen flex-col w-full flex items-center justify-center">
      <span className="font-medium select-none">Something went wrong on our end</span>
      <span className="opacity-70 text-sm">
        If this issue persists, please contact the Fluidly team.
      </span>
    </div>
  );
}
