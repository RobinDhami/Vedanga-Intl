import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
            <div className="max-w-md text-center">
                <h1 className="text-9xl font-bold text-[#D41D33] mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Button asChild className="gap-2 shadow-md text-[#D41D33] hover:text-white hover:bg-[#D41D33] bg-white">
                    <Link  href="/">
                        <Home className="h-4 w-4 " />
                        <span className=" "> Return Home</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
}