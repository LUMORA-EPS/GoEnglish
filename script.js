// script.js — Lógica principal e integração com Web Speech API

// ---------------------------------------------------------------------------
// Base de dados de lições
// ---------------------------------------------------------------------------
const lessonsData = [
  // ---------- Cumprimentos ----------
  { en: "Hello", pt: "Olá", phonetic: "/həˈloʊ/", category: "cumprimentos" },
  { en: "Good morning", pt: "Bom dia", phonetic: "/ɡʊd ˈmɔːrnɪŋ/", category: "cumprimentos" },
  { en: "Good afternoon", pt: "Boa tarde", phonetic: "/ɡʊd ˌæftərˈnuːn/", category: "cumprimentos" },
  { en: "Good evening", pt: "Boa noite (chegando)", phonetic: "/ɡʊd ˈiːvnɪŋ/", category: "cumprimentos" },
  { en: "Good night", pt: "Boa noite (despedida)", phonetic: "/ɡʊd naɪt/", category: "cumprimentos" },
  { en: "Nice to meet you", pt: "Prazer em conhecê-lo", phonetic: "/naɪs tuː miːt juː/", category: "cumprimentos" },
  { en: "How are you doing", pt: "Como você está", phonetic: "/haʊ ɑːr juː ˈduːɪŋ/", category: "cumprimentos" },
  { en: "See you later", pt: "Até mais", phonetic: "/siː juː ˈleɪtər/", category: "cumprimentos" },
  { en: "Take care", pt: "Se cuida", phonetic: "/teɪk kɛr/", category: "cumprimentos" },
  { en: "Long time no see", pt: "Quanto tempo", phonetic: "/lɔːŋ taɪm noʊ siː/", category: "cumprimentos" },

  // ---------- Viagem ----------
  { en: "How much is this", pt: "Quanto custa isto", phonetic: "/haʊ mʌtʃ ɪz ðɪs/", category: "viagem" },
  { en: "Where is the airport", pt: "Onde fica o aeroporto", phonetic: "/wɛr ɪz ði ˈɛrpɔːrt/", category: "viagem" },
  { en: "I am lost", pt: "Eu estou perdido", phonetic: "/aɪ æm lɔːst/", category: "viagem" },
  { en: "Can you help me", pt: "Você pode me ajudar", phonetic: "/kæn juː hɛlp miː/", category: "viagem" },
  { en: "What time does it open", pt: "Que horas abre", phonetic: "/wʌt taɪm dʌz ɪt ˈoʊpən/", category: "viagem" },
  { en: "Where can I catch a taxi", pt: "Onde posso pegar um táxi", phonetic: "/wɛr kæn aɪ kætʃ ə ˈtæksi/", category: "viagem" },
  { en: "I have a reservation", pt: "Eu tenho uma reserva", phonetic: "/aɪ hæv ə ˌrɛzərˈveɪʃən/", category: "viagem" },
  { en: "Is this seat taken", pt: "Este lugar está ocupado", phonetic: "/ɪz ðɪs siːt ˈteɪkən/", category: "viagem" },
  { en: "My flight was delayed", pt: "Meu voo atrasou", phonetic: "/maɪ flaɪt wʌz dɪˈleɪd/", category: "viagem" },
  { en: "Where is the nearest hotel", pt: "Onde fica o hotel mais próximo", phonetic: "/wɛr ɪz ðə ˈnɪrɪst hoʊˈtɛl/", category: "viagem" },

  // ---------- Comida ----------
  { en: "I would like a coffee", pt: "Eu gostaria de um café", phonetic: "/aɪ wʊd laɪk ə ˈkɔːfi/", category: "comida" },
  { en: "The check please", pt: "A conta, por favor", phonetic: "/ðə tʃɛk pliːz/", category: "comida" },
  { en: "This is delicious", pt: "Isto está delicioso", phonetic: "/ðɪs ɪz dɪˈlɪʃəs/", category: "comida" },
  { en: "Do you have a menu", pt: "Você tem um cardápio", phonetic: "/duː juː hæv ə ˈmɛnjuː/", category: "comida" },
  { en: "I am allergic to nuts", pt: "Eu sou alérgico a nozes", phonetic: "/aɪ æm əˈlɜːrdʒɪk tuː nʌts/", category: "comida" },
  { en: "Can I get this to go", pt: "Posso levar isso para viagem", phonetic: "/kæn aɪ ɡɛt ðɪs tuː ɡoʊ/", category: "comida" },
  { en: "I am still hungry", pt: "Eu ainda estou com fome", phonetic: "/aɪ æm stɪl ˈhʌŋɡri/", category: "comida" },
  { en: "Could I have some water", pt: "Poderia me dar um pouco de água", phonetic: "/kʊd aɪ hæv sʌm ˈwɔːtər/", category: "comida" },
  { en: "This tastes spicy", pt: "Isto está apimentado", phonetic: "/ðɪs teɪsts ˈspaɪsi/", category: "comida" },
  { en: "I don't eat meat", pt: "Eu não como carne", phonetic: "/aɪ doʊnt iːt miːt/", category: "comida" },

  // ---------- Trabalho ----------
  { en: "I work from home", pt: "Eu trabalho de casa", phonetic: "/aɪ wɜːrk frʌm hoʊm/", category: "trabalho" },
  { en: "Let's schedule a meeting", pt: "Vamos agendar uma reunião", phonetic: "/lɛts ˈskɛdʒuːl ə ˈmiːtɪŋ/", category: "trabalho" },
  { en: "I sent you the report", pt: "Eu enviei o relatório para você", phonetic: "/aɪ sɛnt juː ðə rɪˈpɔːrt/", category: "trabalho" },
  { en: "Can we push the deadline", pt: "Podemos adiar o prazo", phonetic: "/kæn wiː pʊʃ ðə ˈdɛdlaɪn/", category: "trabalho" },
  { en: "The project is on track", pt: "O projeto está no caminho certo", phonetic: "/ðə ˈprɒdʒɛkt ɪz ɒn træk/", category: "trabalho" },
  { en: "I need to take a day off", pt: "Eu preciso tirar um dia de folga", phonetic: "/aɪ niːd tuː teɪk ə deɪ ɒf/", category: "trabalho" },
  { en: "Let's touch base tomorrow", pt: "Vamos nos falar amanhã", phonetic: "/lɛts tʌtʃ beɪs təˈmɒroʊ/", category: "trabalho" },
  { en: "I am running a bit late", pt: "Eu estou um pouco atrasado", phonetic: "/aɪ æm ˈrʌnɪŋ ə bɪt leɪt/", category: "trabalho" },
  { en: "Could you review my draft", pt: "Você poderia revisar meu rascunho", phonetic: "/kʊd juː rɪˈvjuː maɪ dræft/", category: "trabalho" },
  { en: "We closed the deal", pt: "Fechamos o negócio", phonetic: "/wiː kloʊzd ðə diːl/", category: "trabalho" },

  // ---------- Social ----------
  { en: "What do you do for fun", pt: "O que você faz por diversão", phonetic: "/wʌt duː juː duː fɔːr fʌn/", category: "social" },
  { en: "I had a great time", pt: "Eu me diverti muito", phonetic: "/aɪ hæd ə ɡreɪt taɪm/", category: "social" },
  { en: "Let's stay in touch", pt: "Vamos manter contato", phonetic: "/lɛts steɪ ɪn tʌtʃ/", category: "social" },
  { en: "Congratulations on the news", pt: "Parabéns pela notícia", phonetic: "/kənˌɡrætʃuˈleɪʃənz ɒn ðə njuːz/", category: "social" },
  { en: "Do you want to hang out", pt: "Você quer sair com a gente", phonetic: "/duː juː wɒnt tuː hæŋ aʊt/", category: "social" },
  { en: "I am sorry for your loss", pt: "Sinto muito pela sua perda", phonetic: "/aɪ æm ˈsɒri fɔːr jʊər lɔːs/", category: "social" },
  { en: "Happy birthday", pt: "Feliz aniversário", phonetic: "/ˈhæpi ˈbɜːrθdeɪ/", category: "social" },
  { en: "Thank you so much", pt: "Muito obrigado", phonetic: "/θæŋk juː soʊ mʌtʃ/", category: "social" },
  { en: "I really appreciate it", pt: "Eu realmente agradeço", phonetic: "/aɪ ˈriːəli əˈpriːʃieɪt ɪt/", category: "social" },
  { en: "Let's grab a drink sometime", pt: "Vamos tomar algo qualquer dia", phonetic: "/lɛts ɡræb ə drɪŋk ˈsʌmtaɪm/", category: "social" },

  // ---------- Compras ----------
  { en: "Do you have this in another size", pt: "Você tem isso em outro tamanho", phonetic: "/duː juː hæv ðɪs ɪn əˈnʌðər saɪz/", category: "compras" },
  { en: "Can I try this on", pt: "Posso experimentar isto", phonetic: "/kæn aɪ traɪ ðɪs ɒn/", category: "compras" },
  { en: "Is there a discount", pt: "Tem algum desconto", phonetic: "/ɪz ðɛr ə ˈdɪskaʊnt/", category: "compras" },
  { en: "I am just looking", pt: "Eu só estou olhando", phonetic: "/aɪ æm dʒʌst ˈlʊkɪŋ/", category: "compras" },
  { en: "Do you accept credit cards", pt: "Vocês aceitam cartão de crédito", phonetic: "/duː juː əkˈsɛpt ˈkrɛdɪt kɑːrdz/", category: "compras" },
  { en: "Where is the fitting room", pt: "Onde fica o provador", phonetic: "/wɛr ɪz ðə ˈfɪtɪŋ ruːm/", category: "compras" },
  { en: "I would like a refund", pt: "Eu gostaria de um reembolso", phonetic: "/aɪ wʊd laɪk ə ˈriːfʌnd/", category: "compras" },
  { en: "Can you gift wrap this", pt: "Você pode embrulhar para presente", phonetic: "/kæn juː ɡɪft ræp ðɪs/", category: "compras" },
  { en: "This is out of my budget", pt: "Isto está fora do meu orçamento", phonetic: "/ðɪs ɪz aʊt ʌv maɪ ˈbʌdʒɪt/", category: "compras" },
  { en: "I will take it", pt: "Eu vou levar", phonetic: "/aɪ wɪl teɪk ɪt/", category: "compras" },

  // ---------- Emergência ----------
  { en: "Call an ambulance", pt: "Chame uma ambulância", phonetic: "/kɔːl ən ˈæmbjələns/", category: "emergencia" },
  { en: "I need a doctor", pt: "Eu preciso de um médico", phonetic: "/aɪ niːd ə ˈdɒktər/", category: "emergencia" },
  { en: "Where is the nearest hospital", pt: "Onde fica o hospital mais próximo", phonetic: "/wɛr ɪz ðə ˈnɪrɪst ˈhɒspɪtəl/", category: "emergencia" },
  { en: "I lost my passport", pt: "Eu perdi meu passaporte", phonetic: "/aɪ lɔːst maɪ ˈpæspɔːrt/", category: "emergencia" },
  { en: "Someone stole my bag", pt: "Alguém roubou minha bolsa", phonetic: "/ˈsʌmwʌn stoʊl maɪ bæɡ/", category: "emergencia" },
  { en: "I need to call the police", pt: "Eu preciso chamar a polícia", phonetic: "/aɪ niːd tuː kɔːl ðə pəˈliːs/", category: "emergencia" },
  { en: "It's an emergency", pt: "É uma emergência", phonetic: "/ɪts ən ɪˈmɜːrdʒənsi/", category: "emergencia" },
  { en: "I feel dizzy", pt: "Eu estou tonto", phonetic: "/aɪ fiːl ˈdɪzi/", category: "emergencia" },
  { en: "Please stay calm", pt: "Por favor, fique calmo", phonetic: "/pliːz steɪ kɑːm/", category: "emergencia" },
  { en: "Help me please", pt: "Me ajude, por favor", phonetic: "/hɛlp miː pliːz/", category: "emergencia" },

  // ---------- Saúde ----------
  { en: "I have a headache", pt: "Eu estou com dor de cabeça", phonetic: "/aɪ hæv ə ˈhɛdeɪk/", category: "saude" },
  { en: "I am not feeling well", pt: "Eu não estou me sentindo bem", phonetic: "/aɪ æm nɒt ˈfiːlɪŋ wɛl/", category: "saude" },
  { en: "I need to see a dentist", pt: "Eu preciso ver um dentista", phonetic: "/aɪ niːd tuː siː ə ˈdɛntɪst/", category: "saude" },
  { en: "Do you have any medicine", pt: "Você tem algum remédio", phonetic: "/duː juː hæv ˈɛni ˈmɛdəsɪn/", category: "saude" },
  { en: "I am allergic to penicillin", pt: "Eu sou alérgico a penicilina", phonetic: "/aɪ æm əˈlɜːrdʒɪk tuː ˌpɛnɪˈsɪlɪn/", category: "saude" },
  { en: "My throat hurts", pt: "Minha garganta dói", phonetic: "/maɪ θroʊt hɜːrts/", category: "saude" },
  { en: "I need to rest", pt: "Eu preciso descansar", phonetic: "/aɪ niːd tuː rɛst/", category: "saude" },
  { en: "I have a fever", pt: "Eu estou com febre", phonetic: "/aɪ hæv ə ˈfiːvər/", category: "saude" },
  { en: "Can you recommend a pharmacy", pt: "Você pode indicar uma farmácia", phonetic: "/kæn juː ˌrɛkəˈmɛnd ə ˈfɑːrməsi/", category: "saude" },
  { en: "I twisted my ankle", pt: "Eu torci o tornozelo", phonetic: "/aɪ ˈtwɪstɪd maɪ ˈæŋkəl/", category: "saude" },

  // ---------- Casa ----------
  { en: "Make yourself at home", pt: "Fique à vontade", phonetic: "/meɪk jɔːrˈsɛlf æt hoʊm/", category: "casa" },
  { en: "Can you turn off the lights", pt: "Você pode apagar as luzes", phonetic: "/kæn juː tɜːrn ɒf ðə laɪts/", category: "casa" },
  { en: "The Wi-Fi is not working", pt: "O Wi-Fi não está funcionando", phonetic: "/ðə ˈwaɪfaɪ ɪz nɒt ˈwɜːrkɪŋ/", category: "casa" },
  { en: "I need to do the laundry", pt: "Eu preciso lavar roupa", phonetic: "/aɪ niːd tuː duː ðə ˈlɔːndri/", category: "casa" },
  { en: "Dinner is ready", pt: "O jantar está pronto", phonetic: "/ˈdɪnər ɪz ˈrɛdi/", category: "casa" },
  { en: "Can you take out the trash", pt: "Você pode tirar o lixo", phonetic: "/kæn juː teɪk aʊt ðə træʃ/", category: "casa" },
  { en: "I am cleaning the house", pt: "Eu estou limpando a casa", phonetic: "/aɪ æm ˈkliːnɪŋ ðə haʊs/", category: "casa" },
  { en: "The sink is clogged", pt: "A pia está entupida", phonetic: "/ðə sɪŋk ɪz klɒɡd/", category: "casa" },
  { en: "Let's watch a movie tonight", pt: "Vamos assistir um filme hoje à noite", phonetic: "/lɛts wɒtʃ ə ˈmuːvi təˈnaɪt/", category: "casa" },
  { en: "I locked myself out", pt: "Eu me tranquei para fora", phonetic: "/aɪ lɒkt maɪˈsɛlf aʊt/", category: "casa" },

  // ---------- Clima ----------
  { en: "What is the weather like today", pt: "Como está o tempo hoje", phonetic: "/wʌt ɪz ðə ˈwɛðər laɪk təˈdeɪ/", category: "clima" },
  { en: "It is raining outside", pt: "Está chovendo lá fora", phonetic: "/ɪt ɪz ˈreɪnɪŋ ˌaʊtˈsaɪd/", category: "clima" },
  { en: "It is really hot today", pt: "Está muito quente hoje", phonetic: "/ɪt ɪz ˈriːəli hɒt təˈdeɪ/", category: "clima" },
  { en: "Bring an umbrella", pt: "Traga um guarda-chuva", phonetic: "/brɪŋ ən ʌmˈbrɛlə/", category: "clima" },
  { en: "It might snow tonight", pt: "Pode nevar hoje à noite", phonetic: "/ɪt maɪt snoʊ təˈnaɪt/", category: "clima" },
  { en: "There is a storm coming", pt: "Uma tempestade está vindo", phonetic: "/ðɛr ɪz ə stɔːrm ˈkʌmɪŋ/", category: "clima" },
  { en: "The forecast says it will be sunny", pt: "A previsão diz que vai fazer sol", phonetic: "/ðə ˈfɔːrkæst sɛz ɪt wɪl biː ˈsʌni/", category: "clima" },
  { en: "It is freezing cold", pt: "Está congelando de frio", phonetic: "/ɪt ɪz ˈfriːzɪŋ koʊld/", category: "clima" },
  { en: "The wind is really strong", pt: "O vento está muito forte", phonetic: "/ðə wɪnd ɪz ˈriːəli strɒŋ/", category: "clima" },
  { en: "I love this weather", pt: "Eu adoro esse clima", phonetic: "/aɪ lʌv ðɪs ˈwɛðər/", category: "clima" },

  // ---------- Números e tempo ----------
  { en: "What time is it", pt: "Que horas são", phonetic: "/wʌt taɪm ɪz ɪt/", category: "numeros" },
  { en: "It is a quarter past three", pt: "São três e quinze", phonetic: "/ɪt ɪz ə ˈkwɔːrtər pæst θriː/", category: "numeros" },
  { en: "I will be there in five minutes", pt: "Eu estarei aí em cinco minutos", phonetic: "/aɪ wɪl biː ðɛr ɪn faɪv ˈmɪnɪts/", category: "numeros" },
  { en: "See you next week", pt: "Nos vemos semana que vem", phonetic: "/siː juː nɛkst wiːk/", category: "numeros" },
  { en: "It costs twenty dollars", pt: "Custa vinte dólares", phonetic: "/ɪt kɒsts ˈtwɛnti ˈdɒlərz/", category: "numeros" },
  { en: "What is today's date", pt: "Qual é a data de hoje", phonetic: "/wʌt ɪz təˈdeɪz deɪt/", category: "numeros" },
  { en: "I was born in nineteen ninety", pt: "Eu nasci em mil novecentos e noventa", phonetic: "/aɪ wʌz bɔːrn ɪn ˌnaɪnˈtiːn ˈnaɪnti/", category: "numeros" },
  { en: "We meet every other day", pt: "Nos encontramos dia sim, dia não", phonetic: "/wiː miːt ˈɛvri ˈʌðər deɪ/", category: "numeros" },
  { en: "The meeting starts at nine sharp", pt: "A reunião começa às nove em ponto", phonetic: "/ðə ˈmiːtɪŋ stɑːrts æt naɪn ʃɑːrp/", category: "numeros" },
  { en: "It has been two years already", pt: "Já faz dois anos", phonetic: "/ɪt hæz bɪn tuː jɪrz ɔːlˈrɛdi/", category: "numeros" },

  // ---------- Direções ----------
  { en: "Turn left at the corner", pt: "Vire à esquerda na esquina", phonetic: "/tɜːrn lɛft æt ðə ˈkɔːrnər/", category: "direcoes" },
  { en: "Go straight ahead", pt: "Siga em frente", phonetic: "/ɡoʊ streɪt əˈhɛd/", category: "direcoes" },
  { en: "It is two blocks from here", pt: "Fica a duas quadras daqui", phonetic: "/ɪt ɪz tuː blɒks frʌm hɪr/", category: "direcoes" },
  { en: "Is it within walking distance", pt: "Dá para ir a pé", phonetic: "/ɪz ɪt wɪˈðɪn ˈwɔːkɪŋ ˈdɪstəns/", category: "direcoes" },
  { en: "You can't miss it", pt: "Você não vai deixar de ver", phonetic: "/juː kænt mɪs ɪt/", category: "direcoes" },
  { en: "Take the second exit", pt: "Pegue a segunda saída", phonetic: "/teɪk ðə ˈsɛkənd ˈɛksɪt/", category: "direcoes" },
  { en: "Where does this bus go", pt: "Para onde vai este ônibus", phonetic: "/wɛr dʌz ðɪs bʌs ɡoʊ/", category: "direcoes" },
  { en: "I need to transfer to another line", pt: "Eu preciso fazer baldeação para outra linha", phonetic: "/aɪ niːd tuː trænsˈfɜːr tuː əˈnʌðər laɪn/", category: "direcoes" },
  { en: "Is this the right way to the station", pt: "Este é o caminho certo para a estação", phonetic: "/ɪz ðɪs ðə raɪt weɪ tuː ðə ˈsteɪʃən/", category: "direcoes" },
  { en: "It is right across the street", pt: "Fica bem em frente, do outro lado da rua", phonetic: "/ɪt ɪz raɪt əˈkrɔːs ðə striːt/", category: "direcoes" },

  // ---------- Tecnologia ----------
  { en: "My phone battery died", pt: "Minha bateria do celular acabou", phonetic: "/maɪ foʊn ˈbætəri daɪd/", category: "tecnologia" },
  { en: "Can I borrow your charger", pt: "Posso pegar seu carregador emprestado", phonetic: "/kæn aɪ ˈbɒroʊ jʊər ˈtʃɑːrdʒər/", category: "tecnologia" },
  { en: "I need to update my password", pt: "Eu preciso atualizar minha senha", phonetic: "/aɪ niːd tuː ˈʌpdeɪt maɪ ˈpæswɜːrd/", category: "tecnologia" },
  { en: "The app keeps crashing", pt: "O aplicativo fica travando", phonetic: "/ðə æp kiːps ˈkræʃɪŋ/", category: "tecnologia" },
  { en: "Can you send me the link", pt: "Você pode me mandar o link", phonetic: "/kæn juː sɛnd miː ðə lɪŋk/", category: "tecnologia" },
  { en: "I am having connection issues", pt: "Estou tendo problemas de conexão", phonetic: "/aɪ æm ˈhævɪŋ kəˈnɛkʃən ˈɪʃuːz/", category: "tecnologia" },
  { en: "Let's hop on a video call", pt: "Vamos fazer uma chamada de vídeo", phonetic: "/lɛts hɒp ɒn ə ˈvɪdioʊ kɔːl/", category: "tecnologia" },
  { en: "I need to back up my files", pt: "Eu preciso fazer backup dos meus arquivos", phonetic: "/aɪ niːd tuː bæk ʌp maɪ faɪlz/", category: "tecnologia" },
  { en: "The screen froze again", pt: "A tela travou de novo", phonetic: "/ðə skriːn froʊz əˈɡɛn/", category: "tecnologia" },
  { en: "Have you tried restarting it", pt: "Você já tentou reiniciar", phonetic: "/hæv juː traɪd ˌriːˈstɑːrtɪŋ ɪt/", category: "tecnologia" },

  // ---------- Sentimentos ----------
  { en: "I am really excited about this", pt: "Eu estou muito animado com isso", phonetic: "/aɪ æm ˈriːəli ɪkˈsaɪtɪd əˈbaʊt ðɪs/", category: "sentimentos" },
  { en: "I feel a bit nervous", pt: "Eu me sinto um pouco nervoso", phonetic: "/aɪ fiːl ə bɪt ˈnɜːrvəs/", category: "sentimentos" },
  { en: "That made me really happy", pt: "Isso me deixou muito feliz", phonetic: "/ðæt meɪd miː ˈriːəli ˈhæpi/", category: "sentimentos" },
  { en: "I am proud of you", pt: "Eu tenho orgulho de você", phonetic: "/aɪ æm praʊd ʌv juː/", category: "sentimentos" },
  { en: "I am a little worried", pt: "Eu estou um pouco preocupado", phonetic: "/aɪ æm ə ˈlɪtəl ˈwʌrid/", category: "sentimentos" },
  { en: "That was frustrating", pt: "Aquilo foi frustrante", phonetic: "/ðæt wʌz frʌˈstreɪtɪŋ/", category: "sentimentos" },
  { en: "I miss you a lot", pt: "Eu sinto muito a sua falta", phonetic: "/aɪ mɪs juː ə lɒt/", category: "sentimentos" },
  { en: "I feel much better now", pt: "Eu me sinto muito melhor agora", phonetic: "/aɪ fiːl mʌtʃ ˈbɛtər naʊ/", category: "sentimentos" },
  { en: "I am grateful for your help", pt: "Eu sou grato pela sua ajuda", phonetic: "/aɪ æm ˈɡreɪtfəl fɔːr jʊər hɛlp/", category: "sentimentos" },
  { en: "It is okay to feel this way", pt: "Está tudo bem se sentir assim", phonetic: "/ɪt ɪz oʊˈkeɪ tuː fiːl ðɪs weɪ/", category: "sentimentos" },

  // ---------- Escola ----------
  { en: "I have an exam tomorrow", pt: "Eu tenho uma prova amanhã", phonetic: "/aɪ hæv ən ɪɡˈzæm təˈmɒroʊ/", category: "escola" },
  { en: "Can you explain this again", pt: "Você pode explicar isso de novo", phonetic: "/kæn juː ɪkˈspleɪn ðɪs əˈɡɛn/", category: "escola" },
  { en: "I need to finish my homework", pt: "Eu preciso terminar meu dever de casa", phonetic: "/aɪ niːd tuː ˈfɪnɪʃ maɪ ˈhoʊmwɜːrk/", category: "escola" },
  { en: "What page are we on", pt: "Em que página estamos", phonetic: "/wʌt peɪdʒ ɑːr wiː ɒn/", category: "escola" },
  { en: "I did not understand the lesson", pt: "Eu não entendi a aula", phonetic: "/aɪ dɪd nɒt ˌʌndərˈstænd ðə ˈlɛsən/", category: "escola" },
  { en: "Can I borrow your notes", pt: "Posso pegar suas anotações emprestadas", phonetic: "/kæn aɪ ˈbɒroʊ jʊər noʊts/", category: "escola" },
  { en: "The deadline for the essay is Friday", pt: "O prazo da redação é sexta-feira", phonetic: "/ðə ˈdɛdlaɪn fɔːr ði ˈɛseɪ ɪz ˈfraɪdeɪ/", category: "escola" },
  { en: "I passed the test", pt: "Eu passei na prova", phonetic: "/aɪ pæst ðə tɛst/", category: "escola" },
  { en: "We have group work today", pt: "Temos trabalho em grupo hoje", phonetic: "/wiː hæv ɡruːp wɜːrk təˈdeɪ/", category: "escola" },
  { en: "I am studying for finals", pt: "Eu estou estudando para as provas finais", phonetic: "/aɪ æm ˈstʌdiɪŋ fɔːr ˈfaɪnəlz/", category: "escola" },
];

// ---------------------------------------------------------------------------
// Base de dados de palavras soltas (flashcards) — números, cores, animais...
// ---------------------------------------------------------------------------
const wordsData = [
  // ---------- Números ----------
  { en: "Zero", pt: "Zero", phonetic: "/ˈzɪəroʊ/", category: "numeros", emoji: "0️⃣" },
  { en: "One", pt: "Um", phonetic: "/wʌn/", category: "numeros", emoji: "1️⃣" },
  { en: "Two", pt: "Dois", phonetic: "/tuː/", category: "numeros", emoji: "2️⃣" },
  { en: "Three", pt: "Três", phonetic: "/θriː/", category: "numeros", emoji: "3️⃣" },
  { en: "Four", pt: "Quatro", phonetic: "/fɔːr/", category: "numeros", emoji: "4️⃣" },
  { en: "Five", pt: "Cinco", phonetic: "/faɪv/", category: "numeros", emoji: "5️⃣" },
  { en: "Six", pt: "Seis", phonetic: "/sɪks/", category: "numeros", emoji: "6️⃣" },
  { en: "Seven", pt: "Sete", phonetic: "/ˈsɛvən/", category: "numeros", emoji: "7️⃣" },
  { en: "Eight", pt: "Oito", phonetic: "/eɪt/", category: "numeros", emoji: "8️⃣" },
  { en: "Nine", pt: "Nove", phonetic: "/naɪn/", category: "numeros", emoji: "9️⃣" },
  { en: "Ten", pt: "Dez", phonetic: "/tɛn/", category: "numeros", emoji: "🔟" },
  { en: "Eleven", pt: "Onze", phonetic: "/ɪˈlɛvən/", category: "numeros", emoji: "🔢" },
  { en: "Twelve", pt: "Doze", phonetic: "/twɛlv/", category: "numeros", emoji: "🔢" },
  { en: "Thirteen", pt: "Treze", phonetic: "/ˌθɜːrˈtiːn/", category: "numeros", emoji: "🔢" },
  { en: "Fourteen", pt: "Catorze", phonetic: "/ˌfɔːrˈtiːn/", category: "numeros", emoji: "🔢" },
  { en: "Fifteen", pt: "Quinze", phonetic: "/ˌfɪfˈtiːn/", category: "numeros", emoji: "🔢" },
  { en: "Sixteen", pt: "Dezesseis", phonetic: "/ˌsɪksˈtiːn/", category: "numeros", emoji: "🔢" },
  { en: "Seventeen", pt: "Dezessete", phonetic: "/ˌsɛvənˈtiːn/", category: "numeros", emoji: "🔢" },
  { en: "Eighteen", pt: "Dezoito", phonetic: "/ˌeɪˈtiːn/", category: "numeros", emoji: "🔢" },
  { en: "Nineteen", pt: "Dezenove", phonetic: "/ˌnaɪnˈtiːn/", category: "numeros", emoji: "🔢" },
  { en: "Twenty", pt: "Vinte", phonetic: "/ˈtwɛnti/", category: "numeros", emoji: "🔢" },
  { en: "Thirty", pt: "Trinta", phonetic: "/ˈθɜːrti/", category: "numeros", emoji: "🔢" },
  { en: "Forty", pt: "Quarenta", phonetic: "/ˈfɔːrti/", category: "numeros", emoji: "🔢" },
  { en: "Fifty", pt: "Cinquenta", phonetic: "/ˈfɪfti/", category: "numeros", emoji: "🔢" },
  { en: "Sixty", pt: "Sessenta", phonetic: "/ˈsɪksti/", category: "numeros", emoji: "🔢" },
  { en: "Seventy", pt: "Setenta", phonetic: "/ˈsɛvənti/", category: "numeros", emoji: "🔢" },
  { en: "Eighty", pt: "Oitenta", phonetic: "/ˈeɪti/", category: "numeros", emoji: "🔢" },
  { en: "Ninety", pt: "Noventa", phonetic: "/ˈnaɪnti/", category: "numeros", emoji: "🔢" },
  { en: "One hundred", pt: "Cem", phonetic: "/wʌn ˈhʌndrəd/", category: "numeros", emoji: "💯" },
  { en: "First", pt: "Primeiro", phonetic: "/fɜːrst/", category: "numeros", emoji: "🥇" },
  { en: "Second", pt: "Segundo", phonetic: "/ˈsɛkənd/", category: "numeros", emoji: "🥈" },
  { en: "Third", pt: "Terceiro", phonetic: "/θɜːrd/", category: "numeros", emoji: "🥉" },

  // ---------- Cores ----------
  { en: "Red", pt: "Vermelho", phonetic: "/rɛd/", category: "cores", emoji: "🔴" },
  { en: "Blue", pt: "Azul", phonetic: "/bluː/", category: "cores", emoji: "🔵" },
  { en: "Green", pt: "Verde", phonetic: "/ɡriːn/", category: "cores", emoji: "🟢" },
  { en: "Yellow", pt: "Amarelo", phonetic: "/ˈjɛloʊ/", category: "cores", emoji: "🟡" },
  { en: "Black", pt: "Preto", phonetic: "/blæk/", category: "cores", emoji: "⚫" },
  { en: "White", pt: "Branco", phonetic: "/waɪt/", category: "cores", emoji: "⚪" },
  { en: "Orange", pt: "Laranja", phonetic: "/ˈɔːrɪndʒ/", category: "cores", emoji: "🟠" },
  { en: "Purple", pt: "Roxo", phonetic: "/ˈpɜːrpəl/", category: "cores", emoji: "🟣" },
  { en: "Pink", pt: "Rosa", phonetic: "/pɪŋk/", category: "cores", emoji: "🌸" },
  { en: "Brown", pt: "Marrom", phonetic: "/braʊn/", category: "cores", emoji: "🟤" },
  { en: "Gray", pt: "Cinza", phonetic: "/ɡreɪ/", category: "cores", emoji: "🐘" },

  // ---------- Animais ----------
  { en: "Dog", pt: "Cachorro", phonetic: "/dɔːɡ/", category: "animais", emoji: "🐶" },
  { en: "Cat", pt: "Gato", phonetic: "/kæt/", category: "animais", emoji: "🐱" },
  { en: "Bird", pt: "Pássaro", phonetic: "/bɜːrd/", category: "animais", emoji: "🐦" },
  { en: "Fish", pt: "Peixe", phonetic: "/fɪʃ/", category: "animais", emoji: "🐟" },
  { en: "Horse", pt: "Cavalo", phonetic: "/hɔːrs/", category: "animais", emoji: "🐴" },
  { en: "Cow", pt: "Vaca", phonetic: "/kaʊ/", category: "animais", emoji: "🐮" },
  { en: "Pig", pt: "Porco", phonetic: "/pɪɡ/", category: "animais", emoji: "🐷" },
  { en: "Chicken", pt: "Galinha", phonetic: "/ˈtʃɪkɪn/", category: "animais", emoji: "🐔" },
  { en: "Lion", pt: "Leão", phonetic: "/ˈlaɪən/", category: "animais", emoji: "🦁" },
  { en: "Elephant", pt: "Elefante", phonetic: "/ˈɛlɪfənt/", category: "animais", emoji: "🐘" },
  { en: "Rabbit", pt: "Coelho", phonetic: "/ˈræbɪt/", category: "animais", emoji: "🐰" },
  { en: "Mouse", pt: "Rato", phonetic: "/maʊs/", category: "animais", emoji: "🐭" },

  // ---------- Família ----------
  { en: "Mother", pt: "Mãe", phonetic: "/ˈmʌðər/", category: "familia", emoji: "👩" },
  { en: "Father", pt: "Pai", phonetic: "/ˈfɑːðər/", category: "familia", emoji: "👨" },
  { en: "Brother", pt: "Irmão", phonetic: "/ˈbrʌðər/", category: "familia", emoji: "👦" },
  { en: "Sister", pt: "Irmã", phonetic: "/ˈsɪstər/", category: "familia", emoji: "👧" },
  { en: "Son", pt: "Filho", phonetic: "/sʌn/", category: "familia", emoji: "🧒" },
  { en: "Daughter", pt: "Filha", phonetic: "/ˈdɔːtər/", category: "familia", emoji: "👧" },
  { en: "Grandmother", pt: "Avó", phonetic: "/ˈɡrænˌmʌðər/", category: "familia", emoji: "👵" },
  { en: "Grandfather", pt: "Avô", phonetic: "/ˈɡrænˌfɑːðər/", category: "familia", emoji: "👴" },
  { en: "Aunt", pt: "Tia", phonetic: "/ænt/", category: "familia", emoji: "👩" },
  { en: "Uncle", pt: "Tio", phonetic: "/ˈʌŋkəl/", category: "familia", emoji: "👨" },
  { en: "Cousin", pt: "Primo(a)", phonetic: "/ˈkʌzən/", category: "familia", emoji: "🧑" },
  { en: "Husband", pt: "Marido", phonetic: "/ˈhʌzbənd/", category: "familia", emoji: "🤵" },
  { en: "Wife", pt: "Esposa", phonetic: "/waɪf/", category: "familia", emoji: "👰" },

  // ---------- Dias da semana ----------
  { en: "Monday", pt: "Segunda-feira", phonetic: "/ˈmʌndeɪ/", category: "dias", emoji: "📅" },
  { en: "Tuesday", pt: "Terça-feira", phonetic: "/ˈtuːzdeɪ/", category: "dias", emoji: "📅" },
  { en: "Wednesday", pt: "Quarta-feira", phonetic: "/ˈwɛnzdeɪ/", category: "dias", emoji: "📅" },
  { en: "Thursday", pt: "Quinta-feira", phonetic: "/ˈθɜːrzdeɪ/", category: "dias", emoji: "📅" },
  { en: "Friday", pt: "Sexta-feira", phonetic: "/ˈfraɪdeɪ/", category: "dias", emoji: "📅" },
  { en: "Saturday", pt: "Sábado", phonetic: "/ˈsætərdeɪ/", category: "dias", emoji: "🎉" },
  { en: "Sunday", pt: "Domingo", phonetic: "/ˈsʌndeɪ/", category: "dias", emoji: "☀️" },
  { en: "Today", pt: "Hoje", phonetic: "/təˈdeɪ/", category: "dias", emoji: "📍" },
  { en: "Tomorrow", pt: "Amanhã", phonetic: "/təˈmɒroʊ/", category: "dias", emoji: "➡️" },
  { en: "Yesterday", pt: "Ontem", phonetic: "/ˈjɛstərdeɪ/", category: "dias", emoji: "⬅️" },

  // ---------- Verbos comuns ----------
  { en: "To eat", pt: "Comer", phonetic: "/tuː iːt/", category: "verbos", emoji: "🍽️" },
  { en: "To drink", pt: "Beber", phonetic: "/tuː drɪŋk/", category: "verbos", emoji: "🥤" },
  { en: "To sleep", pt: "Dormir", phonetic: "/tuː sliːp/", category: "verbos", emoji: "😴" },
  { en: "To work", pt: "Trabalhar", phonetic: "/tuː wɜːrk/", category: "verbos", emoji: "💼" },
  { en: "To study", pt: "Estudar", phonetic: "/tuː ˈstʌdi/", category: "verbos", emoji: "📚" },
  { en: "To walk", pt: "Andar", phonetic: "/tuː wɔːk/", category: "verbos", emoji: "🚶" },
  { en: "To run", pt: "Correr", phonetic: "/tuː rʌn/", category: "verbos", emoji: "🏃" },
  { en: "To read", pt: "Ler", phonetic: "/tuː riːd/", category: "verbos", emoji: "📖" },
  { en: "To write", pt: "Escrever", phonetic: "/tuː raɪt/", category: "verbos", emoji: "✍️" },
  { en: "To speak", pt: "Falar", phonetic: "/tuː spiːk/", category: "verbos", emoji: "🗣️" },
  { en: "To listen", pt: "Ouvir", phonetic: "/tuː ˈlɪsən/", category: "verbos", emoji: "👂" },
  { en: "To watch", pt: "Assistir", phonetic: "/tuː wɒtʃ/", category: "verbos", emoji: "📺" },
  { en: "To go", pt: "Ir", phonetic: "/tuː ɡoʊ/", category: "verbos", emoji: "🚶‍♂️" },
  { en: "To come", pt: "Vir", phonetic: "/tuː kʌm/", category: "verbos", emoji: "👋" },
  { en: "To have", pt: "Ter", phonetic: "/tuː hæv/", category: "verbos", emoji: "🤲" },
  { en: "To want", pt: "Querer", phonetic: "/tuː wɒnt/", category: "verbos", emoji: "🙋" },
  { en: "To need", pt: "Precisar", phonetic: "/tuː niːd/", category: "verbos", emoji: "❗" },
  { en: "To like", pt: "Gostar", phonetic: "/tuː laɪk/", category: "verbos", emoji: "👍" },
  { en: "To love", pt: "Amar", phonetic: "/tuː lʌv/", category: "verbos", emoji: "❤️" },
  { en: "To know", pt: "Saber / Conhecer", phonetic: "/tuː noʊ/", category: "verbos", emoji: "🧠" },
  { en: "To think", pt: "Pensar", phonetic: "/tuː θɪŋk/", category: "verbos", emoji: "💭" },
  { en: "To see", pt: "Ver", phonetic: "/tuː siː/", category: "verbos", emoji: "👀" },
  { en: "To buy", pt: "Comprar", phonetic: "/tuː baɪ/", category: "verbos", emoji: "🛍️" },
  { en: "To sell", pt: "Vender", phonetic: "/tuː sɛl/", category: "verbos", emoji: "🏷️" },
  { en: "To give", pt: "Dar", phonetic: "/tuː ɡɪv/", category: "verbos", emoji: "🎁" },
  { en: "To take", pt: "Pegar / Levar", phonetic: "/tuː teɪk/", category: "verbos", emoji: "✋" },
  { en: "To make", pt: "Fazer (produzir)", phonetic: "/tuː meɪk/", category: "verbos", emoji: "🛠️" },
  { en: "To do", pt: "Fazer", phonetic: "/tuː duː/", category: "verbos", emoji: "✅" },
  { en: "To play", pt: "Jogar / Brincar", phonetic: "/tuː pleɪ/", category: "verbos", emoji: "🎮" },
  { en: "To help", pt: "Ajudar", phonetic: "/tuː hɛlp/", category: "verbos", emoji: "🤝" },
  { en: "To find", pt: "Encontrar", phonetic: "/tuː faɪnd/", category: "verbos", emoji: "🔍" },
  { en: "To open", pt: "Abrir", phonetic: "/tuː ˈoʊpən/", category: "verbos", emoji: "🔓" },
  { en: "To close", pt: "Fechar", phonetic: "/tuː kloʊz/", category: "verbos", emoji: "🔒" },
  { en: "To learn", pt: "Aprender", phonetic: "/tuː lɜːrn/", category: "verbos", emoji: "🎓" },
  { en: "To teach", pt: "Ensinar", phonetic: "/tuː tiːtʃ/", category: "verbos", emoji: "👩‍🏫" },
  { en: "To remember", pt: "Lembrar", phonetic: "/tuː rɪˈmɛmbər/", category: "verbos", emoji: "🧠" },
  { en: "To forget", pt: "Esquecer", phonetic: "/tuː fərˈɡɛt/", category: "verbos", emoji: "🌫️" },
  { en: "To try", pt: "Tentar", phonetic: "/tuː traɪ/", category: "verbos", emoji: "💪" },
  { en: "To use", pt: "Usar", phonetic: "/tuː juːz/", category: "verbos", emoji: "🧰" },
  { en: "To cook", pt: "Cozinhar", phonetic: "/tuː kʊk/", category: "verbos", emoji: "🍳" },
  { en: "To drive", pt: "Dirigir", phonetic: "/tuː draɪv/", category: "verbos", emoji: "🚗" },
  { en: "To travel", pt: "Viajar", phonetic: "/tuː ˈtrævəl/", category: "verbos", emoji: "✈️" },
  { en: "To pay", pt: "Pagar", phonetic: "/tuː peɪ/", category: "verbos", emoji: "💳" },
  { en: "To wait", pt: "Esperar", phonetic: "/tuː weɪt/", category: "verbos", emoji: "⏳" },

  // ---------- Objetos do dia a dia ----------
  { en: "Table", pt: "Mesa", phonetic: "/ˈteɪbəl/", category: "objetos", emoji: "🪑" },
  { en: "Chair", pt: "Cadeira", phonetic: "/tʃɛr/", category: "objetos", emoji: "💺" },
  { en: "Door", pt: "Porta", phonetic: "/dɔːr/", category: "objetos", emoji: "🚪" },
  { en: "Window", pt: "Janela", phonetic: "/ˈwɪndoʊ/", category: "objetos", emoji: "🪟" },
  { en: "Phone", pt: "Telefone", phonetic: "/foʊn/", category: "objetos", emoji: "📱" },
  { en: "Computer", pt: "Computador", phonetic: "/kəmˈpjuːtər/", category: "objetos", emoji: "💻" },
  { en: "Book", pt: "Livro", phonetic: "/bʊk/", category: "objetos", emoji: "📕" },
  { en: "Key", pt: "Chave", phonetic: "/kiː/", category: "objetos", emoji: "🔑" },
  { en: "Bag", pt: "Bolsa/Mochila", phonetic: "/bæɡ/", category: "objetos", emoji: "🎒" },
  { en: "Clock", pt: "Relógio", phonetic: "/klɒk/", category: "objetos", emoji: "🕐" },
  { en: "Mirror", pt: "Espelho", phonetic: "/ˈmɪrər/", category: "objetos", emoji: "🪞" },
  { en: "Umbrella", pt: "Guarda-chuva", phonetic: "/ʌmˈbrɛlə/", category: "objetos", emoji: "☂️" },

  // ---------- Adjetivos comuns ----------
  { en: "Big", pt: "Grande", phonetic: "/bɪɡ/", category: "adjetivos", emoji: "🐘" },
  { en: "Small", pt: "Pequeno", phonetic: "/smɔːl/", category: "adjetivos", emoji: "🐜" },
  { en: "Hot", pt: "Quente", phonetic: "/hɒt/", category: "adjetivos", emoji: "🔥" },
  { en: "Cold", pt: "Frio", phonetic: "/koʊld/", category: "adjetivos", emoji: "❄️" },
  { en: "Happy", pt: "Feliz", phonetic: "/ˈhæpi/", category: "adjetivos", emoji: "😊" },
  { en: "Sad", pt: "Triste", phonetic: "/sæd/", category: "adjetivos", emoji: "😢" },
  { en: "Easy", pt: "Fácil", phonetic: "/ˈiːzi/", category: "adjetivos", emoji: "✅" },
  { en: "Difficult", pt: "Difícil", phonetic: "/ˈdɪfɪkəlt/", category: "adjetivos", emoji: "🧩" },
  { en: "Fast", pt: "Rápido", phonetic: "/fæst/", category: "adjetivos", emoji: "⚡" },
  { en: "Slow", pt: "Lento", phonetic: "/sloʊ/", category: "adjetivos", emoji: "🐢" },
  { en: "New", pt: "Novo", phonetic: "/njuː/", category: "adjetivos", emoji: "✨" },
  { en: "Old", pt: "Velho / Antigo", phonetic: "/oʊld/", category: "adjetivos", emoji: "🕰️" },
  { en: "Good", pt: "Bom", phonetic: "/ɡʊd/", category: "adjetivos", emoji: "👍" },
  { en: "Bad", pt: "Ruim", phonetic: "/bæd/", category: "adjetivos", emoji: "👎" },
  { en: "Beautiful", pt: "Bonito", phonetic: "/ˈbjuːtɪfəl/", category: "adjetivos", emoji: "🌸" },
  { en: "Cheap", pt: "Barato", phonetic: "/tʃiːp/", category: "adjetivos", emoji: "💸" },
  { en: "Expensive", pt: "Caro", phonetic: "/ɪkˈspɛnsɪv/", category: "adjetivos", emoji: "💰" },
  { en: "Strong", pt: "Forte", phonetic: "/strɒŋ/", category: "adjetivos", emoji: "💪" },
  { en: "Clean", pt: "Limpo", phonetic: "/kliːn/", category: "adjetivos", emoji: "🧼" },
  { en: "Tall", pt: "Alto", phonetic: "/tɔːl/", category: "adjetivos", emoji: "📏" },

  // ---------- Partes do corpo ----------
  { en: "Head", pt: "Cabeça", phonetic: "/hɛd/", category: "corpo", emoji: "🧠" },
  { en: "Eye", pt: "Olho", phonetic: "/aɪ/", category: "corpo", emoji: "👁️" },
  { en: "Ear", pt: "Orelha", phonetic: "/ɪr/", category: "corpo", emoji: "👂" },
  { en: "Nose", pt: "Nariz", phonetic: "/noʊz/", category: "corpo", emoji: "👃" },
  { en: "Mouth", pt: "Boca", phonetic: "/maʊθ/", category: "corpo", emoji: "👄" },
  { en: "Hand", pt: "Mão", phonetic: "/hænd/", category: "corpo", emoji: "✋" },
  { en: "Arm", pt: "Braço", phonetic: "/ɑːrm/", category: "corpo", emoji: "💪" },
  { en: "Leg", pt: "Perna", phonetic: "/lɛɡ/", category: "corpo", emoji: "🦵" },
  { en: "Foot", pt: "Pé", phonetic: "/fʊt/", category: "corpo", emoji: "🦶" },
  { en: "Hair", pt: "Cabelo", phonetic: "/hɛr/", category: "corpo", emoji: "💇" },
  { en: "Back", pt: "Costas", phonetic: "/bæk/", category: "corpo", emoji: "🔙" },
  { en: "Stomach", pt: "Barriga / Estômago", phonetic: "/ˈstʌmək/", category: "corpo", emoji: "🩺" },
  { en: "Tooth", pt: "Dente", phonetic: "/tuːθ/", category: "corpo", emoji: "🦷" },
  { en: "Finger", pt: "Dedo", phonetic: "/ˈfɪŋɡər/", category: "corpo", emoji: "☝️" },
  { en: "Heart", pt: "Coração", phonetic: "/hɑːrt/", category: "corpo", emoji: "❤️" },

  // ---------- Roupas ----------
  { en: "Shirt", pt: "Camisa", phonetic: "/ʃɜːrt/", category: "roupas", emoji: "👕" },
  { en: "Pants", pt: "Calça", phonetic: "/pænts/", category: "roupas", emoji: "👖" },
  { en: "Shoes", pt: "Sapatos", phonetic: "/ʃuːz/", category: "roupas", emoji: "👟" },
  { en: "Dress", pt: "Vestido", phonetic: "/drɛs/", category: "roupas", emoji: "👗" },
  { en: "Jacket", pt: "Jaqueta", phonetic: "/ˈdʒækɪt/", category: "roupas", emoji: "🧥" },
  { en: "Hat", pt: "Chapéu", phonetic: "/hæt/", category: "roupas", emoji: "🎩" },
  { en: "Socks", pt: "Meias", phonetic: "/sɒks/", category: "roupas", emoji: "🧦" },
  { en: "Skirt", pt: "Saia", phonetic: "/skɜːrt/", category: "roupas", emoji: "👗" },
  { en: "Coat", pt: "Casaco", phonetic: "/koʊt/", category: "roupas", emoji: "🥼" },
  { en: "Glasses", pt: "Óculos", phonetic: "/ˈɡlæsɪz/", category: "roupas", emoji: "👓" },

  // ---------- Lugares ----------
  { en: "House", pt: "Casa", phonetic: "/haʊs/", category: "lugares", emoji: "🏠" },
  { en: "School", pt: "Escola", phonetic: "/skuːl/", category: "lugares", emoji: "🏫" },
  { en: "Hospital", pt: "Hospital", phonetic: "/ˈhɒspɪtəl/", category: "lugares", emoji: "🏥" },
  { en: "Store", pt: "Loja", phonetic: "/stɔːr/", category: "lugares", emoji: "🏬" },
  { en: "Restaurant", pt: "Restaurante", phonetic: "/ˈrɛstərɒnt/", category: "lugares", emoji: "🍽️" },
  { en: "Park", pt: "Parque", phonetic: "/pɑːrk/", category: "lugares", emoji: "🌳" },
  { en: "Beach", pt: "Praia", phonetic: "/biːtʃ/", category: "lugares", emoji: "🏖️" },
  { en: "City", pt: "Cidade", phonetic: "/ˈsɪti/", category: "lugares", emoji: "🏙️" },
  { en: "Country", pt: "País", phonetic: "/ˈkʌntri/", category: "lugares", emoji: "🌍" },
  { en: "Airport", pt: "Aeroporto", phonetic: "/ˈɛrpɔːrt/", category: "lugares", emoji: "✈️" },
  { en: "Station", pt: "Estação", phonetic: "/ˈsteɪʃən/", category: "lugares", emoji: "🚉" },
  { en: "Church", pt: "Igreja", phonetic: "/tʃɜːrtʃ/", category: "lugares", emoji: "⛪" },
  { en: "Bank", pt: "Banco", phonetic: "/bæŋk/", category: "lugares", emoji: "🏦" },

  // ---------- Meses ----------
  { en: "January", pt: "Janeiro", phonetic: "/ˈdʒænjuˌɛri/", category: "meses", emoji: "📅" },
  { en: "February", pt: "Fevereiro", phonetic: "/ˈfɛbjuˌɛri/", category: "meses", emoji: "📅" },
  { en: "March", pt: "Março", phonetic: "/mɑːrtʃ/", category: "meses", emoji: "📅" },
  { en: "April", pt: "Abril", phonetic: "/ˈeɪprəl/", category: "meses", emoji: "📅" },
  { en: "May", pt: "Maio", phonetic: "/meɪ/", category: "meses", emoji: "📅" },
  { en: "June", pt: "Junho", phonetic: "/dʒuːn/", category: "meses", emoji: "📅" },
  { en: "July", pt: "Julho", phonetic: "/dʒʊˈlaɪ/", category: "meses", emoji: "📅" },
  { en: "August", pt: "Agosto", phonetic: "/ˈɔːɡəst/", category: "meses", emoji: "📅" },
  { en: "September", pt: "Setembro", phonetic: "/sɛpˈtɛmbər/", category: "meses", emoji: "📅" },
  { en: "October", pt: "Outubro", phonetic: "/ɒkˈtoʊbər/", category: "meses", emoji: "📅" },
  { en: "November", pt: "Novembro", phonetic: "/noʊˈvɛmbər/", category: "meses", emoji: "📅" },
  { en: "December", pt: "Dezembro", phonetic: "/dɪˈsɛmbər/", category: "meses", emoji: "📅" },

  // ---------- Transporte ----------
  { en: "Car", pt: "Carro", phonetic: "/kɑːr/", category: "transporte", emoji: "🚗" },
  { en: "Bus", pt: "Ônibus", phonetic: "/bʌs/", category: "transporte", emoji: "🚌" },
  { en: "Train", pt: "Trem", phonetic: "/treɪn/", category: "transporte", emoji: "🚆" },
  { en: "Airplane", pt: "Avião", phonetic: "/ˈɛrpleɪn/", category: "transporte", emoji: "✈️" },
  { en: "Bicycle", pt: "Bicicleta", phonetic: "/ˈbaɪsɪkəl/", category: "transporte", emoji: "🚲" },
  { en: "Boat", pt: "Barco", phonetic: "/boʊt/", category: "transporte", emoji: "🚤" },
  { en: "Taxi", pt: "Táxi", phonetic: "/ˈtæksi/", category: "transporte", emoji: "🚕" },
  { en: "Subway", pt: "Metrô", phonetic: "/ˈsʌbweɪ/", category: "transporte", emoji: "🚇" },
  { en: "Motorcycle", pt: "Moto", phonetic: "/ˈmoʊtərˌsaɪkəl/", category: "transporte", emoji: "🏍️" },
  { en: "Truck", pt: "Caminhão", phonetic: "/trʌk/", category: "transporte", emoji: "🚚" },

  // ---------- Profissões ----------
  { en: "Teacher", pt: "Professor(a)", phonetic: "/ˈtiːtʃər/", category: "profissoes", emoji: "👩‍🏫" },
  { en: "Doctor", pt: "Médico(a)", phonetic: "/ˈdɒktər/", category: "profissoes", emoji: "👨‍⚕️" },
  { en: "Engineer", pt: "Engenheiro(a)", phonetic: "/ˌɛndʒɪˈnɪr/", category: "profissoes", emoji: "👷" },
  { en: "Nurse", pt: "Enfermeiro(a)", phonetic: "/nɜːrs/", category: "profissoes", emoji: "👩‍⚕️" },
  { en: "Lawyer", pt: "Advogado(a)", phonetic: "/ˈlɔːjər/", category: "profissoes", emoji: "⚖️" },
  { en: "Chef", pt: "Cozinheiro(a)", phonetic: "/ʃɛf/", category: "profissoes", emoji: "👨‍🍳" },
  { en: "Police officer", pt: "Policial", phonetic: "/pəˈliːs ˈɒfɪsər/", category: "profissoes", emoji: "👮" },
  { en: "Driver", pt: "Motorista", phonetic: "/ˈdraɪvər/", category: "profissoes", emoji: "🚖" },
  { en: "Artist", pt: "Artista", phonetic: "/ˈɑːrtɪst/", category: "profissoes", emoji: "🎨" },
  { en: "Farmer", pt: "Fazendeiro(a)", phonetic: "/ˈfɑːrmər/", category: "profissoes", emoji: "🧑‍🌾" },
  { en: "Student", pt: "Estudante", phonetic: "/ˈstuːdənt/", category: "profissoes", emoji: "🎓" },
  { en: "Waiter", pt: "Garçom", phonetic: "/ˈweɪtər/", category: "profissoes", emoji: "🧑‍🍽️" },
];

// ---------------------------------------------------------------------------
// Estado
// ---------------------------------------------------------------------------
const state = {
  category: "todos",
  search: "",
};

const wordState = {
  category: "todos",
};

const STORAGE_KEY = "falaLabProgress";
const THEME_KEY = "falaLabTheme";
const DEFAULT_PROGRESS = { attempts: 0, scoreSum: 0, streak: 0, bestStreak: 0, learned: [], favorites: [], history: [] };

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch (e) { /* ignore corrupt storage */ }
  return { ...DEFAULT_PROGRESS };
}
function saveProgress(p) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) { /* storage unavailable */ }
}
let progress = loadProgress();

let speechRate = 0.9;
let showFavoritesOnly = false;
let showUnmasteredOnly = false;

// ---------------------------------------------------------------------------
// Elementos do DOM
// ---------------------------------------------------------------------------
const cardsGrid = document.getElementById("cards-grid");
const emptyState = document.getElementById("empty-state");
const categoryBtns = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("search-input");
const mobileMenuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

const lessonSelect = document.getElementById("lesson-select");
const targetPhraseInput = document.getElementById("target-phrase");
const targetPhoneticEl = document.getElementById("target-phonetic");
const listenTargetBtn = document.getElementById("listen-target-btn");
const startRecordBtn = document.getElementById("start-record-btn");
const feedbackContainer = document.getElementById("feedback-container");
const feedbackPlaceholder = document.getElementById("feedback-placeholder");
const recognizedTextEl = document.getElementById("recognized-text");
const feedbackMessageEl = document.getElementById("feedback-message");
const diffOutputEl = document.getElementById("diff-output");

const statAttempts = document.getElementById("stat-attempts");
const statAccuracy = document.getElementById("stat-accuracy");
const statStreak = document.getElementById("stat-streak");
const statLearned = document.getElementById("stat-learned");
const resetProgressBtn = document.getElementById("reset-progress-btn");

const favoritesToggle = document.getElementById("favorites-toggle");
const unmasteredToggle = document.getElementById("unmastered-toggle");
const rateBtns = document.querySelectorAll(".rate-btn");
const randomPhraseBtn = document.getElementById("random-phrase-btn");
const attemptHistoryEl = document.getElementById("attempt-history");
const toastContainer = document.getElementById("toast-container");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const micVisualizer = document.getElementById("mic-visualizer");
const feedbackPlaceholderText = document.getElementById("feedback-placeholder-text");

const wordsGrid = document.getElementById("words-grid");
const wordCategoryBtns = document.querySelectorAll(".wcategory-btn");

const micPermissionBanner = document.getElementById("mic-permission-banner");
const micPermissionText = document.getElementById("mic-permission-text");
const micPermissionBtn = document.getElementById("mic-permission-btn");

// ---------------------------------------------------------------------------
// Menu mobile
// ---------------------------------------------------------------------------
mobileMenuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden") === false;
  mobileMenuBtn.classList.toggle("is-open", isOpen);
  mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
});
mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenuBtn.classList.remove("is-open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  });
});

// ---------------------------------------------------------------------------
// Renderizar cards de vocabulário
// ---------------------------------------------------------------------------
function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getFilteredLessons() {
  const term = normalize(state.search.trim());
  return lessonsData.filter((item) => {
    const matchesCategory = state.category === "todos" || item.category === state.category;
    const matchesSearch = !term || normalize(item.en).includes(term) || normalize(item.pt).includes(term);
    const matchesFavorite = !showFavoritesOnly || progress.favorites.includes(item.en);
    const matchesUnmastered = !showUnmasteredOnly || !progress.learned.includes(item.en);
    return matchesCategory && matchesSearch && matchesFavorite && matchesUnmastered;
  });
}

function renderCards() {
  const filtered = getFilteredLessons();
  cardsGrid.innerHTML = "";
  emptyState.classList.toggle("hidden", filtered.length > 0);

  filtered.forEach((item) => {
    const isMastered = progress.learned.includes(item.en);
    const isFavorite = progress.favorites.includes(item.en);
    const card = document.createElement("div");
    card.className = "lesson-card";
    card.innerHTML = `
      <div class="absolute top-4 right-4 flex items-center gap-2">
        ${isMastered ? '<span class="mastered-badge">✓ dominada</span>' : ""}
        <button class="favorite-btn ${isFavorite ? "is-fav" : ""}" data-en="${escapeAttr(item.en)}" aria-label="Favoritar">${isFavorite ? "★" : "☆"}</button>
      </div>
      <div>
        <span class="tag">${item.category}</span>
        <h3 class="text-xl font-display font-semibold text-[--ink] mt-4 pr-8">${item.en}</h3>
        <p class="text-[--ink]/50 text-sm mt-1">${item.pt}</p>
        <p class="text-xs text-[--ink]/35 mt-2 font-mono">${item.phonetic}</p>
      </div>
      <div class="mt-6 pt-4 border-t border-[--ink]/10 grid grid-cols-2 gap-2">
        <button class="speak-btn" data-en="${escapeAttr(item.en)}">🔊 Ouvir</button>
        <button class="practice-btn" data-en="${escapeAttr(item.en)}">🎯 Praticar</button>
      </div>
    `;
    cardsGrid.appendChild(card);
  });
}

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

// Delegação de eventos nos cards (evita quebrar com aspas em frases como "Let's...")
cardsGrid.addEventListener("click", (e) => {
  const speakBtn = e.target.closest(".speak-btn");
  const practiceBtn = e.target.closest(".practice-btn");
  const favBtn = e.target.closest(".favorite-btn");
  if (speakBtn) {
    speakText(speakBtn.dataset.en);
  } else if (practiceBtn) {
    setTargetPhrase(practiceBtn.dataset.en);
    document.getElementById("laboratorio").scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (favBtn) {
    toggleFavorite(favBtn.dataset.en);
  }
});

function toggleFavorite(en) {
  const idx = progress.favorites.indexOf(en);
  if (idx >= 0) progress.favorites.splice(idx, 1);
  else progress.favorites.push(en);
  saveProgress(progress);
  renderCards();
}

favoritesToggle.addEventListener("click", () => {
  showFavoritesOnly = !showFavoritesOnly;
  favoritesToggle.classList.toggle("active", showFavoritesOnly);
  renderCards();
});

unmasteredToggle.addEventListener("click", () => {
  showUnmasteredOnly = !showUnmasteredOnly;
  unmasteredToggle.classList.toggle("active", showUnmasteredOnly);
  renderCards();
});

// Filtros de categoria
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.category = btn.getAttribute("data-category");
    renderCards();
  });
});

// Busca
searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderCards();
});

// ---------------------------------------------------------------------------
// Palavras soltas (flashcards) — números, cores, animais, família, dias...
// ---------------------------------------------------------------------------
function getFilteredWords() {
  if (wordState.category === "todos") return wordsData;
  return wordsData.filter((w) => w.category === wordState.category);
}

function renderWords() {
  const filtered = getFilteredWords();
  wordsGrid.innerHTML = "";
  filtered.forEach((item) => {
    const isMastered = progress.learned.includes(item.en);
    const card = document.createElement("div");
    card.className = "word-card-outer";
    card.dataset.en = item.en;
    card.innerHTML = `
      <div class="word-card-inner">
        <div class="word-card-face word-card-front">
          <span class="word-emoji">${item.emoji || "🔤"}</span>
          <h3 class="word-en">${item.en}</h3>
          <span class="word-hint">toque pra virar</span>
        </div>
        <div class="word-card-face word-card-back">
          ${isMastered ? '<span class="word-mastered">✓</span>' : ""}
          <p class="word-pt">${item.pt}</p>
          <p class="word-phonetic">${item.phonetic}</p>
          <div class="word-actions">
            <button class="speak-btn" data-en="${escapeAttr(item.en)}">🔊 Ouvir</button>
            <button class="practice-btn" data-en="${escapeAttr(item.en)}">🎯 Praticar</button>
          </div>
        </div>
      </div>
    `;
    wordsGrid.appendChild(card);
  });
}

wordsGrid.addEventListener("click", (e) => {
  const speakBtn = e.target.closest(".speak-btn");
  const practiceBtn = e.target.closest(".practice-btn");
  const cardOuter = e.target.closest(".word-card-outer");
  if (speakBtn) {
    e.stopPropagation();
    speakText(speakBtn.dataset.en);
    return;
  }
  if (practiceBtn) {
    e.stopPropagation();
    setTargetPhrase(practiceBtn.dataset.en);
    document.getElementById("laboratorio").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (cardOuter) {
    cardOuter.classList.toggle("flipped");
  }
});

wordCategoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    wordCategoryBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    wordState.category = btn.getAttribute("data-wcategory");
    renderWords();
  });
});

// ---------------------------------------------------------------------------
// Laboratório de fala — seleção de frase
// ---------------------------------------------------------------------------
function populateLessonSelect() {
  lessonSelect.innerHTML = "";
  const categories = [...new Set(lessonsData.map((l) => l.category))];
  categories.forEach((cat) => {
    const group = document.createElement("optgroup");
    group.label = cat;
    lessonsData.filter((l) => l.category === cat).forEach((l) => {
      const opt = document.createElement("option");
      opt.value = l.en;
      opt.textContent = `${l.en} — ${l.pt}`;
      group.appendChild(opt);
    });
    lessonSelect.appendChild(group);
  });
}

function setTargetPhrase(en) {
  targetPhraseInput.value = en;
  lessonSelect.value = en;
  updateTargetPhonetic();
}

function updateTargetPhonetic() {
  const match = lessonsData.find((l) => l.en.toLowerCase() === targetPhraseInput.value.trim().toLowerCase());
  targetPhoneticEl.textContent = match ? match.phonetic : "";
}

lessonSelect.addEventListener("change", () => setTargetPhrase(lessonSelect.value));
targetPhraseInput.addEventListener("input", updateTargetPhonetic);

// ---------------------------------------------------------------------------
// Web Speech API — Synthesis (Ouvir)
// ---------------------------------------------------------------------------
function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Seu navegador não suporta síntese de fala. Tente usar o Google Chrome.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = speechRate;
  window.speechSynthesis.speak(utterance);
}

listenTargetBtn.addEventListener("click", () => {
  const text = targetPhraseInput.value.trim();
  if (text) speakText(text);
});

// Enter no campo de frase = ouvir o modelo
targetPhraseInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    listenTargetBtn.click();
  }
});

// Controle de velocidade da fala
rateBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    rateBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    speechRate = parseFloat(btn.dataset.rate);
  });
});

// Frase aleatória
randomPhraseBtn.addEventListener("click", () => {
  const pool = getFilteredLessons().length ? getFilteredLessons() : lessonsData;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  setTargetPhrase(pick.en);
  speakText(pick.en);
});

// ---------------------------------------------------------------------------
// Modo escuro
// ---------------------------------------------------------------------------
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
});

// ---------------------------------------------------------------------------
// Web Speech API — Recognition (Falar / Testar) + comparação por palavra
// ---------------------------------------------------------------------------
const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;

function cleanWords(str) {
  return normalize(str)
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

// Diferença palavra-a-palavra baseada em LCS, para marcar acertos, erros e extras.
function diffWords(targetWords, spokenWords) {
  const n = targetWords.length, m = spokenWords.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = targetWords[i - 1] === spokenWords[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  // Reconstrói o alinhamento
  const tokens = [];
  let i = n, j = m;
  while (i > 0 && j > 0) {
    if (targetWords[i - 1] === spokenWords[j - 1]) {
      tokens.unshift({ word: targetWords[i - 1], type: "match" });
      i--; j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      tokens.unshift({ word: targetWords[i - 1], type: "miss" });
      i--;
    } else {
      tokens.unshift({ word: spokenWords[j - 1], type: "extra" });
      j--;
    }
  }
  while (i > 0) { tokens.unshift({ word: targetWords[i - 1], type: "miss" }); i--; }
  while (j > 0) { tokens.unshift({ word: spokenWords[j - 1], type: "extra" }); j--; }

  const matches = dp[n][m];
  const accuracy = n === 0 ? 0 : Math.round((matches / n) * 100);
  return { tokens, accuracy };
}

function renderDiff(tokens) {
  diffOutputEl.innerHTML = "";
  tokens.forEach((t) => {
    const span = document.createElement("span");
    span.className = `diff-word ${t.type}`;
    span.textContent = t.type === "miss" ? t.word : t.type === "extra" ? `+${t.word}` : t.word;
    diffOutputEl.appendChild(span);
  });
}

function setRecordingUI(active, stream) {
  isListening = active;
  startRecordBtn.classList.toggle("recording", active);
  startRecordBtn.textContent = active ? "🎙️ Solte para verificar" : "🎤 Segure para falar";
  if (active) {
    feedbackPlaceholder.classList.remove("hidden");
    feedbackContainer.classList.add("hidden");
    feedbackPlaceholderText.textContent = "Fale agora…";
    micVisualizer.classList.remove("hidden");
    startMicVisualizer(stream);
  } else {
    micVisualizer.classList.add("hidden");
    feedbackPlaceholderText.textContent = "Sua comparação vai aparecer aqui.";
    stopMicVisualizer();
  }
}

// ---------------------------------------------------------------------------
// Visualizador de microfone ao vivo (reaproveita o mesmo MediaStream já
// aberto para o reconhecimento de voz, em vez de pedir getUserMedia de novo)
// ---------------------------------------------------------------------------
let micStream = null, micAudioCtx = null, micAnalyser = null, micRafId = null;

function startMicVisualizer(stream) {
  if (!stream) return;
  try {
    micStream = stream;
    micAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = micAudioCtx.createMediaStreamSource(micStream);
    micAnalyser = micAudioCtx.createAnalyser();
    micAnalyser.fftSize = 256;
    source.connect(micAnalyser);
    drawMicLevels();
  } catch (e) {
    // AudioContext indisponível — segue sem visualizador, a gravação continua funcionando.
  }
}

function drawMicLevels() {
  const ctx = micVisualizer.getContext("2d");
  micVisualizer.width = micVisualizer.clientWidth * devicePixelRatio;
  micVisualizer.height = micVisualizer.clientHeight * devicePixelRatio;
  const data = new Uint8Array(micAnalyser.frequencyBinCount);

  function loop() {
    micRafId = requestAnimationFrame(loop);
    micAnalyser.getByteFrequencyData(data);
    const w = micVisualizer.width, h = micVisualizer.height;
    ctx.clearRect(0, 0, w, h);
    const bars = 28;
    const step = Math.floor(data.length / bars);
    for (let i = 0; i < bars; i++) {
      const value = data[i * step] / 255;
      const barHeight = Math.max(3, value * h * 0.9);
      ctx.fillStyle = "#F2A541";
      ctx.fillRect((w / bars) * i + 2, (h - barHeight) / 2, w / bars - 4, barHeight);
    }
  }
  loop();
}

function stopMicVisualizer() {
  if (micRafId) cancelAnimationFrame(micRafId);
  if (micStream) micStream.getTracks().forEach((t) => t.stop());
  if (micAudioCtx) micAudioCtx.close();
  micStream = micAudioCtx = micAnalyser = null;
  micRafId = null;
}

// ---------------------------------------------------------------------------
// Permissão de microfone — checagem de estado + solicitação explícita
// ---------------------------------------------------------------------------
function setMicBannerState(state) {
  micPermissionBanner.classList.remove("hidden");
  micPermissionBanner.classList.add("flex");
  micPermissionBanner.classList.remove("state-prompt", "state-denied", "state-checking");

  if (state === "granted") {
    micPermissionBanner.classList.add("hidden");
    micPermissionBanner.classList.remove("flex");
    return;
  }
  if (state === "denied") {
    micPermissionBanner.classList.add("state-denied");
    micPermissionText.textContent = "🚫 O microfone está bloqueado para este site.";
    micPermissionBtn.textContent = "como liberar?";
  } else if (state === "checking") {
    micPermissionBanner.classList.add("state-checking");
    micPermissionText.textContent = "🎙️ Verificando acesso ao microfone…";
    micPermissionBtn.textContent = "";
  } else {
    micPermissionBanner.classList.add("state-prompt");
    micPermissionText.textContent = "🎙️ Precisamos da sua permissão para usar o microfone.";
    micPermissionBtn.textContent = "permitir";
  }
}

async function checkMicPermissionStatus() {
  if (!navigator.permissions || !navigator.permissions.query) {
    // Navegador sem suporte à Permissions API para microfone (ex.: Safari) —
    // o banner só aparece se a solicitação de fato falhar.
    return;
  }
  try {
    const status = await navigator.permissions.query({ name: "microphone" });
    setMicBannerState(status.state);
    status.onchange = () => setMicBannerState(status.state);
  } catch (e) {
    // Alguns navegadores não permitem consultar "microphone" — ignora e segue.
  }
}

// Pede a permissão de fato (dispara o prompt nativo do navegador quando necessário).
// Por padrão retorna true/false e fecha o stream de teste. Quando keepStream é
// true, devolve o MediaStream aberto (para reaproveitar no reconhecimento de
// voz e no visualizador, sem pedir a permissão duas vezes) ou null em caso
// de falha.
async function requestMicPermission(keepStream = false) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Seu navegador não permite acesso ao microfone. Tente usar o Google Chrome ou Edge atualizados.");
    return keepStream ? null : false;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setMicBannerState("granted");
    if (keepStream) return stream;
    stream.getTracks().forEach((t) => t.stop());
    return true;
  } catch (e) {
    if (e.name === "NotAllowedError" || e.name === "SecurityError" || e.name === "PermissionDeniedError") {
      setMicBannerState("denied");
    } else if (e.name === "NotFoundError") {
      showToast("⚠️ Nenhum microfone foi encontrado neste dispositivo.");
    } else {
      showToast("⚠️ Não foi possível acessar o microfone.");
    }
    return keepStream ? null : false;
  }
}

micPermissionBtn.addEventListener("click", () => {
  if (micPermissionBtn.textContent === "como liberar?") {
    alert(
      "O navegador bloqueou o microfone para este site.\n\n" +
      "Para liberar:\n" +
      "1. Clique no ícone de cadeado (ou de microfone) na barra de endereço.\n" +
      "2. Encontre \"Microfone\" e mude para \"Permitir\".\n" +
      "3. Recarregue a página e segure \"Falar\" de novo."
    );
  } else {
    requestMicPermission();
  }
});

// ---------------------------------------------------------------------------
// Gravação "segure para falar, solte para verificar"
// ---------------------------------------------------------------------------
let finalTranscript = "";
let interimTranscript = "";
let recognitionActive = false;
let lastRecognitionError = null;
// Enquanto aguardamos o prompt de permissão do navegador, o botão pode já
// ter sido solto — sem esse controle, o reconhecimento começava mesmo
// assim e ficava "preso" ouvindo, porque nada mais mandava pará-lo. É por
// isso que o microfone às vezes parecia não funcionar.
let awaitingPermission = false;
let stopRequested = false;

function buildRecognition() {
  const rec = new SpeechRecognitionCtor();
  rec.lang = "en-US";
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  return rec;
}

async function beginRecording() {
  if (isListening || recognitionActive || awaitingPermission) return;

  if (!SpeechRecognitionCtor) {
    alert("Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome ou Edge.");
    return;
  }
  if (!window.isSecureContext) {
    alert("O reconhecimento de voz só funciona em conexões seguras (https) ou em localhost.");
    return;
  }
  const targetText = targetPhraseInput.value.trim();
  if (!targetText) {
    alert("Digite ou escolha uma frase para praticar primeiro.");
    return;
  }

  // Garante a permissão de microfone ANTES de iniciar o reconhecimento, e
  // guarda o stream para reaproveitar no visualizador (evita pedir a
  // permissão duas vezes).
  stopRequested = false;
  awaitingPermission = true;
  const stream = await requestMicPermission(true);
  awaitingPermission = false;
  if (!stream) { stopRequested = false; return; }

  // O usuário pode ter soltado o botão enquanto esperávamos a permissão —
  // nesse caso não iniciamos o reconhecimento e liberamos o microfone.
  if (stopRequested || isListening || recognitionActive) {
    stopRequested = false;
    stream.getTracks().forEach((t) => t.stop());
    return;
  }

  finalTranscript = "";
  interimTranscript = "";
  lastRecognitionError = null;
  recognition = buildRecognition();
  recognitionActive = true;
  setRecordingUI(true, stream);

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const piece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript = (finalTranscript + " " + piece).trim();
      } else {
        interim += piece;
      }
    }
    interimTranscript = interim;
    const preview = (finalTranscript + " " + interimTranscript).trim();
    if (isListening) {
      feedbackPlaceholderText.textContent = preview ? `“${preview}”` : "Fale agora…";
    }
  };

  recognition.onerror = (event) => {
    lastRecognitionError = event.error;
    if (event.error === "not-allowed") setMicBannerState("denied");
  };

  recognition.onend = () => {
    recognitionActive = false;
    setRecordingUI(false);
    processRecognitionResult(targetText);
  };

  try {
    recognition.start();
  } catch (e) {
    recognitionActive = false;
    setRecordingUI(false);
    showToast("⚠️ Não foi possível iniciar o microfone. Tente novamente.");
  }
}

function endRecording() {
  if (recognitionActive) {
    recognition.stop();
  } else if (awaitingPermission) {
    // Ainda esperando a permissão do navegador: sinaliza para não iniciar
    // o reconhecimento assim que ela chegar.
    stopRequested = true;
  }
}

function processRecognitionResult(targetText) {
  const speechResult = (finalTranscript || interimTranscript).trim();
  feedbackPlaceholder.classList.add("hidden");
  feedbackContainer.classList.remove("hidden");

  if (!speechResult) {
    const errorMessages = {
      "not-allowed": "permissão de microfone negada. Toque em \"permitir\" acima e tente de novo.",
      "audio-capture": "não encontramos um microfone disponível.",
      "network": "problema de conexão durante o reconhecimento. Verifique sua internet.",
      "service-not-allowed": "o serviço de reconhecimento de voz não está disponível agora.",
    };
    feedbackContainer.className = "p-5 rounded-2xl text-left border bg-amber-50 border-amber-200";
    recognizedTextEl.textContent = "Não detectamos nenhuma fala.";
    diffOutputEl.innerHTML = "";
    feedbackMessageEl.className = "font-bold mb-3 text-amber-700";
    feedbackMessageEl.textContent = lastRecognitionError && errorMessages[lastRecognitionError]
      ? `Erro: ${errorMessages[lastRecognitionError]}`
      : "Segure o botão, fale bem perto do microfone e solte quando terminar.";
    return;
  }

  recognizedTextEl.textContent = `"${speechResult}"`;
  const targetWords = cleanWords(targetText);
  const spokenWords = cleanWords(speechResult);
  const { tokens, accuracy } = diffWords(targetWords, spokenWords);
  renderDiff(tokens);
  applyFeedbackStyle(accuracy);
  recordAttempt(targetText, accuracy);
}

// Mouse, toque e teclado: segurar para gravar, soltar para verificar.
startRecordBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  beginRecording();
});
["pointerup", "pointerleave", "pointercancel"].forEach((evtName) => {
  startRecordBtn.addEventListener(evtName, () => endRecording());
});
startRecordBtn.addEventListener("keydown", (e) => {
  if ((e.key === " " || e.key === "Enter") && !e.repeat) {
    e.preventDefault();
    beginRecording();
  }
});
startRecordBtn.addEventListener("keyup", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    endRecording();
  }
});
// Evita que o menu de contexto/seleção atrapalhe o "segurar" no mobile.
startRecordBtn.addEventListener("contextmenu", (e) => e.preventDefault());

function applyFeedbackStyle(accuracy) {
  let colorClasses, textClass, message;
  if (accuracy >= 90) {
    colorClasses = "bg-emerald-50 border-emerald-200";
    textClass = "text-emerald-700";
    message = "✔ Excelente! Pronúncia muito próxima do modelo.";
  } else if (accuracy >= 60) {
    colorClasses = "bg-amber-50 border-amber-200";
    textClass = "text-amber-700";
    message = "➤ Quase lá! Reveja as palavras destacadas abaixo.";
  } else {
    colorClasses = "bg-rose-50 border-rose-200";
    textClass = "text-rose-700";
    message = "✖ Tente de novo, ouvindo o modelo com atenção.";
  }
  feedbackContainer.className = `p-5 rounded-2xl text-left border ${colorClasses}`;
  feedbackMessageEl.className = `font-bold mb-3 ${textClass}`;
  feedbackMessageEl.textContent = `${message} (${accuracy}% de acerto)`;
}

// ---------------------------------------------------------------------------
// Progresso (persistido em localStorage)
// ---------------------------------------------------------------------------
function recordAttempt(phraseEn, accuracy) {
  progress.attempts += 1;
  progress.scoreSum += accuracy;
  progress.streak = accuracy >= 60 ? progress.streak + 1 : 0;
  progress.bestStreak = Math.max(progress.bestStreak, progress.streak);

  const justMastered = accuracy >= 90 && !progress.learned.includes(phraseEn);
  if (justMastered) progress.learned.push(phraseEn);

  progress.history.unshift({ phrase: phraseEn, accuracy, time: Date.now() });
  progress.history = progress.history.slice(0, 5);

  saveProgress(progress);
  renderStats();
  renderCards(); // atualiza badge "dominada" se aplicável
  renderWords();
  renderHistory();
  checkAchievements(justMastered);
}

function renderHistory() {
  if (!progress.history.length) {
    attemptHistoryEl.innerHTML = '<li class="text-[--panel-fg]/30">— nenhuma tentativa ainda —</li>';
    return;
  }
  attemptHistoryEl.innerHTML = progress.history.map((h) => {
    const time = new Date(h.time).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const color = h.accuracy >= 90 ? "text-emerald-400" : h.accuracy >= 60 ? "text-amber-400" : "text-rose-400";
    return `<li class="flex justify-between gap-3"><span class="truncate">${h.phrase}</span><span class="${color} shrink-0">${h.accuracy}% · ${time}</span></li>`;
  }).join("");
}

// ---------------------------------------------------------------------------
// Conquistas (toasts simples)
// ---------------------------------------------------------------------------
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function checkAchievements(justMastered) {
  if ([3, 5, 10, 20].includes(progress.streak)) {
    showToast(`🔥 Sequência de ${progress.streak} acertos seguidos!`);
  }
  if (justMastered && [1, 5, 10, lessonsData.length].includes(progress.learned.length)) {
    showToast(`🏅 ${progress.learned.length} frase(s) dominada(s)!`);
  }
}

function renderStats() {
  statAttempts.textContent = progress.attempts;
  statAccuracy.textContent = progress.attempts ? `${Math.round(progress.scoreSum / progress.attempts)}%` : "—";
  statStreak.textContent = progress.streak;
  statLearned.textContent = progress.learned.length;
}

resetProgressBtn.addEventListener("click", () => {
  if (!confirm("Reiniciar todo o progresso salvo neste navegador?")) return;
  progress = { ...DEFAULT_PROGRESS };
  showFavoritesOnly = false;
  showUnmasteredOnly = false;
  favoritesToggle.classList.remove("active");
  unmasteredToggle.classList.remove("active");
  saveProgress(progress);
  renderStats();
  renderCards();
  renderWords();
  renderHistory();
  feedbackContainer.classList.add("hidden");
  feedbackPlaceholder.classList.remove("hidden");
});

// ---------------------------------------------------------------------------
// Onda decorativa no herói (puramente visual)
// ---------------------------------------------------------------------------
function drawHeroWave() {
  const canvas = document.getElementById("hero-wave");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
  }
  resize();
  window.addEventListener("resize", resize);

  const bars = 46;
  let t = 0;

  function frame() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const barWidth = w / bars;
    for (let i = 0; i < bars; i++) {
      const phase = i * 0.4 + t;
      const amp = (Math.sin(phase) * 0.35 + Math.sin(phase * 1.7) * 0.2 + 0.55);
      const barHeight = Math.max(4, amp * h * 0.75);
      ctx.fillStyle = i % 5 === 0 ? "#F2A541" : "rgba(43,103,119,0.55)";
      ctx.fillRect(i * barWidth + barWidth * 0.25, (h - barHeight) / 2, barWidth * 0.5, barHeight);
    }
    if (!reduceMotion) {
      t += 0.045;
      requestAnimationFrame(frame);
    }
  }
  frame();
}

// ---------------------------------------------------------------------------
// Inicialização
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem(THEME_KEY) || "light"; } catch (e) { /* ignore */ }
  applyTheme(savedTheme);

  renderCards();
  renderWords();
  populateLessonSelect();
  setTargetPhrase("Hello");
  renderStats();
  renderHistory();
  drawHeroWave();
  checkMicPermissionStatus();
});
