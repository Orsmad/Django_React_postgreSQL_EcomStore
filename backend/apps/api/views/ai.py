import openai
from enum import Enum

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
import logging
import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),'.env')
load_dotenv(dotenv_path)

API_KEY = os.getenv('API_KEY')


logger = logging.getLogger(__name__)

# Set up API authentication
openai.api_key = API_KEY

# Define a dictionary to map ratings to prompts
rating_prompts = {
    1: "I purchased this product and was very disappointed. The quality was poor and it did not meet my expectations.",
    2: "I purchased this product and it was just okay. It worked, but there were some issues that I had with it.",
    3: "I purchased this product and it was decent. It worked as expected, but there were a few things I didn't like about it.",
    4: "I purchased this product and I was very happy with it. It worked great and met my expectations.",
    5: "I purchased this product and it exceeded my expectations. It was fantastic and I would definitely recommend it."
}

# Define a function to generate a product review based on a rating
def generate_review(rating):
    prompt = rating_prompts.get(rating, "")

    # Generate a product review using the GPT-3 API
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=40,
        n=1,
        stop=None,
        temperature=0.5,
    )

    return response.choices[0].text



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_response(request):
    if request.method == "POST":
        if int(request.data['rating'])==0:
            return Response("please provide a rating")

        else:
            respo= generate_review(int(request.data['rating']))
            return Response(respo)
