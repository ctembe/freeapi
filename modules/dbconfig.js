//ARRAY OF config to have Multiple DB Connections
const config = [
    {
      user: "jitesh",
      password: "JitE$h",
      server: "192.168.0.5",
      database: "Cygnux_WMS_Demo",
      multipleStatements: true,
      options: {
        trustedconnection: true,
        trustServerCertificate: true,
        enableArithAort: true,
      },
      port: 1433,
    },
    {
      user: "jitesh",
      password: "JitE$h",
      server: "192.168.0.5",
      database: "Harsh_Test",
      multipleStatements: true,
      options: {
        trustedconnection: true,
        trustServerCertificate: true,
        enableArithAort: true,
      },
      port: 1433,
    },
  ];
  
  module.exports = config;
  