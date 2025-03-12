from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS function
import openai

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains (or specify domains if needed)

openai.api_key = 'api-key'

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    summary = summarize_text(text)
    if summary:
        return jsonify({'summary': summary})
    else:
        return jsonify({'error': 'Failed to summarize'}), 500

def summarize_text(text):
    try:
        # New API call for completion
        response = openai.completions.create(
            model="gpt-3.5-turbo",  # Or gpt-4 if you have access
            prompt=f"Summarize the following text:\n\n{text}",
            max_tokens=100
        )

        summary = response['choices'][0]['text'].strip()
        return summary
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == '__main__':
    app.run(debug=True)
