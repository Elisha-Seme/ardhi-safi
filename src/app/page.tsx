import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Home, Building2, ChevronRight, Star, Quote, TrendingUp, Shield, Eye, Handshake } from "lucide-react";
import prisma from "@/lib/prisma";
import type { Property, Testimonial, BlogPost } from "@prisma/client";
import { formatPrice } from "@/data/properties";
import HomeHero from "./HomeHero";
import HomeInsightsPreview from "./HomeInsightsPreview";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Ardhi Safi Limited | Your Trusted Real Estate Partner in Kenya",
  description: "Shelter for all. Clear titles. Professional real estate services across all 47 counties in Kenya. Buy, sell, and rent premium properties.",
};

export default async function HomePage() {
  // Fetch dynamic content from the database
  const [heroSlides, recentBlogs, filteredTestimonials, featuredProperties] = await Promise.all([
    prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        readTime: true,
      }
    }),
    prisma.testimonial.findMany({
      where: { active: true, category: "landlord" },
      take: 2
    }),
    prisma.property.findMany({
      where: { featured: true, active: true },
      take: 3
    })
  ]);

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO SECTION (DYNAMIC) ==================== */}
      <HomeHero slides={heroSlides} />

      {/* ==================== STATS BAR ==================== */}
      <section className="relative -mt-16 z-20">
        <div className="section-container">
          <div className="bg-primary rounded-2xl shadow-2xl shadow-primary/30 grid grid-cols-2 md:grid-cols-4 animate-in slide-in-from-bottom-10 duration-700">
            {[
              { number: "10+", label: "Years of Experience" },
              { number: "$35M+", label: "Assets Under Management" },
              { number: "500+", label: "Properties Managed" },
              { number: "47", label: "Counties Covered" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center py-8 px-4 ${
                  i === 1 ? "border-b md:border-b-0 border-r border-white/10" :
                  i === 0 ? "border-b md:border-b-0 border-r border-white/10" :
                  i === 2 ? "border-r border-white/10" :
                  ""
                }`}
              >
                <p className="text-3xl md:text-4xl font-heading text-accent font-bold">{stat.number}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OUR PROPERTIES (STATIC FOR NOW) ==================== */}
      <section className="py-24 bg-surface">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Featured Listings</p>
            <h2 className="text-3xl md:text-5xl font-heading text-primary mb-4">
              Our Properties
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Discover premium properties across Kenya — from luxury residences to commercial spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(featuredProperties as Property[]).map((property, i) => (
              <div
                key={property.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="relative h-56 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden text-center">
                  {property.imageUrl ? (
                    <Image
                      src={property.imageUrl}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 size={48} className="text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${property.transaction === "sale"
                      ? "bg-accent text-primary"
                      : "bg-emerald-500 text-white"
                      }`}>
                      {property.transaction === "sale" ? "For Sale" : "For Rent"}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 text-left">
                    <p className="text-white font-bold text-xl">
                      {formatPrice(property.price)}
                      {property.transaction === "rent" && <span className="text-sm font-normal">/mo</span>}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-text-secondary text-sm flex items-center gap-1 mb-3">
                    <MapPin size={14} className="text-accent" />
                    {property.location}
                  </p>
                  <p className="text-text-secondary text-xs mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex gap-4 text-xs text-text-secondary">
                      {property.bedrooms && (
                        <span>{property.bedrooms} Beds</span>
                      )}
                      {property.bathrooms && (
                        <span>{property.bathrooms} Baths</span>
                      )}
                      <span>{property.area.toLocaleString()} {property.areaUnit}</span>
                    </div>
                    <ChevronRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-full transition-all text-sm"
            >
              View All Properties
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-24 bg-primary text-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Why Ardhi Safi</p>
            <h2 className="text-3xl md:text-5xl font-heading mb-4">
              Why Choose Us
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              With over a decade of industry experience and a commitment to transparency,
              we deliver trusted real estate solutions across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Bespoke Care", desc: "Fully tailored, customized solutions designed for the best possible outcomes." },
              { icon: TrendingUp, title: "Vast Experience", desc: "Over USD 35 million in assets under management with proven expertise." },
              { icon: Eye, title: "Transparency", desc: "Clear reporting, legally compliant processes, and accountable decision-making." },
              { icon: Handshake, title: "End-to-End Solutions", desc: "Seamless, integrated real estate service from acquisition to disposal." },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-8 text-center hover:bg-white/12 transition-all group animate-in zoom-in-95 duration-700"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-heading text-lg mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INSIGHTS PREVIEW (DYNAMIC) ==================== */}
      <HomeInsightsPreview posts={recentBlogs} />

      {/* ==================== TESTIMONIALS (STATIC NEXT) ==================== */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Client Voices</p>
            <h2 className="text-3xl md:text-5xl font-heading text-primary mb-4">
              Testimonials
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {(filteredTestimonials as Testimonial[]).map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="bg-surface rounded-2xl p-8 relative animate-in fade-in slide-in-from-bottom-10 duration-700"
                style={{ animationDelay: `${i * 200}ms`, animationFillMode: 'both' }}
              >
                <Quote size={24} className="text-accent/30 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-heading text-primary font-semibold">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== QUICK LINKS ==================== */}
      <section className="py-24 bg-surface">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading text-primary mb-4">
              Browse Properties
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Residential */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="font-heading text-xl text-primary mb-4 flex items-center gap-2">
                <Home size={20} className="text-accent" />
                Residential
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Land for sale", type: "land", tx: "sale" },
                  { label: "Land for rent", type: "land", tx: "rent" },
                  { label: "House for sale", type: "house", tx: "sale" },
                  { label: "House for rent", type: "house", tx: "rent" },
                  { label: "Apartment for sale", type: "apartment", tx: "sale" },
                  { label: "Apartment for rent", type: "apartment", tx: "rent" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={`/contact?type=${item.type}&transaction=${item.tx}`} className="text-text-secondary text-sm hover:text-accent transition-colors flex items-center gap-1">
                      <ChevronRight size={12} className="text-accent" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commercial */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="font-heading text-xl text-primary mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-accent" />
                Commercial
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Office for sale", type: "office", tx: "sale" },
                  { label: "Office for rent", type: "office", tx: "rent" },
                  { label: "Shop for sale", type: "shop", tx: "sale" },
                  { label: "Shop for rent", type: "shop", tx: "rent" },
                  { label: "Warehouse for sale", type: "warehouse", tx: "sale" },
                  { label: "Warehouse for rent", type: "warehouse", tx: "rent" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={`/contact?type=${item.type}&transaction=${item.tx}`} className="text-text-secondary text-sm hover:text-accent transition-colors flex items-center gap-1">
                      <ChevronRight size={12} className="text-accent" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* By Cities */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="font-heading text-xl text-primary mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-accent" />
                By City
              </h3>
              <ul className="space-y-2">
                {["Nairobi", "Mombasa", "Nakuru"].map((city) => (
                  <Fragment key={city}>
                    <li>
                      <Link href={`/contact?county=${city}&transaction=sale`} className="text-text-secondary text-sm hover:text-accent transition-colors flex items-center gap-1">
                        <ChevronRight size={12} className="text-accent" />
                        Properties for sale in {city}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/contact?county=${city}&transaction=rent`} className="text-text-secondary text-sm hover:text-accent transition-colors flex items-center gap-1">
                        <ChevronRight size={12} className="text-accent" />
                        Properties for rent in {city}
                      </Link>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>

            {/* By County */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="font-heading text-xl text-primary mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-accent" />
                By County
              </h3>
              <ul className="space-y-2">
                {["Nairobi", "Machakos", "Kiambu"].map((county) => (
                  <Fragment key={county}>
                    <li>
                      <Link href={`/contact?county=${county}&transaction=sale`} className="text-text-secondary text-sm hover:text-accent transition-colors flex items-center gap-1">
                        <ChevronRight size={12} className="text-accent" />
                        For sale in {county} County
                      </Link>
                    </li>
                    <li>
                      <Link href={`/contact?county=${county}&transaction=rent`} className="text-text-secondary text-sm hover:text-accent transition-colors flex items-center gap-1">
                        <ChevronRight size={12} className="text-accent" />
                        For rent in {county} County
                      </Link>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM DISCLAIMER ==================== */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="section-container text-center">
          <p className="text-text-secondary text-sm max-w-3xl mx-auto leading-relaxed">
            Ardhi Safi Ltd is a licensed member of the Estate Agents Registration Board (EARB Kenya).
            We are also committed to ensuring digital accessibility for individuals with disabilities.
            We are continuously working to improve the accessibility of our web experience for everyone,
            and we welcome feedback and accommodation requests. If you wish to report an issue or seek
            an accommodation, please{" "}
            <Link href="/contact" className="text-accent hover:underline font-medium">
              let us know
            </Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
