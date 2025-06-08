import os
import language_tool_python
from pathlib import Path

class CorrectingErrors:
<<<<<<< HEAD
    def __init__(
        self,
        input_dir: str = r"C:\Users\Asus\Documents\GitHub\PersCurs\src\txt_output_files",
        language: str = 'en-US'
    ):
        # Используем Path для удобства
        self.input_dir = Path(input_dir)
        self.files_ext = ('.txt', '.docx')
=======
    def __init__(self, input_dir: str = "./src/uploads_text", language: str = 'en-US'):
        self.input_dir = os.path.normpath(input_dir)
        self.files_ext = (".txt", ".docx")
>>>>>>> 4f296facc7d6f28245f264a12bc4031d7d011a8e
        self.tool = language_tool_python.LanguageToolPublicAPI(language)

        # Создаем директорию, если её нет
        self.input_dir.mkdir(parents=True, exist_ok=True)

    def get_files(self) -> list:
        """Возвращает список файлов с нужными расширениями."""
        try:
            files = os.listdir(self.input_dir)
        except Exception as e:
            raise RuntimeError(f"Ошибка чтения директории {self.input_dir}: {e}")

        filtered_files = [
            f for f in files 
            if Path(f).suffix.lower() in self.files_ext
        ]

        if not filtered_files:
            raise FileNotFoundError(
                f"Нет файлов с расширениями {self.files_ext} в {self.input_dir}"
            )

        return filtered_files

    def find_errors(self) -> list:
        """Проверяет файлы на наличие ошибок и возвращает результат."""
        all_matches = []
<<<<<<< HEAD
        tool = language_tool_python.LanguageToolPublicAPI('en-US')

        for filename in self.get_files():
            file_path = self.input_dir / filename
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    text = file.read()
                    matches = tool.check(text)
                    all_matches.append([filename, matches])
            except Exception as e:
                raise RuntimeError(f"Ошибка при обработке файла {filename}: {str(e)}")

        return all_matches
=======
        
        try:
            tool = language_tool_python.LanguageToolPublicAPI('en-US') # use the public API
            matches = []
            for i in self.get_files():
                file = open(self.input_dir+"/" + i,'r')
                matches = tool.check(file.read())
                file.close()
                all_matches.append([i,matches])
        except Exception as e:
            raise RuntimeError(f"Ошибка обработки файлов: {str(e)}")
        
        return all_matches
>>>>>>> 4f296facc7d6f28245f264a12bc4031d7d011a8e
