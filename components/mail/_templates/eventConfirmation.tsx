import {
  Html,
  Head,
  Tailwind,
  Body,
  Container,
  Font,
  Heading,
  Img,
  Preview,
  Section,
  Text,
  Link,
  Row,
  Column,
} from "@react-email/components";
import { baseUrl } from "../utils";
import FooterSection from "./_components/footerSection";
import MarkdownSection from "./_components/markdownSection";
import EventSection from "./_components/eventSection";
import type { EventConfirmationProps } from '../types';

export default function EventConfirmationEmail({ user, event, userRegisteredEvent }: EventConfirmationProps) {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light only" />
        <Font
          fontFamily="ambit"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: `${baseUrl}/fonts/ambit/Ambit-Regular.woff2`,
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>ASTHRA 9.0 Event Confirm</Preview>
      <Tailwind>
        <Body
          style={{
            backgroundImage: `url(${baseUrl}/images/bg.webp)`,
          }}
          className={("bg-[#0A0A19] font-ambit bg-cover bg-center")}
        >
          <Container className="mx-auto my-4">
            <Section className="mt-8 px-2">
              <Row>
                <Column align="left">
                  <Link href="https://asthra.sjcetpalai.ac.in">
                    <Img src={`${baseUrl}/images/asthra.png`} width="100" height="50" alt="Asthra SJCET Logo" className="object-contain" />
                  </Link>
                </Column>
                <Column align="right">
                  <Link href="https://sjcetpalai.ac.in">
                    <Img src={`${baseUrl}/images/sjcet.png`} width="150" height="50" alt="SJCET Logo" className="object-contain" />
                  </Link>
                </Column>
              </Row>
            </Section>

            <Heading className="text-[#ffffff] text-5xl font-extrabold text-center mt-16">
              ASTHRA 9.0
            </Heading>

            <Container className="bg-blue-100 opacity-90 rounded-2xl text-[#1A3A5A] w-[99%] my-6 p-6">
              <Text className="text-lg pb-4">Hello {user.name},</Text>

              <Text>We’re excited to confirm your registration for {event.name}! Your registration was successful and we can’t wait to have you join us.</Text>

              <EventSection event={event} />

              <MarkdownSection secret={event.secret as string} />

              <Text>If you require any assistance or have any queries, please do not hesitate to contact us.</Text>
              <Text>Thank you for being a part of Asthra 9.0. We look forward to welcoming you.</Text>

              <Text className="my-5">
                Best regards,
                <br />
                Asthra Team
              </Text>

              <FooterSection />
            </Container>

          </Container>
        </Body>
      </Tailwind >
    </Html >
  )
}