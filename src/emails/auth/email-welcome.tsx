import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

type WelcomeEmailProps = {
  toName: string;
  loginUrl: string;
};

const WelcomeEmail = ({ toName, loginUrl }: WelcomeEmailProps) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-black font-sans py-[40px]">
          <Container className="bg-[#151516] rounded-[12px] shadow-lg max-w-[600px] mx-auto p-[48px] border border-gray-800">
            {/* Header */}
            <Section className="text-center mb-[40px]">
              <Text className="text-[32px] font-bold text-white m-0 mb-[8px]">
                🎫 Welcome to TicketBounty!
              </Text>
              <Text className="text-[16px] text-gray-400 m-0">
                Your ticket marketplace adventure begins here
              </Text>
            </Section>

            {/* Main Message */}
            <Section className="mb-[40px]">
              <Text className="text-[18px] text-gray-200 leading-[28px] mb-[24px] text-center">
                Hi <strong className="text-blue-400">{toName}</strong>, welcome
                to TicketBounty!
              </Text>
              <Text className="text-[16px] text-gray-300 leading-[24px] text-center mb-[32px]">
                We&apos;re excited to have you on board. Let us know if you ever
                have questions!
              </Text>
            </Section>

            {/* Get Started Button */}
            <Section className="text-center mb-[40px]">
              <Button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-[40px] py-[16px] rounded-[8px] text-[16px] no-underline shadow-lg box-border inline-block transition-all duration-200"
                href={loginUrl}
              >
                Get Started
              </Button>
            </Section>

            {/* Welcome Notice */}
            <Section className="bg-blue-900 bg-opacity-30 border-l-[4px] border-blue-500 p-[20px] rounded-r-[6px] mb-[32px]">
              <Text className="text-[14px] text-blue-200 leading-[20px] m-0">
                <strong>Ready to explore?</strong> Start buying and selling
                tickets with confidence. Our platform ensures secure
                transactions and authentic tickets for all your favorite events.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-700 pt-[24px] text-center">
              <Text className="text-[12px] text-gray-500 leading-[18px] m-0 mb-[4px]">
                Need help? Contact our support team anytime.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[18px] m-0">
                TicketBounty Team • 123 Event Street, Concert City, CA 90210
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  toName: "Takuma Yoshimi",
  loginUrl: "http://localhost:3000/sign-in",
};

export default WelcomeEmail;
