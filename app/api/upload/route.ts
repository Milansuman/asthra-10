import { NextRequest, NextResponse } from 'next/server';
import { uploadBase64Image } from '@/server/storage';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Upload the base64 image to S3
    const result = await uploadBase64Image(image, 'assets');
    
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      url: result.url,
      success: true 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}