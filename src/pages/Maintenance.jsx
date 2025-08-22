import { Settings } from "lucide-react";

export default function Maintenance() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center p-6">
      <Settings
        className="w-20 h-20 text-gray-400 duration-1000 animate-spin mb-6 "
        style={{ animationDuration: "2s" }}
      />
      <h1 className="text-4xl font-bold text-[#252B42] mb-4">
        Under Maintenance
      </h1>
      <p className="text-gray-600 text-lg">
        We’re working on it. Please check back later.
      </p>
    </main>
  );
}