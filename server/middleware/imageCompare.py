from PIL import Image, ImageChops
from io import StringIO
from flask import send_file
import sys 

img = Image.open(sys.argv[1])
img2 = Image.open(sys.argv[2] + '.jpg')

diff = ImageChops.difference(img, img2)
diff = diff.convert("RGBA")
datas = diff.getdata()
newData = []


for item in datas:
    if item[0] == 0 and item[1] == 0 and item[2] == 0:
        newData.append((0, 0, 0, 0))
    else:
        newData.append((255, 0, 0, 255))

if diff.getbbox():
    diff.putdata(newData)
    img.paste(diff, (0, 0), diff)
    image_path = '../frontend/public/images/'
    img.save(f'{image_path}' + sys.argv[2] + '-diff.jpg', 'JPEG')
    print('generated')
else:
    print('none')


sys.stdout.flush()