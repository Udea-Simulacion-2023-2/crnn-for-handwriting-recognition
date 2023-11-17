import os
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf
from keras import backend as K
import cv2

from api.utils.Utils import Utils

app = FastAPI()
utils = Utils()

# Ruta donde se guardarán las imágenes
image_save_path = "uploaded_images/"

# Verificar si la carpeta existe, si no, crearla
os.makedirs(image_save_path, exist_ok=True)

# Cargar el modelo CRNN preentrenado
model = tf.keras.models.load_model("api/model/model_20mil_80epoch.h5", compile=False)

# Ruta para procesar la imagen y realizar la predicción
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Guardar la imagen en la raíz del proyecto
    image_path = os.path.join(image_save_path, file.filename)
    with open(image_path, "wb") as image_file:
        image_file.write(file.file.read())

    # Leer la imagen
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Preprocesar la imagen
    preprocessed_image = utils.preprocess(image)
    img_array = preprocessed_image/255. # Normalizacion [0,1]

    # Realizar la predicción con el modelo CRNN
    prediction = model.predict(img_array.reshape(1, 256, 64, 1))

    # Decodificar la predicción (ajústalo según el formato de salida de tu modelo)
    decoded_text = K.get_value(K.ctc_decode(prediction, input_length=np.ones(prediction.shape[0])*prediction.shape[1],greedy=True)[0][0])
    response = utils.num_to_label(decoded_text[0])

    # Devolver la predicción al frontend
    return JSONResponse(content={"prediction ": response})



