from skimage import color
import numpy as np
from PIL import Image

class Palette:
    def __init__(self, colors):
        self.colors = [np.array(c, dtype=float) for c in colors]
        self.lab_colors = [self.rgb_to_lab(c) for c in self.colors]

    def rgb_to_lab(self, rgb):
        rgb = np.array(rgb, dtype=float).reshape(1, 1, 3) / 255
        lab = color.rgb2lab(rgb)[0][0]
        return lab

    def lab_to_rgb(self, lab):
        lab = np.array(lab, dtype=float).reshape(1, 1, 3)
        rgb = color.lab2rgb(lab)[0][0] * 255
        return np.clip(rgb, 0, 255).astype(int)

    def transform(self, input_img):
        input_img = np.array(input_img, dtype=float)

        # 是否包含 alpha 通道
        has_alpha = input_img.shape[2] == 4

        rgb_img = input_img[:, :, :3]
        alpha_channel = input_img[:, :, 3] if has_alpha else None

        input_lab = color.rgb2lab(rgb_img / 255.0)
        height, width, _ = rgb_img.shape
        output_img = np.zeros((height, width, 3), dtype=np.uint8)

        for i in range(height):
            for j in range(width):
                pixel_rgb = rgb_img[i, j]

                # 跳過透明像素（alpha < 10）
                if has_alpha and alpha_channel[i, j] < 10:
                    output_img[i, j] = pixel_rgb
                    continue

                # 跳過接近白色像素
                if np.all(pixel_rgb > 250):
                    output_img[i, j] = pixel_rgb
                    continue

                # LAB 空間轉換與調色邏輯
                pixel_lab = input_lab[i, j]
                pixel_l = pixel_lab[0]
                pixel_ab = pixel_lab[1:]

                distances = []
                for lab_color in self.lab_colors:
                    l_diff = abs(lab_color[0] - pixel_l)
                    ab_diff = np.linalg.norm(lab_color[1:] - pixel_ab)
                    total_distance = 0.8 * l_diff + 0.2 * ab_diff
                    distances.append(total_distance)

                distances = np.array(distances)
                indices = np.argsort(distances)[:2]
                dist1, dist2 = distances[indices]

                if dist1 == 0 or dist2 == 0:
                    lab_color = self.lab_colors[indices[0]]
                else:
                    weight1 = dist2 / (dist1 + dist2)
                    weight2 = dist1 / (dist1 + dist2)
                    lab_color = weight1 * self.lab_colors[indices[0]] + weight2 * self.lab_colors[indices[1]]
                    lab_color[0] = pixel_l  # 保留亮度

                rgb_color = self.lab_to_rgb(lab_color)
                output_img[i, j] = rgb_color

        # 合併 alpha 通道回來（如果有）
        if has_alpha:
            output_img = np.dstack((output_img, alpha_channel)).astype(np.uint8)
            return Image.fromarray(output_img, mode='RGBA')
        else:
            return Image.fromarray(output_img, mode='RGB')
