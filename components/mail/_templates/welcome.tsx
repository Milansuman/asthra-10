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
  Hr,
  Link,
  Row,
  Column
} from "@react-email/components";

import {
  Instagram,
  Mail,
  Globe,
  TrainFront,
  Bus
} from "lucide-react";

type Props = {
  personName: string;
  eventOrganizer: string;
  coordinators: { name: string; phone: string }[];
};

const baseUrl = process.env.NODE_ENV === "production" ? "https://asthra.sjcetpalai.ac.in/mail" : "/static";

const WelcomeEmail = ({ personName, eventOrganizer, coordinators = [{ name: "Allen Sanjai", phone: "+917907369056" }, { name: "Basil Babu", phone: "+918590013252" }] }: Props) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Ambit"
          fallbackFontFamily="Verdana"
          webFont={{
            url: `${baseUrl}/fonts/ambit/Ambit-Regular.woff2`,
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>ASTHRA 9.0 Registration Confirmation</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#5B9BE6",
              },
              fontFamily: {
                ambit: ["Ambit"],
              },
              backdropBlur: {
                test: "blur(100px)"
              }
            },
          },
        }}
      >
        <Body className="bg-[#4A90E2]">
          <Container className="mx-auto py-5">
            <Section className="mt-4">
              <Row>
                <Column align="left">
                  <Img
                    src={`${baseUrl}/images/asthra.png`}
                    width="100"
                    height="50"
                    alt="St. Joseph's Logo"
                    className="object-contain"
                  />
                </Column>
                <Column align="right">
                  <Img
                    src={`${baseUrl}/images/sjcet.png`}
                    width="150"
                    height="50"
                    alt="St. Joseph's College"
                    className="object-contain"
                  />
                </Column>
              </Row>
            </Section>

            <Heading className="text-white text-6xl font-extrabold text-center mt-14 font-ambit">
              ASTHRA 9.0
            </Heading>

            <Container className="bg-[#4A90E2]/80 rounded-2xl border-[1px] border-solid border-[#8abaf1] shadow-2xl p-8 text-white relative">
              <Img src={`${baseUrl}/images/object-1.png`} className="w-48 h-auto object-fill absolute top-0 right-0 z-[-10]" />
              <Img src={`${baseUrl}/images/object-2.png`} className="w-48 h-auto object-fill absolute top-[350px] left-0 z-[-10]" />
              <Img src={`${baseUrl}/images/object-3.png`} className="w-48 h-auto object-fill absolute top-[700px] right-0 z-[-10]" />
              <Text className="text-xl font-[Verdana,sans-serif]">Hello {personName},</Text>

              Thank you for registering for the upcoming event! We're excited to have you join us. Here are the
              essential details you'll need:

              <Section className="mt-4">
                <Text className="font-bold text-xl font-[Verdana,sans-serif]">1. Event Details:</Text>
                <ul className="list-disc ml-3">
                  <li>Date: 06/03/2025 to 07/03/2025</li>
                  <li>Time: 9:00 am to 5:00 pm</li>
                  <li>Venue: Bharananganam Pravithanam Road Kottayam, Palai, Choondacherry, Kerala 686579</li>
                </ul>
              </Section>

              <Section className="mt-2">
                <Text className="font-bold text-xl font-[Verdana,sans-serif]">2. Hotel Accommodations:</Text>
                We understand that a comfortable stay is crucial for a successful event experience. We recommend
                staying at one of the nearby hotels.
              </Section>

              <Section className="mt-2">
                <Text className="font-bold text-xl font-[Verdana,sans-serif]">3. Additional Information:</Text>
                Remember to bring your registration confirmation email to the event.
              </Section>

              <Section className="mt-4">
                Feel free to reach out if you have any questions or need further assistance. We look forward to seeing you at Expo India!
              </Section>

              <Section className="mt-4">
                Best regards, {personName} {eventOrganizer}
              </Section>

              <Section className="mt-4 border-t">
                <strong>Disclaimer:</strong> This email is for informational purposes only. Please verify all details
                independently. We are not responsible for any changes or discrepancies.
              </Section>

              <Section className="mt-4 text-center">
                <Row>
                  <Column align="center">
                    <Text className="font-bold text-base font-[Verdana,sans-serif]">Coordinators</Text>
                  </Column>
                </Row>
                <Row>
                  <Column align="center">
                    <Text className="m-0">{coordinators[0]?.name}</Text>
                    <Text className="m-0">{coordinators[0]?.phone}</Text>
                  </Column>
                  <Column align="center">
                    <Text className="m-0">{coordinators[1]?.name}</Text>
                    <Text className="m-0">{coordinators[1]?.phone}</Text>
                  </Column>
                </Row>
              </Section>

              <Hr />

              <Section className="my-5">
                <Heading className="text-3xl text-center font-[Verdana,sans-serif]">How to reach</Heading>
                <Container className="bg-white/20 rounded-2xl p-10">
                  <Section>
                    <Heading className="text-lg text-center text-white underline m-0 mb-3">Nearest Railway Station</Heading>
                    <Row>
                      <Column className="flex flex-col justify-center items-center">
                        <div>
                          <div className="flex flex-row gap-2">
                            <TrainFront size={20} />
                            <Text className="text-base m-0">Ettumanur Railway Station</Text>
                          </div>
                          <div className="flex flex-row gap-2">
                            <TrainFront size={20} />
                            <Text className="text-base m-0">Kottayam Railway Station</Text>
                          </div>
                        </div>
                      </Column>
                    </Row>
                    <Heading className="text-lg text-center text-white underline m-0 my-3">Nearest Bus Station</Heading>
                    <Row>
                      <Column className="flex flex-col justify-center items-center">
                        <div>
                          <div className="flex flex-row gap-2">
                            <Bus size={20} />
                            <Text className="text-base m-0">Bharananganam Bus Stop</Text>
                          </div>
                          <div className="flex flex-row gap-2">
                            <Bus size={20} />
                            <Text className="text-base m-0">Pala KSRTC Bus Stop</Text>
                          </div>
                          <div className="flex flex-row gap-2">
                            <Bus size={20} />
                            <Text className="text-base m-0">Kottaramattom Bus Stop</Text>
                          </div>
                        </div>
                      </Column>
                    </Row>
                  </Section>
                </Container>
              </Section>

              <Container className="my-5">
                <Link href="https://maps.app.goo.gl/gpLPVCXYc3aMnMhr9">
                  <Img src={`${baseUrl}/images/map.png`} className="w-full h-[350px] object-cover rounded-lg" />
                </Link>
              </Container>

              <Container className="bg-white/20 rounded-2xl border-2 border-solid border-[#6eabf0]">
                <Section className="px-3">
                  <Row>
                    <Column align="left">
                      <Text className="m-0 pt-2 pl-2">Follow us on</Text>
                      <div>
                        <Link href="https://asthra.sjcetpalai.ac.in/">
                          <Globe className="p-1" color="white" />
                        </Link>
                        <Link href="mailto:asthra@sjcetpalai.ac.in">
                          <Mail className="p-1" color="white" />
                        </Link>
                        <Link href="https://www.instagram.com/sjcetpalai">
                          <Instagram className="p-1" color="white" />
                        </Link>
                      </div>
                    </Column>
                    <Column align="right">
                      <Img src={`${baseUrl}/images/asthra-glass.png`} className="w-24 h-auto object-fill" />
                    </Column>
                  </Row>
                </Section>
              </Container>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html >
  )
}

export default WelcomeEmail;