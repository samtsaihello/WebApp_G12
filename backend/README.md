# Backend - Image Palette Extraction and Colorization

## 簡介

本後端專案提供兩個主要功能 API：

* `/palette`：從彩色圖片中擷取主要色彩組成色票
* `/recolor`：根據指定色票為圖片重上色

使用 Flask 搭建伺服器，配合 React 前端進行圖片處理互動。

---

## API 說明

### 1. `/palette`

**方法**：POST
**用途**：上傳圖片並擷取主要色彩色票

**參數**：

* `image`：圖片檔案 (multipart/form-data)
* `k（選填）`：要擷取的色彩數量，整數（預設為 5）

**範例請求**：
```bash
curl -X POST http://localhost:8080/palette \
-F "image=@your_image.jpg" \
-F "k=6"
```

**成功回傳**：

```json
{
  "palette": [
    [R, G, B],
    [R, G, B],
    ...
  ]
}
```

每個 `[R, G, B]` 是一個色彩點。

---

### 2. `/recolor`

**方法**：POST
**用途**：上傳圖片與色票，根據色票重上色。

**參數**：

* `image`：圖片檔案 (multipart/form-data)
* `palette`：色票字串，格式為 `"R,G,B;R,G,B;..."`

**範例請求**：
```bash
curl -X POST http://localhost:8080/recolor \
-F "image=@your_image.jpg" \
-F "palette=[[61,80,34],[144,104,127],[179,145,120]]"
```

**回傳**：

```json
{
  "message": "Image recolored successfully",
  "output_image_path": "static/output_image.jpg"
}
```

會將上色後的圖片存檔，並回傳圖片路徑。

---
