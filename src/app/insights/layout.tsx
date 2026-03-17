import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insights & News",
    description: "Stay informed with the latest Kenyan real estate market analysis, guides, and investment insights from our experts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
