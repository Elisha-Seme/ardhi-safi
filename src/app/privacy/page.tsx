import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Ardhi Safi Limited Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with Kenya's Data Protection Act 2019.",
};

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="section-container">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-heading text-primary mb-8">Privacy Policy</h1>

                    <div className="prose prose-lg max-w-none text-text-secondary space-y-8">
                        <section>
                            <h2 className="text-2xl font-heading text-primary mb-4">1. Introduction</h2>
                            <p>
                                Ardhi Safi Limited (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, in accordance with the Data Protection Act 2019 of Kenya.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading text-primary mb-4">2. Data We Collect</h2>
                            <p>We may collect personal information that you voluntarily provide to us when you:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Submit an inquiry through our contact forms.</li>
                                <li>Register for property alerts or newsletters.</li>
                                <li>Inquire about specific property listings.</li>
                                <li>Interact with our sales and property management teams.</li>
                            </ul>
                            <p className="mt-4">This data may include your name, email address, phone number, job title, and property preferences.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading text-primary mb-4">3. How We Use Your Data</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide and improve our real estate services.</li>
                                <li>Respond to your inquiries and fulfill your requests.</li>
                                <li>Send you marketing communications (where you have opted in).</li>
                                <li>Comply with legal obligations and EARB regulations.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading text-primary mb-4">4. Data Sharing & Security</h2>
                            <p>
                                We do not sell or rent your personal data to third parties. We may share your information with trusted service providers who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
                            </p>
                            <p className="mt-4">
                                We implement appropriate technical and organizational measures to secure your personal data against unauthorized access, loss, or destruction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading text-primary mb-4">5. Your Rights</h2>
                            <p>Under the Data Protection Act 2019, you have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access the personal data we hold about you.</li>
                                <li>Request correction of inaccurate data.</li>
                                <li>Request erasure of your data (&quot;right to be forgotten&quot;).</li>
                                <li>Object to or restrict the processing of your data.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading text-primary mb-4">6. Cookies</h2>
                            <p>
                                We use cookies to enhance your browsing experience. You can manage your cookie preferences through the consent banner on our website or through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading text-primary mb-4">7. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
                            </p>
                            <p className="mt-4 font-bold text-primary">
                                Ardhi Safi Limited<br />
                                Email: care@ardhisafi.co.ke<br />
                                Phone: +254 780 999 100
                            </p>
                        </section>

                        <p className="text-sm italic pt-8 border-t border-gray-100">
                            Last Updated: March 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
