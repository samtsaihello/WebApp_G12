# palette.py
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
from colormath.color_objects import sRGBColor, LabColor
from colormath.color_conversions import convert_color

class PaletteExtractor:
    def __init__(self, image_path, k=5, bin_range=16):
        self.image = Image.open(image_path).convert('RGB')
        self.data = np.array(self.image)
        self.k = k
        self.bin_range = bin_range
        self.bin_size = 256 // bin_range
        self.bins = self._create_bins()

    def _rgb_to_lab(self, rgb):
        srgb = sRGBColor(rgb[0]/255, rgb[1]/255, rgb[2]/255)
        lab = convert_color(srgb, LabColor)
        return np.array([lab.lab_l, lab.lab_a, lab.lab_b])

    def _create_bins(self):
        bins = {}
        for r in range(self.bin_range):
            for g in range(self.bin_range):
                for b in range(self.bin_range):
                    color = [(r + 0.5) * self.bin_size,
                             (g + 0.5) * self.bin_size,
                             (b + 0.5) * self.bin_size]
                    bins[(r, g, b)] = {
                        'color': color,
                        'count': 0,
                        'Lab': self._rgb_to_lab(color)
                    }
        return bins

    def count_bins(self):
        for row in self.data:
            for pixel in row:
                ri = pixel[0] // self.bin_size
                gi = pixel[1] // self.bin_size
                bi = pixel[2] // self.bin_size
                key = (ri, gi, bi)
                if key in self.bins:
                    self.bins[key]['count'] += 1

    def extract_palette(self):
        self.count_bins()
        lab_list = []
        weight_list = []
        for b in self.bins.values():
            if b['count'] > 0:
                lab_list.append(b['Lab'])
                weight_list.append(b['count'])

        kmeans = KMeans(n_clusters=self.k+1, random_state=42)
        kmeans.fit(lab_list, sample_weight=weight_list)
        centers_lab = kmeans.cluster_centers_

        # Convert back to RGB
        palette_rgb = []
        for lab in centers_lab:
            lab_obj = LabColor(lab[0], lab[1], lab[2])
            rgb_obj = convert_color(lab_obj, sRGBColor)
            r = int(min(max(rgb_obj.clamped_rgb_r * 255, 0), 255))
            g = int(min(max(rgb_obj.clamped_rgb_g * 255, 0), 255))
            b = int(min(max(rgb_obj.clamped_rgb_b * 255, 0), 255))
            palette_rgb.append((r, g, b))

        return palette_rgb
