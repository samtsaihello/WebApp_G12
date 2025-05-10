function componentToHex(c) {
    const hex = c.toString(16);
    return hex.padStart(2, '0');     // 不足兩位時補 0
  }

function rgbToHex(r, g, b) {
    if ([r, g, b].some(v => v < 0 || v > 255 || !Number.isInteger(v))) {
      throw new RangeError('RGB 值必須是 0–255 的整數');
    }
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  // 範例
console.log(rgbToHex(255, 99, 71));