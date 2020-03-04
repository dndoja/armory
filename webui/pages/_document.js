import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import "../public/styles/styles.scss"
import "../public/styles/input.scss"

export default class CustomDocument extends Document {
    render () {
        return (<html lang='en-US'>
        <Head>
            <script src="https://kit.fontawesome.com/366634f74e.js" crossOrigin="anonymous"/>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
        </html>)
    }
}