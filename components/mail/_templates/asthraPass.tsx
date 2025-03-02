import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { baseUrl } from "../utils";
import type { UserZodType, UserRegisteredEventZod, TransactionZodType } from "@/lib/validator";
import { ASTHRA } from "@/logic";

type AsthraPassProps = {
  user: UserZodType,
  userRegisteredEvent: UserRegisteredEventZod,
  transactions: TransactionZodType
};

export default function AsthraPassEmail({ user, userRegisteredEvent, transactions }: AsthraPassProps) {
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
      <Preview>ASTHRA 9.0 Asthra Pass Purchased</Preview>
      <Tailwind>
        <Body
          style={{
            backgroundImage: `url(${baseUrl}/images/bg.webp)`,
          }}
          className={"bg-[#0A0A19] font-ambit bg-cover bg-center"}
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

              <Text className="my-4">
                Thank you for purchasing Asthra Pass. We're excited to have you join us!
                Attached is your digital pass. Please scan it at the front desk and event venue for entry.
              </Text>

              <Section
                style={{
                  backgroundImage: `url(${baseUrl}/images/pass.png)`,
                }}
                className="w-[95%] max-w-[280px] h-[500px] bg-cover bg-center mt-10"
              >
                <Row >
                  <Column align="center">
                    <Img src={`${baseUrl}/api/qr/${user.id}`} className="w-[65%] min-w-[180px] rounded-md object-contain" />
                  </Column>
                </Row>
                <Row>
                  <Text className="pt-5 w-full text-center text-xl font-extrabold text-black">{user.name}</Text>
                  <Text className="w-full text-center text-xl font-extrabold text-black">{user.number}</Text>
                  <Container className="h-[50px]" />
                </Row>
              </Section>

              <Row className="mt-8">
                <Column align="center">
                  <Text>
                    {JSON.stringify(transactions, null, 2)}
                  </Text>
                  <Text>
                    {JSON.stringify(userRegisteredEvent, null, 2)}
                  </Text>
                  <Text>
                    {JSON.stringify(ASTHRA, null, 2)}
                  </Text>
                </Column>
              </Row>

              <Row className="mt-8">
                <Column align="center">
                  <Link href="https://asthra.sjcetpalai.ac.in/profile" className="bg-[#21d0fe] text-white rounded-md p-2">
                    View Profile
                  </Link>
                </Column>
              </Row>

              <Text className="mt-10">You are required to carry a valid ID card or an official identification document for authentication upon entry.</Text>
              <Text>
                If you require further assistance, don't hesitate to reach out to us!
                <br />
                We look forward to welcoming you at the event!
              </Text>

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