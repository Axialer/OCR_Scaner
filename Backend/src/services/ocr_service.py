
import os
import easyocr
import traceback

class OcrScanner:
    def __init__(self, languages: list = None, 
                 input_dir: str = "./src/uploads_processed", 
                 output_dir: str = "./src/uploads_text"):
        # Устанавливаем языки по умолчанию, если не переданы
        if languages is None:
            languages = ['en']
            
        try:
            print("Инициализация EasyOCR...")
            self.reader = easyocr.Reader(languages)
            print("EasyOCR успешно инициализирован")
        except Exception as e:
            print(f"Ошибка инициализации EasyOCR: {str(e)}")
            raise
            
        # Нормализуем пути
        self.input_dir = os.path.normpath(input_dir)
        self.output_dir = os.path.normpath(output_dir)
        self.files_ext = (".png", ".jpg", ".jpeg")
        
        os.makedirs(self.input_dir, exist_ok=True)
        os.makedirs(self.output_dir, exist_ok=True)

    def get_files(self) -> list:
        try:
            files = os.listdir(self.input_dir)
            
            if not files:
                raise FileNotFoundError(
                    f"Директория {self.input_dir} пуста"
                )
            
            filtered_files = [
                f for f in files 
                if os.path.splitext(f)[1].lower() in self.files_ext
            ]
            
            if not filtered_files:
                raise FileNotFoundError(
                    f"Нет файлов с расширениями {self.files_ext} в {self.input_dir}"
                )
                
            return filtered_files
        
        except Exception as e:
            print(f"Ошибка при получении файлов: {str(e)}")
            raise

    def ocr_scan(self) -> str:
        try:
            print("\nНачало сканирования...")
            files = self.get_files()
            print(f"Найдено {len(files)} файлов для обработки: {files}")
            
            for file in files:
                input_path = os.path.join(self.input_dir, file)
                output_name = f"{os.path.splitext(file)[0]}.txt"
                output_path = os.path.join(self.output_dir, output_name)
                
                print(f"\nОбработка файла: {file}")
                print(f"Входной путь: {input_path}")
                print(f"Выходной путь: {output_path}")
                
                try:
                    # Проверка существования файла
                    if not os.path.exists(input_path):
                        print(f"Файл не найден: {input_path}")
                        continue
                        
                    # Проверка размера файла
                    file_size = os.path.getsize(input_path)
                    if file_size == 0:
                        print(f"Файл пуст: {input_path}")
                        continue
                        
                    print("Распознавание текста...")
                    result = self.reader.readtext(input_path, detail=0)
                    recognized_text = "\n".join(result)
                    
                    print(f"Распознано {len(result)} текстовых элементов")
                    
                    # Сохранение результата
                    with open(output_path, 'w', encoding='utf-8') as f:
                        f.write(recognized_text)
                        
                    print(f"Успешно сохранено в {output_path}")
                    
                except Exception as file_error:
                    print(f"Ошибка при обработке файла {file}:")
                    print(traceback.format_exc())
                    continue
            
            return "Сканирование завершено успешно"
        
        except Exception as e:
<<<<<<< HEAD
=======
            print(f"Критическая ошибка сканирования:")
            print(traceback.format_exc())
>>>>>>> 4f296facc7d6f28245f264a12bc4031d7d011a8e
            return f"Ошибка сканирования: {str(e)}"
