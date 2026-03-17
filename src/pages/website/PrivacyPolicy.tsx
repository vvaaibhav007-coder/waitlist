const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-void text-white p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect your email address and country when you join our waitlist. 
              This information is stored securely in Supabase, our cloud database provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground">
              Your information is used solely to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Notify you when Claritee launches</li>
              <li>Send you updates about our product</li>
              <li>Improve our service based on user feedback</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
            <p className="text-muted-foreground">
              All your personal data is stored in Supabase, a secure cloud database service. 
              We do not share, sell, or rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information. 
              Access to your data is restricted to authorized personnel only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to request deletion of your personal data at any time. 
              Contact us at support@clarityai.app to request data deletion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at 
              support@clarityai.app
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <a 
            href="/" 
            className="text-[#6E9EEB] hover:underline"
          >
            ← Back to Waitlist
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
