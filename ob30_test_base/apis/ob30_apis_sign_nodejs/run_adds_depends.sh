#!/bin/sh



# init
# $ cd ob30_apis_sign && npm install



#// OB30 EDDSA-RDFC-2022 {
# $ npm install @digitalbazaar/eddsa-rdfc-2022-cryptosuite
# $ npm install @digitalbazaar/data-integrity
# $ npm install @digitalbazaar/data-integrity-context
# $ npm install @digitalbazaar/multikey-context
# $ npm install @digitalbazaar/security-document-loader
#
# Context: credentials v2
# $ npm install @digitalbazaar/credentials-v2-context
# or
# $ npm install https://github.com/digitalbazaar/credentials-v2-context.git
#
# $ npm install @digitalcredentials/open-badges-context
#
#
# ADD:
# filename: node_modules/@digitalbazaar/security-document-loader/lib/security-loader.js
#
#//! hjkim: Context {
#// https://github.com/digitalbazaar/credentials-v2-context
#import * as cred2 from '@digitalbazaar/credentials-v2-context';
#
#// https://github.com/digitalcredentials/open-badges-context
#import obCtx from '@digitalcredentials/open-badges-context';
#
#
#// https://github.com/digitalbazaar/credentials-v2-context
#// NOTE: CONTEXT_URL: https://www.w3.org/ns/credentials/v2
#  loader.addStatic(cred2.constants.CONTEXT_URL,
#    cred2.contexts.get(cred2.constants.CONTEXT_URL));
#
#// https://github.com/digitalcredentials/open-badges-context
#  loader.addStatic(obCtx.CONTEXT_URL_V3,
#    obCtx.contexts.get(obCtx.CONTEXT_URL_V3));
#//! hjkim: Context }
#// OB30 EDDSA-RDFC-2022 }



# ./ob30_apis_sign/node_modules/@digitalbazaar/security-document-loader/lib/security-loader.js
#//! hjkim: Context {
#// https://github.com/digitalbazaar/credentials-v2-context
#import * as cred2 from '@digitalbazaar/credentials-v2-context';
#
#// https://github.com/digitalcredentials/open-badges-context
#import obCtx from '@digitalcredentials/open-badges-context';
#
#
#// https://github.com/digitalbazaar/credentials-v2-context
#// NOTE: CONTEXT_URL: https://www.w3.org/ns/credentials/v2
#  loader.addStatic(cred2.constants.CONTEXT_URL,
#    cred2.contexts.get(cred2.constants.CONTEXT_URL));
#
#// https://github.com/digitalcredentials/open-badges-context
#  loader.addStatic(obCtx.CONTEXT_URL_V3,
#    obCtx.contexts.get(obCtx.CONTEXT_URL_V3));
#//! hjkim: Context }



EXPRSTR=$( cat << EOF
0,/\
import\ \*\ as\ veresOneCtx\
/!b;//a\
\ \n\
\/\/\!\ hjkim\:\ Context\ \{\n\
\/\/\ https\:\/\/github\.com\/digitalbazaar\/credentials-v2-context\n\
import\ \*\ as\ cred2\ from\ \"\@digitalbazaar\/credentials-v2-context\"\;\n\
\/\/\ https\:\/\/github.com\/digitalcredentials\/open-badges-context\n\
import\ obCtx\ from\ \"\@digitalcredentials\/open-badges-context\"\;\n\
\/\/\!\ hjkim\:\ Context\ \}\n
EOF
)
echo $EXPRSTR
echo
sed -i -e "$EXPRSTR" ./ob30_apis_sign/node_modules/@digitalbazaar/security-document-loader/lib/security-loader.js


EXPRSTR=$( cat << EOF
0,/\
veresOneCtx\.contexts\.get(veresOneCtx\.constants\.VERES_ONE_CONTEXT_V1_URL))\;\
/!b;//a\
\ \n\
\/\/\!\ hjkim\:\ Context\ \{\n\
\/\/\ https\:\/\/github\.com\/digitalbazaar\/credentials-v2-context\n\
\/\/\ NOTE\:\ CONTEXT_URL\:\ https\:\/\/www\.w3\.org\/ns\/credentials\/v2\n\
\ \ loader\.addStatic\(cred2\.constants\.CONTEXT_URL\,\n\
\ \ \ \ cred2\.contexts\.get\(cred2\.constants\.CONTEXT_URL\)\)\;\n\n\
\/\/\ https\:\/\/github\.com\/digitalcredentials\/open-badges-context\n\
\ \ loader\.addStatic\(obCtx\.CONTEXT_URL_V3\,\n\
\ \ \ \ obCtx\.contexts\.get\(obCtx\.CONTEXT_URL_V3\)\)\;\n\
\/\/\!\ hjkim\:\ Context\ \}\n
EOF
)
sed -i -e "$EXPRSTR" ./ob30_apis_sign/node_modules/@digitalbazaar/security-document-loader/lib/security-loader.js


