import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

type EmailUserSignupReportProps = {
  signupCount: number;
};

const EmailUserSignupReport = ({ signupCount }: EmailUserSignupReportProps) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-black font-sans py-[40px]">
          <Container className="bg-[#151516] rounded-[12px] shadow-lg max-w-[600px] mx-auto p-[48px] border border-gray-800">
            {/* Header */}
            <Section className="text-center mb-[40px]">
              <Text className="text-[32px] font-bold text-white m-0 mb-[8px]">
                📊 User Signup Report
              </Text>
              <Text className="text-[16px] text-gray-400 m-0">
                Last 7 Days Performance Summary
              </Text>
            </Section>

            {/* Main Statistics */}
            <Section className="mb-[40px]">
              <Text className="text-[18px] text-gray-200 leading-[28px] mb-[24px] text-center">
                Hello <strong className="text-blue-400">Takuma</strong>,
              </Text>

              {/* Key Metric */}
              <Section className="bg-blue-900 bg-opacity-30 border border-blue-500 p-[32px] rounded-[12px] mb-[32px] text-center">
                <Text className="text-[48px] font-bold text-blue-400 m-0 mb-[8px]">
                  {signupCount}
                </Text>
                <Text className="text-[18px] text-gray-200 m-0 mb-[4px]">
                  New Users Signed Up
                </Text>
                <Text className="text-[14px] text-gray-400 m-0">
                  in the last Last 7 Days
                </Text>
              </Section>

              {/* Summary Message */}
              <Section className="mb-[32px]">
                <Text className="text-[16px] text-gray-300 leading-[24px] text-center mb-[24px]">
                  Thank you for growing your platform! This report shows the
                  user signup activity for the specified timeframe.
                </Text>
              </Section>
            </Section>

            {/* Insights Section */}
            <Section className="bg-green-900 bg-opacity-30 border-l-[4px] border-green-500 p-[20px] rounded-r-[6px] mb-[32px]">
              <Text className="text-[14px] text-green-200 leading-[20px] m-0">
                <strong>Great work!</strong> Keep monitoring your signup trends
                to optimize your user acquisition strategy.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-700 pt-[24px] text-center">
              <Text className="text-[12px] text-gray-500 leading-[18px] m-0 mb-[4px]">
                This is an automated signup report.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[18px] m-0">
                Generated automatically based on your user data.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailUserSignupReport.PreviewProps = {
  signupCount: 100,
};

export default EmailUserSignupReport;
