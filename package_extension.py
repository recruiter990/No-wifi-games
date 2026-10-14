"""Build a clean unpacked extension and ZIP without legacy store metadata."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import shutil

root = Path(__file__).resolve().parent
output = root / 'release' / 'no-wifi-games'
output.mkdir(parents=True, exist_ok=True)
files = ['manifest.json', 'index.html', 'launcher.css', 'launcher.js',
         'games/play.html', 'games/play.js', 'icons/icon-16.png',
         'icons/icon-48.png', 'icons/icon-128.png']
with ZipFile(root / 'release' / 'no-wifi-games.zip', 'w', ZIP_DEFLATED) as archive:
    for name in files:
        source = root / name
        target = output / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
        archive.write(source, name)
print('Built release/no-wifi-games and release/no-wifi-games.zip')
