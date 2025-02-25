import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const pngBuffer = await QRCode.toBuffer(id, {
      type: 'png',
      width: 256,
      margin: 1,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return new NextResponse(pngBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="qrcode.png"`,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('QR Code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
