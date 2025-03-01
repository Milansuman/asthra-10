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
} from "@react-email/components"
import { baseUrl } from "../utils";
import type { UserZodType, EventZodType, UserRegisteredEventZod, TransactionZodType } from '@/lib/validator';

type EventConfirmationProps = {
  user: UserZodType,
  event: EventZodType,
  userRegisteredEvent: UserRegisteredEventZod,
  transactions: TransactionZodType
};

export default function EventConfirmationEmail({ user, event, userRegisteredEvent, transactions }: EventConfirmationProps) {
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

              {event.eventType === 'ASTHRA_PASS_EVENT' ? (
                <Text>This is an Asthra Pass event, so you can attend the event without any additional registration.</Text>
              ) : (
                <>
                  <Text className="text-lg font-extrabold text-center">Transaction Details</Text>
                  <Section className="bg-white border-2 border-solid border-[#5B9BE6] py-[2%] px-[3%] max-w-[400px]">
                    <Row>
                      <Column align="left" className="w-1/2">
                        <Text className="m-0 font-extrabold">₹ {transactions.amount}/-</Text>
                        <Text className="m-0 mt-[2%] text-xs">Transaction ID:</Text>
                        <Text className="m-0 mt-[2%] text-xs">{userRegisteredEvent.transactionId}</Text>
                        <Text className="m-0 font-extrabold mt-[8%]">{user.name}</Text>
                        <Text className="m-0 text-xs">{user.email}</Text>
                        <Text className="m-0 mt-[2%] text-xs">{user.number ?? ''}</Text>
                      </Column>
                      <Column align="right" className="w-1/2">
                        <Img src={`${baseUrl}/api/qr/${userRegisteredEvent.registrationId}`} className="w-[80%] object-contain" />
                      </Column>
                    </Row>
                  </Section>
                </>
              )}

              <Text>If you require any assistance or have any queries, please do not hesitate to contact us.</Text>
              <Text>Thank you for being a part of Asthra 9.0. We look forward to welcoming you.</Text>

              <Text className="my-5">
                Best regards,
                <br />
                Asthra Team
              </Text>

              <Section className="mt-10">
                <Row>
                  <Column align="left" className="w-28">
                    <Text className="m-0 text-[#50c2ff] text-base font-extrabold">Follow us on:</Text>
                    <Row>
                      <Column>
                        <Link href="https://asthra.sjcetpalai.ac.in">
                          <Img src={`${baseUrl}/images/social-web.png`} width="25" height="25" alt="Globe" className="object-contain" />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="https://www.facebook.com/asthra.sjcet">
                          <Img src={`${baseUrl}/images/social-facebook.png`} width="25" height="25" alt="Facebook" className="object-contain" />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="https://instagram.com/asthra_sjcet">
                          <Img src={`${baseUrl}/images/social-instagram.png`} width="25" height="25" alt="Instagram" className="object-contain" />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="https://www.linkedin.com/showcase/asthra-sjcet">
                          <Img src={`${baseUrl}/images/social-linkedin.png`} width="25" height="25" alt="LinkedIn" className="object-contain" />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="https://whatsapp.com/channel/0029Vb814WN8PgsMKbk1gF0d">
                          <Img src={`${baseUrl}/images/social-whatsapp.png`} width="25" height="25" alt="Whatsapp" className="object-contain" />
                        </Link>
                      </Column>
                    </Row>
                  </Column>
                  <Column align="right">
                    <Link href="https://asthra.sjcetpalai.ac.in">
                      <Img src={`${baseUrl}/images/asthra-glass.png`} className="w-[120px] h-[50px] m-0 object-cover" alt="Asthra Logo" />
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Container>

          </Container>
        </Body>
      </Tailwind >
    </Html >
  )
}