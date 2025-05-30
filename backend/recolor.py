from skimage import color
import numpy as np
from PIL import Image

class Palette:
    def __init__(self, colors):
        # Colors is a list of RGB tuples, e.g., [(61, 80, 34), ...]
        self.colors = [np.array(c, dtype=float) for c in colors]  # Store as numpy arrays
        self.lab_colors = [self.rgb_to_lab(c) for c in self.colors]  # Convert to LAB

    def rgb_to_lab(self, rgb):
        # Convert single RGB color to LAB
        rgb = np.array(rgb, dtype=float).reshape(1, 1, 3) / 255
        lab = color.rgb2lab(rgb)[0][0]
        return lab

    def lab_to_rgb(self, lab):
        # Convert single LAB color to RGB
        lab = np.array(lab, dtype=float).reshape(1, 1, 3)
        rgb = color.lab2rgb(lab)[0][0] * 255
        return np.clip(rgb, 0, 255).astype(int)

    def transform(self, input_img):
        # Ensure input_img is an RGB image (3 channels)
        input_img = np.array(input_img, dtype=float)
        if input_img.ndim != 3 or input_img.shape[2] != 3:
            raise ValueError(f"Expected 3-channel RGB image, got shape {input_img.shape}")

        # Convert input image to LAB color space
        input_lab = color.rgb2lab(input_img / 255.0)  # Shape: (height, width, 3)

        # Initialize output image in RGB
        height, width, _ = input_img.shape
        output_img = np.zeros((height, width, 3), dtype=np.uint8)

        # Process each pixel
        for i in range(height):
            for j in range(width):
                # 檢查是否近似白色
                pixel_rgb = input_img[i, j]
                if np.all(pixel_rgb > 250):  # 可視需求調整成 >245 或 >240
                    output_img[i, j] = pixel_rgb
                    continue

                # Get LAB values of the input pixel
                pixel_lab = input_lab[i, j]  # [L, A, B]
                pixel_l = pixel_lab[0]      # Lightness
                pixel_ab = pixel_lab[1:]    # A, B

                # Normalize lightness to [0, 1] for compatibility with original logic
                normalized_l = pixel_l / 100.0

                # Compute distances to palette colors
                distances = []
                for lab_color in self.lab_colors:
                    # Distance combines:
                    # 1. Lightness difference (L channel, weighted)
                    # 2. Color difference (A, B channels, Euclidean distance)
                    l_diff = abs(lab_color[0] - pixel_l)
                    ab_diff = np.linalg.norm(lab_color[1:] - pixel_ab)
                    # Weighted combination (adjust weights as needed)
                    total_distance = 0.5 * l_diff + 0.5 * ab_diff
                    distances.append(total_distance)

                # Find the two closest palette colors for interpolation
                distances = np.array(distances)
                indices = np.argsort(distances)[:2]  # Indices of two closest colors
                dist1, dist2 = distances[indices]

                if dist1 == 0 or dist2 == 0:
                    # If exact match, use the closest color
                    lab_color = self.lab_colors[indices[0]]
                else:
                    # Interpolate between the two closest colors based on distances
                    weight1 = dist2 / (dist1 + dist2)  # Inverse distance weighting
                    weight2 = dist1 / (dist1 + dist2)
                    lab_color = weight1 * self.lab_colors[indices[0]] + weight2 * self.lab_colors[indices[1]]

                    # Optionally, adjust L channel to preserve input lightness
                    lab_color[0] = pixel_l  # Keep original lightness

                # Convert LAB color back to RGB
                rgb_color = self.lab_to_rgb(lab_color)
                output_img[i, j] = rgb_color

        return output_img