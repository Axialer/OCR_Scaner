import React from 'react';
import '../styles/App.css'; // Используем общие стили контейнера
import '../styles/historyScreen.css'; // Подключаем стили для истории
import HistoryItem from '../components/HistoryItem'; // Импортируем компонент HistoryItem

// Пример данных для истории (замените на реальные данные)
const dummyHistoryData = [
  { id: '1', fileName: 'Документ_скан_01.pdf', preview: null }, // ID теперь строка
  { id: '2', fileName: 'Фото_квитанции.jpg', preview: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg' }, // ID теперь строка
  { id: '3', fileName: 'Отчет_за_месяц_очень_длинное_название_файла.docx', preview: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg' }, // ID теперь строка
  { id: '4', fileName: 'Счет_на_оплату.png', preview: null }, // ID теперь строка
  { id: '5', fileName: 'Документ_скан_01.pdf', preview: null }, // ID теперь строка
  { id: '6', fileName: 'Фото_квитанции.jpg', preview: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg' }, // ID теперь строка
  { id: '7', fileName: 'Отчет_за_месяц_очень_длинное_название_файла.docx', preview: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg' }, // ID теперь строка
  { id: '8', fileName: 'Счет_на_оплату.png', preview: null }, // ID теперь строка
  { id: '9', fileName: 'Документ_скан_01.pdf', preview: null }, // ID теперь строка
  { id: '10', fileName: 'Фото_квитанции.jpg', preview: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg' }, // ID теперь строка
  { id: '11', fileName: 'Отчет_за_месяц_очень_длинное_название_файла.docx', preview: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg' }, // ID теперь строка
  { id: '12', fileName: 'Счет_на_оплату.png', preview: null }, // ID теперь строка
];

const HistoryScreen = () => {
  return (
    <div className="main-content"> {/* Используем класс main-content для стилизации */}
      <h2>История сканирований</h2>
      <div className="history-list"> {/* Контейнер для списка элементов истории */}
        {dummyHistoryData.map(item => (
          <HistoryItem
            key={item.id}
            id={item.id} // Передаем id (теперь строку)
            fileName={item.fileName}
            preview={item.preview}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryScreen;
