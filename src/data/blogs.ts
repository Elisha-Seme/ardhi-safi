export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    image: string;
    date: string;
    readTime: string | null;
    imageUrl?: string | null;
}

export const sampleBlogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "understanding-kenyan-property-market-2024",
        title: "Understanding the Kenyan Property Market in 2024",
        excerpt: "An in-depth analysis of the current trends, challenges, and opportunities in Kenya's real estate sector.",
        content: "The Kenyan real estate market continues to evolve, driven by urbanization, infrastructure development, and changing consumer preferences. In this article, we explore the key trends shaping the market and what investors should know...",
        author: "Namutila Nyandusi Wanjala",
        category: "Market Analysis",
        image: "/blog/market-analysis.jpg",
        date: "2024-12-15",
        readTime: "8 min read",
    },
    {
        id: "2",
        slug: "guide-to-buying-property-nairobi",
        title: "The Complete Guide to Buying Property in Nairobi",
        excerpt: "Everything you need to know about purchasing residential or commercial property in Kenya's capital city.",
        content: "Nairobi remains the most dynamic real estate market in East Africa. Whether you're a first-time buyer or seasoned investor, understanding the process is crucial...",
        author: "Martin Wambua Mauye",
        category: "Buying Guide",
        image: "/blog/buying-guide.jpg",
        date: "2024-11-28",
        readTime: "12 min read",
    },
    {
        id: "3",
        slug: "property-management-best-practices",
        title: "Property Management Best Practices for Kenyan Landlords",
        excerpt: "How to maximize returns and minimize risk through professional property management strategies.",
        content: "Effective property management is the cornerstone of successful real estate investment. From tenant screening to maintenance scheduling, every aspect matters...",
        author: "Janice Kerubo Nyachae",
        category: "Property Management",
        image: "/blog/management.jpg",
        date: "2024-11-10",
        readTime: "6 min read",
    },
    {
        id: "4",
        slug: "earb-registration-importance",
        title: "Why EARB Registration Matters When Choosing an Estate Agent",
        excerpt: "Understanding the Estate Agents Registration Board and why it should influence your choice of real estate partner.",
        content: "The Estate Agents Registration Board (EARB) plays a critical role in regulating the real estate industry in Kenya. Here's why working with a registered agent matters...",
        author: "Wayne Wekesa Wanjala",
        category: "Legal",
        image: "/blog/legal.jpg",
        date: "2024-10-22",
        readTime: "5 min read",
    },
    {
        id: "5",
        slug: "mombasa-coastal-investment-opportunities",
        title: "Mombasa & Coastal Kenya: Investment Opportunities",
        excerpt: "Exploring the growing real estate investment potential along Kenya's stunning coastline.",
        content: "Kenya's coast has always been a premier destination for tourism, but it's increasingly becoming a hotspot for real estate investment...",
        author: "Namutila Nyandusi Wanjala",
        category: "Investment",
        image: "/blog/coastal.jpg",
        date: "2024-10-05",
        readTime: "7 min read",
    },
];

export const blogCategories = [
    "All",
    "Market Analysis",
    "Buying Guide",
    "Property Management",
    "Legal",
    "Investment",
];
