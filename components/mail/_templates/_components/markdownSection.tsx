import {
	Section,
	Row,
	Column,
	Markdown
} from "@react-email/components";

export default function MarkdownSection({ secret }: { secret: string }) {
	return (
		<Section className="mt-4">
			<Row>
				<Column align="left">
					<Markdown
						markdownCustomStyles={{
							codeInline: { background: "white", opacity: "0.7", padding: "2px 4px" },
							codeBlock: { background: "white", opacity: "0.7", padding: "2px 4px" },
							blockQuote: { background: "transparent" },
							bold: { background: "transparent" },
							h1: { margin: "0", textWrap: "wrap" },
							h2: { margin: "0" },
							h3: { margin: "0" },
							h4: { margin: "0" },
							h5: { margin: "0" },
							h6: { margin: "0" },
							image: { width: "60%" },
						}}
						markdownContainerStyles={{
							background: "transparent",
							borderRadius: "8px",
							padding: "16px",
						}}
					>
						{secret}
					</Markdown>
				</Column>
			</Row>
		</Section>
	)
}