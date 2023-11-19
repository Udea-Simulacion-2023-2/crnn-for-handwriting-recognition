# CRNN para reconocimiento de escritura a mano

Este proyecto busca desarrollar un sistema de reconocimiento manuscrito basado
en técnicas de Machine Learning para mejorar la eficiencia y precisión de la
interpretación de escritura a mano.

- Luis Fernando Rios Zapata
- Jhon David Ballesteros Vargas
- Cristian Camilo Serna Betancur

## Tabla de contenido

- [Base de datos](#base-de-datos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Construcción del modelo](#construcción-del-modelo)
  - [Pre-procesamiento-de-los-datos](#pre-procesamiento-de-los-datos)
  - [Entrenamiento](#entrenamiento)
  - [Validación](#validación)
- [Diagrama](#diagrama)

## Base de datos
Handwriting Recognition [kaggle.com](https://www.kaggle.com/datasets/landlord/handwriting-recognition/data)

La base de datos consta de más de 400.000 imágenes de **nombres** escritos a
mano. En total hay 206.799 nombres y 207.024 apellidos, los cuales están
divididos en conjunto de entrenamiento (331.059), prueba (41.328) y validación
(41.328). La base de datos la compone 3 archivos CSV que pueden ser encontrados
en las carpetas `test_v2`, `train_v2` y `validation_v2`, estos son: 

1. written_name_test_v2.csv 
2. written_name_train_v2.csv 
3. written_name_validation_v2.csv

Donde cada archivo tiene 2 columnas: `FILENAME` (URL de la imagen) e `IDENTITY`
(Transcripción del nombre escrito a mano).

## Estructura del proyecto
El repositorio de
[github](https://github.com/Udea-Simulacion-2023-2/crnn-for-handwriting-recognition)
consta de 3 carpetas principales: 

1. Backend:
   1. `/api`: en esta carpeta se encuentra la **API** web (__HTTP__) que hace
      uso del modelo, y que sirve en
      [aqui](http://apihandwritingrecognition.us-east-1.elasticbeanstalk.com/api/v1/test/).
      Está desarrollado con **Python** y **FastAPI** 
   2. `/api/Model`: en esta carpeta se encuentra el modelo exportado en formato
      **h5** que consume la **API**.
   3. `/api/Utils`: esta carpeta contiene algunas funciones importantes para
      pre procesar la imagen enviada por el usuario 
2. FrontEnd
   1. `/web`: en esta carpeta se encuentra el proyecto frontend hecho con
      NextJS 14 y React
3. Modelo
   1. `/notebook`: en esta carpeta se encuentra el archivo de Jupyter que se
      utilizó para descargar, explorar, pre procesar el dataset, entrenar el
      modelo, validar el modelo y exportar el modelo

El sitio puede ser accedido desde [aquí]() y el Colab desde
[aquí](https://colab.research.google.com/drive/1n7IS2fDulszekfoGPWPGpNGYoJzeJ0yA?usp=sharing
)

## Desarrollo del proyecto

### Pre-procesamiento de los datos 

1. **Limpieza de los datos**: se comienza con una limpieza de los datos,
   filtrando las imágenes que son ilegibles, esto se hace por medio de la
   propiedad `IDENTITY` del archivo CSV de cada set de datos (train,
   validation, test) 
2. **Pre- Procesamiento**: en el preprocesamiento se busca ajustar las imágenes a
   un estándar de tamaño, posición y color: 
   1. se cargan las imágenes a escala de grises con ancho 256 y alto 64.
   2. el ancho y alto son cortados si la el tamaño de la imagen es mayor a
      256x64 , en caso contrario la imagen es rellenada con pixeles en blanco
      hasta llegar a este tamaño
   3. la imagen se rota en sentido de las manecillas del reloj para que el
      texto no quede horizontal sino alineado con el eje vertical. 
   4. Se normaliza la imagen al rango [0,1]

### Construcción del modelo
El modelo está compuesto por una combinación de capas convolucionales **CNN** y
recurrentes **RNN**: 

1. Input: la entrada es una imagen de 64x256px, con 1 canal en escala de
   grises.
2. CNN 
3. Conv2D: capas convolucionales para extraer características. El tamaño del
   filtro es 3x3.
4. BatchNorm: normalización por lotes para regularizar.
5. MaxPooling2D: reduce el tamaño espacial haciendo poolings.
6. Dropout: regulariza aleatorizando neuronas.
7. RNN
8. Reshape: cambia la salida del CNN a la forma esperada por la RNN.
9. LSTM: capas recurrentes bidireccionales para modelar secuencias.
10. Dense: capas totalmente conectadas.

La **CNN** actúa como extractor de características, reduciendo la
dimensionalidad espacial de la imagen para pasarla a la **RNN**. La **RNN**
modela la secuencia temporal de los caracteres, útil para el texto. Las capas
**LSTM** bidireccionales pueden ver el contexto en ambas direcciones.

### Entrenamiento 
Para el entrenamiento del modelo se utilizaron 30.000 imágenes (epoch = 80)

### Validación
Para la validación del modelo se utilizaron 3.000 imágenes con un resultado:

- Correct characters predicted: 81.85%
- Correct words predicted: 46.62%

## Diagrama

![Diagrama](/diagram.jpeg "Diagrama")
