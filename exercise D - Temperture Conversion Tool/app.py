from flask import Flask, render_template, jsonify, request

app=Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<filename>')
def file(filename):
    return app.send_static_file(filename)

@app.route('/convert', methods=['POST'])
def convert():
    try:
        celsius = float(request.json['celsius'])
        fahrenheit = celsius_to_fahrenheit(celsius)
        return jsonify({
            'success': True,
            'fahrenheit': round(fahrenheit, 1)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

def celsius_to_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)