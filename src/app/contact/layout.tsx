import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Ardhi Safi for professional real estate services. We are located at Manga House, Upper Hill, Nairobi.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
