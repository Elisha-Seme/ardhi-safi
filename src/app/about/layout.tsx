import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Ardhi Safi, our story, values, and the team committed to providing shelter for all and clear titles across Kenya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
