import React, { useState, useEffect } from 'react';
import '../styles/scanConfirmationDialog.css';

const ScanConfirmationDialog = ({ isOpen, onClose, initialFiles, onScan }) => {
  const [files, setFiles] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (initialFiles) {
      setFiles(initialFiles.map(file => ({ file, preview: URL.createObjectURL(file) })));
    }
  }, [initialFiles]);

  if (!isOpen) return null;

  const handleAddFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(prevFiles => [
      ...prevFiles,
      ...newFiles.map(file => ({ file, preview: URL.createObjectURL(file) }))
    ]);
  };

  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    await onScan(files.map(f => f.file), (progress) => {
      setScanProgress(Math.floor(progress * 100));
    });
    setIsScanning(false);
    onClose(); // Закрываем диалог после сканирования
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Подтверждение сканирования</h2>

        <div className="image-previews">
          {files.length === 0 ? (
            <p>Нет выбранных изображений.</p>
          ) : (
            files.map((item, index) => (
              <div key={index} className="image-preview-item">
                <img src={item.preview} alt="Предварительный просмотр" />
                <button className="remove-button" onClick={() => handleRemoveFile(index)}>&times;</button>
              </div>
            ))
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          id="add-more-files"
          onChange={handleAddFiles}
        />
        <label htmlFor="add-more-files" className="scan-dialog-button add-more-button">
          Добавить еще фото
        </label>

        {isScanning && (
          <div className="progress-container">
            <p>Сканирование...</p>
            <div className="progress-bar-background">
              <div className="progress-bar-fill" style={{ width: `${scanProgress}%` }}>
                {scanProgress}%
              </div>
            </div>
          </div>
        )}

        <div className="dialog-actions">
          <button onClick={handleStartScan} className="scan-dialog-button scan-button" disabled={files.length === 0 || isScanning}>
            {isScanning ? 'Сканирование...' : 'Начать сканирование'}
          </button>
          <button onClick={onClose} className="scan-dialog-button cancel-button" disabled={isScanning}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanConfirmationDialog; 