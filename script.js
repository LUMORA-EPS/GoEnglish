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
// Estado
// ---------------------------------------------------------------------------
const state = {
  category: "todos",
  search: "",
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

// ---------------------------------------------------------------------------
// Menu mobile
// ---------------------------------------------------------------------------
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
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

function setRecordingUI(active) {
  isListening = active;
  startRecordBtn.disabled = active;
  startRecordBtn.classList.toggle("recording", active);
  startRecordBtn.textContent = active ? "🎙️ Ouvindo…" : "🎤 Falar / Testar";
  if (active) {
    feedbackPlaceholder.classList.remove("hidden");
    feedbackContainer.classList.add("hidden");
    feedbackPlaceholderText.textContent = "Fale agora…";
    micVisualizer.classList.remove("hidden");
    startMicVisualizer();
  } else {
    micVisualizer.classList.add("hidden");
    feedbackPlaceholderText.textContent = "Sua comparação vai aparecer aqui.";
    stopMicVisualizer();
  }
}

// ---------------------------------------------------------------------------
// Visualizador de microfone ao vivo (puramente decorativo, usa a mesma
// permissão de microfone já concedida ao SpeechRecognition)
// ---------------------------------------------------------------------------
let micStream = null, micAudioCtx = null, micAnalyser = null, micRafId = null;

async function startMicVisualizer() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = micAudioCtx.createMediaStreamSource(micStream);
    micAnalyser = micAudioCtx.createAnalyser();
    micAnalyser.fftSize = 256;
    source.connect(micAnalyser);
    drawMicLevels();
  } catch (e) {
    // Permissão negada ou indisponível — segue sem visualizador, o reconhecimento continua funcionando.
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

startRecordBtn.addEventListener("click", () => {
  if (isListening) return;

  if (!SpeechRecognitionCtor) {
    alert("Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome.");
    return;
  }
  const targetText = targetPhraseInput.value.trim();
  if (!targetText) {
    alert("Digite ou escolha uma frase para praticar primeiro.");
    return;
  }

  recognition = new SpeechRecognitionCtor();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  setRecordingUI(true);
  recognition.start();

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.trim();
    feedbackPlaceholder.classList.add("hidden");
    feedbackContainer.classList.remove("hidden");
    recognizedTextEl.textContent = `"${speechResult}"`;

    const targetWords = cleanWords(targetText);
    const spokenWords = cleanWords(speechResult);
    const { tokens, accuracy } = diffWords(targetWords, spokenWords);
    renderDiff(tokens);
    applyFeedbackStyle(accuracy);
    recordAttempt(targetText, accuracy);
  };

  recognition.onerror = (event) => {
    feedbackPlaceholder.classList.add("hidden");
    feedbackContainer.classList.remove("hidden");
    feedbackContainer.className = "p-5 rounded-2xl text-left border bg-amber-50 border-amber-200";
    recognizedTextEl.textContent = "Não foi possível capturar o áudio.";
    diffOutputEl.innerHTML = "";
    feedbackMessageEl.className = "font-bold mb-3 text-amber-700";
    feedbackMessageEl.textContent = `Erro: ${event.error === "not-allowed" ? "permissão de microfone negada" : event.error}`;
  };

  recognition.onend = () => setRecordingUI(false);
});

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
  renderHistory();
  checkAchievements(justMastered);
}

function renderHistory() {
  if (!progress.history.length) {
    attemptHistoryEl.innerHTML = '<li class="text-[--paper]/30">— nenhuma tentativa ainda —</li>';
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
  populateLessonSelect();
  setTargetPhrase("Hello");
  renderStats();
  renderHistory();
  drawHeroWave();
});
