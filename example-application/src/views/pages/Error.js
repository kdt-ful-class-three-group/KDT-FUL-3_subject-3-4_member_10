function errorPage(title) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>${title}</title>
  </head>
  <body>
  <h1>Error!</h1>
  </body>
  </html>
  `
}

export { errorPage };