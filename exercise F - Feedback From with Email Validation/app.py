from flask import Flask, render_template, request, jsonify
from datetime import datetime
import os
import json

app = Flask(__name__)

# Ensure the logs directory exists
if not os.path.exists('logs'):
    os.makedirs('logs')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<filename>')
def file(filename):
    return app.send_static_file(filename)

@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        
        # Get current timestamp
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Add timestamp to the data
        data['timestamp'] = timestamp
        
        # Create the log entry
        log_entry = json.dumps(data)
        
        # Write to the log file
        log_file_path = os.path.join('logs', 'feedback_log.txt')
        with open(log_file_path, 'a', encoding='utf-8') as log_file:
            log_file.write(log_entry + '\n')
        
        return jsonify({"success": True, "message": "Feedback logged successfully"})
    
    except Exception as e:
        print(f"Error logging feedback: {str(e)}")
        return jsonify({"success": False, "message": "Error logging feedback"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)