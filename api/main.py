from fastapi import FastAPI, UploadFile

app = FastAPI()


@app.post("/api/v1/handwritings/")
async def recognize_handwriting(image: UploadFile):
    # TODO: use model to get the actual writing text from the handwriting
    # (image).
    return {"writing": image.filename}
