import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Property Investment Advisory",
    description: "Strategic real estate investment advisory to help you build and grow a profitable property portfolio in Kenya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
