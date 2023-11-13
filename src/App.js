import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedVoice, setSelectedVoice] = useState(null);

  const handleConvert = () => {
    const text = document.getElementById('text').value;
    if (!text) {
      alert('Please enter text to convert.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;

    window.speechSynthesis.speak(utterance);
  };

  const handleDownload = () => {
    const text = document.getElementById('text').value;
    if (!text) {
      alert('Please enter text to convert.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;

    const blob = new Blob([new Uint8Array([])], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speech.mp3';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleVoiceChange = (event) => {
    const selectedVoiceURI = event.target.value;
    const voices = window.speechSynthesis.getVoices();
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
          <textarea id="text" placeholder="Enter your text here..."></textarea>
        </div>
        <div className="row">
          <select onChange={handleVoiceChange}>
            {window.speechSynthesis.getVoices().map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name}
              </option>
            ))}
          </select>
          <button id="convertButton" onClick={handleConvert}>
            Convert
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
