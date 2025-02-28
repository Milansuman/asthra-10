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

interface EventConfirmationProps {
  user: UserZodType;
  transactions: TransactionZodType;
  event: EventZodType;
  userRegisteredEvent: UserRegisteredEventZod;
};

export default function EventConfirmationEmail({ event, transactions, user, userRegisteredEvent }: EventConfirmationProps) {
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
      <Preview>ASTHRA 9.0 Registration Confirmation</Preview>
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

              <Section className="mt-10">
                <Row>
                  <Column align="left" className="w-28">
                    <Text className="m-0 text-[#50c2ff] text-base font-extrabold">Follow us on:</Text>
                    <Row>
                      <Column>
                        <Link href="https://sjcetpalai.ac.in">
                          <Img src={`${baseUrl}/images/social-web.png`} width="25" height="25" alt="Globe" className="object-contain" />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="https://www.linkedin.com/school/sjcetpalai/">
                          <Img src={`${baseUrl}/images/social-linkedin.png`} width="25" height="25" alt="LinkedIn" className="object-contain" />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="https://x.com/SJCET_PALAI">
                          <Img src={`${baseUrl}/images/social-x.png`} width="25" height="25" alt="X" className="object-contain" />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="https://www.instagram.com/sjcet_palai/">
                          <Img src={`${baseUrl}/images/social-instagram.png`} width="25" height="25" alt="Instagram" className="object-contain" />
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