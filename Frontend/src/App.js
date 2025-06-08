// App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { createWorker } from 'tesseract.js';
import './styles/App.css';
import Header from './components/Header';
import ProPower from './components/ProPower';
import Button from './components/Button';
import BottomNav from './components/BottomNav';
import galleryIcon from './assets/gallery-icon.svg';
import scanIcon from './assets/scan-icon.svg';

// Импортируем компоненты экранов и диалога
import SettingsScreen from './screens/SettingsScreen';
import HistoryScreen from './screens/HistoryScreen';
import DocumentDetailScreen from './screens/DocumentDetailScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ScanResultScreen from './screens/ScanResultScreen';
import ScanConfirmationDialog from './components/ScanConfirmationDialog';

// Инициализируем Tesseract Worker один раз
let worker = null;
const getTesseractWorker = async () => {
  if (!worker) {
    worker = await createWorker('rus'); // 'rus' для русского языка. Можете добавить 'eng' для английского.
    console.log('Tesseract worker initialized');
  }
  return worker;
};

// Компонент главной страницы
const HomeScreen = () => {
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedFiles([]);
  };

  const handleScanImages = async (filesToScan, onProgress) => {
    let combinedText = '';
    let allFileNames = [];

    const tesseractWorker = await getTesseractWorker();

    for (let i = 0; i < filesToScan.length; i++) {
      const file = filesToScan[i];
      allFileNames.push(file.name);
      const reader = new FileReader();

      await new Promise(resolve => {
        reader.onload = async (e) => {
          const imageSrc = e.target.result;
          const { data: { text } } = await tesseractWorker.recognize(imageSrc);
          combinedText += text + '\n\n';
          onProgress((i + 1) / filesToScan.length);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    history.push('/scan-result', {
      imageSrc: filesToScan.length > 0 ? URL.createObjectURL(filesToScan[0]) : null,
      recognizedText: combinedText.trim(),
      fileName: allFileNames.join(', '),
    });
  };

  const triggerFileInput = (acceptType, capture) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptType;
    input.multiple = true;
    if (capture) {
      input.capture = capture;
    }
    input.onchange = (event) => handleFileSelect(Array.from(event.target.files));
    input.click();
  };

  const handleLoadClick = () => {
    console.log('Нажата кнопка Load');
    triggerFileInput('image/*', null);
  };

  const handleScanClick = () => {
    console.log('Нажата кнопка Scan');
    triggerFileInput('image/*', 'environment');
  };

  return (
    <div className="main-content">
      <ProPower />
      <div className="buttons-container">
        <Button
          text="Load"
          icon={galleryIcon}
          onClick={handleLoadClick}
        />
        <Button
          text="Scan"
          icon={scanIcon}
          onClick={handleScanClick}
        />
      </div>
      <ScanConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        initialFiles={selectedFiles}
        onScan={handleScanImages}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/history/:documentId" component={DocumentDetailScreen} />
          <Route path="/history" component={HistoryScreen} />
          <Route path="/settings" component={SettingsScreen} />
          <Route path="/edit-profile" component={EditProfileScreen} />
          <Route path="/scan-result" component={ScanResultScreen} />
        </Switch>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;