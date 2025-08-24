export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-primary">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <p className="text-sm text-primaryLight mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <p className="text-base leading-relaxed">
              This Privacy Policy describes how Playlister ("we," "our," or "us") collects, uses, and protects your
              information when you use our YouTube playlist viewing service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

            <h3 className="text-xl font-medium mb-3">Google Account Information</h3>
            <p className="mb-4">When you sign in with Google, we receive:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Your Google account email address</li>
              <li>Basic profile information (name, profile picture)</li>
              <li>Access tokens to authenticate with YouTube on your behalf</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">YouTube Data</h3>
            <p className="mb-4">Through the YouTube API, we access:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Your YouTube playlists (titles, descriptions, thumbnails)</li>
              <li>Playlist items and video information</li>
              <li>Playlist metadata (creation dates, privacy settings)</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Browser type and version</li>
              <li>IP address</li>
              <li>Device information</li>
              <li>Usage patterns and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Functionality:</strong> To display your YouTube playlists and enable playlist viewing
              </li>
              <li>
                <strong>Authentication:</strong> To verify your identity and maintain your session
              </li>
              <li>
                <strong>Service Improvement:</strong> To analyze usage patterns and improve our service
              </li>
              <li>
                <strong>Security:</strong> To protect against unauthorized access and abuse
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>

            <h3 className="text-xl font-medium mb-3">Local Storage</h3>
            <p className="mb-4">
              Access tokens are stored temporarily in secure HTTP-only cookies during your session. These tokens are
              automatically deleted when you log out or revoke access.
            </p>

            <h3 className="text-xl font-medium mb-3">No Permanent Data Storage</h3>
            <p className="mb-4">
              We do not permanently store your YouTube data, playlists, or personal information on our servers. All data
              is fetched in real-time from YouTube's API when you use our service.
            </p>

            <h3 className="text-xl font-medium mb-3">Security Measures</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure OAuth 2.0 authentication flow</li>
              <li>Regular security updates and monitoring</li>
              <li>Limited scope permissions (read-only access to YouTube data)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>

            <h3 className="text-xl font-medium mb-3">Google/YouTube</h3>
            <p className="mb-4">
              Our service integrates with Google's YouTube API. Your use of YouTube data through our service is also
              governed by:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>
                <a href="https://policies.google.com/privacy" className="text-blue-500 hover:underline">
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/t/terms" className="text-blue-500 hover:underline">
                  YouTube Terms of Service
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>

            <h3 className="text-xl font-medium mb-3">Access Control</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>
                <strong>Revoke Access:</strong> You can revoke our access to your YouTube data at any time by clicking
                "Revoke access" or through your Google Account settings
              </li>
              <li>
                <strong>Data Deletion:</strong> When you revoke access, all stored tokens are immediately deleted
              </li>
              <li>
                <strong>Limited Scope:</strong> We only request read-only access to your YouTube playlists
              </li>
            </ul>

            <h3 className="text-xl font-medium mb-3">Google Account Management</h3>
            <p className="mb-4">
              You can manage permissions granted to our application through your{" "}
              <a href="https://myaccount.google.com/permissions" className="text-blue-500 hover:underline">
                Google Account permissions page
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties. Your YouTube data
              is only used to provide the playlist viewing functionality and is not shared with any external parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
            <p className="mb-4">We use essential cookies to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Maintain your authentication session</li>
              <li>Store temporary access tokens securely</li>
              <li>Remember your preferences during your session</li>
            </ul>
            <p>
              These cookies are essential for the service to function and are automatically deleted when you log out.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify users of any material changes by
              updating the "Last updated" date at the top of this policy. Your continued use of the service after any
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
              through our support channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Compliance</h2>
            <p className="mb-4">This service complies with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Google API Services User Data Policy</li>
              <li>YouTube API Terms of Service</li>
              <li>General Data Protection Regulation (GDPR) where applicable</li>
              <li>California Consumer Privacy Act (CCPA) where applicable</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
