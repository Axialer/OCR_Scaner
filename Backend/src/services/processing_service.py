import os
import cv2
import numpy as np
from deskew import determine_skew
from skimage.transform import rotate
from PIL import Image

class ProcessingService:
    def __init__(self, input_dir: str = r".\src\uploads", 
                 output_dir: str = r".\src\uploads_processed"):
        self.input_dir = input_dir
        self.output_dir = output_dir

    @staticmethod
    def process_image(image_path):
        """Статический метод для обработки одного изображения"""
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Не удалось загрузить изображение: {image_path}")

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        angle = determine_skew(gray)
        rotated = rotate(image, angle, resize=True) * 255
        return rotated.astype(np.uint8)

    def process_all_images(self):
        """Обрабатывает все изображения в директории"""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

        results = []
        for filename in os.listdir(self.input_dir):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                input_path = os.path.join(self.input_dir, filename)
                output_filename = os.path.splitext(filename)[0] + '.jpg'
                output_path = os.path.join(self.output_dir, output_filename)

                try:
                    processed_image = self.process_image(input_path)
                    Image.fromarray(processed_image).save(output_path, quality=95)
                    results.append(f"Обработан: {filename} -> {output_filename}")
                except Exception as e:
                    results.append(f"Ошибка при обработке {filename}: {str(e)}")
        
        return results
