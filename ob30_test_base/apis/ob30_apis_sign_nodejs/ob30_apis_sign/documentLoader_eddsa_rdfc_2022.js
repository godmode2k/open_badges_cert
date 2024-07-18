/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */

//! hjkim: comment-out {
/*
import {
  controllerDocEd25519Multikey,
  ed25519MultikeyKeyPair,
  mockPublicEd25519Multikey,
} from './mock-data_eddsa_rdfc_2022.js';
*/
//! hjkim: comment-out }
import dataIntegrityContext from '@digitalbazaar/data-integrity-context';
import multikeyContext from '@digitalbazaar/multikey-context';
import {securityLoader} from '@digitalbazaar/security-document-loader';

export const loader = securityLoader();

//! hjkim: comment-out {
/*
loader.addStatic(
  ed25519MultikeyKeyPair.controller,
  controllerDocEd25519Multikey
);
loader.addStatic(
  mockPublicEd25519Multikey.id,
  mockPublicEd25519Multikey
);
*/
//! hjkim: comment-out }

loader.addStatic(
  dataIntegrityContext.constants.CONTEXT_URL,
  dataIntegrityContext.contexts.get(dataIntegrityContext.constants.CONTEXT_URL)
);

//! hjkim: comment-out {
/*
loader.addStatic(
  multikeyContext.constants.CONTEXT_URL,
  multikeyContext.contexts.get(multikeyContext.constants.CONTEXT_URL)
);
*/
//! hjkim: comment-out }
