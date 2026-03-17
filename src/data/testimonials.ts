export interface Testimonial {
    name: string;
    category: "landlord" | "tenant" | "buyer" | "seller" | "investor";
    quote: string;
    location: string;
}

export const testimonials: Testimonial[] = [
    {
        name: "James Mwangi",
        category: "landlord",
        quote: "Ardhi Safi has transformed how I manage my properties. Their transparent reporting and efficient rent collection have given me complete peace of mind.",
        location: "Nairobi",
    },
    {
        name: "Amina Hassan",
        category: "tenant",
        quote: "From the moment I started working with Ardhi Safi, the professionalism was evident. They found me the perfect apartment and the transition was seamless.",
        location: "Mombasa",
    },
    {
        name: "Peter Ochieng",
        category: "buyer",
        quote: "I was worried about property fraud until Ardhi Safi handled my purchase. Every document was verified and the process was completely transparent.",
        location: "Kisumu",
    },
    {
        name: "Grace Wanjiku",
        category: "seller",
        quote: "They sold my property at a price I didn't think was possible. Their market insight and professional approach made all the difference.",
        location: "Nakuru",
    },
    {
        name: "David Kimani",
        category: "investor",
        quote: "Ardhi Safi's investment advisory has been instrumental in growing my portfolio. Their understanding of the East African market is unmatched.",
        location: "Nairobi",
    },
    {
        name: "Sarah Njeri",
        category: "landlord",
        quote: "The IshiSalama system gives me real-time oversight of my properties. I can see everything from rent collection to maintenance requests at a glance.",
        location: "Kiambu",
    },
    {
        name: "John Mutua",
        category: "tenant",
        quote: "The 24/7 emergency response is not just marketing — they actually respond within minutes. That level of care is rare in Nairobi.",
        location: "Nairobi",
    },
    {
        name: "Catherine Akinyi",
        category: "buyer",
        quote: "As a first-time buyer, I needed guidance every step of the way. Ardhi Safi made the entire process stress-free and secure.",
        location: "Machakos",
    },
    {
        name: "Mohammed Ali",
        category: "investor",
        quote: "Their portfolio analysis helped me rebalance my investments for better returns. Professional, data-driven, and always available.",
        location: "Mombasa",
    },
    {
        name: "Rebecca Chebet",
        category: "seller",
        quote: "Ardhi Safi marketed my commercial property to the right audience. The sale closed faster than I expected, and at a competitive price.",
        location: "Eldoret",
    },
];

export const testimonialCategories = [
    { key: "landlord" as const, label: "What our landlords say?" },
    { key: "tenant" as const, label: "What our tenants say?" },
    { key: "buyer" as const, label: "What our buyers say?" },
    { key: "seller" as const, label: "What our sellers say?" },
    { key: "investor" as const, label: "What our investors say?" },
];
