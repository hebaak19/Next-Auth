import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div>
     <Button className="fixed top-5 left-2" ><Link href="/">Back</Link></Button>
      {children}
  </div>
       
    
  );
}
