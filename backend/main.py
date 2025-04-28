from flask import Flask, request, jsonify
from flask_cors import CORS
from palette import PaletteExtractor
from recolor import Palette
import shutil
import os
from PIL import Image
import numpy as np
import logging

app = Flask(__name__)
CORS(app)

# 設置日誌
logging.basicConfig(level=logging.DEBUG, filename='recolor.log', filemode='a',
                    format='%(asctime)s - %(levelname)s - %(message)s')

STATIC_DIR = os.path.join(app.root_path, 'static')
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR)

@app.route('/palette', methods=['POST'])
def get_palette():
    # 檢查是否有圖片檔案
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image = request.files['image']
    
    # 儲存圖片檔案
    temp_path = "temp.jpg"
    image.save(temp_path)

    # 使用 PaletteExtractor 提取顏色
    extractor = PaletteExtractor(temp_path, k=5)
    colors = extractor.extract_palette()

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
        # Parse palette string (e.g., "61,80,34;144,104,127;...")
        palette = [list(map(int, color.split(','))) for color in palette.split(';')]
    except ValueError:
        return jsonify({"error": "Invalid palette format. Expected format: R,G,B;R,G,B;..."}), 400

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
            mapped_img = recolor_palette.transform(img_array)
            logging.debug("重上色完成")

        # Save the processed image
        output_filename = "output_image.jpg"
        output_path = os.path.join(STATIC_DIR, output_filename)
        pil_img = Image.fromarray(mapped_img)
        pil_img.save(output_path)
        logging.debug(f"輸出圖像儲存至 {output_path}")

        # Delete the temporary image file
        os.remove(temp_path)
        logging.debug(f"臨時檔案 {temp_path} 已刪除")

        return jsonify({
            "message": "Image recolored successfully",
            "output_image_path": f"static/{output_filename}"
        })

    except Exception as e:
        # Clean up temporary file if it exists
        if os.path.exists(temp_path):
            os.remove(temp_path)
        logging.exception("recolor 端點發生錯誤")
        return jsonify({"error": f"Failed to process image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)