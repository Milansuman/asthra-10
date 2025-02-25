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
import { baseUrl } from "../utils";
// import type { UserZodType, EventZodType, UserRegisteredEventZod, TransactionZodType } from '@/lib/validator';

type Props = {
  // user: UserZodType;
  eventName: string | null;
  eventSecret: string | null;
  // transactions: TransactionCard;
};

const EventConfirmation = ({ eventName, eventSecret }: Props) => {
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
              <Section className="my-5">
                <Heading className="text-3xl text-center font-[Verdana,sans-serif]">Event Confirmation</Heading>
                <Container className="bg-white/20 rounded-2xl">
                  <Section>
                    <Row>
                      <div className="flex flex-row justify-center items-center gap-2">
                        <div className="w-10 h-auto bg-slate-800">
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Text>Registered ID</Text>
                          </div>
                          <div>
                            <Text>Username</Text>
                          </div>
                          <div>
                            <Text>Event Name</Text>
                          </div>
                          <div>
                            <Text>Venue</Text>
                          </div>
                          <div>
                            <Text>Host</Text>
                          </div>
                          <div>
                            <Text>Event Date</Text>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </Section>
                </Container>
              </Section>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
};

export default EventConfirmation;
