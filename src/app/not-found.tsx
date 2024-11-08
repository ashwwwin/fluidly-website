export default function NotFound() {
  return (
    <div className="text-white h-screen flex-col w-full flex items-center justify-center">
      <span className="font-medium select-none">The page you are looking for does not exist</span>
      <span className="opacity-70 text-sm">
        If you think this is a mistake, please contact the Fluidly team.
      </span>
    </div>
  );
}
