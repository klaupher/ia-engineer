source .env

echo "OPENROUTER_API_KEY: $OPENROUTER_API_KEY"

API_URL="https://openrouter.ai/api/v1/chat/completions"
# OPENROUTER_SITE_URL="${OPENROUTER_SITE_URL}"
# OPENROUTER_SITE_NAME="${OPENROUTER_SITE_NAME}"
OPENROUTER_SITE_URL="http://localhost:3000"
OPENROUTER_SITE_NAME="My Example OpenRouter"

NLP_MODEL="google/gemma-4-26b-a4b-it:free"

# fetch('https://openrouter.ai/api/v1/chat/completions', {
#   method: 'POST',
#   headers: {
#     Authorization: 'Bearer XXXXXX',
#     'HTTP-Referer': '<YOUR_SITE_URL>',
#     'X-Title': '<YOUR_SITE_NAME>',
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify({
#     model: 'openai/gpt-4o',
#     messages: [
#       {
#         role: 'user',
#         content: 'What is the meaning of life?',
#       },
#     ],
#   }),
# });

  curl https://openrouter.ai/api/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -d '{
    "model": "google/gemma-4-26b-a4b-it:free",
    "stream": false,
    "messages": [
      {
        "role": "user",
        "content": "por que o comando source .env não funciona no WSL?"
      }
    ]
}' | jq

# RESPOSTA DO curl
# {
#   "id": "gen-1788616161-swdJWmrQSOtwfDWppXME",
#   "object": "chat.completion",
#   "created": 1788616161,
#   "model": "google/gemma-4-31b-it:free",
#   "provider": "Google AI Studio",
#   "system_fingerprint": null,
#   "service_tier": "default",
#   "choices": [
#     {
#       "index": 0,
#       "logprobs": null,
#       "finish_reason": "stop",
#       "native_finish_reason": "STOP",
#       "message": {
#         "role": "assistant",
#         "content": "Aqui estão duas, para você escolher a sua favorita:\n\n**A clássica (estilo \"vida real\"):**\n\nA esposa de um programador diz a ele:\n— Querido, vá ao mercado e compre um litro de leite. Ah, e **se tiver ovos, traga seis**.\n\nO programador volta para casa com seis litros de leite.\nA esposa, horrorizada, pergunta:\n— Por que raios você comprou seis litros de leite?!\n\nE ele responde:\n— Porque tinha ovos!\n\n***\n\n**A curta (estilo \"estresse\"):**\n\nQual é a diferença entre um programador e um Deus?\n— É que o Deus não acha que é um programador.",
#         "refusal": null,
#         "reasoning": null
#       }
#     }
#   ],
#   "usage": {
#     "prompt_tokens": 9,
#     "completion_tokens": 152,
#     "total_tokens": 161,
#     "cost": 0,
#     "is_byok": false,
#     "prompt_tokens_details": {
#       "cached_tokens": 0,
#       "cache_write_tokens": 0,
#       "audio_tokens": 0,
#       "video_tokens": 0
#     },
#     "cost_details": {
#       "upstream_inference_cost": 0,
#       "upstream_inference_prompt_cost": 0,
#       "upstream_inference_completions_cost": 0
#     },
#     "completion_tokens_details": {
#       "reasoning_tokens": 0,
#       "image_tokens": 0,
#       "audio_tokens": 0
#     }
#   }
# }