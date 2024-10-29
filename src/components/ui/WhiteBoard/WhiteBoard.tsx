export default function WhiteBoard({ children }) {
  return (
    <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
      {children}
    </div>
  );
}
