import HostForm from "@/components/host-form";

export default function Home() {
  return (
    <main className="flex h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center space-y-14">
        <h2 className="text-3xl font-bold text-center">
          大喜利部屋を作成しましょう
        </h2>
        <HostForm />
      </div>
    </main>
  );
}
