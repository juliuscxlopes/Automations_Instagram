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

  // Aguarda a navegação e o carregamento da página principal
  await page.waitForNavigation();

  return { browser, page };
}

module.exports = { login };
