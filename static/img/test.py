import base64
with open('star.png','rb') as f:
    print(base64.b64encode(f.read()))
