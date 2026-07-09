import type { Metadata } from "next";
import {
  LegalCallout,
  LegalContent,
  LegalDivider,
} from "@/components/sections/legal/legal-content";
import { LegalHero } from "@/components/sections/legal/legal-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Executive District Privacy Policy. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <LegalHero title="Privacy Policy" lastUpdated="Last updated: February 21, 2026" />

      <LegalContent>
        <p>
          Executive District (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects the
          privacy of every individual who visits our website, uses our services, or communicates
          with our team. This Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website at executivedistrict.com (the
          &quot;Site&quot;), engage with our email communications, book a discovery call, or
          otherwise interact with our business.
        </p>

        <p>
          Please read this Privacy Policy carefully. By accessing or using the Site or our
          services, you acknowledge that you have read, understood, and agree to be bound by this
          Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not
          access the Site or use our services.
        </p>

        <LegalCallout>
          <p>
            <strong>Plain-language summary:</strong> We collect basic contact and business
            information so we can communicate with you, deliver the services you&apos;ve
            requested, and improve your experience. We never sell your personal data to third
            parties. Period.
          </p>
        </LegalCallout>

        <LegalDivider />

        <h2>1. Information We Collect</h2>

        <h3>Information You Provide Directly</h3>
        <p>We collect information that you voluntarily provide to us when you:</p>
        <ul>
          <li>
            Complete a form on our website (such as a contact form, assessment, or opt-in form)
          </li>
          <li>Book a discovery call through our scheduling system</li>
          <li>Subscribe to our email list or newsletter</li>
          <li>Respond to a survey, diagnostic tool, or questionnaire</li>
          <li>Communicate with us via email, phone, text message, or other channels</li>
          <li>Engage with us as a client or prospective client</li>
        </ul>

        <p>This information may include:</p>
        <ul>
          <li>
            <strong>Personal identifiers:</strong> name, email address, phone number
          </li>
          <li>
            <strong>Business information:</strong> company name, job title, industry, approximate
            annual revenue, number of employees, and business challenges or goals you choose to
            share
          </li>
          <li>
            <strong>Communication records:</strong> contents of emails, text messages, call notes,
            and other correspondence with our team
          </li>
          <li>
            <strong>Assessment responses:</strong> answers you provide in any diagnostic
            assessments, scorecards, or intake forms
          </li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <p>
          When you visit our Site, certain information is collected automatically through cookies,
          web beacons, tracking pixels, and similar technologies. This may include:
        </p>
        <ul>
          <li>
            <strong>Device information:</strong> browser type, operating system, device type,
            screen resolution
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, time spent on pages, click patterns,
            referring URL, exit pages
          </li>
          <li>
            <strong>Location data:</strong> approximate geographic location based on IP address
          </li>
          <li>
            <strong>Advertising data:</strong> information from advertising platforms (such as
            Meta/Facebook) when you arrive at our Site through a paid advertisement, including ad
            click data and campaign identifiers
          </li>
        </ul>

        <h3>Information from Third-Party Sources</h3>
        <p>
          We may receive information about you from third-party platforms and services, including:
        </p>
        <ul>
          <li>
            Advertising platforms (Meta/Facebook, Google Ads) that provide campaign performance
            data
          </li>
          <li>Analytics services (Google Analytics) that provide aggregate usage data</li>
          <li>
            Our CRM and marketing platform (Go High Level) which processes form submissions,
            appointment bookings, and email/text message communications
          </li>
        </ul>

        <LegalDivider />

        <h2>2. How We Use Your Information</h2>

        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            <strong>To deliver services:</strong> Providing the fractional C-suite services,
            assessments, consultations, and other services you have requested or engaged
          </li>
          <li>
            <strong>To communicate with you:</strong> Responding to your inquiries, sending
            appointment confirmations and reminders, delivering email newsletters you have opted
            into, and sending service-related communications via email and text message
          </li>
          <li>
            <strong>To personalize your experience:</strong> Tailoring our communications and
            content based on the business information and challenges you have shared
          </li>
          <li>
            <strong>To improve our services:</strong> Analyzing usage patterns, assessment
            results, and feedback to improve our website, services, and client experience
          </li>
          <li>
            <strong>To market our services:</strong> Sending you educational content, case
            studies, and information about our services via email (with your consent and subject
            to your right to opt out at any time)
          </li>
          <li>
            <strong>To run and optimize advertising:</strong> Using tracking pixels and conversion
            data to measure the effectiveness of our advertising campaigns and deliver relevant
            advertisements
          </li>
          <li>
            <strong>To protect our business:</strong> Detecting and preventing fraud, abuse, and
            security issues
          </li>
          <li>
            <strong>To comply with legal obligations:</strong> Meeting our regulatory and legal
            requirements
          </li>
        </ul>

        <LegalDivider />

        <h2>3. How We Share Your Information</h2>

        <p>
          We do not sell, rent, or trade your personal information to third parties for their
          marketing purposes. We may share your information in the following limited
          circumstances:
        </p>
        <ul>
          <li>
            <strong>Service providers:</strong> We share information with trusted third-party
            service providers who assist us in operating our business, including our CRM platform
            (Go High Level), email service providers, payment processors, analytics providers
            (Google Analytics), and advertising platforms (Meta/Facebook). These providers are
            contractually obligated to use your information only for the purposes we specify.
          </li>
          <li>
            <strong>Executive District operators:</strong> When you engage our services, relevant
            business information may be shared with the fractional executive(s) assigned to your
            engagement. All operators are bound by confidentiality obligations.
          </li>
          <li>
            <strong>Legal requirements:</strong> We may disclose your information if required by
            law, regulation, subpoena, court order, or other governmental request.
          </li>
          <li>
            <strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of
            all or a portion of our assets, your information may be transferred as part of that
            transaction. We will notify you of any such change in ownership or control of your
            personal information.
          </li>
          <li>
            <strong>With your consent:</strong> We may share your information with third parties
            when you have given us explicit consent to do so.
          </li>
        </ul>

        <LegalDivider />

        <h2>4. Cookies and Tracking Technologies</h2>

        <p>
          We use cookies and similar tracking technologies to collect and store information about
          your interactions with our Site. These include:
        </p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> Required for the Site to function properly (e.g.,
            maintaining your session, form submissions)
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand how visitors interact with the
            Site (e.g., Google Analytics)
          </li>
          <li>
            <strong>Advertising cookies:</strong> Used to deliver and measure the effectiveness of
            advertising campaigns (e.g., Meta Pixel, Google Ads conversion tracking)
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling certain cookies may
          affect the functionality of the Site.
        </p>

        <LegalDivider />

        <h2>5. Email and Text Message Communications</h2>

        <p>
          When you provide your email address through our forms, book a call, or otherwise opt in,
          you consent to receiving email communications from us, including educational content,
          newsletters, service updates, and information about our services.
        </p>

        <p>
          When you provide your phone number and consent to text messaging (such as through a call
          booking form), you consent to receiving text messages from us, including appointment
          confirmations, reminders, and follow-up communications.
        </p>

        <LegalCallout>
          <p>
            <strong>Your right to opt out:</strong> You may opt out of email communications at any
            time by clicking the &quot;unsubscribe&quot; link at the bottom of any email. You may
            opt out of text messages by replying STOP to any text message. We will honor all
            opt-out requests promptly. Opting out of marketing communications will not affect
            service-related communications for active engagements.
          </p>
        </LegalCallout>

        <p>
          <strong>Message frequency:</strong> Email frequency varies but typically ranges from 1–3
          emails per week. Text message frequency varies based on appointment scheduling activity.
          Standard message and data rates may apply.
        </p>

        <LegalDivider />

        <h2>6. Data Security</h2>

        <p>
          We implement reasonable administrative, technical, and physical security measures to
          protect your personal information from unauthorized access, use, alteration, and
          disclosure. These measures include encrypted data transmission (SSL/TLS), access
          controls within our CRM and marketing platforms, and confidentiality obligations for our
          team and operators.
        </p>

        <p>
          However, no method of electronic transmission or storage is 100% secure. While we strive
          to protect your personal information, we cannot guarantee its absolute security.
        </p>

        <LegalDivider />

        <h2>7. Data Retention</h2>

        <p>
          We retain your personal information for as long as necessary to fulfill the purposes
          described in this Privacy Policy, maintain our business relationship, comply with legal
          obligations, resolve disputes, and enforce our agreements. When your information is no
          longer needed, we will securely delete or anonymize it.
        </p>

        <p>
          If you request deletion of your personal information, we will comply within a reasonable
          timeframe, subject to any legal obligations that require us to retain certain records.
        </p>

        <LegalDivider />

        <h2>8. Your Rights and Choices</h2>

        <p>
          Depending on your jurisdiction, you may have the following rights regarding your
          personal information:
        </p>
        <ul>
          <li>
            <strong>Access:</strong> Request a copy of the personal information we hold about you
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate or incomplete personal
            information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal information, subject to
            certain exceptions
          </li>
          <li>
            <strong>Opt-out:</strong> Opt out of marketing communications at any time
          </li>
          <li>
            <strong>Data portability:</strong> Request a portable copy of your personal
            information in a commonly used format
          </li>
          <li>
            <strong>Restrict processing:</strong> Request that we restrict the processing of your
            personal information under certain circumstances
          </li>
        </ul>

        <p>
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:Zach@carlewcapital.com">Zach@carlewcapital.com</a>. We will respond to
          your request within 30 days.
        </p>

        <h3>California Residents</h3>
        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA) provides
          you with additional rights regarding your personal information, including the right to
          know what personal information we collect, the right to delete your personal
          information, and the right to opt out of the sale of personal information. We do not
          sell personal information as defined under the CCPA.
        </p>

        <LegalDivider />

        <h2>9. Third-Party Links</h2>

        <p>
          Our Site may contain links to third-party websites and services. We are not responsible
          for the privacy practices of these third parties. We encourage you to review the privacy
          policies of any third-party sites you visit.
        </p>

        <LegalDivider />

        <h2>10. Children&apos;s Privacy</h2>

        <p>
          Our Site and services are not intended for individuals under the age of 18. We do not
          knowingly collect personal information from children. If we become aware that we have
          collected personal information from a child under 18, we will take steps to delete that
          information promptly.
        </p>

        <LegalDivider />

        <h2>11. Changes to This Privacy Policy</h2>

        <p>
          We reserve the right to update or modify this Privacy Policy at any time. When we make
          changes, we will update the &quot;Last updated&quot; date at the top of this page. We
          encourage you to review this Privacy Policy periodically. Your continued use of the Site
          or our services after any changes constitutes your acceptance of the updated Privacy
          Policy.
        </p>

        <LegalDivider />

        <h2>12. Contact Us</h2>

        <p>
          If you have questions or concerns about this Privacy Policy or our data practices,
          please contact us at:
        </p>

        <p>
          <strong>Executive District</strong>
          <br />
          Email: <a href="mailto:Zach@carlewcapital.com">Zach@carlewcapital.com</a>
          <br />
          Website: executivedistrict.com
        </p>
      </LegalContent>
    </>
  );
}
