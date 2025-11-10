import { NextRequest, NextResponse } from 'next/server';

// Simulasi penyimpanan user settings sementara
let userSettings = {
  chosenGenre: [] as string[],
  r18: false,
};

// GET: ambil pengaturan user
export async function GET(req: NextRequest) {
  // Kamu bisa tambahkan autentikasi cookie di sini (misal JWT dari req.cookies)
  return NextResponse.json(userSettings, { status: 200 });
}

// PUT: update pengaturan user
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { chosenGenre, r18 } = body;

    if (!Array.isArray(chosenGenre) || typeof r18 !== 'boolean') {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid request format' },
        { status: 400 }
      );
    }

    userSettings = { chosenGenre, r18 };

    return NextResponse.json(
      { status: 'success', message: 'Settings updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'failed', message: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
