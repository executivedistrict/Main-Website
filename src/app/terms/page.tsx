import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalCallout,
  LegalContent,
  LegalDivider,
} from "@/components/sections/legal/legal-content";
import { LegalHero } from "@/components/sections/legal/legal-hero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Executive District Terms and Conditions. Terms governing your use of our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <LegalHero
        title="Terms & Conditions"
        lastUpdated="Last updated: February 21, 2026"
      />

      <LegalContent>
        <p>
          These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the
          Executive District website at executivedistrict.com (the &quot;Site&quot;), as well as
          any related services, content, assessments, tools, and communications provided by
          Executive District (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or
          using the Site, you agree to be bound by these Terms.
        </p>

        <p>
          If you do not agree with these Terms, you must discontinue use of the Site immediately.
        </p>

        <LegalDivider />

        <h2>1. Overview of Services</h2>

        <p>
          Executive District provides fractional C-suite executive services, business assessments,
          and related consulting and operational services to business owners and companies,
          primarily those operating between $500K and $50M in annual revenue.
        </p>

        <p>
          The Site provides general information about our services, educational content,
          diagnostic tools, and the ability to schedule discovery calls with our team. Information
          presented on the Site is for informational purposes and does not constitute a binding
          offer of services.
        </p>

        <p>
          Specific engagement terms, scope of work, deliverables, compensation, and other terms
          related to our fractional executive services are governed by separate engagement
          agreements entered into between Executive District and each client.
        </p>

        <LegalDivider />

        <h2>2. Eligibility</h2>

        <p>
          The Site and our services are intended for use by individuals who are at least 18 years
          of age and who have the legal capacity to enter into binding agreements. By using the
          Site, you represent that you meet these eligibility requirements.
        </p>

        <p>
          Our services are designed for business owners, executives, and decision-makers. We
          reserve the right to decline or discontinue services to any individual or entity at our
          discretion.
        </p>

        <LegalDivider />

        <h2>3. Use of the Site</h2>

        <h3>Permitted Use</h3>
        <p>
          You may use the Site for its intended purpose: to learn about Executive
          District&apos;s services, access educational content, complete assessments or diagnostic
          tools, subscribe to our communications, and schedule discovery calls.
        </p>

        <h3>Prohibited Use</h3>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the Site for any unlawful purpose or in violation of any applicable laws or
            regulations
          </li>
          <li>
            Attempt to gain unauthorized access to any portion of the Site, its systems, or
            networks
          </li>
          <li>
            Reproduce, distribute, modify, create derivative works of, publicly display, or
            publicly perform any content from the Site without our prior written consent
          </li>
          <li>
            Use automated tools, scripts, bots, or scraping mechanisms to access, collect, or
            interact with the Site
          </li>
          <li>Submit false, misleading, or fraudulent information through any form on the Site</li>
          <li>
            Interfere with or disrupt the operation of the Site or the servers or networks used to
            make the Site available
          </li>
          <li>Use the Site to collect personal information about other users</li>
          <li>
            Use the Site in any manner that could damage, disable, overburden, or impair the Site
          </li>
        </ul>

        <LegalDivider />

        <h2>4. Intellectual Property</h2>

        <p>
          All content on the Site — including text, graphics, logos, images, design elements,
          assessments, diagnostic tools, frameworks, methodologies, and software — is the property
          of Executive District or its licensors and is protected by United States and
          international copyright, trademark, and intellectual property laws.
        </p>

        <p>
          The Executive District name, logo, wordmark, and all related names, logos, product and
          service names, designs, and slogans are trademarks of Executive District. You may not
          use these marks without our prior written permission.
        </p>

        <p>
          You are granted a limited, non-exclusive, non-transferable, revocable license to access
          and use the Site for its intended purpose. This license does not include the right to
          reproduce, distribute, modify, or create derivative works from any content on the Site.
        </p>

        <LegalDivider />

        <h2>5. Assessments and Diagnostic Tools</h2>

        <p>
          Our Site may include business assessments, scorecards, diagnostic tools, and similar
          interactive features. These tools are provided for informational and educational
          purposes only.
        </p>

        <LegalCallout>
          <p>
            <strong>Important:</strong> Assessment results, scores, and recommendations are
            general in nature and should not be construed as professional business, legal,
            financial, or tax advice. They are designed to provide a preliminary perspective on
            potential operational gaps and should not be relied upon as the sole basis for making
            business decisions. For specific advice, consult with qualified professionals.
          </p>
        </LegalCallout>

        <p>
          By completing an assessment, you consent to Executive District collecting, storing, and
          using your responses in accordance with our <Link href="/privacy">Privacy Policy</Link>.
          Assessment results may be used by our team to personalize future communications and
          prepare for discovery calls.
        </p>

        <LegalDivider />

        <h2>6. Discovery Calls and Consultations</h2>

        <p>When you book a discovery call through our Site, you agree to the following:</p>
        <ul>
          <li>
            You will provide accurate contact information and be available at the scheduled time
          </li>
          <li>Discovery calls are complimentary and carry no obligation to purchase services</li>
          <li>
            The content of discovery calls is confidential and will not be shared outside of the
            Executive District team without your consent
          </li>
          <li>
            Insights, suggestions, or observations shared during a discovery call are preliminary
            in nature and do not constitute formal advice or create a client-service relationship
          </li>
        </ul>

        <p>
          We reserve the right to reschedule or cancel discovery calls at our discretion. We will
          make reasonable efforts to provide advance notice of any changes.
        </p>

        <LegalDivider />

        <h2>7. Email and Text Message Communications</h2>

        <p>
          By submitting your email address and/or phone number through forms on our Site, you
          consent to receiving communications from Executive District, including:
        </p>
        <ul>
          <li>
            <strong>Email:</strong> Newsletters, educational content, case studies, service
            information, and promotional communications
          </li>
          <li>
            <strong>Text messages (SMS):</strong> Appointment confirmations, reminders, follow-up
            messages, and service-related communications
          </li>
        </ul>

        <p>
          <strong>Opt-out:</strong> You may opt out of email communications at any time by
          clicking the &quot;unsubscribe&quot; link in any email. You may opt out of text messages
          by replying STOP to any message. Standard message and data rates may apply for text
          messages.
        </p>

        <p>
          <strong>Frequency:</strong> Email frequency is typically 1–3 times per week. Text
          message frequency varies based on appointment scheduling and is typically limited to
          appointment-related communications.
        </p>

        <p>
          By providing your phone number, you confirm that you are the owner or authorized user of
          the phone number provided and that you consent to receive text messages at that number
          from Executive District.
        </p>

        <LegalDivider />

        <h2>8. Disclaimer of Warranties</h2>

        <p>
          THE SITE AND ALL CONTENT, SERVICES, TOOLS, ASSESSMENTS, AND MATERIALS PROVIDED THROUGH
          THE SITE ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
          OF ANY KIND, EITHER EXPRESS OR IMPLIED.
        </p>

        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, EXECUTIVE DISTRICT DISCLAIMS ALL WARRANTIES,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
        </p>

        <p>We do not warrant that:</p>
        <ul>
          <li>The Site will be available at all times, uninterrupted, or error-free</li>
          <li>The information on the Site is complete, accurate, or current</li>
          <li>
            Any results or outcomes described in case studies, testimonials, or other content will
            be achieved by any other person or business
          </li>
          <li>
            Assessment results or recommendations will be applicable to your specific business
            situation
          </li>
        </ul>

        <LegalDivider />

        <h2>9. Limitation of Liability</h2>

        <p>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL EXECUTIVE DISTRICT,
          ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OPERATORS, CONTRACTORS, OR AFFILIATES BE
          LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
          INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, BUSINESS, OR GOODWILL, ARISING OUT
          OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO USE) THE SITE OR OUR
          SERVICES.
        </p>

        <p>
          IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT PAID BY
          YOU, IF ANY, TO EXECUTIVE DISTRICT DURING THE SIX (6) MONTHS PRIOR TO THE DATE THE CLAIM
          AROSE.
        </p>

        <p>
          THIS LIMITATION APPLIES REGARDLESS OF THE LEGAL THEORY ON WHICH THE CLAIM IS BASED,
          INCLUDING CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER THEORY.
        </p>

        <LegalDivider />

        <h2>10. Indemnification</h2>

        <p>
          You agree to indemnify, defend, and hold harmless Executive District, its officers,
          directors, employees, agents, operators, contractors, and affiliates from and against
          any claims, liabilities, damages, losses, costs, and expenses (including reasonable
          attorneys&apos; fees) arising out of or related to your use of the Site, your violation
          of these Terms, or your violation of any rights of a third party.
        </p>

        <LegalDivider />

        <h2>11. Earnings and Results Disclaimer</h2>

        <p>
          Case studies, client results, and testimonials presented on the Site represent the
          experiences of specific clients under specific circumstances. These results are not
          typical, and individual results will vary based on numerous factors including but not
          limited to business model, industry, market conditions, management decisions, and
          execution.
        </p>

        <p>
          Executive District does not guarantee any specific results, outcomes, revenue increases,
          profit improvements, or business performance. Past performance is not indicative of
          future results. Any forward-looking statements are based on estimates and assumptions
          and may not be realized.
        </p>

        <LegalDivider />

        <h2>12. Third-Party Links</h2>

        <p>
          The Site may contain links to third-party websites, services, or resources. These links
          are provided for your convenience only. We do not endorse, control, or assume
          responsibility for the content, privacy policies, or practices of any third-party sites.
          Your use of third-party sites is at your own risk and subject to the terms and policies
          of those sites.
        </p>

        <LegalDivider />

        <h2>13. Governing Law and Dispute Resolution</h2>

        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State
          of Michigan, without regard to its conflict of law principles.
        </p>

        <p>
          Any dispute arising out of or related to these Terms or your use of the Site shall be
          resolved through binding arbitration conducted in Kent County, Michigan, in accordance
          with the rules of the American Arbitration Association. The arbitrator&apos;s decision
          shall be final and binding.
        </p>

        <p>
          Notwithstanding the foregoing, either party may seek injunctive or equitable relief in a
          court of competent jurisdiction to protect its intellectual property rights or to
          prevent irreparable harm.
        </p>

        <p>
          You agree that any claims arising out of or related to these Terms must be brought
          within one (1) year after the cause of action arises, or such claims shall be
          permanently barred.
        </p>

        <LegalDivider />

        <h2>14. Severability</h2>

        <p>
          If any provision of these Terms is found to be unenforceable or invalid by a court of
          competent jurisdiction, that provision shall be limited or eliminated to the minimum
          extent necessary, and the remaining provisions shall continue in full force and effect.
        </p>

        <LegalDivider />

        <h2>15. Changes to These Terms</h2>

        <p>
          We reserve the right to modify or update these Terms at any time. When we make changes,
          we will update the &quot;Last updated&quot; date at the top of this page. Your continued
          use of the Site following any changes constitutes your acceptance of the revised Terms.
          We encourage you to review these Terms periodically.
        </p>

        <LegalDivider />

        <h2>16. Entire Agreement</h2>

        <p>
          These Terms, together with our <Link href="/privacy">Privacy Policy</Link>, constitute
          the entire agreement between you and Executive District regarding your use of the Site.
          These Terms supersede all prior agreements, understandings, and communications, whether
          written or oral, relating to the subject matter herein.
        </p>

        <p>
          These Terms do not govern the provision of fractional executive services, which are
          subject to separate engagement agreements.
        </p>

        <LegalDivider />

        <h2>17. Contact Us</h2>

        <p>If you have questions about these Terms, please contact us at:</p>

        <p>
          <strong>Executive District</strong>
          <br />
          Email: <a href="mailto:Hello@executivedistrict.com">hello@executivedistrict.com</a>
          <br />
          Website: executivedistrict.com
        </p>
      </LegalContent>
    </>
  );
}
