import React from 'react';
import { useHistory } from 'react-router-dom'; // Изменено с useNavigate на useHistory
import '../styles/App.css'; // Используем общие стили контейнера
import '../styles/settingsScreen.css'; // Подключаем стили для этого экрана

const SettingsScreen = () => {
  const history = useHistory(); // Используем useHistory

  // Пример данных пользователя (замените на реальные данные)
  const user = {
    name: 'Aboba',
    email: 'Aboba@gmail.com',
    avatarUrl: "https://avatars.mds.yandex.net/get-yapic/45131/jeHxDmSIYkL3brTDgwBwGFsAOI-1/orig", // null или URL изображения
  };

  // Функции-заглушки для действий (замените на реальную логику)
  const handleEditProfile = () => {
    history.push('/edit-profile'); // Переходим на страницу редактирования профиля
  };

  const handleLanguageChange = (e) => {
    console.log('Изменен язык на:', e.target.value);
    // Логика изменения языка
  };

  const handleScrollChange = (e) => {
    console.log('Изменен режим прокрутки на:', e.target.value);
    // Логика изменения режима прокрутки
  };

  const handleRestorePurchases = () => {
    alert('Восстановление покупок...');
    // Логика восстановления покупок
  };

  const handleLogout = () => {
    alert('Выход из аккаунта');
    // Логика выхода из аккаунта
  };

  return (
    <div className="main-content"> {/* Используем класс main-content для стилизации */}
      <div className="settings-container">
        <h2>Настройки</h2>

        {/* Блок данных пользователя */}
        <div className="profile-block">
          <div className="avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Аватар пользователя" />
            ) : (
              <span>👤</span> // Иконка-заглушка, если нет аватара
            )}
          </div>
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <button onClick={handleEditProfile} className="edit-profile-button">
            <span>✏️</span> Редактировать профиль
          </button>
        </div>

        {/* Блок настроек */}
        <div className="settings-list">
          <div className="settings-item" onClick={handleLanguageChange}>
            <span className="icon">🌐</span> {/* Иконка глобуса */}
            <span className="text">Язык: Русский</span> {/* Пример: текущий язык */}
            <span className="arrow">&gt;</span> {/* Стрелка вправо */}
          </div>
          <div className="settings-item" onClick={handleScrollChange}>
             <span className="icon">📜</span> {/* Иконка свитка/документа */}
            <span className="text">Прокрутка редактора</span>
            <span className="arrow">&gt;</span>
          </div>
          <div className="settings-item" onClick={handleRestorePurchases}>
            <span className="icon">💲</span> {/* Иконка доллара */}
            <span className="text">Восстановить покупки</span>
            <span className="arrow">&gt;</span>
          </div>
        </div>

        {/* Кнопка выхода из аккаунта */}
        <button onClick={handleLogout} className="logout-button">
          Выйти из аккаунта
        </button>

        {/* Добавьте другие элементы настроек здесь */}
      </div>
    </div>
  );
};

export default SettingsScreen;
