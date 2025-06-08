import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/App.css';
import '../styles/editProfileScreen.css';

const EditProfileScreen = () => {
  const history = useHistory();

  // Пример данных пользователя (замените на реальные данные)
  const user = {
    name: 'Абоба',
    email: 'Aboba@gmail.com',
    avatarUrl: "https://avatars.mds.yandex.net/get-yapic/45131/jeHxDmSIYkL3brTDgwBwGFsAOI-1/orig",
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleChangePhoto = () => {
    console.log('Изменить фото');
    // Логика выбора фото из галереи или съемки с камеры
  };

  const handleProcessedFiles = () => {
    console.log('Переход к обработанным файлам');
    // Логика перехода на страницу с обработанными файлами
  };

  const handleLinkAccount = (service) => {
    console.log(`Подключить аккаунт ${service}`);
    // Логика подключения облачного сервиса
  };

  return (
    <div className="main-content">
      <div className="edit-profile-container">
        {/* Кнопка назад и заголовок */}
        <button onClick={handleBack} className="back-button">
          &larr; Назад
        </button>
        <h2>Редактирование профиля</h2>

        {/* Блок изменения фото */}
        <div className="photo-block">
          <div className="avatar-edit">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Аватар пользователя" />
            ) : (
              <span>👤</span>
            )}
          </div>
          <div className="change-photo-text" onClick={handleChangePhoto}>
            <span className="icon">📸</span>
            <div className="text-content">
              <span className="title">Изменить фото</span>
              <span className="description">Выберите фото из галереи или сделайте снимок через камеру</span>
            </div>
          </div>
        </div>

        {/* Блок данных пользователя (имя, почта, кнопка файлов) */}
        <div className="user-info-block">
          <div className="info-item">
            <span className="label">Имя:</span>
            <span className="value">{user.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Почта:</span>
            <span className="value">{user.email}</span>
          </div>
          <button onClick={handleProcessedFiles} className="processed-files-button">
            Изменить данные
          </button>
        </div>

        {/* Блок облачных хранилищ */}
        <div className="cloud-storage-block">
          <h3>Облачное хранилище</h3>
          <div className="cloud-storage-list">
            <div className="cloud-storage-item">
              <span className="cloud-icon google-drive"></span>
              <span className="service-name">Google Drive</span>
              <button className="link-account" onClick={() => handleLinkAccount('Google Drive')}>Привязать аккаунт</button>
            </div>
            <div className="cloud-storage-item">
              <span className="cloud-icon dropbox"></span>
              <span className="service-name">Dropbox</span>
              <button className="link-account" onClick={() => handleLinkAccount('Dropbox')}>Привязать аккаунт</button>
            </div>
            <div className="cloud-storage-item">
              <span className="cloud-icon onedrive"></span>
              <span className="service-name">OneDrive</span>
              <button className="link-account" onClick={() => handleLinkAccount('OneDrive')}>Привязать аккаунт</button>
            </div>
          </div>
        </div>

        {/* Добавьте другие элементы здесь */}
      </div>
    </div>
  );
};

export default EditProfileScreen;