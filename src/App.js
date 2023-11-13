import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoices(voices);
      setSelectedVoice(voices.find((voice) => voice.default));
    };

    updateVoices(); // Initial update
    window.speechSynthesis.onvoiceschanged = updateVoices; // Update when voices change

    // Cleanup event listener when the component unmounts
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handlePlay = () => {
    if (!text) {
      alert('Please enter text to convert.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;

    window.speechSynthesis.speak(utterance);
  };

  const handleDownload = () => {
    if (!text) {
      alert('Please enter text to convert.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;

    const blob = new Blob([new Uint8Array(new TextEncoder().encode(text))], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speech.wav';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleVoiceChange = (event) => {
    const selectedVoiceURI = event.target.value;
    const selectedVoice = voices.find((voice) => voice.voiceURI === selectedVoiceURI);
    setSelectedVoice(selectedVoice);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="name">
          <h1>Text-Speech Converter</h1>
        </div>
        <div className="box">
          <textarea
            id="text"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="row">
          <select onChange={handleVoiceChange}>
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name}
              </option>
            ))}
          </select>
          <button id="convertButton" onClick={handlePlay}>
            Play
          </button>
          <button id="downloadButton" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
