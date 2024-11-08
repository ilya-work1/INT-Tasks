from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_time')
def get_time():
    current_time = datetime.now().strftime("%H:%M:%S")
    return {'time': current_time}

@app.route('/<filename>')
def file(filename):
    return app.send_static_file(filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0' ,port=8080)