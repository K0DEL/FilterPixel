from flask import Flask, request, jsonify
from gdrive import getGoogleImages
from aws import getAWSImages
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
     r"/*": {"origins": ["http://localhost:5173"]}})

@app.route("/")
def home():
    return jsonify(error="Filter Pixel API"), 200

@app.route("/get_google_drive_images", methods=['GET', 'POST'])
def get_google_drive_images():
    imageURLs = getGoogleImages()
    return jsonify(imageURLs = imageURLs)

@app.route("/get_aws_images", methods=['GET', 'POST'])
def get_aws_images():
    imageURLs = getAWSImages()
    return jsonify(imageURLs = imageURLs)

if __name__ == "__main__":
    app.run(debug=True)