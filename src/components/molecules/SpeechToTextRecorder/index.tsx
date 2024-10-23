import { useWavesurfer } from '@wavesurfer/react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

interface ISpeechToTextRecorder {
  showSpeechToTextInput: boolean;
  setShowSpeechTotextInput: (value: boolean) => void;
  handleSetTranscript: ({ transcript }: any) => void;
}

const SpeechToTextRecorder: React.FC<ISpeechToTextRecorder> = ({
  showSpeechToTextInput,
  setShowSpeechTotextInput,
  handleSetTranscript,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState(false);
  const isRecordingRef = useRef(false);

  // Set up speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = false;
      recog.lang = 'vi-VN';
      recog.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        console.log('result[0].transcript', result[0].transcript);
        handleSetTranscript({ transcript: result[0].transcript || '' });
        // setTranscript((prevTranscript) => prevTranscript + ' ' + result[0].transcript);
      };

      setRecognition(recog);
      console.log('@@ init SpeechRecognition');
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }, []);

  // start recording when mouting
  useEffect(() => {
    if (showSpeechToTextInput && recognition) startRecording();
  }, [showSpeechToTextInput, recognition]);

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
        console.log('@@ SpeechRecognition stopped on unmount');
      }
    };
  }, [recognition]);

  const startRecording = () => {
    console.log('@@ start recording ...');
    if (recognition) {
      setTranscript('');
      setIsRecording(true);
      isRecordingRef.current = true;
      recognition?.start();
      const id = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const stopRecording = () => {
    if (recognition && isRecordingRef.current) {
      recognition.stop();
      intervalId && clearInterval(intervalId);
      setIsRecording(false);
      isRecordingRef.current = false;
      console.log('@@ stop recording ...');
      setShowSpeechTotextInput(false);
    }
  };

  const cancelRecording = () => {
    recognition?.abort();
    setRecordingTime(0);
    setTranscript('');
    setShowSpeechTotextInput(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isRecording) {
    return (
      <div className='flex flex-row w-full items-center bg-white rounded-full p-[12px] [border:1px_solid_#CBD5E140]'>
        Loading ...
      </div>
    );
  }

  return (
    <div className='w-full'>
      {isRecording ? (
        <div className='flex flex-row w-full items-center bg-white rounded-full p-[12px] [border:1px_solid_#CBD5E140]'>
          <Image
            alt='exit'
            height={40}
            width={40}
            className='mr-[9px]'
            src='/icon/exit.svg'
            onClick={cancelRecording}
          />
          <SoundWaveRecord />
          <span className='mx-[16px] text-[16px] font-bold leading-[16px] text-[#575757]'>
            {formatTime(recordingTime)}
          </span>
          <Image alt='exit' height={40} width={40} className='' src='/icon/green-done.svg' onClick={stopRecording} />
        </div>
      ) : null}
    </div>
  );
};

const SoundWaveRecord = () => {
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 40,
    waveColor: '#1FB46EEB',
    progressColor: '#ff006c',
    url: '',
    minPxPerSec: 1,
    audioRate: 2,
    barHeight: 5,
    barWidth: 2, // Set a bar width
    barGap: 1, // Optionally, specify the spacing between bars
    barRadius: 2, // And the bar radius
    plugins: useMemo(() => [], []),
  });

  let record = wavesurfer?.registerPlugin(RecordPlugin.create({ scrollingWaveform: true, renderRecordedAudio: false }));

  record?.on('record-end', (blob: Blob) => {
    const recordedUrl = URL.createObjectURL(blob);
    console.log('recorded:', recordedUrl);
  });

  useEffect(() => {
    if (wavesurfer) {
      const deviceId = RecordPlugin.getAvailableAudioDevices().then((devices: any) => {
        return devices[0].deviceId;
      });

      record.startRecording({ deviceId }).then(() => {
        console.log('@@start wavesurfer');
      });
    }
  }, [wavesurfer]);

  useEffect(() => {
    return () => {
      console.log('@@destroy - wavesurfer');
      wavesurfer?.destroy();
    };
  }, [wavesurfer]);

  return <div ref={containerRef} style={{ width: '100%', height: '40px' }}></div>;
};

export default SpeechToTextRecorder;
