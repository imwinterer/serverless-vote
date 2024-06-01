"use client";

import Image from 'next/image';
import { useState } from 'react';

interface RequestBody {
  category: string;
  host: string;
  target: string;
}

const VoteComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleVote = async (category: string) => {
    setLoading(true);
    setResponseMessage('');

    const requestBody: RequestBody = {
      category: "partitionKey",
      host: `${window.location.protocol}//${window.location.hostname}`,
      target: category,
    };

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage('エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24">
      <p className="px-5 text-lg leading-relaxed text-gray-800 text-center">
        AWSのAPI Gateway、Lambda(Node.js v20 + AWS SDK v3)、<br />
        DynamoDBを使用したサーバレス投票です。<br />
        IPアドレス毎に1日1回投票ができ、0時に再投票可能になります。
      </p>
      <ul className="mt-10 list-none flex justify-center gap-4 flex-wrap">
        <li
          onClick={() => handleVote('A')}
          className="px-10 py-4 bg-red-500 rounded-full text-white cursor-pointer shadow-lg hover:transform hover:translate-y-1 hover:shadow-none"
        >
          Aに投票する
        </li>
        <li
          onClick={() => handleVote('B')}
          className="px-10 py-4 bg-blue-400 rounded-full text-white cursor-pointer shadow-lg hover:transform hover:translate-y-1 hover:shadow-none"
        >
          Bに投票する
        </li>
        <li
          onClick={() => handleVote('C')}
          className="px-10 py-4 bg-green-500 rounded-full text-white cursor-pointer shadow-lg hover:transform hover:translate-y-1 hover:shadow-none"
        >
          Cに投票する
        </li>
      </ul>
      {loading && (
        <span className="w-8 mx-auto mt-10 block">
          <Image src="/spin-black.svg" alt="Loading" width={32} height={32} />
        </span>
      )}
      <p className="mt-10 text-red-500 text-center">{responseMessage}</p>
    </div>
  );
};

export default VoteComponent;
