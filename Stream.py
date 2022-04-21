from flask import Flask, render_template, Response
from Thread import CameraStream
import cv2
app = Flask(__name__)

#start camera stream
cap = CameraStream().start()


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')

#Video streaming generator function
def gen_frame():
    while cap:
        frame = cap.read()
        convert = cv2.imencode('.jpg', frame)[1].tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + convert + b'\r\n') # concatenate frame one by one and show result


@app.route('/video_feed')
#This is video streaming route. to be added in src attribute of an img tag.
def video_feed():
    return Response(gen_frame(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)