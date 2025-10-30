import { Injectable, OnModuleInit } from '@nestjs/common';
import Whatsapp from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService implements OnModuleInit{
    client: Whatsapp.Client
    eventos: Map<Whatsapp.Events, (...args) => void> = new Map()
    onModuleInit() {
        this.client = new Whatsapp.Client({
            authStrategy: new Whatsapp.LocalAuth(),
            puppeteer: {
                executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
            }
        })

        this.client.on('qr', (qr) => {
            qrcode.generate(qr, {small: true})
        });

        this.client.on('message_created', (msg) => {
            console.log( msg.Body);
            if(msg.Body === 'ping') {
                msg.reply('pong');
            }
        });

        this.client.initialize();
    }

    inscreverEvento(evento: Whatsapp.Events, callback){
        this.eventos.set(evento,callback)
    }

    ativarEventos(){
        this.eventos.forEach((callback, evento) =>{
            this.client.on(evento, callback)
        })
    }
}