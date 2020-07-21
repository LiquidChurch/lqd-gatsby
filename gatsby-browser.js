import "./src/assets/styles/global.css"
import './src/assets/styles/bootstrap.min.css';

import React from "react"
import { GlobalProvider } from './src/components/GlobalContext/context'

export const onInitialClientRender = () => {
    setTimeout(function() {
        document.getElementById("___loader").style.display = "none"
    }, 500)
}

export const wrapRootElement = ({ element }) => (
  <GlobalProvider>{element}</GlobalProvider>
)