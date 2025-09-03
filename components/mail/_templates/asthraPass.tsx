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
import { ASTHRA } from "@/logic";
import TransactionSection from "./_components/transactionSection";
import FooterSection from "./_components/footerSection";
import type { AsthraPassProps } from '../types';

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
      <Preview>ASTHRA 10.0 Asthra Pass Purchased</Preview>
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
              ASTHRA 10.0
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

              {/* <Row className="mt-8">
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
              </Row> */}

              <TransactionSection personName={user.name as string} personNumber={user.number as string} txid={transactions.id as string} txAmt={transactions.amount as number} regId={userRegisteredEvent.registrationId as string} />

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

              <FooterSection />
            </Container>

          </Container>
        </Body>
      </Tailwind >
    </Html >
  )
}
