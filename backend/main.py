from flask import Flask, request, jsonify
from flask_cors import CORS
from palette import PaletteExtractor
from recolor import Palette
import shutil
import os
from PIL import Image
import numpy as np
import logging
from colorthief import ColorThief
import json
from datetime import datetime


app = Flask(__name__)
CORS(app)

# 設置日誌
logging.basicConfig(level=logging.DEBUG, filename='recolor.log', filemode='a',
                    format='%(asctime)s - %(levelname)s - %(message)s')

SAVE_DIR = os.path.join(app.root_path, 'static/outputs/')
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

@app.route('/palette', methods=['POST'])
def get_palette():
    # 檢查是否有圖片檔案
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image = request.files['image']
    
    # 儲存圖片檔案
    temp_path = "temp.jpg"
    image.save(temp_path)
    
    k_str = request.form.get('k', '5')
    try:
        k = int(k_str)
    except ValueError:
        return jsonify({"error": "Invalid value for k, must be an integer"}), 400

    # 使用 PaletteExtractor 提取顏色
    # extractor = PaletteExtractor(temp_path, k=5)
    # colors = extractor.extract_palette()
    # 或者
    # 使用 ColorThief 提取顏色
    color_thief = ColorThief("temp.jpg")
    dominant_color = color_thief.get_color(quality=10)
    palette = color_thief.get_palette(color_count=k, quality=10)
    colors = [list(color) for color in palette]
    # 刪除臨時圖片檔案
    os.remove(temp_path)

    return jsonify({"palette": colors})

@app.route('/recolor', methods=['POST'])
def recolor_image():
    # Check if an image file is provided
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    if 'palette' not in request.form:
        return jsonify({"error": "No palette provided"}), 400

    # Extract the uploaded image and palette
    image = request.files['image']
    palette = request.form['palette']
    try:
        # palette should be like: [[61,80,34], [144,104,127], [179,145,120]]
        palette = json.loads(palette)
        if not (isinstance(palette, list) and all(isinstance(c, list) and len(c) == 3 for c in palette)):
            raise ValueError("Invalid palette format")
    except Exception:
        return jsonify({"error": "Invalid palette format. Expected JSON: [[R,G,B], [R,G,B], ...]"}), 400

    # Save the uploaded image temporarily
    temp_path = "temp_image.jpg"
    try:
        image.save(temp_path)
    except Exception as e:
        return jsonify({"error": f"Failed to save image: {str(e)}"}), 500

    try:
        # Open the image and ensure it's RGB
        with Image.open(temp_path) as img:
            rgb_img = img.convert("RGB")  # 確保為 RGB 格式
            img_array = np.array(rgb_img)
            logging.debug(f"輸入圖像形狀: {img_array.shape}")

            # Create a Palette instance with the provided palette
            recolor_palette = Palette(palette)

            # Recolor the RGB image using the Palette
            pil_img = recolor_palette.transform(img_array)
            logging.debug("重上色完成")

        # Save the processed image
        timestamp = datetime.now().strftime("%m%d_%H%M")
        output_filename = f"{timestamp}.png"
        output_path = os.path.join(SAVE_DIR, output_filename)
        pil_img.save(output_path)
        logging.debug(f"輸出圖像儲存至 {output_path}")

        # Delete the temporary image file
        os.remove(temp_path)
        logging.debug(f"臨時檔案 {temp_path} 已刪除")

        return jsonify({
            "message": "Image recolored successfully",
            "output_image_path": f"static/outputs/{output_filename}"
        })

    except Exception as e:
        # Clean up temporary file if it exists
        if os.path.exists(temp_path):
            os.remove(temp_path)
        logging.exception("recolor 端點發生錯誤")
        return jsonify({"error": f"Failed to process image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port = 8080)