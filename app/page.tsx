import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 bg-black">
      <div>Hello SirAont</div>
      <div className="relative h-full w-full bg-red-300 mt-6">
        <div className="absolute flex justify-center items-center h-full w-full">
          <Scene />
          <Scene />
          <Scene />
          <Scene />
        </div>
      </div>
    </main>
  );
}
