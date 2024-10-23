'use client';
import { isBrowser } from '@utils';
import { message } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';

const SpeechToText: React.FC<any> = ({ handleSetTranscript }) => {
  const { transcript, resetTranscript, listening, isMicrophoneAvailable } = useSpeechRecognition();
  const [isSetText, setIsSetText] = useState(false);
  console.log('🚀 ~ listening:', listening);

  const startListening = () => {
    message.success('Bắt đầu ghi âm');
    SpeechRecognition.startListening({ continuous: true, language: 'vi-VN' });
  };

  useEffect(() => {
    (() => {
      if (transcript) {
        handleSetTranscript({ transcript: transcript });
      }
    })();
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!isBrowser) return;

  return (
    <div
      onTouchStart={startListening}
      onMouseDown={startListening}
      onTouchEnd={SpeechRecognition.stopListening}
      onMouseUp={SpeechRecognition.stopListening}
      className='hover:cursor-pointer'
    >
      <Image
        src={listening ? '/icon/active-voice-icon.svg' : '/icon/voice-icon.svg'}
        alt='voice-icon'
        width={24}
        height={24}
        className='w-[24px] h-[24px] object-cover hover:cursor-pointer'
      />
    </div>
  );
};
export default SpeechToText;
