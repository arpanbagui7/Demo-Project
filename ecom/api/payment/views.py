from django.http import HttpResponse, JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree
import logging

# Create your views here.
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="yvzkx64z4vv75wpp",
        public_key="gw57t97yg9p8sgpn",
        private_key="ba45571f26e83df1b52b1f578133ae7b"
    )
)

def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk = id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'Error' : 'Invalid User. Please Re-login!'})
    return JsonResponse({'Client Token' : gateway.client_token.generate(), 'Message' : 'Token Generated Successfully'})

@csrf_exempt
def payment_process(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'Error' : 'Invalid User. Please Re-login!'})
    nonce_from_the_client = request.POST['nonce_from_the_client']
    total_amout = request.POST['total_amount']
    result = gateway.transaction.sale({
        "amount": total_amout,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })
    if result.is_success:
        return JsonResponse({'Success' : result.is_success, 'Transaction' : {'id' : result.transaction.id, 'amount' : result.transaction.amount}})
    else:
        return JsonResponse({'Error' : result.errors.deep_errors, 'Message' : 'Transaction Failed'})
