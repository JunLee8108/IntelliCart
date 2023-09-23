from flask import Flask, request, jsonify
import pickle
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)

# Load model, tokenizer, and label encoder
model = tf.keras.models.load_model('path_to_your_project/chatbot_model')

with open('path_to_your_project/tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

with open('path_to_your_project/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('user_input')
    response = get_response_from_model(user_input)
    return jsonify({'response': response})

def get_response_from_model(user_input):
    sequences = tokenizer.texts_to_sequences([user_input])
    padded_sequences = pad_sequences(sequences, padding='post', maxlen=model.input_shape[1])
    prediction = model.predict(padded_sequences)
    predicted_label = prediction.argmax(axis=1)[0]
    answer = label_encoder.inverse_transform([predicted_label])[0]
    return answer

if __name__ == '__main__':
    app.run(port=5000)
