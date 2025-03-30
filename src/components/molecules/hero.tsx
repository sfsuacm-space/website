export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 sm:p-8 md:p-10 lg:p-14">
      {children}
    </div>
  );
}
