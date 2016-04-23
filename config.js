// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: 'http://www.johnmrake.com',
        mail: {},
        database: {
            client: 'postgres',
            connection: process.env.DATABASE_URL || process.env.JOHN_RAKE_DATABASE_URL,
            debug: false
        },

        server: {
            host: '0.0.0.0',
            port: process.env.PORT || 9000
        },
        storage: {
            active: 'ghost-s3',
            'ghost-s3': {
                accessKeyId: 'aws access key from IAM service',
                secretAccessKey: 'aws secret key from IAM service',
                bucket: 'bucket-name',
                region: 'aws region where S3 bucket is located',
                assetHost: 's3 bucket url'
            }
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:9000',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'postgres',
            connection: {
                host: '0.0.0.0',
                user: 'john_rake_user',
                password: 'password',
                database: 'john_rake_dev',
                port: '5432'
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '9000'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'postgres',
            connection: {
                host: '0.0.0.0',
                user: 'john_rake_user',
                password: 'password',
                database: 'john_rake_test',
                port: '5432'
            },
            pool: {
                afterCreate: function (conn, done) {
                    conn.run('PRAGMA synchronous=OFF;' +
                    'PRAGMA journal_mode=MEMORY;' +
                    'PRAGMA locking_mode=EXCLUSIVE;' +
                    'BEGIN EXCLUSIVE; COMMIT;', done);
                }
            }
        },
        server: {
            host: '0.0.0.0',
            port: '9000'
        },
        logging: false
    }
};

console.log(config.production);

module.exports = config;