import React from 'react'
import Head from "next/head"

const Layout = ({ children }) => {
    return(
        <>
            <Head>
                <title>Novagito Chatbots</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Novagito Chatbots" />
                <meta name="og:title" property="og:title" content="Novagito Chatbots"></meta>
                <meta name="twitter:card" content="Novagito Chatbots"></meta>
            </Head>

            {children}
        </>
    );
}

export default Layout;