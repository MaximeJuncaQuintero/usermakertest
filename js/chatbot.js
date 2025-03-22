// Chatbot implementation
document.addEventListener('DOMContentLoaded', function() {
  // Initialize with config from chatbot-config.js
  const config = window.CHATBOT_CONFIG || {
    apiKey: 'DEMO_MODE',
    systemPrompt: "Tu es un assistant virtuel qui répond aux questions concernant ce portfolio. Sois cordial, bref et utile.",
    placeholder: "Posez une question sur ce portfolio...",
    welcomeMessage: "Bonjour ! Je suis l'assistant virtuel de ce portfolio. Comment puis-je vous aider ?",
    theme: "dark"
  };
  
  // Create chatbot UI if it doesn't exist
  if (!document.getElementById('chatbot-container')) {
    createChatbotUI(config);
  }
  
  // Set placeholder and welcome message
  const inputField = document.getElementById('chatbot-input-field');
  if (inputField) {
    inputField.placeholder = config.placeholder;
  }
  
  const messagesContainer = document.getElementById('chatbot-messages');
  if (messagesContainer && messagesContainer.children.length === 0) {
    addBotMessage(config.welcomeMessage);
  }
  
  // Setup event listeners
  const sendButton = document.getElementById('chatbot-send');
  if (sendButton) {
    sendButton.addEventListener('click', handleSendMessage);
  }
  
  if (inputField) {
    inputField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    });
  }
  
  const toggleButton = document.getElementById('chatbot-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleChatbot);
  }
  
  // Handle send message
  function handleSendMessage() {
    const inputField = document.getElementById('chatbot-input-field');
    const message = inputField.value.trim();
    
    if (message) {
      // Add user message to UI
      addUserMessage(message);
      inputField.value = '';
      
      // In demo mode, respond with predefined answers
      if (config.apiKey === 'DEMO_MODE') {
        setTimeout(() => {
          const responses = [
            "Je suis l'assistant virtuel de ce portfolio. Je peux vous aider à naviguer et à trouver des informations.",
            "Ce portfolio présente les projets et compétences professionnelles. Consultez la section Projets pour plus de détails.",
            "N'hésitez pas à utiliser les liens de navigation pour explorer les différentes sections du portfolio.",
            "Vous pouvez contacter le propriétaire de ce portfolio via les informations dans la section Contact.",
            "Ce portfolio a été créé avec E-Portfolio Maker, un outil de création de portfolios interactifs."
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addBotMessage(randomResponse);
        }, 1000);
      } else {
        // In real mode, simulate a thoughtful response
        addBotMessage("Je réfléchis...");
        
        // Replace this with real API call if needed
        setTimeout(() => {
          // Remove the thinking message
          const lastMessage = messagesContainer.lastChild;
          if (lastMessage && lastMessage.querySelector('p').textContent === "Je réfléchis...") {
            messagesContainer.removeChild(lastMessage);
          }
          
          let response = "Je suis en mode démonstration. Dans la version complète, je pourrais répondre à vos questions en utilisant l'API OpenAI.";
          
          // Simple keyword matching for demo
          if (message.toLowerCase().includes('projet')) {
            response = "Ce portfolio présente plusieurs projets intéressants. Consultez la section Projets pour voir les détails et technologies utilisées.";
          } else if (message.toLowerCase().includes('contact')) {
            response = "Vous pouvez contacter le propriétaire de ce portfolio via le formulaire de contact ou les liens de réseaux sociaux dans la section Contact.";
          } else if (message.toLowerCase().includes('compétence') || message.toLowerCase().includes('competence')) {
            response = "Les compétences principales incluent le développement web, la conception UX/UI, et diverses technologies comme React, Next.js, et plus encore.";
          }
          
          addBotMessage(response);
        }, 1500);
      }
    }
  }
  
  // Add user message to UI
  function addUserMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message user';
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Add bot message to UI
  function addBotMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message bot';
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Toggle chatbot visibility
  function toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    if (container) {
      container.classList.toggle('chatbot-hidden');
      
      // Update toggle button text
      const toggleButton = document.getElementById('chatbot-toggle');
      if (toggleButton) {
        toggleButton.textContent = container.classList.contains('chatbot-hidden') ? '↑' : '×';
      }
    }
  }
  
  // Create chatbot UI
  function createChatbotUI(config) {
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.className = 'chatbot-container';
    
    chatbotContainer.innerHTML = `
      <div class="chatbot-header">
        <h3>Assistant virtuel</h3>
        <button id="chatbot-toggle">×</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages"></div>
      <div class="chatbot-input">
        <input type="text" id="chatbot-input-field" placeholder="${config.placeholder}">
        <button id="chatbot-send">Envoyer</button>
      </div>
    `;
    
    document.body.appendChild(chatbotContainer);
    
    // Set theme
    if (config.theme === 'dark') {
      chatbotContainer.classList.add('chatbot-dark');
    }
  }
});