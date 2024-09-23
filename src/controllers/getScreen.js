const { exec } = require('child_process');

const GetScreen = () => {
    /*const ffmpegPath = 'C:/ffmpeg-2024-09-19-git-0d5b68c27c-full_build/bin/ffmpeg.exe'
    const command = `${ffmpegPath} -i udp://0.0.0.0:1234 -f sdl "Screen Mirror" `;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao receber o fluxo de vídeo: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        
    });*/
}


module.exports = {
    GetScreen
}