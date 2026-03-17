import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Projects",
    description: "View our portfolio of premium real estate projects and featured listings across Kenya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
