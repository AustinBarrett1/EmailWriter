# Text Processor Extension for Firefox

A Firefox extension that leverages the ChatGPT API to assist users in processing text for grammar correction, elaboration, summarization, and drafting emails. This tool is designed to enhance writing efficiency and quality directly within the browser.

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.

3. Click on "Load Temporary Add-on...".

4. Select any file in the project directory (e.g., `manifest.json`). This will load the entire extension for testing.

## Usage

1. **Set Up API Key**:
   - Open the extension by clicking on the extension icon in your Firefox toolbar.
   - Enter your API key to enable ChatGPT functionality and click "Save API Key".

2. **Text Processing**:
   - Once the API key is set, you can start processing text.
   - Enter the text you want to process in the text area provided.
   - Choose one of the available options: `Grammar Correction`, `Expand`, `Summarize`, or `Email`.
   - Click "Process" to get the result.

## Development

### Running the Extension Temporarily
This extension can be loaded temporarily into Firefox for testing purposes by following the steps in the "Installation" section. Any changes made to the code will require reloading the extension from `about:debugging`.

### Folder Structure
- `manifest.json`: Extension manifest file that defines its properties and permissions.
- `background.js`: Background script for handling extension logic.
- `popup.html`: The HTML file for the popup UI.
- `popup.js`: JavaScript for the popup to interact with the background script and handle user input.
- `styles.css`: Styling for the popup.

## Contributing
Contributions are welcome! If you would like to contribute, please fork the repository, create a new branch, and submit a pull request. Feel free to open issues for any bugs or feature requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.


