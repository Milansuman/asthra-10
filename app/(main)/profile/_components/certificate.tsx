
import { env } from '@/env';
import type { EventZodType } from '@/lib/validator';
import { Jimp } from 'jimp';
import { useEffect, useState } from "react";

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
    const [output, setOutput] = useState<null | string>();

    const { qrText, userName, eventType, eventName } = data;

    const certificateTemplate = {
        ASTHRA_PASS: `${baseUrl}/co_rgb:000000,l_text:roboto_140_bold_normal_left:${encodeURI(userName)}/fl_layer_apply,y_460/asthra.png`,
        ASTHRA_PASS_EVENT: `${baseUrl}/co_rgb:000000,l_text:roboto_140_bold_normal_left:${encodeURI(userName)}/fl_layer_apply,y_280/co_rgb:000000,l_text:arial_80_bold_normal_left:${encodeURI(eventName)}/fl_layer_apply,y_540/participation.png`,
        COMPETITION: `${baseUrl}/co_rgb:000000,l_text:roboto_140_bold_normal_left:${encodeURI(userName)}/fl_layer_apply,y_280/co_rgb:000000,l_text:arial_80_bold_normal_left:${encodeURI(eventName)}/fl_layer_apply,y_540/participation.png`,
        WORKSHOP: `${baseUrl}/co_rgb:000000,l_text:roboto_140_bold_normal_left:${encodeURI(userName)}/fl_layer_apply,y_280/co_rgb:000000,l_text:arial_80_bold_normal_left:${encodeURI(eventName)}/fl_layer_apply,y_540/participation.png`,
    } satisfies Record<EventZodType["eventType"], string>

    const imageTemplate = certificateTemplate[eventType];

    useEffect(() => {
        Jimp.read(imageTemplate)
            .then(async (templateImage) => {

                const qrImage = await Jimp.read(encodeURI(`/api/qr?text=${qrText}`));
                qrImage.resize({
                    h: 550,
                    w: 550,
                });

                templateImage.blit({
                    src: qrImage,
                    x: templateImage.width - qrImage.width - 180,
                    y: templateImage.height - qrImage.height - 160,
                });

                setOutput(await templateImage.getBase64("image/png"));
            });
    }, []);

    return (
        <>
            {output ? (
                <img
                    style={{ flex: 1, minWidth: 0, objectFit: "contain", margin: 0 }}
                    src={output}
                    alt="Output"
                />
            ) : <p>Loading...</p>}
        </>
    );
}

// import { Button } from "@/components/ui/button";
// import { useEffect, useRef } from "react";

// interface CertificateRenderProps {
//     text: string;
// }

// export const CertificateRender = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const imageTemplate = "/certificate/asthra.png";

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const context = canvas?.getContext("2d");

//         if (canvas && context) {
//             const image = new Image();
//             image.src = imageTemplate;
//             image.onload = () => {
//                 context.drawImage(image, 0, 0, canvas.width, canvas.height);
//                 context.font = "32px Arial";
//                 context.fillStyle = "black";
//                 // context.fillText(text, 100, 100); // Adjust coordinates as needed
//             };
//         }
//     }, []);

//     const downloadImage = () => {
//         const canvas = canvasRef.current;
//         if (canvas) {
//             const link = document.createElement("a");
//             link.href = canvas.toDataURL("image/png");
//             link.download = "certificate.png";
//             link.click();
//         }
//     };

//     return (
//         <>
//             <Button onClick={downloadImage} variant="glass" size="glass">
//                 Download Certificate
//             </Button>
//             <canvas
//                 ref={canvasRef}
//                 width={500}
//                 height={800}
//                 style={{ flex: 1, minWidth: 0, objectFit: "contain", margin: 0 }}
//             />
//         </>
//     );
// };