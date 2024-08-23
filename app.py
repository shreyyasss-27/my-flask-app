from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('bot_detection_model.pkl')

@app.route('/submit_data', methods=['POST'])
def submit_data():
    data = request.json
    # Extract features from the data
    features = [
        data['scrollEvents'],
        data['tabSwitches'],
        data['idleTime'],
        len(data['mouseMovements']),
        len(data['clickPositions']),
        len(data['keyPresses'])
    ]
    prediction = model.predict([features])
    result = 'human' if prediction[0] == 1 else 'bot'
    print('Received data:', data)
    print('Prediction:', result)
    return jsonify({"status": "success", "result": result})

if __name__ == '__main__':
    app.run(debug=True)
