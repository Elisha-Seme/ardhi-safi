import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Property Sales & Letting",
    description: "Professional property sales and letting services in Kenya. Browse premium residential and commercial listings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
