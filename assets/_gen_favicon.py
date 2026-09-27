#!/usr/bin/env python3
"""Generate favicon PNG/ICO assets for maximrafikov.ru."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parent
paper = (248, 246, 241, 255)
ink = (22, 24, 27, 255)
accent = (166, 67, 30, 255)


def find_serif(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        r"C:\Windows\Fonts\georgiab.ttf",
        r"C:\Windows\Fonts\georgia.ttf",
        r"C:\Windows\Fonts\timesbd.ttf",
        r"C:\Windows\Fonts\times.ttf",
        r"C:\Windows\Fonts\cambriab.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def draw_icon(size: int, bar_ratio: float = 0.055) -> Image.Image:
    img = Image.new("RGBA", (size, size), paper)
    draw = ImageDraw.Draw(img)
    font_size = max(10, int(size * 0.72))
    font = find_serif(font_size)
    letter = "М"
    bbox = draw.textbbox((0, 0), letter, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    bar_h = max(2, int(size * bar_ratio))
    usable = size - bar_h - int(size * 0.08)
    x = (size - tw) / 2 - bbox[0]
    y = (usable - th) / 2 - bbox[1] + int(size * 0.02)
    draw.text((x, y), letter, font=font, fill=ink)
    margin = max(1, int(size * 0.1))
    bottom_gap = max(1, size // 32)
    draw.rectangle(
        [margin, size - bar_h - bottom_gap, size - margin, size - bottom_gap],
        fill=accent,
    )
    return img


def main() -> None:
    draw_icon(16).save(root / "favicon-16.png")
    draw_icon(32).save(root / "favicon-32.png")
    draw_icon(48).save(root / "favicon-48.png")
    draw_icon(180, bar_ratio=0.045).convert("RGB").save(root / "apple-touch-icon.png")

    draw_icon(48).save(
        root / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    for name in (
        "favicon.svg",
        "favicon.ico",
        "favicon-16.png",
        "favicon-32.png",
        "favicon-48.png",
        "apple-touch-icon.png",
    ):
        path = root / name
        print(f"{name}: {path.stat().st_size} bytes")


if __name__ == "__main__":
    main()
