import { MeridianSidebar } from "@/components/meridian/meridian-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-black text-white antialiased">
      <MeridianSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
