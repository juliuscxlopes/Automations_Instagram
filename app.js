// app.js
require('dotenv').config();
const { login } = require('./authentication');

(async () => {
  // Carrega as credenciais do arquivo .env
  const username = process.env.INSTAGRAM_USERNAME;
  const password = process.env.INSTAGRAM_PASSWORD;

  try {
    // Executa o login e recebe o navegador e a página
    const { browser, page } = await login(username, password);
    
    // Navega para o perfil do usuário ou realiza outras ações desejadas
    await page.goto(`https://www.instagram.com/${username}/`);
    
    // Aguarda o carregamento do perfil
    await page.waitForSelector('img');
    
    // Outras interações podem ser adicionadas aqui
    // ...

    // Fecha o navegador
    await browser.close();
  } catch (error) {
    console.error('Erro durante a execução:', error);
  }
})();
