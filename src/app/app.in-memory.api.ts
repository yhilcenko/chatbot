import { InMemoryDbService } from 'angular-in-memory-web-api';

export class AppInMemoryApi implements InMemoryDbService {
  createDb() {
    return {
      'intents': [
        {
          id: 0,
          formulations: [
            'Les horaires',
            'Quel sont les horaires',
            'A quelle heure ouvre”',
            'A quelle heure ferme”',
            'Etes vous ouvert'
          ],
          answer: 'Le magasin est ouvert du lundi au vendredi de 7h à 18h.'
        },
        {
          id: 1,
          formulations: [
            'Se coucher'
          ],
          answer: 'Les enfants doivent aller au lit à 22h30 au plus tard.'
        }
      ]
    };
  }

}
