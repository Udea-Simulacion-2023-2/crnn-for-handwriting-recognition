import cv2
import numpy as np

class Utils:
    alphabets = u"ABCDEFGHIJKLMNOPQRSTUVWXYZ-' "
    max_str_len = 24 # max length of input labels
    num_of_characters = len(alphabets) + 1 # +1 for ctc pseudo blank
    num_of_timestamps = 64 # max length of predicted labels

    def preprocess(self,img):
        (h, w) = img.shape

        final_img = np.ones([64, 256])*255 # Espacios en blanco

        # crop
        if w > 256:
            img = img[:, :256]

        if h > 64:
            img = img[:64, :]


        final_img[:h, :w] = img
        return cv2.rotate(final_img, cv2.ROTATE_90_CLOCKWISE)

    def label_to_num(self,label):
        label_num = []
        for ch in label:
            label_num.append(self.alphabets.find(ch))

        return np.array(label_num)

    def num_to_label(self,num):
        ret = ""
        for ch in num:
            if ch == -1:  # CTC Blank
                break
            else:
                ret+=self.alphabets[ch]
        return ret