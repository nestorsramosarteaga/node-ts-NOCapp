import { Server } from "./presentation/server";
import { envs } from './config/envs.plugin';



(async()=>{
  main();
})();


async function main(){
  // Server.start();
  console.log({'MAILER_EMAIL': envs.MAILER_EMAIL})
  console.log({'PORT': envs.PORT})
  console.log({'PROD': envs.PROD})
}