from flask import Flask, render_template, request
import requests
import re

app = Flask(__name__)

# URL validation regex
URL_REGEX = r'^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$'

@app.route('/check_url')
def check_url():
    url = request.args.get('url')
    
    # Validate URL format
    if not re.match(URL_REGEX, url):
        return {'status_code': 'INVALID_FORMAT'}, 400
        
    try:
        response = requests.get(f'http://{url}', timeout=1)
        if response.status_code == 200:
            return {'status_code': 'OK'}
    except requests.exceptions.RequestException:
        return {'status_code': 'FAILED'}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<filename>')
def file(filename):
    return app.send_static_file(filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
