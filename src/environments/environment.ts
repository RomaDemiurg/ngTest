// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase  : {
        apiKey           : 'AIzaSyBZW1lg7jCclrr3C_5NUI6gKwoWwiiIMhM',
        authDomain       : 'demiurg-fire.firebaseapp.com',
        databaseURL      : 'https://demiurg-fire.firebaseio.com',
        projectId        : 'demiurg-fire',
        storageBucket    : 'demiurg-fire.appspot.com',
        messagingSenderId: '524227236213'
    },
    settings  : {
        feedsLimit: 3
    }
}
