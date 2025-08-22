import CabTypeFormContextProvider from './context/CabTypeContext'

function layout({ children }) {
    return (
        <CabTypeFormContextProvider>
            {children}
        </CabTypeFormContextProvider>
    )
}

export default layout
