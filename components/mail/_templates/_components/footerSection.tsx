import {
	Img,
	Section,
	Text,
	Row,
	Column,
	Link,
} from "@react-email/components";
import { baseUrl } from "../../utils";

export default function FooterSection() {
	return (
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
						<Img src={`${baseUrl}/images/asthra-.png`} className="w-[120px] h-[50px] m-0 object-cover" alt="Asthra Logo" />
					</Link>
				</Column>
			</Row>
		</Section>
	)
}
