import { MeridianSidebar } from "@/components/meridian/meridian-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-white antialiased">
      <MeridianSidebar />
      <main className="meridian-scrollbar min-w-0 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
