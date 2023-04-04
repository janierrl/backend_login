async function createAccount(username, codeRandom) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Email Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    @media screen {
                        @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 400;
                        }

                        @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 700;
                        }
                    }

                    body,
                    table,
                    td,
                    a {
                        -ms-text-size-adjust: 100%; /* 1 */
                        -webkit-text-size-adjust: 100%; /* 2 */
                    }

                    table,
                    td {
                        mso-table-rspace: 0pt;
                        mso-table-lspace: 0pt;
                    }

                    img {
                        -ms-interpolation-mode: bicubic;
                    }

                    a[x-apple-data-detectors] {
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        color: inherit !important;
                        text-decoration: none !important;
                    }

                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }

                    body {
                        width: 100% !important;
                        height: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }

                    table {
                        border-collapse: collapse !important;
                    }

                    a {
                        color: #007e9e;
                    }

                    img {
                        height: auto;
                        line-height: 100%;
                        text-decoration: none;
                        border: 0;
                        outline: none;
                    }

                    .code {
                        background-color: #007e9e;
                        border-radius: 5px;
                        color: #ffffff;
                        font-size: 25px;
                        font-weight: bold;
                        padding: 12.5px;
                        text-align: center;
                    }
                </style>
            </head>

            <body style="background-color: #e9ecef;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" valign="top" style="padding: 12px 0px 0px 0px;">
                                        <a href="https://www.aica.cu" target="_blank" style="display: inline-block;">
                                            <img src="https://www.aica.cu/api/file/content-api/upload/logo_azul_sin_fondo_8712ec74d0.png" alt="aica_logo" border="0" width="120" style="display: block; width: 120px; max-width: 120px; min-width: 120px;">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Bienvenido a nuestra herramienta</h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                                        <p style="margin: 0;">¡Gracias ${username} por registrar una cuenta en ConsulTorIa! Antes de que empecemos, tenemos que confirmar que eres realmente tú. A continuación, le proporcionamos un código de verificación para confirmar su correo electrónico:</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" bgcolor="#ffffff">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td align="center">
                                                                <div class="code">${codeRandom}</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" bgcolor="#ffffff" style="padding: 24px 24px 0px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                                        <p style="margin: 0;">Si no ha solicitado la creación de una cuenta en ConsulTorIa, puede eliminar este correo electrónico de forma segura.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                        <p style="margin: 0;">Saludos,<br> ConsulTorIa.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                        <p style="margin: 0;">Recibió este correo electrónico porque recibimos una solicitud para crear una cuenta. Si no solicitó la creación de una cuenta, puede eliminar este correo electrónico de forma segura.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                        <p style="margin: 0;">Para dejar de recibir estos correos electrónicos, puede darse de baja en cualquier momento.</p>
                                        <p style="margin: 0;">Aica+ <a href="https://goo.gl/maps/EDjRRBS8mshUmUNg6">3G3C+X8G, La Habana, Cuba</a></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
}

async function recoverAccount(username, codeRandom) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Email Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    @media screen {
                        @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 400;
                        }

                        @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 700;
                        }
                    }

                    body,
                    table,
                    td,
                    a {
                        -ms-text-size-adjust: 100%; /* 1 */
                        -webkit-text-size-adjust: 100%; /* 2 */
                    }

                    table,
                    td {
                        mso-table-rspace: 0pt;
                        mso-table-lspace: 0pt;
                    }

                    img {
                        -ms-interpolation-mode: bicubic;
                    }

                    a[x-apple-data-detectors] {
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        color: inherit !important;
                        text-decoration: none !important;
                    }

                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }

                    body {
                        width: 100% !important;
                        height: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }

                    table {
                        border-collapse: collapse !important;
                    }

                    a {
                        color: #007e9e;
                    }

                    img {
                        height: auto;
                        line-height: 100%;
                        text-decoration: none;
                        border: 0;
                        outline: none;
                    }

                    .code {
                        background-color: #007e9e;
                        border-radius: 5px;
                        color: #ffffff;
                        font-size: 25px;
                        font-weight: bold;
                        padding: 12.5px;
                        text-align: center;
                    }
                </style>
            </head>

            <body style="background-color: #e9ecef;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" valign="top" style="padding: 12px 0px 0px 0px;">
                                        <a href="https://www.aica.cu" target="_blank" style="display: inline-block;">
                                            <img src="https://www.aica.cu/api/file/content-api/upload/logo_azul_sin_fondo_8712ec74d0.png" alt="aica_logo" border="0" width="120" style="display: block; width: 120px; max-width: 120px; min-width: 120px;">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Juntos recuperamos su cuenta</h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                                        <p style="margin: 0;">Hola ${username}! Hemos recibido su solicitud para recuperar su cuenta. Antes de que empecemos, tenemos que confirmar que eres realmente tú. A continuación, le proporcionamos un código de verificación para confirmar su correo electrónico:</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" bgcolor="#ffffff">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td align="center">
                                                                <div class="code">${codeRandom}</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" bgcolor="#ffffff" style="padding: 24px 24px 0px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: justify;">
                                        <p style="margin: 0;">Si no ha solicitado la recuperación de su cuenta en ConsulTorIa, puede eliminar este correo electrónico de forma segura.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                        <p style="margin: 0;">Saludos,<br> ConsulTorIa.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                        <p style="margin: 0;">Recibió este correo electrónico porque recibimos una solicitud para recuperar su cuenta. Si no solicitó la recuperación de su cuenta, puede eliminar este correo electrónico de forma segura.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                        <p style="margin: 0;">Para dejar de recibir estos correos electrónicos, puede darse de baja en cualquier momento.</p>
                                        <p style="margin: 0;">Aica+ <a href="https://goo.gl/maps/EDjRRBS8mshUmUNg6">3G3C+X8G, La Habana, Cuba</a></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
}

module.exports = {
    createAccount,
    recoverAccount
}