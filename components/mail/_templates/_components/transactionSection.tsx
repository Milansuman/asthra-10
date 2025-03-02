import {
	Img,
	Section,
	Text,
	Row,
	Column,
} from "@react-email/components";
import { baseUrl } from "../../utils";

export default function TransactionSection({ personName, personNumber, txid, txAmt, regId }: { personName: string, personNumber: string, txid: string, txAmt: number, regId: string }) {
	return (
		<Section className="bg-white border-2 border-solid border-[#5B9BE6] py-[2%] px-[3%] max-w-[400px] my-4 rounded-lg">
			<Row>
				<Column align="left" className="w-1/2">
					<Text className="m-0 text-medium underline font-extrabold">Transaction Details</Text>
					<Text className="m-0"><strong>Amount:</strong> ₹{txAmt}/-</Text>
					<Text className="m-0 mt-[1%] text-xs"><strong>TxID:</strong> {txid}</Text>
					<Text className="m-0 font-extrabold mt-[4%]">{personName}</Text>
					<Text className="m-0 mt-[1%] text-xs">{personNumber}</Text>
				</Column>
				<Column align="right" className="w-1/2">
					<Img src={`${baseUrl}/api/qr/${regId}`} className="w-[90%] max-w-[140px] object-contain" />
				</Column>
			</Row>
		</Section>
	)
}