#!/usr/bin/env python3
"""
Convert JPG/PNG images to WebP format while preserving filenames
"""
import os
from PIL import Image
from pathlib import Path

def convert_to_webp(input_path, output_dir=None, quality=85):
    """
    Convert an image to WebP format keeping the same filename
    
    Args:
        input_path: Path to input image (jpg/png)
        output_dir: Optional output directory (default: same as input)
        quality: WebP quality (1-100, default: 85)
    """
    input_path = Path(input_path)
    
    # Check if file exists
    if not input_path.exists():
        print(f"Error: File not found - {input_path}")
        return False
    
    # Check if it's an image file
    if input_path.suffix.lower() not in ['.jpg', '.jpeg', '.png']:
        print(f"Skipping non-image file: {input_path}")
        return False
    
    # Determine output path
    if output_dir:
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)
        output_path = output_dir / f"{input_path.stem}.webp"
    else:
        output_path = input_path.parent / f"{input_path.stem}.webp"
    
    try:
        # Open and convert image
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if necessary (WebP supports both)
            if img.mode in ('RGBA', 'LA'):
                # Keep transparency
                img.save(output_path, 'WEBP', quality=quality, method=6)
            else:
                # Convert to RGB for non-transparent images
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                img.save(output_path, 'WEBP', quality=quality, method=6)
        
        print(f"✓ Converted: {input_path.name} → {output_path.name}")
        return True
        
    except Exception as e:
        print(f"✗ Error converting {input_path.name}: {e}")
        return False

def batch_convert(directory, output_dir=None, quality=85):
    """
    Convert all JPG/PNG images in a directory to WebP
    
    Args:
        directory: Input directory path
        output_dir: Optional output directory
        quality: WebP quality (1-100)
    """
    directory = Path(directory)
    
    if not directory.exists():
        print(f"Error: Directory not found - {directory}")
        return
    
    # Find all image files
    image_files = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
        image_files.extend(directory.glob(ext))
    
    if not image_files:
        print(f"No JPG/PNG images found in {directory}")
        return
    
    print(f"Found {len(image_files)} images to convert")
    print(f"Quality setting: {quality}")
    print("-" * 50)
    
    successful = 0
    for img_path in sorted(image_files):
        if convert_to_webp(img_path, output_dir, quality):
            successful += 1
    
    print("-" * 50)
    print(f"Conversion complete: {successful}/{len(image_files)} successful")

if __name__ == "__main__":
    import sys
    
    # Simple command line interface
    if len(sys.argv) < 2:
        print("Usage:")
        print("  Convert single file:      python convert_to_webp.py image.jpg")
        print("  Convert multiple files:   python convert_to_webp.py file1.jpg file2.png file3.jpg")
        print("  Convert directory:        python convert_to_webp.py /path/to/images/")
        print("  Specify quality:          python convert_to_webp.py image.jpg --quality 90")
        print("  Output to directory:      python convert_to_webp.py image.jpg --output /output/dir/")
        print("  Multiple with quality:    python convert_to_webp.py *.jpg --quality 90")
        sys.exit(1)
    
    # Parse arguments
    files_to_convert = []
    quality = 85
    output_dir = None
    
    i = 1
    while i < len(sys.argv):
        arg = sys.argv[i]
        if arg == '--quality' or arg == '-q':
            if i + 1 < len(sys.argv):
                quality = int(sys.argv[i + 1])
                i += 2
            else:
                print("Error: --quality requires a value")
                sys.exit(1)
        elif arg == '--output' or arg == '-o':
            if i + 1 < len(sys.argv):
                output_dir = sys.argv[i + 1]
                i += 2
            else:
                print("Error: --output requires a path")
                sys.exit(1)
        else:
            files_to_convert.append(arg)
            i += 1
    
    if not files_to_convert:
        print("Error: No files or directories specified")
        sys.exit(1)
    
    # Process each path
    total_converted = 0
    for input_path in files_to_convert:
        path = Path(input_path)
        
        if path.is_file():
            if convert_to_webp(path, output_dir, quality):
                total_converted += 1
        elif path.is_dir():
            print(f"\nProcessing directory: {path}")
            batch_convert(path, output_dir, quality)
        else:
            print(f"Warning: Path not found - {input_path}")
    
    if len(files_to_convert) > 1 and any(Path(p).is_file() for p in files_to_convert):
        print(f"\n{'='*50}")
        print(f"Total files converted: {total_converted}/{len([p for p in files_to_convert if Path(p).is_file()])}")
