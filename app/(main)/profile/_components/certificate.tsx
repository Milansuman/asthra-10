import Image from 'next/image';
import type { EventZodType } from '@/lib/validator';

type Props = {
    data: {
        qrText: string
        userName: string
        eventName: string
        eventType: EventZodType["eventType"]
    }
}

const baseUrl = "https://res.cloudinary.com/de3q8zas9/image/upload";

export const CertificateRender = ({ data }: Props) => {
    const { qrText, userName, eventType, eventName } = data;

    const certificateTemplate = {
        ASTHRA_PASS: `${baseUrl}/co_rgb:000000,l_text:roboto_140_bold_normal_left:${encodeURIComponent(userName)}/fl_layer_apply,y_460/asthra.png`,
        ASTHRA_PASS_EVENT: `${baseUrl}/co_rgb:000000,l_text:roboto_140_bold_normal_left:${encodeURIComponent(userName)}/fl_layer_apply,y_280/co_rgb:000000,l_text:arial_80_bold_normal_left:${encodeURIComponent(eventName)}/fl_layer_apply,y_540/participation.png`,
        COMPETITION: `${baseUrl}/co_rgb:000000,l_text:roboto_140_bold_normal_left:${encodeURIComponent(userName)}/fl_layer_apply,y_280/co_rgb:000000,l_text:arial_80_bold_normal_left:${encodeURIComponent(eventName)}/fl_layer_apply,y_540/participation.png`,
        WORKSHOP: `${baseUrl}/co_rgb:000000,l_text:roboto_140_bold_normal_left:${encodeURIComponent(userName)}/fl_layer_apply,y_280/co_rgb:000000,l_text:arial_80_bold_normal_left:${encodeURIComponent(eventName)}/fl_layer_apply,y_540/participation.png`,
    } satisfies Record<EventZodType["eventType"], string>

    const imageTemplate = certificateTemplate[eventType];

    const url = `/api/qr/with-image?scale=3&url=${encodeURIComponent(imageTemplate)}&qr=${encodeURIComponent(qrText)}`

    return (
        <Image
            src={url}
            alt={`Certificate for ${userName}`}
            width={800}
            height={600}
            className='flex-1 min-w-0 object-contain m-0 text-white'
        />
    );
}
