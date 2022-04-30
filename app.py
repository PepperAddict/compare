from PIL import Image, ImageChops
img = Image.open('image1.jpg')
img2 = Image.open('image2.jpg')

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
    img.save('new.jpg', 'JPEG')