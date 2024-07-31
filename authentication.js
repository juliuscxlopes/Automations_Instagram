// authentication.js
const puppeteer = require('puppeteer');

async function login(username, password) {
  // Inicia o navegador
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navega para a página de login do Instagram
  await page.goto('https://www.instagram.com/accounts/login/');

  // Aguarda os campos de login estarem disponíveis
  await page.waitForSelector('input[name="username"]');
  
  // Insere o nome de usuário e a senha
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  
  // Clica no botão de login
  await page.click('button[type="submit"]');

  // Aguarda a página de verificação de duas etapas carregar
  try {
    await page.waitForSelector('input[name="verificationCode"]', { timeout: 5000 });
    console.log('Insira o código de verificação manualmente.');
    await page.waitForTimeout(30000); // Aguarda 30 segundos para inserção do código
  } catch (e) {
    console.log('A verificação em duas etapas não foi necessária ou não foi detectada.');
  }

  // Retorna o navegador e a página
  return { browser, page };
}

module.exports = { login };
