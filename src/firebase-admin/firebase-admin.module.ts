// src/firebase-admin/firebase-admin.module.ts
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseAuthService } from 'src/firebase-auth/firebase-auth.service';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const serviceAccount = {
          "projectId": "filmrecommender-2fabd",
          "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsXe2C7tgJYj5n\nnMFCIu0S6tz2B7uJbfMmAszhCAFhUd5fxPuIKwsqMgD69Wa/URVzhQpE60uRlYtg\nygsS3RwajrHDPXcjyj40NYlVDtFtZmOqIcq9SL6tuyfSZpg7f0H51fRHXbNRpE9+\nqlkt5iuRr2TM6MC1tt66iwnMpywL3ooYuKIPonW64Ah59rOEvr6U1iRVTloKP6/S\n5xY5PMosotXsBrFxMaHeEVW1jCp5SyoFNjI2QaMLuv2UOndL2WEv9/myR3b+1A31\n9h+P9Rn29lhV7oC0dTBS7L44qMcqPa9jEcYupr+zvN+oeYc3g8+KZ5cn3Qb/wC3E\ngVjdkhiTAgMBAAECggEAN2kKjWjSslGO1igiSGyJ4eb2mXDq7McXv0RvMHguWWbE\nIe1lHuUXdb0Va5ewLBiY2MYQAw/Q/0AfykGpRasm+bKdmrILtsmxLX94Youc75pW\nt76dOjREd/0OVCj/D0FdqD8LhFWu67Pyijmg6YxwvSixMt4v9TqQZ0+DGvMyya19\nOcN335mzesUW7vlifgVnqCn93wbZ1Trr6MbKlP0kOkKSLrcCSr/K/w+7dD3SfXJb\nyUQOBUTR6aalwRpQ8CcRV0XQf6SZhuKzLoEN3rxhVQrHuqAmqKAcS4xXDHxsU4Qw\n92VhR/c18bKAX9HZUnsEBIboAmwGe1gdD+B//sZwgQKBgQDhfBQlmDKGiTmtWDFF\ngWGVmXbtAxB9TldtrUG2TLihGwy7xqfl4XhJTIMnII5929YVxNT6c2VmV7mS1dgv\nbEc8s9/Mm7yMep13TXi9ZXdJ6Lx9gbSjM3lRf2GqtUjoppgCnDG3lJ6jUQC4Fgut\n5AnTiCr6VvdbZOWRSdVtDuXBgwKBgQDDsZUn5/AEuFN27tRuQ20Iiyw0idYhN3/X\nj56gYEuqzSpwECoMCcsQvrl1QNdKyHZHfDa/Au9lsgGFeq1NJCbarLWPciYYmYxA\nztX8JcxO5WWW6VJlGdwrSQ+vt9M/F5fRFuX6gvy21v3XvDO0PKDWcWiLZkInXBLw\nXuY/g1rvsQKBgQClC08r3WVOOG9xRFZ8S6GEANqdzVpqfcdczi6FI08ZDVWatGP8\nzbZf4JM3NotV8G2ZbYN+9qxH5vo8Ui51N8pE0lyDxZKTOMS9qIUyDGzuOl6Ndz0j\nH/AzCQwSCbOeJyKo9m8lsrETVZ0zIV/XHk1a+haLOtC/ovCuEd8YfokJxQKBgFBM\nsjOpzKdjK3yGC80jBb6XvQ/h72e56k99s02DtgjkHyHUwCwoaJb6bAddD/qzvzUe\nFyjR/4HvRQiMikg5KWhZrjaqVE+L0i1VsiDBMdC9+K2wGAs8TUfFtxYXjCs7dyRp\nDP16elBcb9TyeRTgO+9Coe9xinu0IGFZz4kIUWxBAoGAG5vlrlD2gmrcdnADyQLM\n2JyBOxOP8YptGE5tDrMJuYsz2nz8CQ7jqdc165intZ5ljlhRaA0dM+2JOn4aRieA\njLs9+TN6vmO23SXqqyoUrRZX+lnAiobweBjblhVu+pIdYlkPlQkt9bE6fO4K0N8y\nkSOMCRTbPXrK/CJFp25Gamw=\n-----END PRIVATE KEY-----\n",
          "client_email": "firebase-adminsdk-ofikf@filmrecommender-2fabd.iam.gserviceaccount.com",
        }
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      },
    },
    FirebaseAuthService,
  ],
  exports: ['FIREBASE_ADMIN', FirebaseAuthService],
})
export class FirebaseAdminModule { }
