import { cn } from "@/lib/utils";
import type { EventZodType, TransactionZodType, UserRegisteredEventZod, UserZodType } from "@/lib/validator";
import {
  Body,
  Button,
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

type AsthraPassProps = {
  event: EventZodType,
  userRegisteredEvent: UserRegisteredEventZod,
  user: UserZodType,
  transactions: TransactionZodType
};

export default function AsthraPassEmail({ event, userRegisteredEvent, user, transactions }: AsthraPassProps) {
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
        <Body style={{
          backgroundImage: `url(${baseUrl}/images/bg.webp)`,
        }} className={"bg-[#0A0A19] font-ambit bg-cover bg-center"}>
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
                Here is your Asthra Pass
              </Text>

              <Section className="bg-white border-2 border-solid border-[#5B9BE6] py-[2%] px-[3%] max-w-[400px]">
                <Row>
                  <Column align="left" className="w-1/2">
                    <Text className="m-0 font-extrabold">Bank Name</Text>
                    <Text className="m-0 mt-[2%] text-xs">Transaction ID:</Text>
                    <Text className="m-0 mt-[2%] text-xs">{userRegisteredEvent.transactionId}</Text>
                    <Text className="m-0 font-extrabold mt-[8%]">{user.name}</Text>
                    <Text className="m-0 text-xs">test@gmail.com</Text>
                    <Text className="m-0 mt-[2%] text-xs">+918921964557</Text>
                  </Column>
                  <Column align="right" className="w-1/2">
                    <Img src={`${baseUrl}/images/qr.png`} className="w-[100%] object-contain" />
                  </Column>
                </Row>
              </Section>

              <Section className={`bg-white mt-2 ${""} border-2 border-solid border-[#5B9BE6] py-[4%] max-w-[400px]`}>
                <Row>
                  <Column align="left" className="w-1/3">
                    <Row>
                      <Column align="center">
                        <Img src={`${baseUrl}/images/bg.webp`} className="w-[80%] max-w-[100px] rounded-lg" />
                      </Column>
                    </Row>
                  </Column>
                  <Column align="left" className="w-1/3">
                    <Row>
                      <Text className="m-0 text-xs">Register ID:</Text>
                      <Text className="m-0 mt-[2%] text-xs">{userRegisteredEvent.registrationId}</Text>
                    </Row>
                    <Row>
                      <Text className="m-0 mt-[4%] text-xs">Venue:</Text>
                      <Text className="m-0 mt-[2%] text-xs">{event.venue}</Text>
                    </Row>
                    <Row>
                      <Text className="m-0 mt-[4%] text-xs">Event Date:</Text>
                      <Text className="m-0 mt-[2%] text-xs">{new Date(event.dateTimeStarts).toLocaleString()}</Text>
                    </Row>
                  </Column>
                  <Column align="left" className="w-1/3">
                    <Row>
                      <Text className="m-0 text-xs">Event name:</Text>
                      <Text className="m-0 mt-[2%] text-xs">{event.name}</Text>
                    </Row>
                    <Row>
                      <Text className="m-0 mt-[4%] text-xs">Host:</Text>
                      <Text className="m-0 mt-[2%] text-xs">{event.department}</Text>
                    </Row>
                    <Row>
                      <Button
                        href="#"
                        className="m-0 mt-[10%] w-[70%] bg- px-2 py-1 text-center rounded-md text-white bg-[#4A90E2] border-[1px] border-solid border-[#308ffc]"
                      >
                        Download Pass
                      </Button>
                    </Row>
                  </Column>
                </Row>
              </Section>

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