AI-Based Image Colorization with DeOldify
**Overview**

This project presents an AI-based image colorization system using the DeOldify library to transform black-and-white photos into vivid color images. Leveraging advanced deep learning techniques and convolutional neural networks (CNNs), particularly models provided by DeOldify, the system learns intricate mappings from grayscale to color images. Utilizing Python, Fastai, and PyTorch libraries, the project involves using trained models and applying them to grayscale images to achieve high-quality colorization. Key components include handling GPU acceleration for efficient processing and using a user-friendly interface for input image selection and colorization parameter adjustment. This project enhances the visual appeal and accessibility of historical photographs, bridging the fields of computer vision, digital humanities, and art restoration, and demonstrating the powerful impact of AI in reviving and preserving our visual heritage.

**Features**

- High-Quality Colorization: Uses DeOldify's pre-trained models for accurate and vibrant colorization.
- GPU Acceleration: Supports GPU processing for efficient and faster colorization.
- User-Friendly Interface: Easy-to-use interface for selecting input images and adjusting colorization parameters.
- Python-Based: Built using Python with Fastai and PyTorch libraries.
- Historical Photograph Enhancement: Enhances and revives historical photographs, making them more visually appealing and accessible.

**Requirements**

- Python 3.6 or higher
- PyTorch
- Fastai
- DeOldify
- Jupyter Notebook or Jupyter Lab (for running the notebooks)
- CUDA-enabled GPU (for GPU acceleration)

**Installation**

1. Clone the repository:

```shell
git clone <repository_url>
```

2. Create a virtual environment and activate it:

```shell
python -m venv venv
```

3. Install the required packages:

```shell
pip install torch fastai deoldify
```

4. Download DeOldify models and place them in the appropriate directory (models folder).

5. Open `ColorizeImages.ipynb` and follow the instructions to colorize images.

6. Run the script `script.py` by modifying it with your input image path and parameters.

**Examples**

Input Image

![Input Image](path/to/input_image.jpg)

Colorized Image

![Colorized Image](path/to/colorized_image.jpg)

**Contribution**

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

This project is licensed under the MIT License. See the LICENSE file for details.

**Acknowledgements**

- DeOldify for the colorization models and inspiration.
- Fastai and PyTorch for the deep learning libraries.