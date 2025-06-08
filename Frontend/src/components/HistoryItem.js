import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import '../styles/historyScreen.css'; // Подключаем стили для истории

const HistoryItem = ({ id, fileName, preview }) => {
  // Удаляем логику обрезки из компонента
  // const maxFileNameLength = 20;
  // const displayedFileName = fileName.length > maxFileNameLength
  //   ? `${fileName.slice(0, maxFileNameLength)}...`
  //   : fileName;

  return (
    // Оборачиваем весь элемент истории в Link
    <Link to={`/history/${id}`} className="history-item-link">
      <div className="history-item">
        <div className="preview-container">
          {/* Здесь будет превью документа */}
          {preview ? (
            <img src={preview} alt={`Превью ${fileName}`} className="document-preview" />
          ) : (
            <div className="placeholder-preview">Нет превью</div>
          )}
        </div>
        {/* Используем оригинальное название файла, CSS обрежет его */}
        <div className="file-name">{fileName}</div>
      </div>
    </Link>
  );
};

export default HistoryItem;
