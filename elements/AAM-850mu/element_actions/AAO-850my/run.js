function(instance, properties, context) {
    
    var checkout = new DirectCheckout(context.keys["Token Público"]);
	var cardData = {
	    cardNumber: properties.cardnumber,
	    holderName: properties.holdername,
	    securityCode: properties.securitycode,
	    expirationMonth: properties.expirationmonth,
	    expirationYear: properties.expirationyear
	};
    
  /* isValidSecurityCode: Valida número do cartão de crédito (retorna true se for válido) */
  var validNumber = checkout.isValidCardNumber(cardData.cardNumber);
  console.log('Numero Cartao ' + validNumber);

  /* isValidSecurityCode: Valida código de segurança do cartão de crédito (retorna true se for válido) */
  var validCvv = checkout.isValidSecurityCode(cardData.cardNumber, cardData.securityCode);
  console.log('CVV ' + validCvv);

  /* isValidExpireDate: Valida data de expiração do cartão de crédito (retorna true se for válido) */
  var validExpDate = checkout.isValidExpireDate(cardData.expirationMonth, cardData.expirationYear);
  console.log('Data ' + validExpDate);

  /* isValidCardData: Validação dos dados do cartão de crédito(retorna true se for válido) */
  var validData = checkout.isValidCardData(cardData, function(error) {
      /* Erro - A variável error conterá o erro ocorrido durante a validação dos dados do cartão de crédito */
  });
  console.log('Dados gerais ' + validData);
    
  /* getCardType: Obtem o tipo de cartão de crédito (bandeira) */
  var validCardType = checkout.getCardType(cardData.cardNumber);
  console.log('Bandeira ' + validCardType);

  checkout.getCardHash(cardData, function(cardHash) {
    console.log(cardHash);
    instance.publishState('hash_cartao',cardHash);
    instance.triggerEvent("credit_card_hash_generated", function(err){console.log(err)})
    /* Sucesso - A variável cardHash conterá o hash do cartão de crédito */
}, function(error) {
    /* Erro - A variável error conterá o erro ocorrido ao obter o hash */
});


}