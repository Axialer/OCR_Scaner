import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // Изменяем useNavigate на useHistory
import '../styles/App.css'; // Общие стили контейнера
import '../styles/documentDetailScreen.css'; // Стили для этого экрана

// Пример данных для документов (замените на реальные данные)
const dummyDocuments = [
  {
    id: '1',
    fileName: 'Документ_скан_01.pdf',
    date: '2023-10-26',
    imageSrc: null, // null для примера без изображения
    recognizedText: 'Это пример распознанного текста для документа 1. Здесь может быть много текста, который был извлечен из изображения документа.',
  },
  {
    id: '2',
    fileName: 'Фото_квитанции.jpg',
    date: '2023-10-25',
    imageSrc: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg', // Пример с placeholder изображением
    recognizedText: 'Пример текста с квитанции: Сумма к оплате 1500 руб. Дата 25.10.2023. Получатель: ООО "Рога и Копыта".',
  },
  {
    id: '3',
    fileName: 'Отчет_за_месяц_очень_длинное_название_файла.docx',
    date: '2023-10-24',
    imageSrc: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg',
    recognizedText: 'Краткий отчет: Продажи выросли на 10%. Расходы снизились на 5%. Прибыль увеличилась на 15%.',
  },
  {
    id: '4',
    fileName: 'Счет_на_оплату.png',
    date: '2023-10-23',
    imageSrc: null,
    recognizedText: 'Счет №12345 от 23.10.2023. Услуга: Консультация. Стоимость: 5000 руб.',
  },
  {
    id: '5',
    fileName: 'Заметка_о_встрече.txt',
    date: '2023-10-22',
    imageSrc: null,
    recognizedText: 'Заметка: Встреча перенесена на завтра в 14:00. Принести документы.',
  },
  {
    id: '6',
    fileName: 'Рецепт_торта.jpg',
    date: '2023-10-21',
    imageSrc: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg',
    recognizedText: 'Рецепт: Мука, сахар, яйца, молоко. Выпекать 30 минут при 180 градусах.',
  },
  {
    id: '7',
    fileName: 'Список_покупок_на_неделю.pdf',
    date: '2023-10-20',
    imageSrc: null,
    recognizedText: 'Список: Хлеб, молоко, яйца, овощи, фрукты.',
  },
  {
    id: '8',
    fileName: 'Письмо_другу.doc',
    date: '2023-10-19',
    imageSrc: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg',
    recognizedText: 'Привет! Как дела? Я тут недавно... (продолжение письма)',
  },
  {
    id: '9',
    fileName: 'Презентация_проект_X.pptx',
    date: '2023-10-18',
    imageSrc: null,
    recognizedText: 'Слайд 1: Введение. Слайд 2: Цели проекта. Слайд 3: Результаты.',
  },
  {
    id: '10',
    fileName: 'Дневник_наблюдений.csv',
    date: '2023-10-17',
    imageSrc: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg',
    recognizedText: 'Дата, Время, Событие, Описание. 2023-10-17, 10:00, Наблюдение 1, Яркое солнце.',
  },
  {
    id: '11',
    fileName: 'Инструкция_по_сборке.pdf',
    date: '2023-10-16',
    imageSrc: null,
    recognizedText: 'Шаг 1: Откройте коробку. Шаг 2: Достаньте детали. Шаг 3: Следуйте схеме.',
  },
  {
    id: '12',
    fileName: 'Отпускные_документы.zip',
    date: '2023-10-15',
    imageSrc: 'https://litmap.ru/wp-content/uploads/c/f/a/cfa03cce25f7418a8be6f918204ec589.jpeg',
    recognizedText: 'Заявление на отпуск, бронь отеля, билеты на самолет. Все готово!',
  },
];

const DocumentDetailScreen = () => {
  const { documentId } = useParams(); // Получаем ID документа из URL
  const history = useHistory(); // Используем useHistory

  // Состояние для отображения сообщения о копировании
  const [copied, setCopied] = useState(false);

  // Находим документ по ID (в реальном приложении здесь будет запрос к API или хранилищу)
  const document = dummyDocuments.find(doc => doc.id === documentId);

  // Функция для возврата назад
  const handleGoBack = () => {
    history.goBack(); // Используем history.goBack() для возврата
  };

  // Функция для копирования текста в буфер обмена
  const handleCopyText = async () => {
    if (document?.recognizedText) {
      try {
        await navigator.clipboard.writeText(document.recognizedText);
        setCopied(true);
        // Скрываем сообщение через 2 секунды
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
        // Можно добавить обработку ошибок, например, показать сообщение об ошибке
      }
    }
  };

  if (!document) {
    return (
      <div className="main-content">
        <h2>Документ не найден</h2>
        <p>Документ с ID {documentId} не существует.</p>
      </div>
    );
  }

  return (
    <div className="main-content"> {/* Используем класс main-content */}
      <div className="document-detail-container">
        {/* Кнопка Назад с текстовой стрелкой */}
        <button onClick={handleGoBack} className="back-button">
          &larr; {/* Используем символ стрелки влево */}
        </button>

        <h2>{document.fileName}</h2>
        <p className="document-date">Дата создания: {document.date}</p>

        <div className="document-image-container">
          {document.imageSrc ? (
            <img src={document.imageSrc} alt={`Изображение документа ${document.fileName}`} className="document-image" />
          ) : (
            <div className="placeholder-image">Нет изображения</div>
          )}
        </div>

        {/* Контейнер для заголовка и кнопки копирования */}
        <div className="recognized-text-header">
            <h3>Распознанный текст:</h3>
            {/* Кнопка копирования */}
            <button onClick={handleCopyText} className="copy-button" title="Скопировать текст">
                📋 {/* Символ иконки копирования */}
            </button>
            {/* Сообщение о копировании */}
            {copied && <span className="copied-message">Скопировано!</span>}
        </div>

        <div className="recognized-text-block">
          {document.recognizedText ? (
            <p>{document.recognizedText}</p>
          ) : (
            <p>Текст не распознан.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailScreen;
