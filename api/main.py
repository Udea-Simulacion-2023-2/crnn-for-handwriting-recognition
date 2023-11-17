from fastapi import FastAPI, UploadFile
import cv2
import numpy as np
import Utils.util as Utils
from keras import backend as K
from keras.optimizers import Adam
import tensorflow as tf
import uvicorn

app = FastAPI()
model = tf.keras.models.load_model("api/Model/model_20mil_80epoch.h5",compile=False)


@app.post("/api/v1/handwritings/")
async def recognize_handwriting(image: UploadFile):
    
    contents = await image.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    Util = Utils.Util()
    processed_img = Util.preprocess(img)
    processed_img = processed_img/255.
    pred = model.predict(processed_img.reshape(1, 256, 64, 1))
    decoded = K.get_value(K.ctc_decode(pred, input_length=np.ones(pred.shape[0])*pred.shape[1],
                                    greedy=True)[0][0])
    response = Util.num_to_label(decoded[0])
    return {"writing": response}

@app.get("/api/v1/test/")
async def test():
    return {"WORKING !!!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)