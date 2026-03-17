import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Property Management",
    description: "Expert property management services ensuring optimal returns and asset preservation for landlords in Kenya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
