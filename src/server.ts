/********************** ANOTAÇÕES **********************************************
 *   * HTTP methods / API RESTful methods
 *   * HTTP Codes(Ele retorna informações da resposta, como por exemplo erros,
 *   * sucesso, tipo e etc...)
 *   *
 *   - Métodos GET, POST, PUT, PATCH, DELETE,
 *   *
 *   * HTTP CODES
 *   * Códigos iniciados com:
 *   * 2 - São de sucesso
 *   * 3 - Sao de redirecionamento
 *   * 4 - Erros gerados na nosso aplicação, como um código bugado
 *   * 5 - Erros inesperados
 *   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 *   *
 */
import express from "express";
import cors from 'cors'

import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hours-string";

const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ["query"],
});

//listagem de novo anúncio
app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

//No método post eu devo escrever no plural
//Criação de novo anúncio
app.post("/games/:id/ads", async(request, response) => {
  const gameId = request.params.id;
  const body = request.body;
  //Validação ----- recomendação do Diego zod
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
      createdAt: body.createdAt,
    }
  })

  return response.status(201).json(ad);
});

//Listagem de anúncios por game
app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json({
    discord: ad.discord,
  });
});

app.listen(3333);

/** ----------------------------- TYPESCRIPT-----------------------------------
  *  _Tipagem estática permite a gente definir o formato que esperamos de cada
  *  informação. 
  * 
  * _Tipagem Dinâmica os tipos dos dados nao sao definidos, como por exemplo no
  * javascript e PHP em versões anteriores
 /** -----------------------------TYPESCRIPT----------------------------------*/
