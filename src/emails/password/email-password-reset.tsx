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

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-black font-sans py-[40px]">
          <Container className="bg-[#151516] rounded-[12px] shadow-lg max-w-[600px] mx-auto p-[48px] border border-gray-800">
            {/* Header */}
            <Section className="text-center mb-[40px]">
              <Text className="text-[32px] font-bold text-white m-0 mb-[8px]">
                🔐 Password Reset
              </Text>
              <Text className="text-[16px] text-gray-400 m-0">
                Secure your account with a new password
              </Text>
            </Section>

            {/* Main Message */}
            <Section className="mb-[40px]">
              <Text className="text-[18px] text-gray-200 leading-[28px] mb-[24px] text-center">
                Hello <strong className="text-blue-400">{toName}</strong>,
              </Text>
              <Text className="text-[16px] text-gray-300 leading-[24px] text-center mb-[32px]">
                You have requested to reset your password. Click the button
                below to create a new secure password for your account.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[40px]">
              <Button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-[40px] py-[16px] rounded-[8px] text-[16px] no-underline shadow-lg box-border inline-block transition-all duration-200"
                href={url}
              >
                Reset My Password
              </Button>
            </Section>

            {/* Security Notice */}
            <Section className="bg-blue-900 bg-opacity-30 border-l-[4px] border-blue-500 p-[20px] rounded-r-[6px] mb-[32px]">
              <Text className="text-[14px] text-blue-200 leading-[20px] m-0">
                <strong>Security reminder:</strong> This link will expire in 2
                hour. If you didn&apos;t request this reset, please ignore this
                email and your password will remain unchanged.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-700 pt-[24px] text-center">
              <Text className="text-[12px] text-gray-500 leading-[18px] m-0 mb-[4px]">
                This is an automated message, please do not reply.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailPasswordReset.PreviewProps = {
  toName: "Takuma Yoshimi",
  url: "http://localhost:3000/password-reset/abc123",
};

export default EmailPasswordReset;
