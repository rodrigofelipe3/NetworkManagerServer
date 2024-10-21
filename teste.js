const { spawn } = require('child_process');
const sudo = require('sudo-prompt');

// Configurações do sudo
const options = {
  name: 'SFC Scanner',
};

// Comando a ser executado
const command = 'dism';
const args = ['/online', '/cleanup-image', '/checkhealth'];

// Função para executar o SFC e capturar a saída em tempo real
function runSFC() {
  // Executa o comando com privilégios de administrador
  sudo.exec(command + ' ' + args.join(' '), options, (error, stdout, stderr) => {
    if (error) {
      console.error('Erro ao executar o comando:', error);
      return;
    }

    // Exibe a saída padrão
    console.log(stdout.toString('utf-8'));
    // Exibe a saída de erro, se houver
    if (stderr) {
      console.error(stderr);
    }
  });
}

// Executa o SFC
runSFC();
