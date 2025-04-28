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

    def transform(self, grayscale_img):
        # Ensure grayscale_img is a 2D array
        grayscale_img = np.array(grayscale_img, dtype=float)
        if grayscale_img.ndim != 2:
            raise ValueError(f"Expected 2D grayscale image, got shape {grayscale_img.shape}")

        # Normalize grayscale values to [0, 1]
        grayscale_img = grayscale_img / 255.0

        # Initialize output image in RGB
        height, width = grayscale_img.shape
        output_img = np.zeros((height, width, 3), dtype=np.uint8)

        # Map grayscale values to palette colors
        num_colors = len(self.lab_colors)
        for i in range(height):
            for j in range(width):
                # Get grayscale intensity (0 to 1)
                intensity = grayscale_img[i, j]

                # Map intensity to a position in the palette
                # Divide the [0, 1] range into (num_colors - 1) segments
                segment = intensity * (num_colors - 1)
                idx = int(segment)  # Lower index of the segment
                frac = segment - idx  # Fractional part for interpolation

                if idx == num_colors - 1:
                    # If at the last color, use it directly
                    lab_color = self.lab_colors[-1]
                else:
                    # Linearly interpolate between lab_colors[idx] and lab_colors[idx + 1]
                    lab_color = (1 - frac) * self.lab_colors[idx] + frac * self.lab_colors[idx + 1]

                # Convert LAB color back to RGB
                rgb_color = self.lab_to_rgb(lab_color)
                output_img[i, j] = rgb_color

        return output_img