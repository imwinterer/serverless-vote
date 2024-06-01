import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { category, host, target } = await request.json();

  const userIp = request.headers.get('x-forwarded-for') || '';

  const requestBody = {
    category,
    host,
    target,
    userIp,
  };

  const headers: HeadersInit = new Headers({
    'Content-Type': 'application/json',
  });

  if (process.env.API_KEY) {
    headers.append('x-api-key', process.env.API_KEY);
  }

  try {
    const response = await fetch(
      'https://r05i46ecn0.execute-api.ap-northeast-1.amazonaws.com/serverlessVoteStage',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();

    if (data.statusCode === 200) {
      return NextResponse.json({ message: '投票が完了しました。' }, { status: 200 });
    } else if (data.statusCode === 500) {
      return NextResponse.json({ message: 'エラーが発生しました。' }, { status: 500 });
    } else if (data.statusCode === 400) {
      return NextResponse.json({ message: '1日1回投票できます。' }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'エラーが発生しました。' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'エラーが発生しました。' }, { status: 500 });
  }
}
