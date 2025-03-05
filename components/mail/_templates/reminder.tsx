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
// import { baseUrl } from "../utils";
import FooterSection from "./_components/footerSection";
import MarkdownSection from "./_components/markdownSection";
import EventSection from "./_components/eventSection";
import type { EventZodType, UserRegisteredEventZod, UserZodType } from "@/lib/validator";

type EventConfirmationProps = {
  user: UserZodType;
  data: {
    event: EventZodType | null;
    userRegisteredEvent: UserRegisteredEventZod;
  }[]
};

const baseUrl = "https://asthra.sjcetpalai.ac.in";


export default function EventConfirmationEmail({ user, data }: EventConfirmationProps) {
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
      <Preview>ASTHRA 9.0 Reminder</Preview>
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

              <Text>
                This is a reminder that you have an upcoming event on 6th & 7th. I hope you are as excited as we are to have you join us.
                Spot registrations are available for almost all events. Please make sure to arrive at least 30 minutes before the event starts.
              </Text>

              {user.asthraPass === true && <>
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
              </>}

              {data.map(({ event, userRegisteredEvent }) => (
                <div key={userRegisteredEvent.registrationId}>
                  {event && <Text className="text-base">{event.name},</Text>}
                  {event && <EventSection event={event} />}
                  {event?.secret &&
                    <Row>
                      <Text>
                        This is special message for you:
                      </Text>
                      <MarkdownSection secret={event.secret ?? ""} />
                    </Row>
                  }
                  <Row>
                    <Column>
                      <Text>
                        <strong>Registration Status:</strong> {userRegisteredEvent.status}
                      </Text>
                      <Text>
                        <strong>Registration ID:</strong> {userRegisteredEvent.transactionId}
                      </Text>
                    </Column>
                    <Column className="w-1/2">
                      <Img src={`${baseUrl}/api/qr/${userRegisteredEvent.registrationId}`} className="w-[90%] max-w-[140px] object-contain" />
                    </Column>
                  </Row>

                </div>
              ))}

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