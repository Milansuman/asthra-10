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
import type { WelcomeEmailProps } from '../types';

const coordinators = [
  { name: "Allen Sanjai", phone: "+917907369056" },
  { name: "Basil Babu", phone: "+918590013252" },
  {
    name: "Shabeeha K P",
    phone: "+919778765008",
  },
  {
    name: "Sona Binu",
    phone: "+918590221705",
  }
]

export default function WelcomeEmail({ personName }: WelcomeEmailProps) {
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
      <Preview>ASTHRA 10.0 Registration Confirmation</Preview>
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
              ASTHRA 10.0
            </Heading>

            <Container className="bg-blue-100 opacity-90 rounded-2xl text-[#1A3A5A] w-[99%] my-6 p-6">
              <Text className="text-lg pb-4">Hello {personName},</Text>

              <Text className="my-4">
                Thank you for registering for the upcoming event! We're excited to have you join us. Here are the
                essential details you'll need:
              </Text>

              <Section className="bg-[#F0F8FF] rounded-lg py-4 px-[5%] my-6">
                <Text className="text-xl text-[#4A90E2] font-bold text-center">Event Details</Text>
                <Row className="mt-8">
                  <Column>
                    <Text className="m-0">Date:</Text>
                  </Column>
                  <Column align="right" className="max-w-28">
                    <Text className="m-0">06/03/2025 to 07/03/2025</Text>
                  </Column>
                </Row>
                <Row className="mt-3">
                  <Column>
                    <Text className="m-0">Time:</Text>
                  </Column>
                  <Column align="right" className="max-w-28">
                    <Text className="m-0">9:00 am to 5:00 pm</Text>
                  </Column>
                </Row>
                <Row className="mt-3">
                  <Column>
                    <Text className="m-0">Venue:</Text>
                  </Column>
                  <Column align="right" className="max-w-28">
                    <Text className="m-0">Bharananganam Pravithanam Road,<br /> Palai, Choondacherry, Kerala 686579</Text>
                  </Column>
                </Row>
              </Section>

              <Section className="bg-[#F0F8FF] rounded-lg p-4 px-[5%] my-6">
                <Text className="text-xl text-[#4A90E2] font-bold text-center">Hotel Accommodations</Text>
                <Text>
                  We understand that a comfortable stay is crucial for a successful event experience. We recommend
                  staying at one of the nearby hotels.
                </Text>
              </Section>

              <Section className="bg-[#F0F8FF] rounded-lg p-4 my-6">
                <Text className="text-xl text-[#4A90E2] font-bold text-center mb-4">Coordinators</Text>
                {coordinators.map((coordinator) => (
                  <Row key={coordinator.phone} className="text-center">
                    <Column>
                      <Text className="m-0">{coordinator.name}</Text>
                      <Text className="m-0 text-[#5B9BE6]">{coordinator.phone}</Text>
                    </Column>
                  </Row>
                ))}
              </Section>

              <Section className="bg-[#F0F8FF] rounded-lg p-4 my-6">
                <Text className="text-xl text-[#4A90E2] font-bold text-center mb-4">How to Reach</Text>
                <Row>
                  <Column align="center">
                    <Link href="https://maps.app.goo.gl/gpLPVCXYc3aMnMhr9">
                      <Img
                        src={`${baseUrl}/images/map.webp`}
                        alt="Location Map"
                        className="rounded-lg w-[95%] mb-5"
                      />
                    </Link>
                    <Row className="w-[83%]">
                      <Column align="center">
                        <Text className="font-bold m-0 mb-2 underline">Nearest Railway & Bus Stations</Text>
                      </Column>
                    </Row>
                    <Row className="w-[85%]">
                      <Column align="left">
                        <Text className="m-0">
                          ⁃ Kottayam Railway Station
                        </Text>
                      </Column>
                      <Column align="right">
                        <Link href="https://maps.app.goo.gl/vmPNQhQFqbfAn8je8">
                          <Img src={`${baseUrl}/images/open-new-tab.png`} width={14} height={14} alt="Open Link" className="object-contain" />
                        </Link>
                      </Column>
                    </Row>
                    <Row className="w-[85%]">
                      <Column align="left">
                        <Text className="m-0">
                          ⁃ Ettumanoor Railway Station
                        </Text>
                      </Column>
                      <Column align="right">
                        <Link href="https://maps.app.goo.gl/9aWupK4BtmWELBs5A">
                          <Img src={`${baseUrl}/images/open-new-tab.png`} width={14} height={14} alt="Open Link" className="object-contain" />
                        </Link>
                      </Column>
                    </Row>
                    <Row className="w-[85%]">
                      <Column align="left">
                        <Text className="m-0">
                          ⁃ Pala KSRTC Bus Stand
                        </Text>
                      </Column>
                      <Column align="right">
                        <Link href="https://maps.app.goo.gl/UP9Ne6WtQwaq2xsF8">
                          <Img src={`${baseUrl}/images/open-new-tab.png`} width={14} height={14} alt="Open Link" className="object-contain" />
                        </Link>
                      </Column>
                    </Row>
                    <Row className="w-[85%]">
                      <Column align="left">
                        <Text className="m-0">
                          ⁃ Kottaramattom Bus Stand
                        </Text>
                      </Column>
                      <Column align="right">
                        <Link href="https://maps.app.goo.gl/PW4xPZByRZbuaRM4A">
                          <Img src={`${baseUrl}/images/open-new-tab.png`} width={14} height={14} alt="Open Link" className="object-contain" />
                        </Link>
                      </Column>
                    </Row>
                    <Row className="w-[85%]">
                      <Column align="left">
                        <Text className="m-0">
                          ⁃ Bharananganam Bus Stop
                        </Text>
                      </Column>
                      <Column align="right">
                        <Link href="https://maps.app.goo.gl/a4ZLNNAzf1xa7BEg7">
                          <Img src={`${baseUrl}/images/open-new-tab.png`} width={14} height={14} alt="Open Link" className="object-contain" />
                        </Link>
                      </Column>
                    </Row>

                  </Column>
                </Row>
              </Section>

              <Text>Please note that you are required to carry a valid ID card or an official identification document for authentication upon entry. This is essential to ensure a smooth check-in process.</Text>

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
