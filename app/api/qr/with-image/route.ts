import { type NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import QRCode from 'qrcode';

// Generate QR code buffer
async function generateQRCodeBuffer(data: string, size = 200): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    QRCode.toBuffer(
      data,
      {
        type: 'png',
        width: size,
        margin: 2,
      },
      (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      }
    );
  });
}

export async function GET(request: NextRequest) {
  try {
    // Extract search params
    const searchParams = request.nextUrl.searchParams;

    // Get parameters
    const url = searchParams.get('url');
    const qr = searchParams.get('qr');
    const x = searchParams.get('x');
    const y = searchParams.get('y');
    const scale = searchParams.get('scale') || '1';

    // Validate image URL
    if (!url) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Fetch the original image
    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: 404 }
      );
    }

    // Get image buffer
    const imageBuffer = await imageResponse.arrayBuffer();

    // Determine QR code data (default to image URL)
    const qrData = qr || url;

    // Parse numeric parameters
    const xPos = x ? Number.parseInt(x) : null;
    const yPos = y ? Number.parseInt(y) : null;
    const scaleValue = Number.parseFloat(scale);

    // Generate QR code buffer with scaled size
    const qrSize = Math.floor(200 * scaleValue);
    const qrBuffer = await generateQRCodeBuffer(qrData, qrSize);

    // Process image with QR code overlay
    const metadata = await sharp(Buffer.from(imageBuffer)).metadata();

    // Calculate QR code position
    const defaultPadding = 150;
    const xPosition =
      xPos !== null
        ? xPos
        : (metadata?.width as number) - qrSize - defaultPadding;

    const yPosition =
      yPos !== null
        ? yPos
        : (metadata?.height as number) - qrSize - defaultPadding + 20;

    // Composite image with QR code
    const processedImage = await sharp(Buffer.from(imageBuffer))
      .composite([
        {
          input: qrBuffer,
          top: yPosition,
          left: xPosition,
        },
      ])
      .png()
      .toBuffer();

    // Return the processed image
    return new NextResponse(processedImage, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600', // Optional caching
      },
    });
  } catch (error) {
    console.error('Image processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optionally disable caching for dynamic responses
export const dynamic = 'force-dynamic';
