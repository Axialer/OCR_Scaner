import React from 'react';
import { useLocation, useHistory } from 'react-router-dom'; // Изменяем useNavigate на useHistory
import '../styles/App.css'; // Общие стили контейнера
import '../styles/documentDetailScreen.css'; // Переиспользуем стили для деталей документа

const ScanResultScreen = () => {
  const location = useLocation();
  const history = useHistory(); // Используем useHistory
  const { imageSrc, recognizedText, fileName } = location.state || {}; // Получаем данные из state

  const handleGoBack = () => {
    history.goBack(); // Возвращаемся на предыдущую страницу
  };

  // Функция для копирования текста в буфер обмена (можно перенести в утилиту или переиспользовать компонент)
  const [copied, setCopied] = React.useState(false);
  const handleCopyText = async () => {
    if (recognizedText) {
      try {
        await navigator.clipboard.writeText(recognizedText);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
      }
    }
  };

  if (!imageSrc && !recognizedText) {
    return (
      <div className="main-content">
        <h2>Нет данных для отображения</h2>
        <button onClick={handleGoBack} className="back-button">
          &larr; Назад
        </button>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="document-detail-container">
        <button onClick={handleGoBack} className="back-button">
          &larr; Назад
        </button>

        <h2>Результаты сканирования</h2>
        <p className="document-date">Имя файла: {fileName || 'Без имени'}</p>

        <div className="document-image-container">
          {imageSrc ? (
            <img src={imageSrc} alt="Отсканированное изображение" className="document-image" />
          ) : (
            <div className="placeholder-image">Нет изображения</div>
          )}
        </div>

        <div className="recognized-text-header">
            <h3>Распознанный текст:</h3>
            <button onClick={handleCopyText} className="copy-button" title="Скопировать текст">
                📋
            </button>
            {copied && <span className="copied-message">Скопировано!</span>}
        </div>

        <div className="recognized-text-block">
          {recognizedText ? (
            <p>{recognizedText}</p>
          ) : (
            <p>Текст не распознан.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanResultScreen; 