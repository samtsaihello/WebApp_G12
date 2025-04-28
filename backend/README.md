# Backend - Image Palette Extraction and Colorization

## 簡介

本後端專案提供兩個主要功能 API：

- `/palette`：從彩色圖片中擷取主要色彩調色盤
- `/gray`：根據指定調色盤為圖片上色

使用 Flask 搭建伺服器。

---

## API 說明

### 1. `/palette`  
**方法**：POST  
**用途**：上傳彩色圖片，萃取主要色彩調色盤。

**參數**：
- `image`：彩色圖片檔案 (multipart/form-data)

**回傳**：
```json
{
  "palette": [
    [R, G, B],
    [R, G, B],
    ...
  ]
}
```
每個 `[R, G, B]` 是一個色彩。

---

### 2. `/gray`  
**方法**：POST  
**用途**：上傳灰階圖片與調色盤，根據調色盤上色。

**參數**：
- `image`：灰階圖片檔案 (multipart/form-data)
- `palette`：色彩調色盤字串，格式為 `"R,G,B;R,G,B;..."`

**回傳**：
```json
{
  "image_path": "path/to/processed_image.png"
}
```
會將上色後的圖片存檔，並回傳圖片路徑。

---

