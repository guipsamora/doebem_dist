'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'doebemorg-secret',

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',

  GOOGLE_ID: 'app-id',
  GOOGLE_SECRET: 'secret',

  GMAIL_USER: 'contato@doebem.org.br',
  GMAIL_SECRET: 'Doebem!@#',

  aws_access_key_id: 'AKIAJLEVE2AMATK2W6OA',
  aws_secret_access_key: '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',

  MerchantId: '65762591-82a8-4194-b64c-0e506e7a0eaa',
  MerchantKey: 'ZHGRIUQBYITBCCVQMTHIPHXPZEIEVGOJFZUAVVSJ',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
//# sourceMappingURL=local.env.js.map
